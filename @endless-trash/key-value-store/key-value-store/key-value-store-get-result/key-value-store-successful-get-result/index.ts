export type KeyValueStoreSuccessfulGetResult<TValue, TVersion> = {
  readonly type: `successful`;
  readonly value: TValue;
  readonly version: TVersion;
};
