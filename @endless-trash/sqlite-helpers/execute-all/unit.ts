import { join } from "path";
import { tmpdir } from "os";
import { promises } from "fs";
import { v4 } from "uuid";
import { executeAll, executeRun, SqliteConfiguration } from "..";

type TestResult = {
  readonly isFalse: number;
  readonly isTrue: number;
  readonly isNumber: number;
  readonly isString: string;
  readonly isNull: null;
  readonly isBuffer: Buffer;
};

describe(`executeAll`, () => {
  describe(`when the query succeeds`, () => {
    let filename: string;
    let result: undefined | ReadonlyArray<TestResult>;

    beforeAll(async () => {
      const directory = tmpdir();
      await promises.mkdir(directory, { recursive: true });

      filename = join(directory, v4());
      const sqliteFileStoreConfiguration: SqliteConfiguration = {
        filename,
        maximumAttempts: 3,
        minimumRetryDelayMilliseconds: 125,
        maximumRetryDelayMilliseconds: 250,
      };

      await executeRun(
        sqliteFileStoreConfiguration,
        true,
        `CREATE TABLE strings (value TEXT NOT NULL);`,
        []
      );

      await executeRun(
        sqliteFileStoreConfiguration,
        false,
        `INSERT INTO strings (value) VALUES (' Strings A'), (' Strings B'), (' Strings C');`,
        []
      );

      result = await executeAll(
        sqliteFileStoreConfiguration,
        `SELECT ? isFalse, ? isTrue, -(?) isNumber, 'Test ' || (?) || value isString, ? 'isNull', ? 'isBuffer' FROM strings;`,
        [
          false,
          true,
          323.453,
          `Concatenated`,
          null,
          Buffer.from(Uint8Array.from([18, 221, 150, 209])),
        ]
      );
    });

    afterAll(async () => {
      await promises.unlink(filename);
    });

    it(`returns the expected rows`, () => {
      expect(result).toEqual([
        {
          isFalse: 0,
          isTrue: 1,
          isNumber: -323.453,
          isString: `Test Concatenated Strings A`,
          isNull: null,
          isBuffer: Buffer.from(Uint8Array.from([18, 221, 150, 209])),
        },
        {
          isFalse: 0,
          isTrue: 1,
          isNumber: -323.453,
          isString: `Test Concatenated Strings B`,
          isNull: null,
          isBuffer: Buffer.from(Uint8Array.from([18, 221, 150, 209])),
        },
        {
          isFalse: 0,
          isTrue: 1,
          isNumber: -323.453,
          isString: `Test Concatenated Strings C`,
          isNull: null,
          isBuffer: Buffer.from(Uint8Array.from([18, 221, 150, 209])),
        },
      ]);
    });
  });

  describe(`when the query fails`, () => {
    let filename: string;
    let error: undefined | Error;

    beforeAll(async () => {
      const directory = tmpdir();
      await promises.mkdir(directory, { recursive: true });

      filename = join(directory, v4());
      const sqliteConfiguration: SqliteConfiguration = {
        filename,
        maximumAttempts: 3,
        minimumRetryDelayMilliseconds: 125,
        maximumRetryDelayMilliseconds: 250,
      };

      await executeRun(
        sqliteConfiguration,
        true,
        `CREATE TABLE strings (value2 TEXT NOT NULL);`,
        []
      );

      try {
        await executeAll(
          sqliteConfiguration,
          `SELECT ? isFalse, ? isTrue, -(?) isNumber, 'Test ' || (?) || value isString, ? 'isNull' FROM strings;`,
          [false, true, 323.453, `Concatenated`, null]
        );
      } catch (e) {
        error = e;
      }
    }, 30000);

    afterAll(async () => {
      await promises.unlink(filename);
    });

    it(`throws the expected error`, () => {
      expect(error).toEqual(new Error(`SQLITE_ERROR: no such column: value`));
    });
  });

  describe(`when the database is expected to exist, but does not`, () => {
    let filename: string;
    let error: undefined | Error;

    beforeAll(async () => {
      const directory = tmpdir();
      await promises.mkdir(directory, { recursive: true });

      filename = join(directory, v4());
      const sqliteConfiguration: SqliteConfiguration = {
        filename,
        maximumAttempts: 3,
        minimumRetryDelayMilliseconds: 125,
        maximumRetryDelayMilliseconds: 250,
      };

      try {
        await executeAll(
          sqliteConfiguration,
          `SELECT ? isFalse, ? isTrue, -(?) isNumber, 'Test ' || (?) || value isString, ? 'isNull' FROM strings;`,
          [false, true, 323.453, `Concatenated`, null]
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
