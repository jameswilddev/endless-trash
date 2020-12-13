import { Prompt } from "@endless-trash/prompt";
import { WebsocketHostUnserializedOutput } from "@endless-trash/websocket-host-body-serializer";
import { generateResponse } from ".";
import { InstancedPromptApplication } from "../../instanced-prompt-application";
import { Session } from "../../session";

describe(`generateResponse`, () => {
  type TestState = `Test Previous State` | `Test Next State`;

  function scenario(
    description: string,
    previousStateSessionIds: ReadonlyArray<Session>,
    nextStateSessionIds: ReadonlyArray<Session>
  ): void {
    describe(description, () => {
      let instancedPromptApplicationStateKeyValueStoreGet: jasmine.Spy;
      let instancedPromptApplicationStateKeyValueStoreInsert: jasmine.Spy;
      let instancedPromptApplicationStateKeyValueStoreUpdate: jasmine.Spy;
      let instancedPromptApplicationRenderPrompt: jasmine.Spy;
      let instancedPromptApplicationApplyFormSubmissionCommand: jasmine.Spy;
      let instancedPromptApplicationPerformSideEffects: jasmine.Spy;
      let instancedPromptApplicationListSessions: jasmine.Spy;
      let instancedPromptApplicationInvalidRequestEventHandler: jasmine.Spy;
      let instancedPromptApplicationNonexistentInstanceEventHandler: jasmine.Spy;
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

        instancedPromptApplicationRenderPrompt = jasmine
          .createSpy(`instancedPromptApplicationRenderPrompt`)
          .and.callFake(
            (
              state: TestState,
              instanceId: string,
              userId: string,
              sessionId: string
            ) => {
              instanceId;
              userId;

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
            }
          );

        instancedPromptApplicationApplyFormSubmissionCommand = jasmine.createSpy(
          `instancedPromptApplicationApplyFormSubmissionCommand`
        );

        instancedPromptApplicationPerformSideEffects = jasmine.createSpy(
          `instancedPromptApplicationPerformSideEffects`
        );

        instancedPromptApplicationListSessions = jasmine
          .createSpy(`instancedPromptApplicationListSessions`)
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

        instancedPromptApplicationInvalidRequestEventHandler = jasmine.createSpy(
          `instancedPromptApplicationInvalidRequestEventHandler`
        );

        instancedPromptApplicationNonexistentInstanceEventHandler = jasmine.createSpy(
          `instancedPromptApplicationNonexistentInstanceEventHandler`
        );

        instancedPromptApplication = {
          stateKeyValueStore: {
            get: instancedPromptApplicationStateKeyValueStoreGet,
            insert: instancedPromptApplicationStateKeyValueStoreInsert,
            update: instancedPromptApplicationStateKeyValueStoreUpdate,
          },
          renderPrompt: instancedPromptApplicationRenderPrompt,
          applyFormSubmissionCommand: instancedPromptApplicationApplyFormSubmissionCommand,
          performSideEffects: instancedPromptApplicationPerformSideEffects,
          listSessions: instancedPromptApplicationListSessions,
          invalidRequestEventHandler: instancedPromptApplicationInvalidRequestEventHandler,
          nonexistentInstanceEventHandler: instancedPromptApplicationNonexistentInstanceEventHandler,
        };

        output = await generateResponse(
          instancedPromptApplication,
          `Test Instance Id`,
          `Test User Id`,
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
        expect(
          instancedPromptApplicationApplyFormSubmissionCommand
        ).not.toHaveBeenCalled();
      });

      it(`does not perform any side effects`, () => {
        expect(
          instancedPromptApplicationPerformSideEffects
        ).not.toHaveBeenCalled();
      });

      it(`does not handle any invalid requests`, () => {
        expect(
          instancedPromptApplicationInvalidRequestEventHandler
        ).not.toHaveBeenCalled();
      });

      it(`does not handle any nonexistent instances`, () => {
        expect(
          instancedPromptApplicationNonexistentInstanceEventHandler
        ).not.toHaveBeenCalled();
      });

      it(`lists the sessions of the previous state`, () => {
        expect(instancedPromptApplicationListSessions).toHaveBeenCalledWith(
          `Test Previous State`
        );
      });

      it(`lists the sessions of the next state`, () => {
        expect(instancedPromptApplicationListSessions).toHaveBeenCalledWith(
          `Test Next State`
        );
      });

      it(`does not list any further sessions`, () => {
        expect(instancedPromptApplicationListSessions).toHaveBeenCalledTimes(2);
      });

      it(`lists sessions with the appropriate "this"`, () => {
        for (const call of instancedPromptApplicationListSessions.calls.all()) {
          expect(call.object).toBe(instancedPromptApplication);
        }
      });

      it(`renders a prompt for the next state for the current session`, () => {
        expect(instancedPromptApplicationRenderPrompt).toHaveBeenCalledWith(
          `Test Next State`,
          `Test Instance Id`,
          `Test User Id`,
          `Test Session Id`
        );
      });

      it(`renders a prompt for the previous state for sessions which exist only in the previous state`, () => {
        expect(instancedPromptApplicationRenderPrompt).toHaveBeenCalledWith(
          `Test Previous State`,
          `Test Instance Id`,
          `Test Previous State Only Unchanged User Id`,
          `Test Previous State Only Unchanged Session Id`
        );

        expect(instancedPromptApplicationRenderPrompt).toHaveBeenCalledWith(
          `Test Previous State`,
          `Test Instance Id`,
          `Test Previous State Only Changed User Id`,
          `Test Previous State Only Changed Session Id`
        );
      });

      it(`renders a prompt for the next state for sessions which exist only in the previous state`, () => {
        expect(instancedPromptApplicationRenderPrompt).toHaveBeenCalledWith(
          `Test Next State`,
          `Test Instance Id`,
          `Test Previous State Only Unchanged User Id`,
          `Test Previous State Only Unchanged Session Id`
        );

        expect(instancedPromptApplicationRenderPrompt).toHaveBeenCalledWith(
          `Test Next State`,
          `Test Instance Id`,
          `Test Previous State Only Changed User Id`,
          `Test Previous State Only Changed Session Id`
        );
      });

      it(`renders a prompt for the previous state for sessions which exist only in the next state`, () => {
        expect(instancedPromptApplicationRenderPrompt).toHaveBeenCalledWith(
          `Test Previous State`,
          `Test Instance Id`,
          `Test Next State Only Unchanged User Id`,
          `Test Next State Only Unchanged Session Id`
        );

        expect(instancedPromptApplicationRenderPrompt).toHaveBeenCalledWith(
          `Test Previous State`,
          `Test Instance Id`,
          `Test Next State Only Changed User Id`,
          `Test Next State Only Changed Session Id`
        );
      });

      it(`renders a prompt for the next state for sessions which exist only in the next state`, () => {
        expect(instancedPromptApplicationRenderPrompt).toHaveBeenCalledWith(
          `Test Next State`,
          `Test Instance Id`,
          `Test Next State Only Unchanged User Id`,
          `Test Next State Only Unchanged Session Id`
        );

        expect(instancedPromptApplicationRenderPrompt).toHaveBeenCalledWith(
          `Test Next State`,
          `Test Instance Id`,
          `Test Next State Only Changed User Id`,
          `Test Next State Only Changed Session Id`
        );
      });

      it(`renders a prompt for the previous state for sessions which exist in both the previous and next states`, () => {
        expect(instancedPromptApplicationRenderPrompt).toHaveBeenCalledWith(
          `Test Previous State`,
          `Test Instance Id`,
          `Test Previous And Next State Unchanged Previous User Id`,
          `Test Previous And Next State Unchanged Session Id`
        );

        expect(instancedPromptApplicationRenderPrompt).toHaveBeenCalledWith(
          `Test Previous State`,
          `Test Instance Id`,
          `Test Previous And Next State Changed Previous User Id`,
          `Test Previous And Next State Changed Session Id`
        );
      });

      it(`renders a prompt for the next state for sessions which exist in both the previous and next states`, () => {
        expect(instancedPromptApplicationRenderPrompt).toHaveBeenCalledWith(
          `Test Next State`,
          `Test Instance Id`,
          `Test Previous And Next State Unchanged Next User Id`,
          `Test Previous And Next State Unchanged Session Id`
        );

        expect(instancedPromptApplicationRenderPrompt).toHaveBeenCalledWith(
          `Test Next State`,
          `Test Instance Id`,
          `Test Previous And Next State Changed Next User Id`,
          `Test Previous And Next State Changed Session Id`
        );
      });

      it(`does not render any further prompts`, () => {
        expect(instancedPromptApplicationRenderPrompt).toHaveBeenCalledTimes(
          13
        );
      });

      it(`renders prompts with the appropriate "this"`, () => {
        for (const call of instancedPromptApplicationRenderPrompt.calls.all()) {
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
      {
        sessionId: `Test Previous State Only Unchanged Session Id`,
        userId: `Test Previous State Only Unchanged User Id`,
      },
      {
        sessionId: `Test Previous State Only Changed Session Id`,
        userId: `Test Previous State Only Changed User Id`,
      },
      {
        sessionId: `Test Previous And Next State Unchanged Session Id`,
        userId: `Test Previous And Next State Unchanged Previous User Id`,
      },
      {
        sessionId: `Test Previous And Next State Changed Session Id`,
        userId: `Test Previous And Next State Changed Previous User Id`,
      },
    ],
    [
      {
        sessionId: `Test Next State Only Unchanged Session Id`,
        userId: `Test Next State Only Unchanged User Id`,
      },
      {
        sessionId: `Test Next State Only Changed Session Id`,
        userId: `Test Next State Only Changed User Id`,
      },
      {
        sessionId: `Test Previous And Next State Unchanged Session Id`,
        userId: `Test Previous And Next State Unchanged Next User Id`,
      },
      {
        sessionId: `Test Previous And Next State Changed Session Id`,
        userId: `Test Previous And Next State Changed Next User Id`,
      },
    ]
  );

  scenario(
    `when the session is only listed in the previous state`,
    [
      {
        sessionId: `Test Previous State Only Unchanged Session Id`,
        userId: `Test Previous State Only Unchanged User Id`,
      },
      {
        sessionId: `Test Previous State Only Changed Session Id`,
        userId: `Test Previous State Only Changed User Id`,
      },
      {
        sessionId: `Test Previous And Next State Unchanged Session Id`,
        userId: `Test Previous And Next State Unchanged Previous User Id`,
      },
      {
        sessionId: `Test Session Id`,
        userId: `Test Previous User Id`,
      },
      {
        sessionId: `Test Previous And Next State Changed Session Id`,
        userId: `Test Previous And Next State Changed Previous User Id`,
      },
    ],
    [
      {
        sessionId: `Test Next State Only Unchanged Session Id`,
        userId: `Test Next State Only Unchanged User Id`,
      },
      {
        sessionId: `Test Next State Only Changed Session Id`,
        userId: `Test Next State Only Changed User Id`,
      },
      {
        sessionId: `Test Previous And Next State Unchanged Session Id`,
        userId: `Test Previous And Next State Unchanged Next User Id`,
      },
      {
        sessionId: `Test Previous And Next State Changed Session Id`,
        userId: `Test Previous And Next State Changed Next User Id`,
      },
    ]
  );

  scenario(
    `when the session is only listed in the next state`,
    [
      {
        sessionId: `Test Previous State Only Unchanged Session Id`,
        userId: `Test Previous State Only Unchanged User Id`,
      },
      {
        sessionId: `Test Previous State Only Changed Session Id`,
        userId: `Test Previous State Only Changed User Id`,
      },
      {
        sessionId: `Test Previous And Next State Unchanged Session Id`,
        userId: `Test Previous And Next State Unchanged Previous User Id`,
      },
      {
        sessionId: `Test Previous And Next State Changed Session Id`,
        userId: `Test Previous And Next State Changed Previous User Id`,
      },
    ],
    [
      {
        sessionId: `Test Next State Only Unchanged Session Id`,
        userId: `Test Next State Only Unchanged User Id`,
      },
      {
        sessionId: `Test Next State Only Changed Session Id`,
        userId: `Test Next State Only Changed User Id`,
      },
      {
        sessionId: `Test Previous And Next State Unchanged Session Id`,
        userId: `Test Previous And Next State Unchanged Next User Id`,
      },
      {
        sessionId: `Test Session Id`,
        userId: `Test Next User Id`,
      },
      {
        sessionId: `Test Previous And Next State Changed Session Id`,
        userId: `Test Previous And Next State Changed Next User Id`,
      },
    ]
  );

  scenario(
    `when the session is listed in both the previous and next states`,
    [
      {
        sessionId: `Test Previous State Only Unchanged Session Id`,
        userId: `Test Previous State Only Unchanged User Id`,
      },
      {
        sessionId: `Test Session Id`,
        userId: `Test Previous User Id`,
      },
      {
        sessionId: `Test Previous State Only Changed Session Id`,
        userId: `Test Previous State Only Changed User Id`,
      },
      {
        sessionId: `Test Previous And Next State Unchanged Session Id`,
        userId: `Test Previous And Next State Unchanged Previous User Id`,
      },
      {
        sessionId: `Test Previous And Next State Changed Session Id`,
        userId: `Test Previous And Next State Changed Previous User Id`,
      },
    ],
    [
      {
        sessionId: `Test Next State Only Unchanged Session Id`,
        userId: `Test Next State Only Unchanged User Id`,
      },
      {
        sessionId: `Test Next State Only Changed Session Id`,
        userId: `Test Next State Only Changed User Id`,
      },
      {
        sessionId: `Test Session Id`,
        userId: `Test Next User Id`,
      },
      {
        sessionId: `Test Previous And Next State Unchanged Session Id`,
        userId: `Test Previous And Next State Unchanged Next User Id`,
      },
      {
        sessionId: `Test Previous And Next State Changed Session Id`,
        userId: `Test Previous And Next State Changed Next User Id`,
      },
    ]
  );
});
