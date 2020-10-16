import { Json } from "@endless-trash/immutable-json-type";
import {
  KeyValueStore,
  KeyValueStoreGetResult,
  KeyValueStoreInsertResult,
  KeyValueStoreUpdateResult,
} from "@endless-trash/key-value-store";

const doesNotExist: { readonly type: `doesNotExist` } = {
  type: `doesNotExist`,
};

const alreadyExists: KeyValueStoreInsertResult<number> = {
  type: `alreadyExists`,
};

const doesNotExistOrVersionDoesNotMatch: KeyValueStoreUpdateResult<number> = {
  type: `doesNotExistOrVersionDoesNotMatch`,
};

export class MemoryKeyValueStore<TValue extends Json>
  implements KeyValueStore<TValue, number> {
  private readonly data = new Map<
    string,
    { valueJson: string; version: number }
  >();

  async get(key: string): Promise<KeyValueStoreGetResult<TValue, number>> {
    const item = this.data.get(key);

    if (item === undefined) {
      return doesNotExist;
    } else {
      return {
        type: `successful`,
        value: JSON.parse(item.valueJson),
        version: item.version,
      };
    }
  }

  async insert(
    key: string,
    value: TValue
  ): Promise<KeyValueStoreInsertResult<number>> {
    if (this.data.has(key)) {
      return alreadyExists;
    } else {
      this.data.set(key, {
        valueJson: JSON.stringify(value),
        version: 0,
      });
      return { type: `successful`, version: 0 };
    }
  }

  async update(
    key: string,
    value: TValue,
    expectedVersion: number
  ): Promise<KeyValueStoreUpdateResult<number>> {
    const item = this.data.get(key);

    if (item === undefined) {
      return doesNotExistOrVersionDoesNotMatch;
    } else {
      if (item.version === expectedVersion) {
        const version = expectedVersion + 1;
        item.valueJson = JSON.stringify(value);
        item.version = version;
        return { type: `successful`, version };
      } else {
        return doesNotExistOrVersionDoesNotMatch;
      }
    }
  }
}
