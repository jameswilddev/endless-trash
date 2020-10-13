import { escapeName } from "../../escape-name";
import { SqliteKeyValueStoreConfiguration } from "../../sqlite-key-value-store-configuration";

export function generateSelectQuery(
  sqliteKeyValueStoreConfiguration: SqliteKeyValueStoreConfiguration
): string {
  return `SELECT ${escapeName(
    sqliteKeyValueStoreConfiguration.tableName
  )}.${escapeName(
    sqliteKeyValueStoreConfiguration.valueColumnName
  )} value, ${escapeName(
    sqliteKeyValueStoreConfiguration.tableName
  )}.${escapeName(
    sqliteKeyValueStoreConfiguration.versionColumnName
  )} version FROM ${escapeName(
    sqliteKeyValueStoreConfiguration.tableName
  )} WHERE ${escapeName(
    sqliteKeyValueStoreConfiguration.tableName
  )}.${escapeName(
    sqliteKeyValueStoreConfiguration.keyColumnName
  )} = ? LIMIT 1;`;
}
