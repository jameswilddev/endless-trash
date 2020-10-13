export type SqliteKeyValueStoreConfiguration = {
  readonly filename: string;
  readonly tableName: string;
  readonly keyColumnName: string;
  readonly valueColumnName: string;
  readonly versionColumnName: string;
};
