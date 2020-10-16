import { join } from "path";
import { tmpdir } from "os";
import { promises } from "fs";
import { v4 } from "uuid";
import { testKeyValueStore } from "@endless-trash/key-value-store";
import {
  initializeSqliteKeyValueStore,
  SqliteKeyValueStore,
  SqliteKeyValueStoreConfiguration,
} from ".";

testKeyValueStore(
  `SqliteKeyValueStore`,
  async () => {
    const directory = tmpdir();

    const sqliteKeyValueStoreConfiguration: SqliteKeyValueStoreConfiguration = {
      tableName: `Test Table Name`,
      keyColumnName: `Test Key Column Name`,
      valueColumnName: `Test Value Column Name`,
      versionColumnName: `Test Version Column Name`,
      sqliteConfiguration: {
        filename: join(directory, v4()),
        maximumAttempts: 3,
        minimumRetryDelayMilliseconds: 125,
        maximumRetryDelayMilliseconds: 250,
      },
    };

    await promises.mkdir(directory, { recursive: true });
    await initializeSqliteKeyValueStore(sqliteKeyValueStoreConfiguration);

    return sqliteKeyValueStoreConfiguration;
  },
  async (sqliteKeyValueStoreConfiguration) => {
    return new SqliteKeyValueStore(sqliteKeyValueStoreConfiguration);
  },
  async (sqliteKeyValueStoreConfiguration) => {
    await promises.unlink(
      sqliteKeyValueStoreConfiguration.sqliteConfiguration.filename
    );
  },
  (version) => version,
  false
);
