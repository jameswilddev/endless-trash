import { Json } from "@endless-trash/immutable-json-type";
import { KeyValueCacheDoesNotExistGetResult } from "./key-value-cache-does-not-exist-get-result";
import { KeyValueCacheSuccessfulGetResult } from "./key-value-cache-successful-get-result";

export * from "./key-value-cache-does-not-exist-get-result";
export * from "./key-value-cache-successful-get-result";

export type KeyValueCacheGetResult<TValue extends Json, TVersion> =
  | KeyValueCacheDoesNotExistGetResult
  | KeyValueCacheSuccessfulGetResult<TValue, TVersion>;
