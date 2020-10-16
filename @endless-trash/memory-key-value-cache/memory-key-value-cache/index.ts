import { Json } from "@endless-trash/immutable-json-type";
import {
  KeyValueCache,
  KeyValueCacheGetResult,
  KeyValueCacheDoesNotExistGetResult,
} from "@endless-trash/key-value-cache";
import { MemoryKeyValueCacheConfiguration } from "../memory-key-value-cache-configuration";

type Item<TVersion> = {
  key: string;
  valueJson: string;
  version: TVersion;
};

const doesNotExist: KeyValueCacheDoesNotExistGetResult = {
  type: `doesNotExist`,
};

export class MemoryKeyValueCache<TValue extends Json, TVersion>
  implements KeyValueCache<TValue, TVersion> {
  constructor(
    private readonly memoryKeyValueCacheConfiguration: MemoryKeyValueCacheConfiguration
  ) {}

  private readonly data: Item<TVersion>[] = [];

  async get(key: string): Promise<KeyValueCacheGetResult<TValue, TVersion>> {
    const indexOfCached = this.data.findIndex((item) => item.key === key);

    switch (indexOfCached) {
      case -1: {
        return doesNotExist;
      }

      case 0: {
        break;
      }

      default: {
        this.data.unshift(this.data.splice(indexOfCached, 1)[0]);
        break;
      }
    }

    const cached = this.data[0];

    return {
      type: `successful`,
      value: JSON.parse(cached.valueJson),
      version: cached.version,
    };
  }

  async upsert(key: string, value: TValue, version: TVersion): Promise<void> {
    const indexOfCached = this.data.findIndex((item) => item.key === key);

    switch (indexOfCached) {
      case -1: {
        if (
          this.data.length ===
          this.memoryKeyValueCacheConfiguration.maximumValues
        ) {
          const evicted = this.data.pop() as Item<TVersion>;
          evicted.key = key;
          evicted.valueJson = JSON.stringify(value);
          evicted.version = version;
          this.data.unshift(evicted);
        } else {
          this.data.unshift({
            key,
            valueJson: JSON.stringify(value),
            version,
          });
        }

        return;
      }

      case 0: {
        break;
      }

      default: {
        this.data.unshift(this.data.splice(indexOfCached, 1)[0]);
        break;
      }
    }

    const cached = this.data[0];
    cached.valueJson = JSON.stringify(value);
    cached.version = version;
  }

  async delete(key: string, version: TVersion): Promise<void> {
    const indexOfCached = this.data.findIndex((item) => item.key === key);

    if (indexOfCached !== -1 && this.data[indexOfCached].version === version) {
      this.data.splice(indexOfCached, 1);
    }
  }
}
