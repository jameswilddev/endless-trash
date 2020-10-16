import { join } from "path";
import { tmpdir } from "os";
import { promises } from "fs";
import { v4 } from "uuid";
import { testFileStore } from "@endless-trash/file-store";
import {
  initializeSqliteFileStore,
  SqliteFileStore,
  SqliteFileStoreConfiguration,
} from ".";

testFileStore(
  `SqliteFileStore`,
  async () => {
    const directory = tmpdir();

    const sqliteFileStoreConfiguration: SqliteFileStoreConfiguration = {
      tableName: `Test Table Name`,
      pathColumnName: `Test Path Column Name`,
      contentColumnName: `Test Content Column Name`,
      sqliteConfiguration: {
        filename: join(directory, v4()),
        maximumAttempts: 3,
        minimumRetryDelayMilliseconds: 125,
        maximumRetryDelayMilliseconds: 250,
      },
    };

    await promises.mkdir(directory, { recursive: true });
    await initializeSqliteFileStore(sqliteFileStoreConfiguration);

    return sqliteFileStoreConfiguration;
  },
  async (sqliteFileStoreConfiguration) => {
    return sqliteFileStoreConfiguration;
  },
  async (sqliteFileStoreConfiguration) => {
    return new SqliteFileStore(sqliteFileStoreConfiguration);
  },
  async (sqliteFileStoreConfiguration) => {
    await promises.unlink(
      sqliteFileStoreConfiguration.sqliteConfiguration.filename
    );
  }
);
