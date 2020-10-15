import { join } from "path";
import { tmpdir } from "os";
import { promises } from "fs";
import { v4 } from "uuid";
import { OPEN_CREATE, OPEN_READONLY, OPEN_READWRITE } from "sqlite3";
import { SqliteKeyValueStoreConfiguration } from "../sqlite-key-value-store-configuration";
import { executeRun } from ".";
import { execute } from "../execute";

describe(`executeRun`, () => {
  describe(`when the query succeeds`, () => {
    let sqliteKeyValueStoreConfiguration: SqliteKeyValueStoreConfiguration;
    let changes: number;

    beforeAll(async () => {
      const directory = tmpdir();
      await promises.mkdir(directory, { recursive: true });

      sqliteKeyValueStoreConfiguration = {
        filename: join(directory, v4()),
        tableName: `Test Table Name`,
        keyColumnName: `Test Key Column Name`,
        valueColumnName: `Test Value Column Name`,
        versionColumnName: `Test Version Column Name`,
      };

      await executeRun(
        sqliteKeyValueStoreConfiguration,
        OPEN_CREATE | OPEN_READWRITE,
        `CREATE TABLE 'values' (isString TEXT NOT NULL, isNumber INTEGER NULL, isBoolean INTEGER NOT NULL);`,
        []
      );

      await executeRun(
        sqliteKeyValueStoreConfiguration,
        OPEN_READWRITE,
        `INSERT INTO 'values' (isString, isNumber, isBoolean) VALUES ('Test String A', 6, 1), ('Test String B', 3, 1), ('Test String C', 8, 0), ('Test String D', 9, 1);`,
        []
      );

      changes = await executeRun(
        sqliteKeyValueStoreConfiguration,
        OPEN_READWRITE,
        `UPDATE 'values' SET isString = ?, isNumber = CASE WHEN isNumber = 6 THEN ? ELSE ? END, isBoolean = CASE WHEN isNumber = 8 THEN ? ELSE ? END;`,
        [`Test Updated String`, null, 7, false, true]
      );
    });

    it(`executes in the correct database`, async () => {
      await execute(
        sqliteKeyValueStoreConfiguration,
        OPEN_READONLY,
        async (database) => {
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
                  },
                  {
                    isString: `Test Updated String`,
                    isNumber: 7,
                    isBoolean: 1,
                  },
                  {
                    isString: `Test Updated String`,
                    isNumber: 7,
                    isBoolean: 0,
                  },
                  {
                    isString: `Test Updated String`,
                    isNumber: 7,
                    isBoolean: 1,
                  },
                ]);

                resolve();
              }
            });
          });
        }
      );
    });

    it(`returns the number of affected rows`, () => {
      expect(changes).toEqual(4);
    });
  });

  describe(`when the query fails`, () => {
    let sqliteKeyValueStoreConfiguration: SqliteKeyValueStoreConfiguration;
    let error: undefined | Error;

    beforeAll(async () => {
      const directory = tmpdir();
      await promises.mkdir(directory, { recursive: true });

      sqliteKeyValueStoreConfiguration = {
        filename: join(directory, v4()),
        tableName: `Test Table Name`,
        keyColumnName: `Test Key Column Name`,
        valueColumnName: `Test Value Column Name`,
        versionColumnName: `Test Version Column Name`,
      };

      await executeRun(
        sqliteKeyValueStoreConfiguration,
        OPEN_CREATE | OPEN_READWRITE,
        `CREATE TABLE 'values' (isString TEXT NOT NULL, isNumber INTEGER NULL, isBoolean INTEGER NOT NULL);`,
        []
      );

      await executeRun(
        sqliteKeyValueStoreConfiguration,
        OPEN_READWRITE,
        `INSERT INTO 'values' (isString, isNumber, isBoolean) VALUES ('Test String A', 6, 1), ('Test String B', 3, 1), ('Test String C', 8, 0), ('Test String D', 9, 1);`,
        []
      );

      try {
        await executeRun(
          sqliteKeyValueStoreConfiguration,
          OPEN_READONLY,
          `UPDATE 'values' SET isString = ?, isNumber = CASE WHEN isNumber = 6 THEN ? ELSE ? END, isBoolean = CASE WHEN isNumber = 8 THEN ? ELSE ? END;`,
          [`Test Updated String`, null, 7, false, true]
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
    let sqliteKeyValueStoreConfiguration: SqliteKeyValueStoreConfiguration;
    let error: undefined | Error;

    beforeAll(async () => {
      const directory = tmpdir();
      await promises.mkdir(directory, { recursive: true });

      sqliteKeyValueStoreConfiguration = {
        filename: join(directory, v4()),
        tableName: `Test Table Name`,
        keyColumnName: `Test Key Column Name`,
        valueColumnName: `Test Value Column Name`,
        versionColumnName: `Test Version Column Name`,
      };

      try {
        await executeRun(
          sqliteKeyValueStoreConfiguration,
          OPEN_READONLY,
          `UPDATE 'values' SET isString = ?, isNumber = CASE WHEN isNumber = 6 THEN ? ELSE ? END, isBoolean = CASE WHEN isNumber = 8 THEN ? ELSE ? END;`,
          [`Test Updated String`, null, 7, false, true]
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
});
