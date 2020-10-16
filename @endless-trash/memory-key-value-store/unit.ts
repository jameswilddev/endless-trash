import { testKeyValueStore } from "@endless-trash/key-value-store";
import { MemoryKeyValueStore } from ".";

testKeyValueStore(
  `MemoryKeyValueStore`,
  async () => {
    // Nothing to prepare.
  },
  null,
  async () => {
    return new MemoryKeyValueStore();
  },
  async () => {
    // Nothing to clean up.
  },
  (version) => version
);
