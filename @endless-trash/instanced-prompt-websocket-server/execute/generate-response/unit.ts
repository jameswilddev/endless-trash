import { Prompt } from "@endless-trash/prompt";
import { WebsocketHostUnserializedOutput } from "@endless-trash/websocket-host-body-serializer";
import { generateResponse } from ".";
import { InstancedPromptApplication } from "../../instanced-prompt-application";

describe(`generateResponse`, () => {
  type TestState = `Test Previous State` | `Test Next State`;

  function scenario(
    description: string,
    previousStateSessionIds: ReadonlyArray<string>,
    nextStateSessionIds: ReadonlyArray<string>
  ): void {
    describe(description, () => {
      let instancedPromptApplicationStateKeyValueStoreGet: jasmine.Spy;
      let instancedPromptApplicationStateKeyValueStoreInsert: jasmine.Spy;
      let instancedPromptApplicationStateKeyValueStoreUpdate: jasmine.Spy;
      let renderPrompt: jasmine.Spy;
      let applyFormSubmissionCommand: jasmine.Spy;
      let performSideEffects: jasmine.Spy;
      let listSessionIds: jasmine.Spy;
      let invalidRequestEventHandler: jasmine.Spy;
      let nonexistentInstanceEventHandler: jasmine.Spy;
      let instancedPromptApplication: InstancedPromptApplication<
        TestState,
        never
      >;
      let output: WebsocketHostUnserializedOutput<Prompt>;

      beforeAll(async () => {
        instancedPromptApplicationStateKeyValueStoreGet = jasmine.createSpy(
          `instancedPromptApplicationStateKeyValueStoreGet`
        );

        instancedPromptApplicationStateKeyValueStoreInsert = jasmine.createSpy(
          `instancedPromptApplicationStateKeyValueStoreInsert`
        );

        instancedPromptApplicationStateKeyValueStoreUpdate = jasmine.createSpy(
          `instancedPromptApplicationStateKeyValueStoreUpdate`
        );

        renderPrompt = jasmine
          .createSpy(`renderPrompt`)
          .and.callFake((state: TestState, sessionId: string) => {
            switch (state) {
              case `Test Previous State`:
                switch (sessionId) {
                  case `Test Previous State Only Unchanged Session Id`:
                    return {
                      formGroups: [
                        {
                          name: `Test Previous State Only Unchanged Session`,
                          forms: [],
                        },
                      ],
                    };

                  case `Test Previous State Only Changed Session Id`:
                    return {
                      formGroups: [
                        {
                          name: `Test Previous State Only Changed Session Previous State`,
                          forms: [],
                        },
                      ],
                    };

                  case `Test Next State Only Unchanged Session Id`:
                    return {
                      formGroups: [
                        {
                          name: `Test Next State Only Unchanged Session`,
                          forms: [],
                        },
                      ],
                    };

                  case `Test Next State Only Changed Session Id`:
                    return {
                      formGroups: [
                        {
                          name: `Test Next State Only Changed Session Previous State`,
                          forms: [],
                        },
                      ],
                    };

                  case `Test Previous And Next State Unchanged Session Id`:
                    return {
                      formGroups: [
                        {
                          name: `Test Previous And Next State Unchanged Session`,
                          forms: [],
                        },
                      ],
                    };

                  case `Test Previous And Next State Changed Session Id`:
                    return {
                      formGroups: [
                        {
                          name: `Test Previous And Next State Changed Session Previous State`,
                          forms: [],
                        },
                      ],
                    };

                  default:
                    throw new Error(`Unexpected session ID "${sessionId}".`);
                }

              case `Test Next State`:
                switch (sessionId) {
                  case `Test Session Id`:
                    return {
                      formGroups: [
                        { name: `Test Session Next State`, forms: [] },
                      ],
                    };

                  case `Test Previous State Only Unchanged Session Id`:
                    return {
                      formGroups: [
                        {
                          name: `Test Previous State Only Unchanged Session`,
                          forms: [],
                        },
                      ],
                    };

                  case `Test Previous State Only Changed Session Id`:
                    return {
                      formGroups: [
                        {
                          name: `Test Previous State Only Changed Session Next State`,
                          forms: [],
                        },
                      ],
                    };

                  case `Test Next State Only Unchanged Session Id`:
                    return {
                      formGroups: [
                        {
                          name: `Test Next State Only Unchanged Session`,
                          forms: [],
                        },
                      ],
                    };

                  case `Test Next State Only Changed Session Id`:
                    return {
                      formGroups: [
                        {
                          name: `Test Next State Only Changed Session Next State`,
                          forms: [],
                        },
                      ],
                    };

                  case `Test Previous And Next State Unchanged Session Id`:
                    return {
                      formGroups: [
                        {
                          name: `Test Previous And Next State Unchanged Session`,
                          forms: [],
                        },
                      ],
                    };

                  case `Test Previous And Next State Changed Session Id`:
                    return {
                      formGroups: [
                        {
                          name: `Test Previous And Next State Changed Session Next State`,
                          forms: [],
                        },
                      ],
                    };

                  default:
                    throw new Error(`Unexpected session ID "${sessionId}".`);
                }

              default:
                throw new Error(`Unexpected state "${state}".`);
            }
          });

        applyFormSubmissionCommand = jasmine.createSpy(
          `applyFormSubmissionCommand`
        );

        performSideEffects = jasmine.createSpy(`performSideEffects`);

        listSessionIds = jasmine
          .createSpy(`listSessionIds`)
          .and.callFake((state: TestState) => {
            switch (state) {
              case `Test Previous State`:
                return previousStateSessionIds;

              case `Test Next State`:
                return nextStateSessionIds;

              default:
                throw new Error(`Unexpected state "${state}".`);
            }
          });

        invalidRequestEventHandler = jasmine.createSpy(
          `invalidRequestEventHandler`
        );

        nonexistentInstanceEventHandler = jasmine.createSpy(
          `nonexistentInstanceEventHandler`
        );

        instancedPromptApplication = {
          stateKeyValueStore: {
            get: instancedPromptApplicationStateKeyValueStoreGet,
            insert: instancedPromptApplicationStateKeyValueStoreInsert,
            update: instancedPromptApplicationStateKeyValueStoreUpdate,
          },

          renderPrompt,
          applyFormSubmissionCommand,
          performSideEffects,
          listSessionIds,
          invalidRequestEventHandler,
          nonexistentInstanceEventHandler,
        };

        output = await generateResponse(
          instancedPromptApplication,
          `Test Session Id`,
          `Test Previous State`,
          `Test Next State`
        );
      });

      it(`does not get from the state key value store`, () => {
        expect(
          instancedPromptApplicationStateKeyValueStoreGet
        ).not.toHaveBeenCalled();
      });

      it(`does not insert into the state key value store`, () => {
        expect(
          instancedPromptApplicationStateKeyValueStoreInsert
        ).not.toHaveBeenCalled();
      });

      it(`does not update the state key value store`, () => {
        expect(
          instancedPromptApplicationStateKeyValueStoreUpdate
        ).not.toHaveBeenCalled();
      });

      it(`does not apply any form submission commands`, () => {
        expect(applyFormSubmissionCommand).not.toHaveBeenCalled();
      });

      it(`does not perform any side effects`, () => {
        expect(performSideEffects).not.toHaveBeenCalled();
      });

      it(`handle any invalid requests`, () => {
        expect(invalidRequestEventHandler).not.toHaveBeenCalled();
      });

      it(`does not handle any nonexistent instances`, () => {
        expect(nonexistentInstanceEventHandler).not.toHaveBeenCalled();
      });

      it(`lists the sessions of the previous state`, () => {
        expect(listSessionIds).toHaveBeenCalledWith(`Test Previous State`);
      });

      it(`lists the sessions of the next state`, () => {
        expect(listSessionIds).toHaveBeenCalledWith(`Test Next State`);
      });

      it(`does not list any further sessions`, () => {
        expect(listSessionIds).toHaveBeenCalledTimes(2);
      });

      it(`lists sessions with the appropriate "this"`, () => {
        for (const call of listSessionIds.calls.all()) {
          expect(call.object).toBe(instancedPromptApplication);
        }
      });

      it(`renders a prompt for the next state for the current session`, () => {
        expect(renderPrompt).toHaveBeenCalledWith(
          `Test Next State`,
          `Test Session Id`
        );
      });

      it(`renders a prompt for the previous state for sessions which exist only in the previous state`, () => {
        expect(renderPrompt).toHaveBeenCalledWith(
          `Test Previous State`,
          `Test Previous State Only Unchanged Session Id`
        );

        expect(renderPrompt).toHaveBeenCalledWith(
          `Test Previous State`,
          `Test Previous State Only Changed Session Id`
        );
      });

      it(`renders a prompt for the next state for sessions which exist only in the previous state`, () => {
        expect(renderPrompt).toHaveBeenCalledWith(
          `Test Next State`,
          `Test Previous State Only Unchanged Session Id`
        );

        expect(renderPrompt).toHaveBeenCalledWith(
          `Test Next State`,
          `Test Previous State Only Changed Session Id`
        );
      });

      it(`renders a prompt for the previous state for sessions which exist only in the next state`, () => {
        expect(renderPrompt).toHaveBeenCalledWith(
          `Test Previous State`,
          `Test Next State Only Unchanged Session Id`
        );

        expect(renderPrompt).toHaveBeenCalledWith(
          `Test Previous State`,
          `Test Next State Only Changed Session Id`
        );
      });

      it(`renders a prompt for the next state for sessions which exist only in the next state`, () => {
        expect(renderPrompt).toHaveBeenCalledWith(
          `Test Next State`,
          `Test Next State Only Unchanged Session Id`
        );

        expect(renderPrompt).toHaveBeenCalledWith(
          `Test Next State`,
          `Test Next State Only Changed Session Id`
        );
      });

      it(`renders a prompt for the previous state for sessions which exist in both the previous and next states`, () => {
        expect(renderPrompt).toHaveBeenCalledWith(
          `Test Previous State`,
          `Test Previous And Next State Unchanged Session Id`
        );

        expect(renderPrompt).toHaveBeenCalledWith(
          `Test Previous State`,
          `Test Previous And Next State Changed Session Id`
        );
      });

      it(`renders a prompt for the next state for sessions which exist in both the previous and next states`, () => {
        expect(renderPrompt).toHaveBeenCalledWith(
          `Test Next State`,
          `Test Previous And Next State Unchanged Session Id`
        );

        expect(renderPrompt).toHaveBeenCalledWith(
          `Test Next State`,
          `Test Previous And Next State Changed Session Id`
        );
      });

      it(`does not render any further prompts`, () => {
        expect(renderPrompt).toHaveBeenCalledTimes(13);
      });

      it(`renders prompts with the appropriate "this"`, () => {
        for (const call of renderPrompt.calls.all()) {
          expect(call.object).toBe(instancedPromptApplication);
        }
      });

      it(`returns the expected list of messages`, () => {
        expect(output).toEqual({
          messages: [
            {
              body: {
                formGroups: [{ name: `Test Session Next State`, forms: [] }],
              },
              sessionId: `Test Session Id`,
            },
            {
              body: {
                formGroups: [
                  {
                    name: `Test Previous State Only Changed Session Next State`,
                    forms: [],
                  },
                ],
              },
              sessionId: `Test Previous State Only Changed Session Id`,
            },
            {
              body: {
                formGroups: [
                  {
                    name: `Test Previous And Next State Changed Session Next State`,
                    forms: [],
                  },
                ],
              },
              sessionId: `Test Previous And Next State Changed Session Id`,
            },
            {
              body: {
                formGroups: [
                  {
                    name: `Test Next State Only Changed Session Next State`,
                    forms: [],
                  },
                ],
              },
              sessionId: `Test Next State Only Changed Session Id`,
            },
          ],
        });
      });
    });
  }

  scenario(
    `when the session is not listed in the previous or next state`,
    [
      `Test Previous State Only Unchanged Session Id`,
      `Test Previous State Only Changed Session Id`,
      `Test Previous And Next State Unchanged Session Id`,
      `Test Previous And Next State Changed Session Id`,
    ],
    [
      `Test Next State Only Unchanged Session Id`,
      `Test Next State Only Changed Session Id`,
      `Test Previous And Next State Unchanged Session Id`,
      `Test Previous And Next State Changed Session Id`,
    ]
  );

  scenario(
    `when the session is only listed in the previous state`,
    [
      `Test Previous State Only Unchanged Session Id`,
      `Test Previous State Only Changed Session Id`,
      `Test Session Id`,
      `Test Previous And Next State Unchanged Session Id`,
      `Test Previous And Next State Changed Session Id`,
    ],
    [
      `Test Next State Only Unchanged Session Id`,
      `Test Next State Only Changed Session Id`,
      `Test Previous And Next State Unchanged Session Id`,
      `Test Previous And Next State Changed Session Id`,
    ]
  );

  scenario(
    `when the session is only listed in the next state`,
    [
      `Test Previous State Only Unchanged Session Id`,
      `Test Previous State Only Changed Session Id`,
      `Test Previous And Next State Unchanged Session Id`,
      `Test Previous And Next State Changed Session Id`,
    ],
    [
      `Test Next State Only Unchanged Session Id`,
      `Test Next State Only Changed Session Id`,
      `Test Session Id`,
      `Test Previous And Next State Unchanged Session Id`,
      `Test Previous And Next State Changed Session Id`,
    ]
  );

  scenario(
    `when the session is listed in both the previous and next states`,
    [
      `Test Previous State Only Unchanged Session Id`,
      `Test Previous State Only Changed Session Id`,
      `Test Previous And Next State Unchanged Session Id`,
      `Test Session Id`,
      `Test Previous And Next State Changed Session Id`,
    ],
    [
      `Test Next State Only Unchanged Session Id`,
      `Test Session Id`,
      `Test Next State Only Changed Session Id`,
      `Test Previous And Next State Unchanged Session Id`,
      `Test Previous And Next State Changed Session Id`,
    ]
  );
});
