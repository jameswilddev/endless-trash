import { KeyValueStoreGetResult } from "./key-value-store-get-result";
import { KeyValueStoreInsertResult } from "./key-value-store-insert-result";
import { KeyValueStoreUpdateResult } from "./key-value-store-update-result";
export {
  KeyValueStoreDoesNotExistGetResult,
  KeyValueStoreSuccessfulGetResult,
  KeyValueStoreGetResult,
} from "./key-value-store-get-result";
export {
  KeyValueStoreAlreadyExistsInsertResult,
  KeyValueStoreSuccessfulInsertResult,
  KeyValueStoreInsertResult,
} from "./key-value-store-insert-result";
export {
  KeyValueStoreDoesNotExistOrVersionDoesNotMatchUpdateResult,
  KeyValueStoreSuccessfulUpdateResult,
  KeyValueStoreUpdateResult,
} from "./key-value-store-update-result";

export interface KeyValueStore<TKey, TValue, TVersion> {
  get(key: TKey): Promise<KeyValueStoreGetResult<TValue, TVersion>>;

  insert(
    key: TKey,
    value: TValue
  ): Promise<KeyValueStoreInsertResult<TVersion>>;

  update(
    key: TKey,
    value: TValue,
    expectedVersion: TVersion
  ): Promise<KeyValueStoreUpdateResult<TVersion>>;
}
