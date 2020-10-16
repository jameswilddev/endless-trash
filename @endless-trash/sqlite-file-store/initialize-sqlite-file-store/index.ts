import { SqliteFileStoreConfiguration } from "../sqlite-file-store-configuration";
import { generateCreateTableQuery } from "./generate-create-table-query";
import { executeRun } from "@endless-trash/sqlite-helpers";

export async function initializeSqliteFileStore(
  sqliteKeyValueStoreConfiguration: SqliteFileStoreConfiguration
): Promise<void> {
  await executeRun(
    sqliteKeyValueStoreConfiguration.sqliteConfiguration,
    true,
    generateCreateTableQuery(sqliteKeyValueStoreConfiguration),
    []
  );
}
