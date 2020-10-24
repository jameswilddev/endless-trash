import { KeyValueStoreAlreadyExistsInsertResult } from "./key-value-store-already-exists-insert-result";
import { KeyValueStoreSuccessfulInsertResult } from "./key-value-store-successful-insert-result";

export * from "./key-value-store-already-exists-insert-result";
export * from "./key-value-store-successful-insert-result";

export type KeyValueStoreInsertResult<TVersion> =
  | KeyValueStoreAlreadyExistsInsertResult
  | KeyValueStoreSuccessfulInsertResult<TVersion>;
