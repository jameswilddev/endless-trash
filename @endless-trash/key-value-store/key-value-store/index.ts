import { Json } from "@endless-trash/immutable-json-type";
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

export interface KeyValueStore<TValue extends Json, TVersion> {
  get(key: string): Promise<KeyValueStoreGetResult<TValue, TVersion>>;

  insert(
    key: string,
    value: TValue
  ): Promise<KeyValueStoreInsertResult<TVersion>>;

  update(
    key: string,
    value: TValue,
    expectedVersion: TVersion
  ): Promise<KeyValueStoreUpdateResult<TVersion>>;
}
