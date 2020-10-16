import { Json } from "@endless-trash/immutable-json-type";

export type KeyValueCacheSuccessfulGetResult<TValue extends Json, TVersion> = {
  readonly type: `successful`;
  readonly value: TValue;
  readonly version: TVersion;
};
