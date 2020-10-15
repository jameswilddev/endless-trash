/* istanbul ignore file */

// This file contains code only executed by tests in other packages.
// As a consequence, coverage checks don't make any sense here.

import got from "got";
import dataUriToBuffer = require("data-uri-to-buffer");
import { FileStoreGetUrlResult, FileStore } from "../file-store";

type Event =
  | {
      readonly type: `delete`;
      readonly path: string;
    }
  | {
      readonly type: `getUrlSuccessful`;
      readonly path: string;
      readonly expectedResult: ReadonlyArray<number>;
    }
  | {
      readonly type: `getUrlDoesNotExist`;
      readonly path: string;
    }
  | {
      readonly type: `listPaths`;
      readonly prefix: string;
      readonly expectedResults: ReadonlyArray<string>;
    }
  | {
      readonly type: `save`;
      readonly path: string;
      readonly content: ReadonlyArray<number>;
    }
  | {
      readonly type: `reload`;
    };

type Result = Buffer | FileStoreGetUrlResult | ReadonlyArray<string>;

export function testFileStore<TPreparedScenario>(
  description: string,
  prepareScenario: () => Promise<TPreparedScenario>,
  createInstance: (preparedScenario: TPreparedScenario) => Promise<FileStore>,
  cleanUpScenario: (preparedScenatio: TPreparedScenario) => Promise<void>,
  volatile: boolean
): void {
  describe(description, () => {
    function scenario(
      events: ReadonlyArray<Event>,
      indicesOfValidUrls: ReadonlyArray<number>
    ): void {
      const description = events
        .map((event) => {
          switch (event.type) {
            case `delete`:
              return `delete ${JSON.stringify(event.path)}`;

            case `getUrlSuccessful`:
              return `get url successfully ${JSON.stringify(event.path)}`;

            case `getUrlDoesNotExist`:
              return `get url does not exist ${JSON.stringify(event.path)}`;

            case `listPaths`:
              return `list paths ${JSON.stringify(event.prefix)}`;

            case `save`:
              return `save ${JSON.stringify(event.path)}`;

            case `reload`:
              return `reload`;
          }
        })
        .join(` `);

      describe(description, () => {
        let preparedScenario: TPreparedScenario;
        let instance: FileStore;

        beforeAll(async () => {
          preparedScenario = await prepareScenario();

          instance = await createInstance(preparedScenario);
        }, 30000);

        afterAll(async () => {
          await cleanUpScenario(preparedScenario);
        });

        it(`does not fail`, async () => {
          const previousResults: (readonly [Result, Result])[] = [];
          const urls: (readonly [string, ReadonlyArray<number>])[] = [];

          for (const event of events) {
            switch (event.type) {
              case `delete`: {
                await instance.delete(event.path);
                break;
              }

              case `getUrlSuccessful`: {
                const result = await instance.getUrl(event.path);

                if (result.type === `successful`) {
                  previousResults.push([
                    result,
                    { type: `successful`, url: result.url },
                  ]);

                  urls.push([result.url, event.expectedResult]);
                } else {
                  fail(
                    `Get url of path ${JSON.stringify(
                      event.path
                    )} returned ${JSON.stringify(
                      result.type
                    )}; expected successful`
                  );
                }
                break;
              }

              case `getUrlDoesNotExist`: {
                const result = await instance.getUrl(event.path);
                previousResults.push([result, { type: `doesNotExist` }]);
                expect(result.type).toEqual(`doesNotExist`);
                break;
              }

              case `listPaths`: {
                const result = await instance.listPaths(event.prefix);
                previousResults.push([result, [...result]]);
                expect(result).toEqual(event.expectedResults);
                break;
              }

              case `save`: {
                await instance.save(
                  event.path,
                  Buffer.from(Uint8Array.from(event.content))
                );
                break;
              }

              case `reload`: {
                instance = await createInstance(preparedScenario);
                break;
              }
            }
          }

          for (const indexOfValidUrl of indicesOfValidUrls) {
            const validUrl = urls[indexOfValidUrl];

            let actual: Buffer;

            try {
              actual = Buffer.from(dataUriToBuffer(validUrl[0]));
            } catch (e) {
              actual = (
                await got(validUrl[0], {
                  responseType: `buffer`,
                })
              ).body;
            }

            expect(actual).toEqual(Buffer.from(Uint8Array.from(validUrl[1])));
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
      valueAA: null | ReadonlyArray<number>,
      valueAAIndices: ReadonlyArray<number>,
      valueAB: null | ReadonlyArray<number>,
      valueABIndices: ReadonlyArray<number>,
      valueBA: null | ReadonlyArray<number>,
      valueBAIndices: ReadonlyArray<number>,
      contents: ReadonlyArray<ReadonlyArray<number>>
    ): void {
      scenario(events, [
        ...valueAAIndices,
        ...valueABIndices,
        ...valueBAIndices,
      ]);

      if (events.length < 3) {
        if (!volatile) {
          recurse(
            [...events, { type: `reload` }],
            valueAA,
            valueAAIndices,
            valueAB,
            valueABIndices,
            valueBA,
            valueBAIndices,
            contents
          );
        }

        recurse(
          [...events, { type: `delete`, path: `Test Prefix A Path A` }],
          null,
          [],
          valueAB,
          valueABIndices,
          valueBA,
          valueBAIndices,
          contents
        );

        recurse(
          [...events, { type: `delete`, path: `Test Prefix A Path B` }],
          valueAA,
          valueAAIndices,
          null,
          [],
          valueBA,
          valueBAIndices,
          contents
        );

        recurse(
          [...events, { type: `delete`, path: `Test Prefix B Path A` }],
          valueAA,
          valueAAIndices,
          valueAB,
          valueABIndices,
          null,
          [],
          contents
        );

        if (valueAA === null) {
          recurse(
            [
              ...events,
              { type: `getUrlDoesNotExist`, path: `Test Prefix A Path A` },
            ],
            valueAA,
            valueAAIndices,
            valueAB,
            valueABIndices,
            valueBA,
            valueBAIndices,
            contents
          );
        } else {
          recurse(
            [
              ...events,
              {
                type: `getUrlSuccessful`,
                path: `Test Prefix A Path A`,
                expectedResult: valueAA,
              },
            ],
            valueAA,
            [
              ...valueAAIndices,
              events.filter((event) => event.type === `getUrlSuccessful`)
                .length,
            ],
            valueAB,
            valueABIndices,
            valueBA,
            valueBAIndices,
            contents
          );
        }

        if (valueAB === null) {
          recurse(
            [
              ...events,
              { type: `getUrlDoesNotExist`, path: `Test Prefix A Path B` },
            ],
            valueAA,
            valueAAIndices,
            valueAB,
            valueABIndices,
            valueBA,
            valueBAIndices,
            contents
          );
        } else {
          recurse(
            [
              ...events,
              {
                type: `getUrlSuccessful`,
                path: `Test Prefix A Path B`,
                expectedResult: valueAB,
              },
            ],
            valueAA,
            valueAAIndices,
            valueAB,
            [
              ...valueABIndices,
              events.filter((event) => event.type === `getUrlSuccessful`)
                .length,
            ],
            valueBA,
            valueBAIndices,
            contents
          );
        }

        if (valueBA === null) {
          recurse(
            [
              ...events,
              { type: `getUrlDoesNotExist`, path: `Test Prefix B Path A` },
            ],
            valueAA,
            valueAAIndices,
            valueAB,
            valueABIndices,
            valueBA,
            valueBAIndices,
            contents
          );
        } else {
          recurse(
            [
              ...events,
              {
                type: `getUrlSuccessful`,
                path: `Test Prefix B Path A`,
                expectedResult: valueBA,
              },
            ],
            valueAA,
            valueAAIndices,
            valueAB,
            valueABIndices,
            valueBA,
            [
              ...valueBAIndices,
              events.filter((event) => event.type === `getUrlSuccessful`)
                .length,
            ],
            contents
          );
        }

        const withPrefixA: string[] = [];

        if (valueAA !== null) {
          withPrefixA.push(`Test Prefix A Path A`);
        }

        if (valueAB !== null) {
          withPrefixA.push(`Test Prefix A Path B`);
        }

        recurse(
          [
            ...events,
            {
              type: `listPaths`,
              prefix: `Test Prefix A`,
              expectedResults: withPrefixA,
            },
          ],
          valueAA,
          valueAAIndices,
          valueAB,
          valueABIndices,
          valueBA,
          valueBAIndices,
          contents
        );

        const withPrefixB = valueBA === null ? [] : [`Test Prefix B Path A`];

        recurse(
          [
            ...events,
            {
              type: `listPaths`,
              prefix: `Test Prefix B`,
              expectedResults: withPrefixB,
            },
          ],
          valueAA,
          valueAAIndices,
          valueAB,
          valueABIndices,
          valueBA,
          valueBAIndices,
          contents
        );

        recurse(
          [
            ...events,
            {
              type: `listPaths`,
              prefix: ``,
              expectedResults: [...withPrefixA, ...withPrefixB],
            },
          ],
          valueAA,
          valueAAIndices,
          valueAB,
          valueABIndices,
          valueBA,
          valueBAIndices,
          contents
        );

        recurse(
          [
            ...events,
            {
              type: `save`,
              path: `Test Prefix A Path A`,
              content: contents[0],
            },
          ],
          contents[0],
          [],
          valueAB,
          valueABIndices,
          valueBA,
          valueBAIndices,
          contents
        );

        recurse(
          [
            ...events,
            {
              type: `save`,
              path: `Test Prefix A Path B`,
              content: contents[0],
            },
          ],
          valueAA,
          valueAAIndices,
          contents[0],
          [],
          valueBA,
          valueBAIndices,
          contents
        );

        recurse(
          [
            ...events,
            {
              type: `save`,
              path: `Test Prefix B Path A`,
              content: contents[0],
            },
          ],
          valueAA,
          valueAAIndices,
          valueAB,
          valueABIndices,
          contents[0],
          [],
          contents
        );
      }
    }

    recurse(
      [],
      null,
      [],
      null,
      [],
      null,
      [],
      [
        [186, 130, 212, 222, 232, 204, 148, 236, 150, 194, 146],
        [151, 47, 35, 214, 19, 187, 91],
        [23, 251, 1, 10, 40, 117, 175],
        [41, 211, 79, 203],
        [82, 89, 28, 131, 202, 199, 220],
      ]
    );

    scenario(
      [
        { type: `save`, path: `Test Path`, content: [] },
        { type: `getUrlSuccessful`, path: `Test Path`, expectedResult: [] },
      ],
      []
    );
  });
}
