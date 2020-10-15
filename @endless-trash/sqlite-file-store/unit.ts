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
      filename: join(directory, v4()),
      tableName: `Test Table Name`,
      pathColumnName: `Test Path Column Name`,
      contentColumnName: `Test Content Column Name`,
    };

    await promises.mkdir(directory, { recursive: true });
    await initializeSqliteFileStore(sqliteFileStoreConfiguration);

    return sqliteFileStoreConfiguration;
  },
  async (sqliteFileStoreConfiguration) => {
    return new SqliteFileStore(sqliteFileStoreConfiguration);
  },
  async (sqliteFileStoreConfiguration) => {
    await promises.unlink(sqliteFileStoreConfiguration.filename);
  },
  false
);
