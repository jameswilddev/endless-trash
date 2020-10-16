import { escapeName } from "@endless-trash/sqlite-helpers";
import { SqliteKeyValueStoreConfiguration } from "../../sqlite-key-value-store-configuration";

export function generateInsertQuery(
  sqliteKeyValueStoreConfiguration: SqliteKeyValueStoreConfiguration
): string {
  return `INSERT INTO ${escapeName(
    sqliteKeyValueStoreConfiguration.tableName
  )} (${escapeName(
    sqliteKeyValueStoreConfiguration.keyColumnName
  )}, ${escapeName(
    sqliteKeyValueStoreConfiguration.valueColumnName
  )}, ${escapeName(
    sqliteKeyValueStoreConfiguration.versionColumnName
  )}) VALUES (?, ?, 0);`;
}
