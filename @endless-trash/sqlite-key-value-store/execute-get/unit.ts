import { join } from "path";
import { tmpdir } from "os";
import { promises } from "fs";
import { v4 } from "uuid";
import { OPEN_CREATE, OPEN_READWRITE } from "sqlite3";
import { SqliteKeyValueStoreConfiguration } from "../sqlite-key-value-store-configuration";
import { executeGet } from ".";
import { executeRun } from "../execute-run";

type TestResult = {
  readonly isFalse: number;
  readonly isTrue: number;
  readonly isNumber: number;
  readonly isString: string;
  readonly isNull: null;
};

describe(`executeGet`, () => {
  describe(`when the query succeeds with a row`, () => {
    let filename: string;
    let result: undefined | TestResult;

    beforeAll(async () => {
      const directory = tmpdir();
      await promises.mkdir(directory, { recursive: true });

      filename = join(directory, v4());
      const sqliteKeyValueStoreConfiguration: SqliteKeyValueStoreConfiguration = {
        filename,
        tableName: `Test Table Name`,
        keyColumnName: `Test Key Column Name`,
        valueColumnName: `Test Value Column Name`,
        versionColumnName: `Test Version Column Name`,
      };

      await executeRun(
        sqliteKeyValueStoreConfiguration,
        OPEN_CREATE | OPEN_READWRITE,
        `CREATE TABLE strings (value TEXT NOT NULL);`,
        []
      );

      await executeRun(
        sqliteKeyValueStoreConfiguration,
        OPEN_CREATE | OPEN_READWRITE,
        `INSERT INTO strings (value) VALUES (' Strings');`,
        []
      );

      result = await executeGet(
        sqliteKeyValueStoreConfiguration,
        `SELECT ? isFalse, ? isTrue, -(?) isNumber, 'Test ' || (?) || value isString, ? 'isNull' FROM strings;`,
        [false, true, 323.453, `Concatenated`, null]
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
      const sqliteKeyValueStoreConfiguration: SqliteKeyValueStoreConfiguration = {
        filename,
        tableName: `Test Table Name`,
        keyColumnName: `Test Key Column Name`,
        valueColumnName: `Test Value Column Name`,
        versionColumnName: `Test Version Column Name`,
      };

      await executeRun(
        sqliteKeyValueStoreConfiguration,
        OPEN_CREATE | OPEN_READWRITE,
        `CREATE TABLE strings (value TEXT NOT NULL);`,
        []
      );

      result = await executeGet(
        sqliteKeyValueStoreConfiguration,
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
      const sqliteKeyValueStoreConfiguration: SqliteKeyValueStoreConfiguration = {
        filename,
        tableName: `Test Table Name`,
        keyColumnName: `Test Key Column Name`,
        valueColumnName: `Test Value Column Name`,
        versionColumnName: `Test Version Column Name`,
      };

      await executeRun(
        sqliteKeyValueStoreConfiguration,
        OPEN_CREATE | OPEN_READWRITE,
        `CREATE TABLE strings (value2 TEXT NOT NULL);`,
        []
      );

      try {
        await executeGet(
          sqliteKeyValueStoreConfiguration,
          `SELECT ? isFalse, ? isTrue, -(?) isNumber, 'Test ' || (?) || value isString, ? 'isNull' FROM strings;`,
          [false, true, 323.453, `Concatenated`, null]
        );
      } catch (e) {
        error = e;
      }
    });

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
      const sqliteKeyValueStoreConfiguration: SqliteKeyValueStoreConfiguration = {
        filename,
        tableName: `Test Table Name`,
        keyColumnName: `Test Key Column Name`,
        valueColumnName: `Test Value Column Name`,
        versionColumnName: `Test Version Column Name`,
      };

      try {
        await executeGet(
          sqliteKeyValueStoreConfiguration,
          `SELECT ? isFalse, ? isTrue, -(?) isNumber, 'Test ' || (?) || value isString, ? 'isNull' FROM strings;`,
          [false, true, 323.453, `Concatenated`, null]
        );
      } catch (e) {
        error = e;
      }
    });

    it(`throws the expected error`, () => {
      expect(error).toEqual(
        new Error(`SQLITE_CANTOPEN: unable to open database file`)
      );
    });
  });
});
