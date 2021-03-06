import { escapeName } from "@endless-trash/sqlite-helpers";
import { SqliteFileStoreConfiguration } from "../../sqlite-file-store-configuration";

export function generateInsertQuery(
  sqliteFileStoreConfiguration: SqliteFileStoreConfiguration
): string {
  return `INSERT OR REPLACE INTO ${escapeName(
    sqliteFileStoreConfiguration.tableName
  )} (${escapeName(sqliteFileStoreConfiguration.pathColumnName)}, ${escapeName(
    sqliteFileStoreConfiguration.contentColumnName
  )}) VALUES (?, ?);`;
}
