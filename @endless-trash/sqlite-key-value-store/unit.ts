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
      filename: join(directory, v4()),
      tableName: `Test Table Name`,
      keyColumnName: `Test Key Column Name`,
      valueColumnName: `Test Value Column Name`,
      versionColumnName: `Test Version Column Name`,
    };

    await promises.mkdir(directory, { recursive: true });
    await initializeSqliteKeyValueStore(sqliteKeyValueStoreConfiguration);

    return sqliteKeyValueStoreConfiguration;
  },
  async (sqliteKeyValueStoreConfiguration) => {
    return new SqliteKeyValueStore(sqliteKeyValueStoreConfiguration);
  },
  async (sqliteKeyValueStoreConfiguration) => {
    await promises.unlink(sqliteKeyValueStoreConfiguration.filename);
  },
  (version) => version,
  false
);
