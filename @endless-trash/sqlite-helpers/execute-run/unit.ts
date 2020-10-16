import { join } from "path";
import { tmpdir } from "os";
import { promises } from "fs";
import { v4 } from "uuid";
import { OPEN_CREATE, OPEN_READONLY, OPEN_READWRITE } from "sqlite3";
import { executeGet, executeRun, SqliteConfiguration } from "..";
import { execute } from "../execute";

describe(`executeRun`, () => {
  describe(`when the query succeeds`, () => {
    let sqliteConfiguration: SqliteConfiguration;
    let changes: number;

    beforeAll(async () => {
      const directory = tmpdir();
      await promises.mkdir(directory, { recursive: true });

      sqliteConfiguration = {
        filename: join(directory, v4()),
        maximumAttempts: 3,
        minimumRetryDelayMilliseconds: 125,
        maximumRetryDelayMilliseconds: 250,
      };

      await executeRun(
        sqliteConfiguration,
        OPEN_CREATE | OPEN_READWRITE,
        `CREATE TABLE 'values' (isString TEXT NOT NULL, isNumber INTEGER NULL, isBoolean INTEGER NOT NULL, isBuffer BLOB NOT NULL);`,
        []
      );

      await executeRun(
        sqliteConfiguration,
        OPEN_READWRITE,
        `INSERT INTO 'values' (isString, isNumber, isBoolean, isBuffer) VALUES ('Test String A', 6, 1, X'12895bf9b90cea8ac81fcebf9c0dedc4'), ('Test String B', 3, 1, X'44c07369e5716f4c5caa3bd343cd1ab4'), ('Test String C', 8, 0, X'8dcf45c5732dfbbf7b8bd2dbb26c9893'), ('Test String D', 9, 1, X'14e338878747710ed1826b6bfa0799a4');`,
        []
      );

      changes = await executeRun(
        sqliteConfiguration,
        OPEN_READWRITE,
        `UPDATE 'values' SET isString = ?, isNumber = CASE WHEN isNumber = 6 THEN ? ELSE ? END, isBoolean = CASE WHEN isNumber = 8 THEN ? ELSE ? END, isBuffer = ?;`,
        [
          `Test Updated String`,
          null,
          7,
          false,
          true,
          Buffer.from(Uint8Array.from([18, 221, 150, 209])),
        ]
      );
    });

    it(`executes in the correct database`, async () => {
      await execute(sqliteConfiguration, OPEN_READONLY, async (database) => {
        await new Promise((resolve) => {
          database.all(`SELECT * FROM 'values';`, (err, rows) => {
            if (err) {
              fail(err);
            } else {
              expect(rows).toEqual([
                {
                  isString: `Test Updated String`,
                  isNumber: null,
                  isBoolean: 1,
                  isBuffer: Buffer.from(Uint8Array.from([18, 221, 150, 209])),
                },
                {
                  isString: `Test Updated String`,
                  isNumber: 7,
                  isBoolean: 1,
                  isBuffer: Buffer.from(Uint8Array.from([18, 221, 150, 209])),
                },
                {
                  isString: `Test Updated String`,
                  isNumber: 7,
                  isBoolean: 0,
                  isBuffer: Buffer.from(Uint8Array.from([18, 221, 150, 209])),
                },
                {
                  isString: `Test Updated String`,
                  isNumber: 7,
                  isBoolean: 1,
                  isBuffer: Buffer.from(Uint8Array.from([18, 221, 150, 209])),
                },
              ]);

              resolve();
            }
          });
        });
      });
    });

    it(`returns the number of affected rows`, () => {
      expect(changes).toEqual(4);
    });
  });

  describe(`when the query fails`, () => {
    let sqliteConfiguration: SqliteConfiguration;
    let error: undefined | Error;

    beforeAll(async () => {
      const directory = tmpdir();
      await promises.mkdir(directory, { recursive: true });

      sqliteConfiguration = {
        filename: join(directory, v4()),
        maximumAttempts: 3,
        minimumRetryDelayMilliseconds: 125,
        maximumRetryDelayMilliseconds: 250,
      };

      await executeRun(
        sqliteConfiguration,
        OPEN_CREATE | OPEN_READWRITE,
        `CREATE TABLE 'values' (isString TEXT NOT NULL, isNumber INTEGER NULL, isBoolean INTEGER NOT NULL, isBuffer BLOB NOT NULL);`,
        []
      );

      await executeRun(
        sqliteConfiguration,
        OPEN_READWRITE,
        `INSERT INTO 'values' (isString, isNumber, isBoolean, isBuffer) VALUES ('Test String A', 6, 1, X'12895bf9b90cea8ac81fcebf9c0dedc4'), ('Test String B', 3, 1, X'44c07369e5716f4c5caa3bd343cd1ab4'), ('Test String C', 8, 0, X'8dcf45c5732dfbbf7b8bd2dbb26c9893'), ('Test String D', 9, 1, X'14e338878747710ed1826b6bfa0799a4');`,
        []
      );

      try {
        await executeRun(
          sqliteConfiguration,
          OPEN_READONLY,
          `UPDATE 'values' SET isString = ?, isNumber = CASE WHEN isNumber = 6 THEN ? ELSE ? END, isBoolean = CASE WHEN isNumber = 8 THEN ? ELSE ? END, isBuffer = ?;`,
          [
            `Test Updated String`,
            null,
            7,
            false,
            true,
            Buffer.from(Uint8Array.from([18, 221, 150, 209])),
          ]
        );
      } catch (e) {
        error = e;
      }
    }, 30000);

    it(`throws the expected error`, () => {
      expect(error).toEqual(
        new Error(`SQLITE_READONLY: attempt to write a readonly database`)
      );
    });
  });

  describe(`when the database is expected to exist, but does not`, () => {
    let sqliteConfiguration: SqliteConfiguration;
    let error: undefined | Error;

    beforeAll(async () => {
      const directory = tmpdir();
      await promises.mkdir(directory, { recursive: true });

      sqliteConfiguration = {
        filename: join(directory, v4()),
        maximumAttempts: 3,
        minimumRetryDelayMilliseconds: 125,
        maximumRetryDelayMilliseconds: 250,
      };

      try {
        await executeRun(
          sqliteConfiguration,
          OPEN_READONLY,
          `UPDATE 'values' SET isString = ?, isNumber = CASE WHEN isNumber = 6 THEN ? ELSE ? END, isBoolean = CASE WHEN isNumber = 8 THEN ? ELSE ? END, isBuffer = ?;`,
          [
            `Test Updated String`,
            null,
            7,
            false,
            true,
            Buffer.from(Uint8Array.from([18, 221, 150, 209])),
          ]
        );
      } catch (e) {
        error = e;
      }
    }, 30000);

    it(`throws the expected error`, () => {
      expect(error).toEqual(
        new Error(`SQLITE_CANTOPEN: unable to open database file`)
      );
    });
  });

  describe(`when a large number of parallel requests conflict over a resource`, () => {
    let sqliteConfiguration: SqliteConfiguration;
    let result: string;

    beforeAll(async () => {
      const directory = tmpdir();
      await promises.mkdir(directory, { recursive: true });

      sqliteConfiguration = {
        filename: join(directory, v4()),
        maximumAttempts: 3,
        minimumRetryDelayMilliseconds: 125,
        maximumRetryDelayMilliseconds: 250,
      };

      await executeRun(
        sqliteConfiguration,
        OPEN_CREATE | OPEN_READWRITE,
        `CREATE TABLE value (value STRING NOT NULL);`,
        []
      );

      await executeRun(
        sqliteConfiguration,
        OPEN_READWRITE,
        `INSERT INTO value (value) VALUES ('_');`,
        []
      );

      const values: string[] = [];

      while (values.length < 5000) {
        values.push(`${values.length}_`);
      }

      await Promise.all(
        values.map((value) =>
          executeRun(
            sqliteConfiguration,
            OPEN_READWRITE,
            `UPDATE value SET value = value || ?`,
            [value]
          )
        )
      );

      const row = await executeGet<{ readonly value: string }>(
        sqliteConfiguration,
        `SELECT value FROM value LIMIT 1;`,
        []
      );

      if (row === undefined) {
        fail(`No row found.`);
      } else {
        result = row.value;
      }
    }, 300000);

    it(`executed every request at least once`, async () => {
      for (let i = 0; i < 5000; i++) {
        expect(result).toContain(`_${i}_`);
      }
    });

    it(`did not execute any requests twice`, () => {
      let length = 1;

      for (let i = 0; i < 5000; i++) {
        length += 1 + i.toString().length;
      }

      expect(result.length).toEqual(length);
    });
  });
});
