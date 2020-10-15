import { testFileStore } from "@endless-trash/file-store";
import { MemoryFileStore } from ".";

testFileStore(
  `MemoryFileStore`,
  async () => {
    // Nothing to prepare.
  },
  async () => {
    return new MemoryFileStore();
  },
  async () => {
    // Nothing to clean up.
  },
  true
);
