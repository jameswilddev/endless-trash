import { join } from "path";
import { tmpdir } from "os";
import { promises } from "fs";
import { v4 } from "uuid";
import { OPEN_CREATE, OPEN_READWRITE } from "sqlite3";
import { executeGet, executeRun, SqliteConfiguration } from "..";

type TestResult = {
  readonly isFalse: number;
  readonly isTrue: number;
  readonly isNumber: number;
  readonly isString: string;
  readonly isNull: null;
  readonly isBuffer: Buffer;
};

describe(`executeGet`, () => {
  describe(`when the query succeeds with a row`, () => {
    let filename: string;
    let result: undefined | TestResult;

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
        OPEN_CREATE | OPEN_READWRITE,
        `CREATE TABLE strings (value TEXT NOT NULL);`,
        []
      );

      await executeRun(
        sqliteConfiguration,
        OPEN_CREATE | OPEN_READWRITE,
        `INSERT INTO strings (value) VALUES (' Strings');`,
        []
      );

      result = await executeGet(
        sqliteConfiguration,
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

    it(`returns the expected row`, () => {
      expect(result).toEqual({
        isFalse: 0,
        isTrue: 1,
        isNumber: -323.453,
        isString: `Test Concatenated Strings`,
        isNull: null,
        isBuffer: Buffer.from(Uint8Array.from([18, 221, 150, 209])),
      });
    });
  });

  describe(`when the query succeeds without a row`, () => {
    let filename: string;
    let result: undefined | TestResult;

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
        OPEN_CREATE | OPEN_READWRITE,
        `CREATE TABLE strings (value TEXT NOT NULL);`,
        []
      );

      result = await executeGet(
        sqliteConfiguration,
        `SELECT ? isFalse, ? isTrue, -(?) isNumber, 'Test ' || (?) || value isString, ? 'isNull' FROM strings;`,
        [false, true, 323.453, `Concatenated`, null]
      );
    });

    afterAll(async () => {
      await promises.unlink(filename);
    });

    it(`returns the expected row`, () => {
      expect(result).toBeUndefined();
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
        OPEN_CREATE | OPEN_READWRITE,
        `CREATE TABLE strings (value2 TEXT NOT NULL);`,
        []
      );

      try {
        await executeGet(
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
        await executeGet(
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
