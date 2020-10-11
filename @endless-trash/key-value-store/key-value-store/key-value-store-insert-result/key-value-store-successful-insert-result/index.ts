export type KeyValueStoreSuccessfulInsertResult<TVersion> = {
  readonly type: `successful`;
  readonly version: TVersion;
};
