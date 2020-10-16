import { escapeName } from "@endless-trash/sqlite-helpers";
import { SqliteFileStoreConfiguration } from "../../sqlite-file-store-configuration";

export function generateSelectContentQuery(
  sqliteFileStoreConfiguration: SqliteFileStoreConfiguration
): string {
  return `SELECT ${escapeName(
    sqliteFileStoreConfiguration.tableName
  )}.${escapeName(
    sqliteFileStoreConfiguration.contentColumnName
  )} content FROM ${escapeName(
    sqliteFileStoreConfiguration.tableName
  )} WHERE ${escapeName(sqliteFileStoreConfiguration.tableName)}.${escapeName(
    sqliteFileStoreConfiguration.pathColumnName
  )} = ? LIMIT 1;`;
}
