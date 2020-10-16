import { SqliteConfiguration } from "@endless-trash/sqlite-helpers";

export type SqliteFileStoreConfiguration = {
  readonly tableName: string;
  readonly pathColumnName: string;
  readonly contentColumnName: string;
  readonly sqliteConfiguration: SqliteConfiguration;
};
