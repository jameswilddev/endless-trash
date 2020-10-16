import { escapeName } from "@endless-trash/sqlite-helpers";
import { SqliteFileStoreConfiguration } from "../../sqlite-file-store-configuration";

export function generateDeleteQuery(
  sqliteFileStoreConfiguration: SqliteFileStoreConfiguration
): string {
  return `DELETE FROM ${escapeName(
    sqliteFileStoreConfiguration.tableName
  )} WHERE ${escapeName(sqliteFileStoreConfiguration.tableName)}.${escapeName(
    sqliteFileStoreConfiguration.pathColumnName
  )} = ?;`;
}
