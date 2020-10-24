import { Json } from "@endless-trash/immutable-json-type";
import { KeyValueStoreDoesNotExistGetResult } from "./key-value-store-does-not-exist-get-result";
import { KeyValueStoreSuccessfulGetResult } from "./key-value-store-successful-get-result";
export { KeyValueStoreDoesNotExistGetResult } from "./key-value-store-does-not-exist-get-result";
export { KeyValueStoreSuccessfulGetResult } from "./key-value-store-successful-get-result";

export type KeyValueStoreGetResult<TValue extends Json, TVersion> =
  | KeyValueStoreDoesNotExistGetResult
  | KeyValueStoreSuccessfulGetResult<TValue, TVersion>;
