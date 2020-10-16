/* istanbul ignore file */

// This file contains code only executed by tests in other packages.
// As a consequence, coverage checks don't make any sense here.

import { KeyValueCache, KeyValueCacheGetResult } from "../key-value-cache";

export type TestValue = { value: number };
export type TestVersion = `Test Version A` | `Test Version B`;

type Result = KeyValueCacheGetResult<TestValue, TestVersion>;

type Event =
  | {
      readonly type: `getSuccessfully`;
      readonly key: string;
      readonly value: TestValue;
      readonly version: TestVersion;
    }
  | { readonly type: `getNonexistent`; readonly key: string }
  | {
      readonly type: `upsert`;
      readonly key: string;
      readonly value: TestValue;
      readonly version: TestVersion;
    }
  | {
      readonly type: `delete`;
      readonly key: string;
      readonly version: TestVersion;
    }
  | {
      readonly type: `reload`;
    };

export function testKeyValueCache<TPreparedScenario>(
  description: string,
  prepareScenario: () => Promise<TPreparedScenario>,
  createInstance: (
    preparedScenario: TPreparedScenario
  ) => Promise<KeyValueCache<TestValue, TestVersion>>,
  cleanUpScenario: (preparedScenatio: TPreparedScenario) => Promise<void>,
  volatile: boolean
): void {
  describe(description, () => {
    function scenario(events: ReadonlyArray<Event>): void {
      const description = events
        .map((event) => {
          switch (event.type) {
            case `getSuccessfully`:
              return `get successful ${JSON.stringify(
                event.key
              )} ${JSON.stringify(event.version)}`;

            case `getNonexistent`:
              return `get nonExistent ${JSON.stringify(event.key)}`;

            case `upsert`:
              return `upsert ${JSON.stringify(event.key)} ${JSON.stringify(
                event.version
              )}`;

            case `delete`:
              return `delete ${JSON.stringify(event.key)} ${JSON.stringify(
                event.version
              )}`;

            case `reload`:
              return `reload`;
          }
        })
        .join(` `);

      describe(description, () => {
        let preparedScenario: TPreparedScenario;
        let instance: KeyValueCache<TestValue, TestVersion>;

        beforeAll(async () => {
          preparedScenario = await prepareScenario();

          instance = await createInstance(preparedScenario);
        }, 30000);

        afterAll(async () => {
          await cleanUpScenario(preparedScenario);
        });

        it(`does not fail`, async () => {
          const previousRequests: (readonly [TestValue, TestValue])[] = [];
          const previousResults: (readonly [Result, Result])[] = [];

          for (const event of events) {
            switch (event.type) {
              case `getSuccessfully`: {
                const result = await instance.get(event.key);

                if (result.type === `successful`) {
                  expect(result.value).toEqual(event.value);
                  result.value.value = 60 + events.indexOf(event);

                  expect(result.version).toEqual(event.version);

                  previousResults.push([
                    result,
                    {
                      type: `successful`,
                      value: result.value,
                      version: result.version,
                    },
                  ]);
                } else {
                  fail(
                    `Expected get of ${JSON.stringify(
                      event.key
                    )} to return successful, but returned ${JSON.stringify(
                      result.type
                    )}`
                  );
                }

                break;
              }

              case `getNonexistent`: {
                const result = await instance.get(event.key);

                if (result.type === `doesNotExist`) {
                  previousResults.push([result, { type: `doesNotExist` }]);
                } else {
                  fail(
                    `Expected get of ${JSON.stringify(
                      event.key
                    )} to return doesNotExist, but returned ${JSON.stringify(
                      result.type
                    )}`
                  );
                }

                break;
              }

              case `upsert`: {
                const value = { value: event.value.value };
                await instance.upsert(event.key, value, event.version);
                value.value = 50 + events.indexOf(event);

                previousRequests.push([value, { value: value.value }]);
                break;
              }

              case `delete`: {
                await instance.delete(event.key, event.version);
                break;
              }

              case `reload`: {
                instance = await createInstance(preparedScenario);
                break;
              }
            }
          }

          for (const request of previousRequests) {
            expect(request[0]).toEqual(
              request[1],
              `A request was mutated by further method calls.`
            );
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
      remainingValues: ReadonlyArray<TestValue>,
      valueA: null | {
        readonly value: TestValue;
        readonly version: TestVersion;
      },
      valueB: null | {
        readonly value: TestValue;
        readonly version: TestVersion;
      }
    ): void {
      scenario(events);

      if (events.length < 4) {
        if (!volatile) {
          recurse(
            [
              ...events,
              {
                type: `reload`,
              },
            ],
            remainingValues,
            valueA,
            valueB
          );
        }

        recurse(
          [
            ...events,
            {
              type: `upsert`,
              key: `Test Key A`,
              version: `Test Version B`,
              value: remainingValues[0],
            },
          ],
          remainingValues.slice(1),
          { version: `Test Version B`, value: remainingValues[0] },
          valueB
        );

        recurse(
          [
            ...events,
            {
              type: `upsert`,
              key: `Test Key A`,
              version: `Test Version A`,
              value: remainingValues[0],
            },
          ],
          remainingValues.slice(1),
          { version: `Test Version A`, value: remainingValues[0] },
          valueB
        );

        if (valueA === null) {
          recurse(
            [...events, { type: `getNonexistent`, key: `Test Key A` }],
            remainingValues,
            valueA,
            valueB
          );

          recurse(
            [
              ...events,
              {
                type: `delete`,
                key: `Test Key A`,
                version: `Test Version A`,
              },
            ],
            remainingValues,
            null,
            valueB
          );

          recurse(
            [
              ...events,
              {
                type: `delete`,
                key: `Test Key A`,
                version: `Test Version B`,
              },
            ],
            remainingValues,
            null,
            valueB
          );
        } else {
          recurse(
            [
              ...events,
              {
                type: `getSuccessfully`,
                key: `Test Key A`,
                value: valueA.value,
                version: valueA.version,
              },
            ],
            remainingValues,
            valueA,
            valueB
          );

          if (valueA.version === `Test Version A`) {
            recurse(
              [
                ...events,
                {
                  type: `delete`,
                  key: `Test Key A`,
                  version: `Test Version A`,
                },
              ],
              remainingValues,
              null,
              valueB
            );

            recurse(
              [
                ...events,
                {
                  type: `delete`,
                  key: `Test Key A`,
                  version: `Test Version B`,
                },
              ],
              remainingValues,
              valueA,
              valueB
            );
          } else {
            recurse(
              [
                ...events,
                {
                  type: `delete`,
                  key: `Test Key A`,
                  version: `Test Version A`,
                },
              ],
              remainingValues,
              valueA,
              valueB
            );

            recurse(
              [
                ...events,
                {
                  type: `delete`,
                  key: `Test Key A`,
                  version: `Test Version B`,
                },
              ],
              remainingValues,
              null,
              valueB
            );
          }
        }

        recurse(
          [
            ...events,
            {
              type: `upsert`,
              key: `Test Key B`,
              version: `Test Version B`,
              value: remainingValues[0],
            },
          ],
          remainingValues.slice(1),
          valueA,
          { version: `Test Version B`, value: remainingValues[0] }
        );

        recurse(
          [
            ...events,
            {
              type: `upsert`,
              key: `Test Key B`,
              version: `Test Version A`,
              value: remainingValues[0],
            },
          ],
          remainingValues.slice(1),
          valueA,
          { version: `Test Version A`, value: remainingValues[0] }
        );

        if (valueB === null) {
          recurse(
            [...events, { type: `getNonexistent`, key: `Test Key B` }],
            remainingValues,
            valueA,
            valueB
          );

          recurse(
            [
              ...events,
              {
                type: `delete`,
                key: `Test Key B`,
                version: `Test Version A`,
              },
            ],
            remainingValues,
            valueA,
            null
          );

          recurse(
            [
              ...events,
              {
                type: `delete`,
                key: `Test Key B`,
                version: `Test Version B`,
              },
            ],
            remainingValues,
            valueA,
            null
          );
        } else {
          recurse(
            [
              ...events,
              {
                type: `getSuccessfully`,
                key: `Test Key B`,
                value: valueB.value,
                version: valueB.version,
              },
            ],
            remainingValues,
            valueA,
            valueB
          );

          if (valueB.version === `Test Version A`) {
            recurse(
              [
                ...events,
                {
                  type: `delete`,
                  key: `Test Key B`,
                  version: `Test Version A`,
                },
              ],
              remainingValues,
              valueA,
              null
            );

            recurse(
              [
                ...events,
                {
                  type: `delete`,
                  key: `Test Key B`,
                  version: `Test Version B`,
                },
              ],
              remainingValues,
              valueA,
              valueB
            );
          } else {
            recurse(
              [
                ...events,
                {
                  type: `delete`,
                  key: `Test Key B`,
                  version: `Test Version A`,
                },
              ],
              remainingValues,
              valueA,
              valueB
            );

            recurse(
              [
                ...events,
                {
                  type: `delete`,
                  key: `Test Key B`,
                  version: `Test Version B`,
                },
              ],
              remainingValues,
              valueA,
              null
            );
          }
        }
      }
    }

    recurse(
      [],
      [{ value: 6 }, { value: 2 }, { value: 9 }, { value: 3 }, { value: 14 }],
      null,
      null
    );
  });
}
