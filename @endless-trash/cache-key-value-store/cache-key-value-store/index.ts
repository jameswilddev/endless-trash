import { Json } from "@endless-trash/immutable-json-type";
import { KeyValueCache } from "@endless-trash/key-value-cache";
import {
  KeyValueStore,
  KeyValueStoreGetResult,
  KeyValueStoreInsertResult,
  KeyValueStoreUpdateResult,
} from "@endless-trash/key-value-store";

const alreadyExists: { readonly type: `alreadyExists` } = {
  type: `alreadyExists`,
};

const doesNotExistOrVersionDoesNotMatch: {
  readonly type: `doesNotExistOrVersionDoesNotMatch`;
} = { type: `doesNotExistOrVersionDoesNotMatch` };

export class CacheKeyValueStore<TValue extends Json, TVersion> {
  constructor(
    private readonly keyValueCache: KeyValueCache<TValue, TVersion>,
    private readonly keyValueStore: KeyValueStore<TValue, TVersion>
  ) {}

  async get(key: string): Promise<KeyValueStoreGetResult<TValue, TVersion>> {
    const cached = await this.keyValueCache.get(key);

    if (cached.type === `successful`) {
      return cached;
    } else {
      const uncached = await this.keyValueStore.get(key);

      if (uncached.type === `successful`) {
        await this.keyValueCache.upsert(key, uncached.value, uncached.version);
      }

      return uncached;
    }
  }

  async insert(
    key: string,
    value: TValue
  ): Promise<KeyValueStoreInsertResult<TVersion>> {
    const cached = await this.keyValueCache.get(key);

    if (cached.type === `doesNotExist`) {
      const uncached = await this.keyValueStore.insert(key, value);

      if (uncached.type === `successful`) {
        await this.keyValueCache.upsert(key, value, uncached.version);
        return uncached;
      } else {
        return alreadyExists;
      }
    } else {
      return alreadyExists;
    }
  }

  async update(
    key: string,
    value: TValue,
    expectedVersion: TVersion
  ): Promise<KeyValueStoreUpdateResult<TVersion>> {
    const cached = await this.keyValueCache.get(key);

    if (cached.type === `successful` && cached.version !== expectedVersion) {
      return doesNotExistOrVersionDoesNotMatch;
    } else {
      const uncached = await this.keyValueStore.update(
        key,
        value,
        expectedVersion
      );

      if (uncached.type === `successful`) {
        await this.keyValueCache.upsert(key, value, uncached.version);
        return uncached;
      } else {
        if (cached.type === `successful`) {
          await this.keyValueCache.delete(key, expectedVersion);
        }
        return uncached;
      }
    }
  }
}
