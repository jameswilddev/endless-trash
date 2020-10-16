import { escapeName } from "@endless-trash/sqlite-helpers";
import { SqliteKeyValueStoreConfiguration } from "../../sqlite-key-value-store-configuration";

export function generateCreateTableQuery(
  sqliteKeyValueStoreConfiguration: SqliteKeyValueStoreConfiguration
): string {
  return `CREATE TABLE ${escapeName(
    sqliteKeyValueStoreConfiguration.tableName
  )} (${escapeName(
    sqliteKeyValueStoreConfiguration.keyColumnName
  )} TEXT PRIMARY KEY NOT NULL, ${escapeName(
    sqliteKeyValueStoreConfiguration.valueColumnName
  )} TEXT NOT NULL, ${escapeName(
    sqliteKeyValueStoreConfiguration.versionColumnName
  )} INTEGER NOT NULL);`;
}
