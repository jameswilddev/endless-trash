import { KeyValueStoreDoesNotExistGetResult } from "./key-value-store-does-not-exist-result";
import { KeyValueStoreSuccessfulGetResult } from "./key-value-store-successful-get-result";
export { KeyValueStoreDoesNotExistGetResult } from "./key-value-store-does-not-exist-result";
export { KeyValueStoreSuccessfulGetResult } from "./key-value-store-successful-get-result";

export type KeyValueStoreGetResult<TValue, TVersion> =
  | KeyValueStoreDoesNotExistGetResult
  | KeyValueStoreSuccessfulGetResult<TValue, TVersion>;
