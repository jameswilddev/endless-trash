import { join } from "path";
import { tmpdir } from "os";
import { promises } from "fs";
import { v4 } from "uuid";
import { SqliteKeyValueStore } from ".";
import { SqliteKeyValueStoreConfiguration } from "../sqlite-key-value-store-configuration";

describe(`SqliteKeyValueStore`, () => {
  describe(`when insert fails`, () => {
    let filename: string;
    let error: undefined | Error;

    beforeAll(async () => {
      const directory = tmpdir();
      await promises.mkdir(directory, { recursive: true });

      filename = join(directory, v4());
      const sqliteKeyValueStoreConfiguration: SqliteKeyValueStoreConfiguration = {
        tableName: `Test Table Name`,
        keyColumnName: `Test Key Column Name`,
        valueColumnName: `Test Value Column Name`,
        versionColumnName: `Test Version Column Name`,
        sqliteConfiguration: {
          filename,
          maximumAttempts: 3,
          minimumRetryDelayMilliseconds: 125,
          maximumRetryDelayMilliseconds: 250,
        },
      };

      const sqliteKeyValueStore = new SqliteKeyValueStore(
        sqliteKeyValueStoreConfiguration
      );

      try {
        await sqliteKeyValueStore.insert(`Test Key`, `Test Value`);
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
