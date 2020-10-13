import { escapeName } from "../../escape-name";
import { SqliteKeyValueStoreConfiguration } from "../../sqlite-key-value-store-configuration";

export function generateUpdateQuery(
  sqliteKeyValueStoreConfiguration: SqliteKeyValueStoreConfiguration
): string {
  return `UPDATE ${escapeName(
    sqliteKeyValueStoreConfiguration.tableName
  )} SET ${escapeName(
    sqliteKeyValueStoreConfiguration.valueColumnName
  )} = ?, ${escapeName(
    sqliteKeyValueStoreConfiguration.versionColumnName
  )} = ? WHERE ${escapeName(
    sqliteKeyValueStoreConfiguration.tableName
  )}.${escapeName(
    sqliteKeyValueStoreConfiguration.keyColumnName
  )} = ? AND ${escapeName(
    sqliteKeyValueStoreConfiguration.tableName
  )}.${escapeName(sqliteKeyValueStoreConfiguration.versionColumnName)} = ?;`;
}
