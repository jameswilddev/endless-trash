import { testKeyValueCache } from "@endless-trash/key-value-cache";
import { MemoryKeyValueCache } from ".";

testKeyValueCache(
  `MemoryKeyValueCache`,
  async () => {
    // Nothing to prepare.
  },
  async () => {
    return new MemoryKeyValueCache({
      maximumValues: 5,
    });
  },
  async () => {
    // Nothing to clean up.
  },
  true
);
