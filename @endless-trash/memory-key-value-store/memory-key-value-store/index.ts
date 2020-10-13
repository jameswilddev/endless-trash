import {
  KeyValueStore,
  KeyValueStoreGetResult,
  KeyValueStoreInsertResult,
  KeyValueStoreSuccessfulGetResult,
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

export class MemoryKeyValueStore<TKey, TValue>
  implements KeyValueStore<TKey, TValue, number> {
  private readonly data = new Map<
    TKey,
    KeyValueStoreSuccessfulGetResult<TValue, number>
  >();

  async get(key: TKey): Promise<KeyValueStoreGetResult<TValue, number>> {
    const item = this.data.get(key);

    if (item === undefined) {
      return doesNotExist;
    } else {
      return item;
    }
  }

  async insert(
    key: TKey,
    value: TValue
  ): Promise<KeyValueStoreInsertResult<number>> {
    if (this.data.has(key)) {
      return alreadyExists;
    } else {
      this.data.set(key, {
        type: `successful`,
        value,
        version: 0,
      });
      return { type: `successful`, version: 0 };
    }
  }

  async update(
    key: TKey,
    value: TValue,
    expectedVersion: number
  ): Promise<KeyValueStoreUpdateResult<number>> {
    const item = this.data.get(key);

    if (item === undefined) {
      return doesNotExistOrVersionDoesNotMatch;
    } else {
      if (item.version === expectedVersion) {
        const version = expectedVersion + 1;
        this.data.set(key, { type: `successful`, value, version });
        return { type: `successful`, version };
      } else {
        return doesNotExistOrVersionDoesNotMatch;
      }
    }
  }
}
