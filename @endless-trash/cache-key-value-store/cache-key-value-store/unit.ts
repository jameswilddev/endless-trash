import { testKeyValueStore } from "@endless-trash/key-value-store";
import { MemoryKeyValueStore } from "@endless-trash/memory-key-value-store";
import { MemoryKeyValueCache } from "@endless-trash/memory-key-value-cache";
import { CacheKeyValueStore } from "..";

testKeyValueStore(
  `CacheKeyValueStore`,
  async () => {
    return {
      cache: new MemoryKeyValueCache<{ readonly value: number }, number>({
        maximumValues: 5,
      }),
      store: new MemoryKeyValueStore<{ readonly value: number }>(),
    };
  },
  async (preparedScenario) => {
    return {
      cache: new MemoryKeyValueCache<{ readonly value: number }, number>({
        maximumValues: 5,
      }),
      store: preparedScenario.store,
    };
  },
  async (preparedScenario) => {
    return new CacheKeyValueStore(
      preparedScenario.cache,
      preparedScenario.store
    );
  },
  async () => {
    // Nothing to clean up.
  },
  (version) => version
);
