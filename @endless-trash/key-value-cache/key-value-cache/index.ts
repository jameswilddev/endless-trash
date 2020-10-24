import { Json } from "@endless-trash/immutable-json-type";
import { KeyValueCacheGetResult } from "./key-value-cache-get-result";
export {
  KeyValueCacheDoesNotExistGetResult,
  KeyValueCacheSuccessfulGetResult,
  KeyValueCacheGetResult,
} from "./key-value-cache-get-result";

export interface KeyValueCache<TValue extends Json, TVersion> {
  get(key: string): Promise<KeyValueCacheGetResult<TValue, TVersion>>;

  upsert(key: string, value: TValue, version: TVersion): Promise<void>;

  delete(key: string, version: TVersion): Promise<void>;
}
