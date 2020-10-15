import { escapeName } from "../../escape-name";
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
