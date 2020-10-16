import { MemoryKeyValueCache } from "..";

describe(`MemoryKeyValueCache`, () => {
  describe(`when the cache overflows`, () => {
    let memoryKeyValueCache: MemoryKeyValueCache<string, number>;

    beforeAll(async () => {
      memoryKeyValueCache = new MemoryKeyValueCache({
        maximumValues: 5,
      });

      await memoryKeyValueCache.upsert(
        `Test Evicted Key A`,
        `Test Evicted Value A`,
        8
      );

      await memoryKeyValueCache.upsert(
        `Test Re-Upserted Key B`,
        `Test Un-re-upserted Value B`,
        14
      );

      await memoryKeyValueCache.upsert(
        `Test Evicted Key C`,
        `Test Evicted Value C`,
        27
      );

      await memoryKeyValueCache.upsert(
        `Test Got Key D`,
        `Test Got Value D`,
        14
      );

      await memoryKeyValueCache.upsert(
        `Test Evicted Key E`,
        `Test Evicted Value E`,
        33
      );

      await memoryKeyValueCache.upsert(
        `Test Recent Key F`,
        `Test Recent Value F`,
        73
      );

      await memoryKeyValueCache.upsert(
        `Test Re-Upserted Key B`,
        `Test Re-upserted Value B`,
        45
      );

      await memoryKeyValueCache.upsert(
        `Test Recent Key G`,
        `Test Recent Value G`,
        91
      );

      await memoryKeyValueCache.get(`Test Got Key D`);

      await memoryKeyValueCache.upsert(
        `Test Recent Key H`,
        `Test Recent Value H`,
        55
      );

      // todo would this be evicted
    });

    it(`does not evict the most recently upserted records`, async () => {
      await expectAsync(
        memoryKeyValueCache.get(`Test Recent Key F`)
      ).toBeResolvedTo({
        type: `successful`,
        value: `Test Recent Value F`,
        version: 73,
      });

      await expectAsync(
        memoryKeyValueCache.get(`Test Recent Key G`)
      ).toBeResolvedTo({
        type: `successful`,
        value: `Test Recent Value G`,
        version: 91,
      });

      await expectAsync(
        memoryKeyValueCache.get(`Test Recent Key H`)
      ).toBeResolvedTo({
        type: `successful`,
        value: `Test Recent Value H`,
        version: 55,
      });
    });

    it(`does not evict the most recently re-upserted records`, async () => {
      await expectAsync(
        memoryKeyValueCache.get(`Test Re-Upserted Key B`)
      ).toBeResolvedTo({
        type: `successful`,
        value: `Test Re-upserted Value B`,
        version: 45,
      });
    });

    it(`does not evict the most recently got records`, async () => {
      await expectAsync(
        memoryKeyValueCache.get(`Test Got Key D`)
      ).toBeResolvedTo({
        type: `successful`,
        value: `Test Got Value D`,
        version: 14,
      });
    });

    it(`evicts records which have not been recently upserted or got`, async () => {
      await expectAsync(
        memoryKeyValueCache.get(`Test Evicted Key A`)
      ).toBeResolvedTo({
        type: `doesNotExist`,
      });

      await expectAsync(
        memoryKeyValueCache.get(`Test Evicted Key C`)
      ).toBeResolvedTo({
        type: `doesNotExist`,
      });

      await expectAsync(
        memoryKeyValueCache.get(`Test Evicted Key E`)
      ).toBeResolvedTo({
        type: `doesNotExist`,
      });
    });
  });
});
