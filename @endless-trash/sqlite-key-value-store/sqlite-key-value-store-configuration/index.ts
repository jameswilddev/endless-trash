import { SqliteConfiguration } from "@endless-trash/sqlite-helpers";

export type SqliteKeyValueStoreConfiguration = {
  readonly tableName: string;
  readonly keyColumnName: string;
  readonly valueColumnName: string;
  readonly versionColumnName: string;
  readonly sqliteConfiguration: SqliteConfiguration;
};
