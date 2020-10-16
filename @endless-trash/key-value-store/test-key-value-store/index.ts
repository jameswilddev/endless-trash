/* istanbul ignore file */

// This file contains code only executed by tests in other packages.
// As a consequence, coverage checks don't make any sense here.

import {
  KeyValueStore,
  KeyValueStoreGetResult,
  KeyValueStoreInsertResult,
  KeyValueStoreUpdateResult,
} from "../key-value-store";

export type TestValue = { value: number };

const testValues: TestValue[] = [];

while (testValues.length < 5000) {
  testValues.push({ value: testValues.length });
}

let uniqueValue = testValues.length;

type Result<TVersion> =
  | KeyValueStoreGetResult<TestValue, TVersion>
  | KeyValueStoreInsertResult<TVersion>
  | KeyValueStoreUpdateResult<TVersion>;

type Event =
  | {
      readonly type: `getSuccessfully`;
      readonly key: string;
      readonly value: TestValue;
      readonly versionIndices: ReadonlyArray<number>;
    }
  | { readonly type: `getNonexistent`; readonly key: string }
  | {
      readonly type: `insertSuccessfully`;
      readonly key: string;
      readonly value: TestValue;
    }
  | {
      readonly type: `insertAlreadyExists`;
      readonly key: string;
      readonly value: TestValue;
    }
  | {
      readonly type: `updateNonexistent`;
      readonly key: string;
      readonly value: TestValue;
      readonly versionIndex: number;
    }
  | {
      readonly type: `updateWithMismatchingVersion`;
      readonly key: string;
      readonly value: TestValue;
      readonly versionIndex: number;
    }
  | {
      readonly type: `updateSuccessfully`;
      readonly key: string;
      readonly value: TestValue;
      readonly versionIndex: number;
    }
  | {
      readonly type: `reload`;
    };

