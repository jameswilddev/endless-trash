export type SqliteFileStoreConfiguration = {
  readonly filename: string;
  readonly tableName: string;
  readonly pathColumnName: string;
  readonly contentColumnName: string;
};
