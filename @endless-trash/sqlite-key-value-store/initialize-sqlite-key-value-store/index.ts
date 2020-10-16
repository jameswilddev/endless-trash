import { SqliteKeyValueStoreConfiguration } from "../sqlite-key-value-store-configuration";
import { generateCreateTableQuery } from "./generate-create-table-query";
import { executeRun } from "@endless-trash/sqlite-helpers";

export async function initializeSqliteKeyValueStore(
  sqliteKeyValueStoreConfiguration: SqliteKeyValueStoreConfiguration
): Promise<void> {
  await executeRun(
    sqliteKeyValueStoreConfiguration.sqliteConfiguration,
    true,
    generateCreateTableQuery(sqliteKeyValueStoreConfiguration),
    []
  );
}