export function testKeyValueStore<TPreparedScenario, TVersion>(
  description: string,
  prepareScenario: () => Promise<TPreparedScenario>,
  reload:
    | null
    | ((preparedScenario: TPreparedScenario) => Promise<TPreparedScenario>),
  createInstance: (
    preparedScenario: TPreparedScenario
  ) => Promise<KeyValueStore<TestValue, TVersion>>,
  cleanUpScenario: (preparedScenatio: TPreparedScenario) => Promise<void>,
  cloneVersion: (version: TVersion) => TVersion
): void {
  describe(description, () => {
    function scenario(events: ReadonlyArray<Event>): void {
      const description = events
        .map((event) => {
          switch (event.type) {
            case `getSuccessfully`:
              return `get successful ${JSON.stringify(event.key)}`;

            case `getNonexistent`:
              return `get nonExistent ${JSON.stringify(event.key)}`;

            case `insertSuccessfully`:
              return `insert successful ${JSON.stringify(event.key)}`;

            case `insertAlreadyExists`:
              return `insert already exists ${JSON.stringify(event.key)}`;

            case `updateNonexistent`:
              return `update nonexistent ${JSON.stringify(event.key)}`;

            case `updateWithMismatchingVersion`:
              return `update version mismatch ${JSON.stringify(event.key)}`;

            case `updateSuccessfully`:
              return `update successful ${JSON.stringify(event.key)}`;

            case `reload`:
              return `reload`;
          }
        })
        .join(` `);

      describe(description, () => {
        let preparedScenario: TPreparedScenario;
        let instance: KeyValueStore<TestValue, TVersion>;

        beforeAll(async () => {
          preparedScenario = await prepareScenario();

          instance = await createInstance(preparedScenario);
        }, 30000);

        afterAll(async () => {
          await cleanUpScenario(preparedScenario);
        });

        it(`does not fail`, async () => {
          const versions: TVersion[] = [];
          const previousResults: (readonly [
            Result<TVersion>,
            Result<TVersion>
          ])[] = [];

          for (const event of events) {
            switch (event.type) {
              case `getSuccessfully`:
                {
                  const result = await instance.get(event.key);

                  if (result.type === `successful`) {
                    expect(result.value).toEqual(event.value);

                    for (const versionIndex of event.versionIndices) {
                      expect(result.version).toEqual(versions[versionIndex]);
                    }

                    result.value.value = uniqueValue++;

                    previousResults.push([
                      result,
                      {
                        type: `successful`,
                        value: result.value,
                        version: cloneVersion(result.version),
                      },
                    ]);
                  } else {
                    fail(
                      `Get of ${JSON.stringify(
                        event.key
                      )} returned ${JSON.stringify(
                        result.type
                      )}; expected success`
                    );
                  }
                }
                break;

              case `getNonexistent`:
                {
                  const result = await instance.get(event.key);

                  if (result.type === `doesNotExist`) {
                    previousResults.push([result, { type: `doesNotExist` }]);
                  } else {
                    fail(
                      `Get of ${JSON.stringify(
                        event.key
                      )} returned ${JSON.stringify(
                        result.type
                      )}; expected to not exist`
                    );
                  }
                }
                break;

              case `insertSuccessfully`:
                {
                  const valueCopy: TestValue = { value: event.value.value };

                  const result = await instance.insert(event.key, valueCopy);

                  valueCopy.value = -event.value.value;

                  if (result.type === `successful`) {
                    versions.push(result.version);

                    previousResults.push([
                      result,
                      {
                        type: `successful`,
                        version: cloneVersion(result.version),
                      },
                    ]);
                  } else {
                    fail(
                      `Insert of ${JSON.stringify(
                        event.key
                      )} returned ${JSON.stringify(
                        result.type
                      )}; expected success`
                    );
                  }
                }
                break;

              case `insertAlreadyExists`:
                {
                  const result = await instance.insert(event.key, event.value);

                  if (result.type === `alreadyExists`) {
                    previousResults.push([result, { type: `alreadyExists` }]);
                  } else {
                    fail(
                      `Insert of ${JSON.stringify(
                        event.key
                      )} returned ${JSON.stringify(
                        result.type
                      )}; expected to already exist`
                    );
                  }
                }
                break;

              case `updateNonexistent`:
                {
                  const result = await instance.update(
                    event.key,
                    event.value,
                    versions[event.versionIndex]
                  );

                  if (result.type === `doesNotExistOrVersionDoesNotMatch`) {
                    previousResults.push([
                      result,
                      { type: `doesNotExistOrVersionDoesNotMatch` },
                    ]);
                  } else {
                    fail(
                      `Update of ${JSON.stringify(
                        event.key
                      )} returned ${JSON.stringify(
                        result.type
                      )}; expected to not exist`
                    );
                  }
                }
                break;

              case `updateWithMismatchingVersion`:
                {
                  const result = await instance.update(
                    event.key,
                    event.value,
                    versions[event.versionIndex]
                  );

                  if (result.type === `doesNotExistOrVersionDoesNotMatch`) {
                    previousResults.push([
                      result,
                      { type: `doesNotExistOrVersionDoesNotMatch` },
                    ]);
                  } else {
                    fail(
                      `Update of ${JSON.stringify(
                        event.key
                      )} returned ${JSON.stringify(
                        result.type
                      )}; expected version to mismastch`
                    );
                  }
                }
                break;

              case `updateSuccessfully`:
                {
                  const result = await instance.update(
                    event.key,
                    event.value,
                    versions[event.versionIndex]
                  );

                  if (result.type === `successful`) {
                    versions.push(result.version);

                    previousResults.push([
                      result,
                      {
                        type: `successful`,
                        version: cloneVersion(result.version),
                      },
                    ]);
                  } else {
                    fail(
                      `Update of ${JSON.stringify(
                        event.key
                      )} returned ${JSON.stringify(
                        result.type
                      )}; expected success`
                    );
                  }
                }
                break;

              case `reload`:
                {
                  if (reload !== null) {
                    preparedScenario = await reload(preparedScenario);
                  }
                  instance = await createInstance(preparedScenario);
                }
                break;
            }
          }

          for (const response of previousResults) {
            expect(response[0]).toEqual(
              response[1],
              `A result changed after further method calls.`
            );
          }
        }, 30000);
      });
    }

    function recurse(
      events: ReadonlyArray<Event>,
      generatedValues: number,
      aValue: null | TestValue,
      aFreshVersionIndices: ReadonlyArray<number>,
      aStaleVersionIndices: ReadonlyArray<number>,
      bValue: null | TestValue,
      bFreshVersionIndices: ReadonlyArray<number>,
      bStaleVersionIndices: ReadonlyArray<number>
    ): void {
      scenario(events);

      if (events.length < 4) {
        if (reload !== null) {
          recurse(
            [
              ...events,
              {
                type: `reload`,
              },
            ],
            generatedValues,
            aValue,
            aFreshVersionIndices,
            aStaleVersionIndices,
            bValue,
            bFreshVersionIndices,
            bStaleVersionIndices
          );
        }

        if (aValue === null) {
          recurse(
            [
              ...events,
              {
                type: `insertSuccessfully`,
                key: `Test Key A`,
                value: { value: generatedValues },
              },
            ],
            generatedValues + 1,
            { value: generatedValues },
            [
              aFreshVersionIndices.length +
                aStaleVersionIndices.length +
                bFreshVersionIndices.length +
                bStaleVersionIndices.length,
            ],
            aStaleVersionIndices,
            bValue,
            bFreshVersionIndices,
            bStaleVersionIndices
          );

          for (const versionIndex of [
            ...bFreshVersionIndices,
            ...bStaleVersionIndices,
          ]) {
            recurse(
              [
                ...events,
                {
                  type: `updateNonexistent`,
                  key: `Test Key A`,
                  value: { value: generatedValues },
                  versionIndex,
                },
              ],
              generatedValues + 1,
              aValue,
              aFreshVersionIndices,
              aStaleVersionIndices,
              bValue,
              bFreshVersionIndices,
              bStaleVersionIndices
            );
          }

          recurse(
            [
              ...events,
              {
                type: `getNonexistent`,
                key: `Test Key A`,
              },
            ],
            generatedValues,
            aValue,
            aFreshVersionIndices,
            aStaleVersionIndices,
            bValue,
            bFreshVersionIndices,
            bStaleVersionIndices
          );
        } else {
          recurse(
            [
              ...events,
              {
                type: `insertAlreadyExists`,
                key: `Test Key A`,
                value: { value: generatedValues },
              },
            ],
            generatedValues + 1,
            aValue,
            aFreshVersionIndices,
            aStaleVersionIndices,
            bValue,
            bFreshVersionIndices,
            bStaleVersionIndices
          );

          for (const versionIndex of aStaleVersionIndices) {
            recurse(
              [
                ...events,
                {
                  type: `updateWithMismatchingVersion`,
                  key: `Test Key A`,
                  value: { value: generatedValues },
                  versionIndex,
                },
              ],
              generatedValues + 1,
              aValue,
              aFreshVersionIndices,
              aStaleVersionIndices,
              bValue,
              bFreshVersionIndices,
              bStaleVersionIndices
            );
          }

          for (const versionIndex of aFreshVersionIndices) {
            recurse(
              [
                ...events,
                {
                  type: `updateSuccessfully`,
                  key: `Test Key A`,
                  value: { value: generatedValues },
                  versionIndex,
                },
              ],
              generatedValues + 1,
              { value: generatedValues },
              [
                aFreshVersionIndices.length +
                  aStaleVersionIndices.length +
                  bFreshVersionIndices.length +
                  bStaleVersionIndices.length,
              ],
              [...aStaleVersionIndices, ...aFreshVersionIndices],
              bValue,
              bFreshVersionIndices,
              bStaleVersionIndices
            );
          }

          recurse(
            [
              ...events,
              {
                type: `getSuccessfully`,
                key: `Test Key A`,
                value: aValue,
                versionIndices: aFreshVersionIndices,
              },
            ],
            generatedValues,
            aValue,
            aFreshVersionIndices,
            aStaleVersionIndices,
            bValue,
            bFreshVersionIndices,
            bStaleVersionIndices
          );
        }

        if (bValue === null) {
          recurse(
            [
              ...events,
              {
                type: `insertSuccessfully`,
                key: `Test Key B`,
                value: { value: generatedValues },
              },
            ],
            generatedValues + 1,
            aValue,
            aFreshVersionIndices,
            aStaleVersionIndices,
            { value: generatedValues },
            [
              aFreshVersionIndices.length +
                aStaleVersionIndices.length +
                bFreshVersionIndices.length +
                bStaleVersionIndices.length,
            ],
            bStaleVersionIndices
          );

          for (const versionIndex of [
            ...aFreshVersionIndices,
            ...aStaleVersionIndices,
          ]) {
            recurse(
              [
                ...events,
                {
                  type: `updateNonexistent`,
                  key: `Test Key B`,
                  value: { value: generatedValues },
                  versionIndex,
                },
              ],
              generatedValues + 1,
              aValue,
              aFreshVersionIndices,
              aStaleVersionIndices,
              bValue,
              bFreshVersionIndices,
              bStaleVersionIndices
            );
          }

          recurse(
            [
              ...events,
              {
                type: `getNonexistent`,
                key: `Test Key B`,
              },
            ],
            generatedValues,
            aValue,
            aFreshVersionIndices,
            aStaleVersionIndices,
            bValue,
            bFreshVersionIndices,
            bStaleVersionIndices
          );
        } else {
          recurse(
            [
              ...events,
              {
                type: `insertAlreadyExists`,
                key: `Test Key B`,
                value: { value: generatedValues },
              },
            ],
            generatedValues + 1,
            aValue,
            aFreshVersionIndices,
            aStaleVersionIndices,
            bValue,
            bFreshVersionIndices,
            bStaleVersionIndices
          );

          for (const versionIndex of bStaleVersionIndices) {
            recurse(
              [
                ...events,
                {
                  type: `updateWithMismatchingVersion`,
                  key: `Test Key B`,
                  value: { value: generatedValues },
                  versionIndex,
                },
              ],
              generatedValues + 1,
              aValue,
              aFreshVersionIndices,
              aStaleVersionIndices,
              bValue,
              bFreshVersionIndices,
              bStaleVersionIndices
            );
          }

          for (const versionIndex of bFreshVersionIndices) {
            recurse(
              [
                ...events,
                {
                  type: `updateSuccessfully`,
                  key: `Test Key B`,
                  value: { value: generatedValues },
                  versionIndex,
                },
              ],
              generatedValues + 1,
              aValue,
              aFreshVersionIndices,
              aStaleVersionIndices,
              { value: generatedValues },
              [
                aFreshVersionIndices.length +
                  aStaleVersionIndices.length +
                  bFreshVersionIndices.length +
                  bStaleVersionIndices.length,
              ],
              [...bStaleVersionIndices, ...bFreshVersionIndices]
            );
          }

          recurse(
            [
              ...events,
              {
                type: `getSuccessfully`,
                key: `Test Key B`,
                value: bValue,
                versionIndices: bFreshVersionIndices,
              },
            ],
            generatedValues,
            aValue,
            aFreshVersionIndices,
            aStaleVersionIndices,
            bValue,
            bFreshVersionIndices,
            bStaleVersionIndices
          );
        }
      }
    }

    recurse([], 0, null, [], [], null, [], []);
  });

  describe(`when many inserts on the same key occur within a single instance in parallel`, () => {
    let preparedScenario: TPreparedScenario;
    let instance: KeyValueStore<TestValue, TVersion>;
    let results: ReadonlyArray<KeyValueStoreInsertResult<TVersion>>;

    beforeAll(async () => {
      preparedScenario = await prepareScenario();
      instance = await createInstance(preparedScenario);

      const run = (value: TestValue) => instance.insert(`Test Key A`, value);

      results = await Promise.all(testValues.map(run));
    }, 300000);

    afterAll(async () => {
      await cleanUpScenario(preparedScenario);
    });

    it(`one succeeds`, () => {
      expect(
        results.filter((result) => result.type === `successful`).length
      ).toEqual(1);
    });

    it(`the rest fail as the record already exists`, () => {
      expect(
        results.filter((result) => result.type === `alreadyExists`).length
      ).toEqual(testValues.length - 1);
    });

    it(`get returns the value from the one which succeeded`, async () => {
      await expectAsync(instance.get(`Test Key A`)).toBeResolvedTo({
        type: `successful`,
        value: {
          value: results.findIndex((result) => result.type === `successful`),
        },
        version: jasmine.anything(),
      });
    });
  });

  if (reload !== null) {
    describe(`when many inserts on the same key occur within multiple instances in parallel`, () => {
      let preparedScenario: TPreparedScenario;
      let results: ReadonlyArray<KeyValueStoreInsertResult<TVersion>>;

      beforeAll(async () => {
        preparedScenario = await prepareScenario();

        const instances: (() => Promise<
          KeyValueStoreInsertResult<TVersion>
        >)[] = [];

        for (const value of testValues) {
          const instance = await createInstance(preparedScenario);

          instances.push(async () => {
            return await instance.insert(`Test Key A`, value);
          });
        }

        const run = async (
          callback: () => Promise<KeyValueStoreInsertResult<TVersion>>
        ) => {
          return await callback();
        };

        results = await Promise.all(instances.map(run));
      }, 300000);

      afterAll(async () => {
        await cleanUpScenario(preparedScenario);
      });

      it(`one succeeds`, () => {
        expect(
          results.filter((result) => result.type === `successful`).length
        ).toEqual(1);
      });

      it(`the rest fail as the record already exists`, () => {
        expect(
          results.filter((result) => result.type === `alreadyExists`).length
        ).toEqual(testValues.length - 1);
      });

      it(`get returns the value from the one which succeeded`, async () => {
        const instance = await createInstance(preparedScenario);
        await expectAsync(instance.get(`Test Key A`)).toBeResolvedTo({
          type: `successful`,
          value: {
            value: results.findIndex((result) => result.type === `successful`),
          },
          version: jasmine.anything(),
        });
      });
    });
  }

  describe(`when many updates on the same key occur within a single instance in parallel`, () => {
    let preparedScenario: TPreparedScenario;
    let instance: KeyValueStore<TestValue, TVersion>;
    let results: ReadonlyArray<KeyValueStoreUpdateResult<TVersion>>;

    beforeAll(async () => {
      preparedScenario = await prepareScenario();
      instance = await createInstance(preparedScenario);

      const insertResult = await instance.insert(`Test Key A`, {
        value: testValues.length,
      });

      if (insertResult.type === `successful`) {
        const run = async (value: TestValue) => {
          return await instance.update(
            `Test Key A`,
            value,
            insertResult.version
          );
        };

        results = await Promise.all(testValues.map(run));
      } else {
        fail(
          `Expected insert to be successful, but was ${JSON.stringify(
            insertResult.type
          )}.`
        );
      }
    }, 300000);

    afterAll(async () => {
      await cleanUpScenario(preparedScenario);
    });

    it(`one succeeds`, () => {
      expect(
        results.filter((result) => result.type === `successful`).length
      ).toEqual(1);
    });

    it(`the rest fail as the record has already been updated`, () => {
      expect(
        results.filter(
          (result) => result.type === `doesNotExistOrVersionDoesNotMatch`
        ).length
      ).toEqual(testValues.length - 1);
    });

    it(`get returns the value from the one which succeeded`, async () => {
      await expectAsync(instance.get(`Test Key A`)).toBeResolvedTo({
        type: `successful`,
        value: {
          value: results.findIndex((result) => result.type === `successful`),
        },
        version: jasmine.anything(),
      });
    });
  });

  if (reload !== null) {
    describe(`when many updates on the same key occur within multiple instances in parallel`, () => {
      let preparedScenario: TPreparedScenario;
      let instance: KeyValueStore<TestValue, TVersion>;
      let results: ReadonlyArray<KeyValueStoreUpdateResult<TVersion>>;

      beforeAll(async () => {
        preparedScenario = await prepareScenario();
        instance = await createInstance(preparedScenario);

        const insertResult = await instance.insert(`Test Key A`, {
          value: testValues.length,
        });

        if (insertResult.type === `successful`) {
          const instances: (() => Promise<
            KeyValueStoreUpdateResult<TVersion>
          >)[] = [];

          for (const value of testValues) {
            const instance = await createInstance(preparedScenario);

            instances.push(async () => {
              return await instance.update(
                `Test Key A`,
                value,
                insertResult.version
              );
            });
          }

          const run = async (
            callback: () => Promise<KeyValueStoreUpdateResult<TVersion>>
          ) => {
            return await callback();
          };

          results = await Promise.all(instances.map(run));
        } else {
          fail(
            `Expected insert to be successful, but was ${JSON.stringify(
              insertResult.type
            )}.`
          );
        }
      }, 300000);

      afterAll(async () => {
        await cleanUpScenario(preparedScenario);
      });

      it(`one succeeds`, () => {
        expect(
          results.filter((result) => result.type === `successful`).length
        ).toEqual(1);
      });

      it(`the rest fail as the record has already been updated`, () => {
        expect(
          results.filter(
            (result) => result.type === `doesNotExistOrVersionDoesNotMatch`
          ).length
        ).toEqual(testValues.length - 1);
      });

      it(`get returns the value from the one which succeeded`, async () => {
        await expectAsync(instance.get(`Test Key A`)).toBeResolvedTo({
          type: `successful`,
          value: {
            value: results.findIndex((result) => result.type === `successful`),
          },
          version: jasmine.anything(),
        });
      });
    });
  }

  describe(`when many gets occur within a single instance while an insert is running`, () => {
    let preparedScenario: TPreparedScenario;
    let instance: KeyValueStore<TestValue, TVersion>;
    let results: ReadonlyArray<KeyValueStoreGetResult<TestValue, TVersion>>;

    beforeAll(async () => {
      preparedScenario = await prepareScenario();
      instance = await createInstance(preparedScenario);

      const getA: Promise<KeyValueStoreGetResult<TestValue, TVersion>>[] = [];

      while (getA.length < 50) {
        getA.push(instance.get(`Test Key A`));
      }

      await instance.insert(`Test Key A`, { value: 0 });

      const getB: Promise<KeyValueStoreGetResult<TestValue, TVersion>>[] = [];

      while (getB.length < 50) {
        getB.push(instance.get(`Test Key A`));
      }

      results = await Promise.all([...getA, ...getB]);
    }, 300000);

    afterAll(async () => {
      await cleanUpScenario(preparedScenario);
    });

    it(`all succeed or fail as it did not exist`, () => {
      for (const result of results) {
        expect([`successful`, `doesNotExist`]).toContain(result.type);
      }
    });

    it(`all successful returned the inserted value`, () => {
      for (const result of results) {
        if (result.type === `successful`) {
          expect(result.value.value).toEqual(0);
        }
      }
    });

    it(`all successful returned the same version`, () => {
      const successfulVersions: TVersion[] = [];

      for (const result of results) {
        if (result.type === `successful`) {
          successfulVersions.push(result.version);
        }
      }

      if (successfulVersions.length > 0) {
        for (const version of successfulVersions) {
          expect(version).toEqual(successfulVersions[0]);
        }
      }
    });
  });

  if (reload !== null) {
    describe(`when many gets occur within multiple instances while an insert is running`, () => {
      let preparedScenario: TPreparedScenario;
      let instance: KeyValueStore<TestValue, TVersion>;
      let results: ReadonlyArray<KeyValueStoreGetResult<TestValue, TVersion>>;

      beforeAll(async () => {
        preparedScenario = await prepareScenario();
        instance = await createInstance(preparedScenario);

        const instancesA: KeyValueStore<TestValue, TVersion>[] = [];

        while (instancesA.length < 50) {
          instancesA.push(await createInstance(preparedScenario));
        }

        const instancesB: KeyValueStore<TestValue, TVersion>[] = [];

        while (instancesB.length < 50) {
          instancesB.push(await createInstance(preparedScenario));
        }

        const getA = instancesA.map((instance) => instance.get(`Test Key A`));

        await instance.insert(`Test Key A`, { value: 0 });

        const getB = instancesA.map((instance) => instance.get(`Test Key A`));

        results = await Promise.all([...getA, ...getB]);
      }, 300000);

      afterAll(async () => {
        await cleanUpScenario(preparedScenario);
      });

      it(`all succeed or fail as it did not exist`, () => {
        for (const result of results) {
          expect([`successful`, `doesNotExist`]).toContain(result.type);
        }
      });

      it(`all successful returned the inserted value`, () => {
        for (const result of results) {
          if (result.type === `successful`) {
            expect(result.value.value).toEqual(0);
          }
        }
      });

      it(`all successful returned the same version`, () => {
        const successfulVersions: TVersion[] = [];

        for (const result of results) {
          if (result.type === `successful`) {
            successfulVersions.push(result.version);
          }
        }

        if (successfulVersions.length > 0) {
          for (const version of successfulVersions) {
            expect(version).toEqual(successfulVersions[0]);
          }
        }
      });
    });
  }

  describe(`when many gets occur within a single instance while an update is running`, () => {
    let preparedScenario: TPreparedScenario;
    let instance: KeyValueStore<TestValue, TVersion>;
    let previousVersion: TVersion;
    let nextVersion: TVersion;
    let results: ReadonlyArray<KeyValueStoreGetResult<TestValue, TVersion>>;

    beforeAll(async () => {
      preparedScenario = await prepareScenario();
      instance = await createInstance(preparedScenario);

      const insertResult = await instance.insert(`Test Key A`, { value: 0 });

      if (insertResult.type === `successful`) {
        previousVersion = insertResult.version;

        const getA: Promise<KeyValueStoreGetResult<TestValue, TVersion>>[] = [];

        while (getA.length < 50) {
          getA.push(instance.get(`Test Key A`));
        }

        const updateResult = instance.update(
          `Test Key A`,
          { value: 1 },
          previousVersion
        );

        const getB: Promise<KeyValueStoreGetResult<TestValue, TVersion>>[] = [];

        while (getB.length < 50) {
          getB.push(instance.get(`Test Key A`));
        }

        results = await Promise.all([...getA, ...getB]);

        if ((await updateResult).type !== `successful`) {
          fail(
            `Expected update to be successful, but was ${JSON.stringify(
              insertResult.type
            )}.`
          );
        }

        const nextGetResult = await instance.get(`Test Key A`);

        if (nextGetResult.type === `successful`) {
          nextVersion = nextGetResult.version;
        } else {
          fail(
            `Expected next get to be successful, but was ${JSON.stringify(
              insertResult.type
            )}.`
          );
        }
      } else {
        fail(
          `Expected insert to be successful, but was ${JSON.stringify(
            insertResult.type
          )}.`
        );
      }
    }, 300000);

    afterAll(async () => {
      await cleanUpScenario(preparedScenario);
    });

    it(`all succeed`, () => {
      for (const result of results) {
        expect(result.type).toEqual(`successful`);
      }
    });

    it(`all returned either the previous or next value`, () => {
      for (const result of results) {
        if (result.type === `successful`) {
          expect([0, 1]).toContain(result.value.value);
        }
      }
    });

    it(`all returned the old version alongside the old value`, () => {
      for (const result of results) {
        if (result.type === `successful` && result.value.value === 0) {
          expect(result.version).toEqual(previousVersion);
        }
      }
    });

    it(`all returned the same version alongside the new value`, () => {
      for (const result of results) {
        if (result.type === `successful` && result.value.value === 1) {
          expect(result.version).toEqual(nextVersion);
        }
      }
    });
  });

  if (reload !== null) {
    describe(`when many gets occur within multiple instances while an update is running`, () => {
      let preparedScenario: TPreparedScenario;
      let instance: KeyValueStore<TestValue, TVersion>;
      let previousVersion: TVersion;
      let nextVersion: TVersion;
      let results: ReadonlyArray<KeyValueStoreGetResult<TestValue, TVersion>>;

      beforeAll(async () => {
        preparedScenario = await prepareScenario();
        instance = await createInstance(preparedScenario);

        const insertResult = await instance.insert(`Test Key A`, {
          value: 0,
        });

        if (insertResult.type === `successful`) {
          previousVersion = insertResult.version;

          const instancesA: KeyValueStore<TestValue, TVersion>[] = [];

          while (instancesA.length < 50) {
            instancesA.push(await createInstance(preparedScenario));
          }

          const instancesB: KeyValueStore<TestValue, TVersion>[] = [];

          while (instancesB.length < 50) {
            instancesB.push(await createInstance(preparedScenario));
          }

          const getA = instancesA.map((instance) => instance.get(`Test Key A`));

          const updateResult = instance.update(
            `Test Key A`,
            { value: 1 },
            previousVersion
          );

          const getB = instancesB.map((instance) => instance.get(`Test Key A`));

          results = await Promise.all([...getA, ...getB]);

          if ((await updateResult).type !== `successful`) {
            fail(
              `Expected update to be successful, but was ${JSON.stringify(
                insertResult.type
              )}.`
            );
          }

          const nextGetResult = await instance.get(`Test Key A`);

          if (nextGetResult.type === `successful`) {
            nextVersion = nextGetResult.version;
          } else {
            fail(
              `Expected next get to be successful, but was ${JSON.stringify(
                insertResult.type
              )}.`
            );
          }
        } else {
          fail(
            `Expected insert to be successful, but was ${JSON.stringify(
              insertResult.type
            )}.`
          );
        }
      }, 300000);

      afterAll(async () => {
        await cleanUpScenario(preparedScenario);
      });

      it(`all succeed`, () => {
        for (const result of results) {
          expect(result.type).toEqual(`successful`);
        }
      });

      it(`all returned either the previous or next value`, () => {
        for (const result of results) {
          if (result.type === `successful`) {
            expect([0, 1]).toContain(result.value.value);
          }
        }
      });

      it(`all returned the old version alongside the old value`, () => {
        for (const result of results) {
          if (result.type === `successful` && result.value.value === 0) {
            expect(result.version).toEqual(previousVersion);
          }
        }
      });

      it(`all returned the same version alongside the new value`, () => {
        for (const result of results) {
          if (result.type === `successful` && result.value.value === 1) {
            expect(result.version).toEqual(nextVersion);
          }
        }
      });
    });
  }
}
