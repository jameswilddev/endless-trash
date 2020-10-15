import { escapeName } from "../../escape-name";
import { SqliteFileStoreConfiguration } from "../../sqlite-file-store-configuration";

export function generateSelectPathsQuery(
  sqliteFileStoreConfiguration: SqliteFileStoreConfiguration
): string {
  return `SELECT ${escapeName(
    sqliteFileStoreConfiguration.tableName
  )}.${escapeName(
    sqliteFileStoreConfiguration.pathColumnName
  )} path FROM ${escapeName(
    sqliteFileStoreConfiguration.tableName
  )} WHERE ${escapeName(sqliteFileStoreConfiguration.tableName)}.${escapeName(
    sqliteFileStoreConfiguration.pathColumnName
  )} LIKE ? ESCAPE '\\' ORDER BY ${escapeName(
    sqliteFileStoreConfiguration.tableName
  )}.${escapeName(sqliteFileStoreConfiguration.pathColumnName)};`;
}
