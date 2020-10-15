import { Json } from "@endless-trash/immutable-json-type";

export type KeyValueStoreSuccessfulGetResult<TValue extends Json, TVersion> = {
  readonly type: `successful`;
  readonly value: TValue;
  readonly version: TVersion;
};
