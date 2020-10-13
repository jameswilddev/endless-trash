import { OPEN_CREATE, OPEN_READWRITE } from "sqlite3";
import { SqliteKeyValueStoreConfiguration } from "../sqlite-key-value-store-configuration";
import { generateCreateTableQuery } from "./generate-create-table-query";
import { executeRun } from "../execute-run";

export async function initializeSqliteKeyValueStore(
  sqliteKeyValueStoreConfiguration: SqliteKeyValueStoreConfiguration
): Promise<void> {
  await executeRun(
    sqliteKeyValueStoreConfiguration,
    OPEN_CREATE | OPEN_READWRITE,
    generateCreateTableQuery(sqliteKeyValueStoreConfiguration),
    []
  );
}
