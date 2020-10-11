export type KeyValueStoreSuccessfulUpdateResult<TVersion> = {
  readonly type: `successful`;
  readonly version: TVersion;
};
