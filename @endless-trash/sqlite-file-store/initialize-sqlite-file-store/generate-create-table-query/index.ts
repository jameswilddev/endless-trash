import { escapeName } from "@endless-trash/sqlite-helpers";
import { SqliteFileStoreConfiguration } from "../../sqlite-file-store-configuration";

export function generateCreateTableQuery(
  sqliteFileStoreConfiguration: SqliteFileStoreConfiguration
): string {
  return `CREATE TABLE ${escapeName(
    sqliteFileStoreConfiguration.tableName
  )} (${escapeName(
    sqliteFileStoreConfiguration.pathColumnName
  )} TEXT PRIMARY KEY NOT NULL, ${escapeName(
    sqliteFileStoreConfiguration.contentColumnName
  )} BLOB NOT NULL);`;
}
