import { OPEN_CREATE, OPEN_READWRITE } from "sqlite3";
import { SqliteFileStoreConfiguration } from "../sqlite-file-store-configuration";
import { generateCreateTableQuery } from "./generate-create-table-query";
import { executeRun } from "../execute-run";

export async function initializeSqliteFileStore(
  sqliteKeyValueStoreConfiguration: SqliteFileStoreConfiguration
): Promise<void> {
  await executeRun(
    sqliteKeyValueStoreConfiguration,
    OPEN_CREATE | OPEN_READWRITE,
    generateCreateTableQuery(sqliteKeyValueStoreConfiguration),
    []
  );
}
