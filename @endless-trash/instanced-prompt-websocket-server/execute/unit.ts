import { FormSubmissionCommand, Prompt } from "@endless-trash/prompt";
import { WebsocketHostUnserializedOutput } from "@endless-trash/websocket-host-body-serializer";
import { execute } from ".";
import { InstancedPromptApplication } from "../instanced-prompt-application";

describe(`execute`, () => {
  type TestState =
    | `Test State A`
    | `Test State B`
    | `Test State C`
    | `Test State D`
    | `Test State E`
    | `Test State F`;
  type TestVersion = `Test Version A` | `Test Version B` | `Test Version C`;

  describe(`when the instance does not exist`, () => {
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
      TestVersion
    >;
    let output: WebsocketHostUnserializedOutput<Prompt>;

    beforeAll(async () => {
      instancedPromptApplicationStateKeyValueStoreGet = jasmine
        .createSpy(`instancedPromptApplicationStateKeyValueStoreGet`)
        .and.resolveTo({ type: `doesNotExist` });

      instancedPromptApplicationStateKeyValueStoreInsert = jasmine.createSpy(
        `instancedPromptApplicationStateKeyValueStoreInsert`
      );

      instancedPromptApplicationStateKeyValueStoreUpdate = jasmine.createSpy(
        `instancedPromptApplicationStateKeyValueStoreUpdate`
      );

      instancedPromptApplicationRenderPrompt = jasmine.createSpy(
        `instancedPromptApplicationRenderPrompt`
      );

      instancedPromptApplicationApplyFormSubmissionCommand = jasmine.createSpy(
        `instancedPromptApplicationApplyFormSubmissionCommand`
      );

      instancedPromptApplicationPerformSideEffects = jasmine.createSpy(
        `instancedPromptApplicationPerformSideEffects`
      );

      instancedPromptApplicationListSessions = jasmine.createSpy(
        `instancedPromptApplicationListSessions`
      );

      instancedPromptApplicationInvalidRequestEventHandler = jasmine.createSpy(
        `instancedPromptApplicationInvalidRequestEventHandler`
      );

      instancedPromptApplicationNonexistentInstanceEventHandler = jasmine
        .createSpy(`instancedPromptApplicationNonexistentInstanceEventHandler`)
        .and.resolveTo({
          messages: [
            {
              sessionId: `Test Session Id`,
              body: {
                formGroups: [{ name: `Test Output Form Group`, forms: [] }],
              },
            },
          ],
        });

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

      output = await execute(instancedPromptApplication)({
        body: { metadata: { token: `Test Token` }, command: `Test Command` },
        instanceId: `Test Instance Id`,
        userId: `Test User Id`,
        sessionId: `Test Session Id`,
      });
    });

    it(`gets one instance from the key value store`, () => {
      expect(
        instancedPromptApplicationStateKeyValueStoreGet
      ).toHaveBeenCalledTimes(1);
    });

    it(`uses the correct "this" when getting instances from the key value store`, () => {
      for (const call of instancedPromptApplicationStateKeyValueStoreGet.calls.all()) {
        expect(call.object).toBe(instancedPromptApplication.stateKeyValueStore);
      }
    });

    it(`gets the expected instance from the key value store`, () => {
      expect(
        instancedPromptApplicationStateKeyValueStoreGet
      ).toHaveBeenCalledWith(`Test Instance Id`);
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

    it(`handles one nonexistent instance`, () => {
      expect(
        instancedPromptApplicationNonexistentInstanceEventHandler
      ).toHaveBeenCalledTimes(1);
    });

    it(`uses the correct "this" when handling nonexistent instances`, () => {
      for (const call of instancedPromptApplicationNonexistentInstanceEventHandler.calls.all()) {
        expect(call.object).toBe(instancedPromptApplication);
      }
    });

    it(`passes the event to the nonexistant instance handler`, () => {
      expect(
        instancedPromptApplicationNonexistentInstanceEventHandler
      ).toHaveBeenCalledWith({
        body: { metadata: { token: `Test Token` }, command: `Test Command` },
        instanceId: `Test Instance Id`,
        userId: `Test User Id`,
        sessionId: `Test Session Id`,
      });
    });

    it(`does not list the sessions of any states`, () => {
      expect(instancedPromptApplicationListSessions).not.toHaveBeenCalled();
    });

    it(`does not render any prompts`, () => {
      expect(instancedPromptApplicationRenderPrompt).not.toHaveBeenCalled();
    });

    it(`returns the result of the nonexistent instance handler`, () => {
      expect(output).toEqual({
        messages: [
          {
            sessionId: `Test Session Id`,
            body: {
              formGroups: [{ name: `Test Output Form Group`, forms: [] }],
            },
          },
        ],
      });
    });
  });

  describe(`when the request is invalid`, () => {
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
      TestVersion
    >;
    let output: WebsocketHostUnserializedOutput<Prompt>;

    beforeAll(async () => {
      instancedPromptApplicationStateKeyValueStoreGet = jasmine
        .createSpy(`instancedPromptApplicationStateKeyValueStoreGet`)
        .and.resolveTo({
          type: `successful`,
          value: `Test State A`,
          version: `Test Version A`,
        });

      instancedPromptApplicationStateKeyValueStoreInsert = jasmine.createSpy(
        `instancedPromptApplicationStateKeyValueStoreInsert`
      );

      instancedPromptApplicationStateKeyValueStoreUpdate = jasmine.createSpy(
        `instancedPromptApplicationStateKeyValueStoreUpdate`
      );

      instancedPromptApplicationRenderPrompt = jasmine
        .createSpy(`instancedPromptApplicationRenderPrompt`)
        .and.resolveTo({
          formGroups: [
            {
              name: `Test Form Group Name`,
              forms: [
                {
                  name: `Test Form Name`,
                  fields: [],
                  submitButtonLabel: null,
                },
              ],
            },
          ],
        });

      instancedPromptApplicationApplyFormSubmissionCommand = jasmine.createSpy(
        `instancedPromptApplicationApplyFormSubmissionCommand`
      );

      instancedPromptApplicationPerformSideEffects = jasmine.createSpy(
        `instancedPromptApplicationPerformSideEffects`
      );

      instancedPromptApplicationListSessions = jasmine.createSpy(
        `instancedPromptApplicationListSessions`
      );

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

      output = await execute(instancedPromptApplication)({
        body: {
          metadata: { token: `Test Token` },
          command: {
            type: `formSubmission`,
            formName: `Test Form Name`,
            fields: {},
          },
        },
        instanceId: `Test Instance Id`,
        userId: `Test User Id`,
        sessionId: `Test Session Id`,
      });
    });

    it(`gets one instance from the key value store`, () => {
      expect(
        instancedPromptApplicationStateKeyValueStoreGet
      ).toHaveBeenCalledTimes(1);
    });

    it(`uses the correct "this" when getting instances from the key value store`, () => {
      for (const call of instancedPromptApplicationStateKeyValueStoreGet.calls.all()) {
        expect(call.object).toBe(instancedPromptApplication.stateKeyValueStore);
      }
    });

    it(`gets the expected instance from the key value store`, () => {
      expect(
        instancedPromptApplicationStateKeyValueStoreGet
      ).toHaveBeenCalledWith(`Test Instance Id`);
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
        instancedPromptApplicationNonexistentInstanceEventHandler
      ).not.toHaveBeenCalled();
    });

    it(`does not handle any nonexistent instances`, () => {
      expect(
        instancedPromptApplicationInvalidRequestEventHandler
      ).not.toHaveBeenCalled();
    });

    it(`does not list the sessions of any states`, () => {
      expect(instancedPromptApplicationListSessions).not.toHaveBeenCalled();
    });

    it(`renders the prompt for the incoming request`, () => {
      expect(instancedPromptApplicationRenderPrompt).toHaveBeenCalledWith(
        `Test State A`,
        `Test Instance Id`,
        `Test User Id`,
        `Test Session Id`
      );
    });

    it(`does not render any further prompts`, () => {
      expect(instancedPromptApplicationRenderPrompt).toHaveBeenCalledTimes(1);
    });

    it(`uses the correct "this" when rendering prompts`, () => {
      for (const call of instancedPromptApplicationRenderPrompt.calls.all()) {
        expect(call.object).toBe(instancedPromptApplication);
      }
    });

    it(`returns the expected prompt`, () => {
      expect(output).toEqual({
        messages: [
          {
            sessionId: `Test Session Id`,
            body: {
              formGroups: [
                {
                  name: `Test Form Group Name`,
                  forms: [
                    {
                      name: `Test Form Name`,
                      fields: [],
                      submitButtonLabel: null,
                    },
                  ],
                },
              ],
            },
          },
        ],
      });
    });
  });

  describe(`when refresh succeeds`, () => {
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
      TestVersion
    >;
    let output: WebsocketHostUnserializedOutput<Prompt>;

    beforeAll(async () => {
      instancedPromptApplicationStateKeyValueStoreGet = jasmine
        .createSpy(`instancedPromptApplicationStateKeyValueStoreGet`)
        .and.resolveTo({
          type: `successful`,
          value: `Test State A`,
          version: `Test Version A`,
        });

      instancedPromptApplicationStateKeyValueStoreInsert = jasmine.createSpy(
        `instancedPromptApplicationStateKeyValueStoreInsert`
      );

      instancedPromptApplicationStateKeyValueStoreUpdate = jasmine.createSpy(
        `instancedPromptApplicationStateKeyValueStoreUpdate`
      );

      instancedPromptApplicationRenderPrompt = jasmine
        .createSpy(`instancedPromptApplicationRenderPrompt`)
        .and.resolveTo({
          formGroups: [
            {
              name: `Test Form Group Name`,
              forms: [
                {
                  name: `Test Form Name`,
                  fields: [],
                  submitButtonLabel: null,
                },
              ],
            },
          ],
        });

      instancedPromptApplicationApplyFormSubmissionCommand = jasmine.createSpy(
        `instancedPromptApplicationApplyFormSubmissionCommand`
      );

      instancedPromptApplicationPerformSideEffects = jasmine.createSpy(
        `instancedPromptApplicationPerformSideEffects`
      );

      instancedPromptApplicationListSessions = jasmine.createSpy(
        `instancedPromptApplicationListSessions`
      );

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

      output = await execute(instancedPromptApplication)({
        body: {
          metadata: { token: `Test Token` },
          command: {
            type: `refresh`,
          },
        },
        instanceId: `Test Instance Id`,
        userId: `Test User Id`,
        sessionId: `Test Session Id`,
      });
    });

    it(`gets one instance from the key value store`, () => {
      expect(
        instancedPromptApplicationStateKeyValueStoreGet
      ).toHaveBeenCalledTimes(1);
    });

    it(`uses the correct "this" when getting instances from the key value store`, () => {
      for (const call of instancedPromptApplicationStateKeyValueStoreGet.calls.all()) {
        expect(call.object).toBe(instancedPromptApplication.stateKeyValueStore);
      }
    });

    it(`gets the expected instance from the key value store`, () => {
      expect(
        instancedPromptApplicationStateKeyValueStoreGet
      ).toHaveBeenCalledWith(`Test Instance Id`);
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
        instancedPromptApplicationNonexistentInstanceEventHandler
      ).not.toHaveBeenCalled();
    });

    it(`does not handle any nonexistent instances`, () => {
      expect(
        instancedPromptApplicationInvalidRequestEventHandler
      ).not.toHaveBeenCalled();
    });

    it(`does not list the sessions of any states`, () => {
      expect(instancedPromptApplicationListSessions).not.toHaveBeenCalled();
    });

    it(`renders the prompt for the incoming request`, () => {
      expect(instancedPromptApplicationRenderPrompt).toHaveBeenCalledWith(
        `Test State A`,
        `Test Instance Id`,
        `Test User Id`,
        `Test Session Id`
      );
    });

    it(`does not render any further prompts`, () => {
      expect(instancedPromptApplicationRenderPrompt).toHaveBeenCalledTimes(1);
    });

    it(`uses the correct "this" when rendering prompts`, () => {
      for (const call of instancedPromptApplicationRenderPrompt.calls.all()) {
        expect(call.object).toBe(instancedPromptApplication);
      }
    });

    it(`returns the expected prompt`, () => {
      expect(output).toEqual({
        messages: [
          {
            sessionId: `Test Session Id`,
            body: {
              formGroups: [
                {
                  name: `Test Form Group Name`,
                  forms: [
                    {
                      name: `Test Form Name`,
                      fields: [],
                      submitButtonLabel: null,
                    },
                  ],
                },
              ],
            },
          },
        ],
      });
    });
  });

  describe(`when form submission succeeds`, () => {
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
      TestVersion
    >;
    let output: WebsocketHostUnserializedOutput<Prompt>;

    beforeAll(async () => {
      instancedPromptApplicationStateKeyValueStoreGet = jasmine
        .createSpy(`instancedPromptApplicationStateKeyValueStoreGet`)
        .and.resolveTo({
          type: `successful`,
          value: `Test State A`,
          version: `Test Version A`,
        });

      instancedPromptApplicationStateKeyValueStoreInsert = jasmine.createSpy(
        `instancedPromptApplicationStateKeyValueStoreInsert`
      );

      instancedPromptApplicationStateKeyValueStoreUpdate = jasmine
        .createSpy(`instancedPromptApplicationStateKeyValueStoreUpdate`)
        .and.resolveTo({ type: `successful` });

      instancedPromptApplicationRenderPrompt = jasmine
        .createSpy(`instancedPromptApplicationRenderPrompt`)
        .and.callFake(
          async (
            state: TestState,
            instanceId: string,
            userId: string,
            sessionId: string
          ) => {
            instanceId;
            userId;

            switch (state) {
              case `Test State A`:
                switch (sessionId) {
                  case `Test Session Id`:
                    return {
                      formGroups: [
                        {
                          name: `Test Form Group Name`,
                          forms: [
                            {
                              name: `Test Form Name`,
                              fields: [],
                              submitButtonLabel: `Test Submit Button Label`,
                            },
                          ],
                        },
                      ],
                    };

                  case `Test Previous Session Id`:
                    return {
                      formGroups: [
                        {
                          name: `Test Previous Session Previous State Form Group Name`,
                          forms: [],
                        },
                      ],
                    };

                  case `Test Next Session Id`:
                    return {
                      formGroups: [
                        {
                          name: `Test Next Session Previous State Form Group Name`,
                          forms: [],
                        },
                      ],
                    };

                  default:
                    throw new Error(`Unexpected session ID "${sessionId}".`);
                }

              case `Test State B`:
                switch (sessionId) {
                  case `Test Session Id`:
                    return {
                      formGroups: [
                        {
                          name: `Test Next State Form Group Name`,
                          forms: [],
                        },
                      ],
                    };

                  case `Test Previous Session Id`:
                    return {
                      formGroups: [
                        {
                          name: `Test Previous Session Next State Form Group Name`,
                          forms: [],
                        },
                      ],
                    };

                  case `Test Next Session Id`:
                    return {
                      formGroups: [
                        {
                          name: `Test Next Session Next State Form Group Name`,
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

      instancedPromptApplicationApplyFormSubmissionCommand = jasmine
        .createSpy(`instancedPromptApplicationApplyFormSubmissionCommand`)
        .and.resolveTo(`Test State B`);

      instancedPromptApplicationPerformSideEffects = jasmine
        .createSpy(`instancedPromptApplicationPerformSideEffects`)
        .and.resolveTo();

      instancedPromptApplicationListSessions = jasmine
        .createSpy(`instancedPromptApplicationListSessions`)
        .and.callFake(async (state) => {
          switch (state) {
            case `Test State A`:
              return [
                {
                  sessionId: `Test Previous Session Id`,
                  userId: `Test Previous User Id`,
                },
              ];

            case `Test State B`:
              return [
                {
                  sessionId: `Test Next Session Id`,
                  userId: `Test Next User Id`,
                },
              ];

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

      output = await execute(instancedPromptApplication)({
        body: {
          metadata: { token: `Test Token` },
          command: {
            type: `formSubmission`,
            formName: `Test Form Name`,
            fields: {},
          },
        },
        instanceId: `Test Instance Id`,
        userId: `Test User Id`,
        sessionId: `Test Session Id`,
      });
    });

    it(`gets one instance from the key value store`, () => {
      expect(
        instancedPromptApplicationStateKeyValueStoreGet
      ).toHaveBeenCalledTimes(1);
    });

    it(`uses the correct "this" when getting instances from the key value store`, () => {
      for (const call of instancedPromptApplicationStateKeyValueStoreGet.calls.all()) {
        expect(call.object).toBe(instancedPromptApplication.stateKeyValueStore);
      }
    });

    it(`gets the expected instance from the key value store`, () => {
      expect(
        instancedPromptApplicationStateKeyValueStoreGet
      ).toHaveBeenCalledWith(`Test Instance Id`);
    });

    it(`does not insert into the state key value store`, () => {
      expect(
        instancedPromptApplicationStateKeyValueStoreInsert
      ).not.toHaveBeenCalled();
    });

    it(`updates the key value store with the updated state`, () => {
      expect(
        instancedPromptApplicationStateKeyValueStoreUpdate
      ).toHaveBeenCalledWith(
        `Test Instance Id`,
        `Test State B`,
        `Test Version A`
      );
    });

    it(`does not further update the state key value store`, () => {
      expect(
        instancedPromptApplicationStateKeyValueStoreUpdate
      ).toHaveBeenCalledTimes(1);
    });

    it(`uses the correct "this" when updating the state key value store`, () => {
      for (const call of instancedPromptApplicationStateKeyValueStoreUpdate.calls.all()) {
        expect(call.object).toBe(instancedPromptApplication.stateKeyValueStore);
      }
    });

    it(`applies the request to the previous state`, () => {
      expect(
        instancedPromptApplicationApplyFormSubmissionCommand
      ).toHaveBeenCalledWith(
        `Test State A`,
        `Test Instance Id`,
        `Test User Id`,
        `Test Session Id`,
        {
          type: `formSubmission`,
          formName: `Test Form Name`,
          fields: {},
        }
      );
    });

    it(`does not apply any further form submission commands`, () => {
      expect(
        instancedPromptApplicationApplyFormSubmissionCommand
      ).toHaveBeenCalledTimes(1);
    });

    it(`uses the correct "this" when applying form submission commands`, () => {
      for (const call of instancedPromptApplicationApplyFormSubmissionCommand.calls.all()) {
        expect(call.object).toBe(instancedPromptApplication);
      }
    });

    it(`performs the expected side effects`, () => {
      expect(instancedPromptApplicationPerformSideEffects).toHaveBeenCalledWith(
        `Test State A`,
        `Test State B`,
        `Test Instance Id`,
        `Test User Id`,
        `Test Session Id`,
        {
          type: `formSubmission`,
          formName: `Test Form Name`,
          fields: {},
        }
      );
    });

    it(`does not perform any further side effects`, () => {
      expect(
        instancedPromptApplicationPerformSideEffects
      ).toHaveBeenCalledTimes(1);
    });

    it(`uses the correct "this" when applying side effects`, () => {
      for (const call of instancedPromptApplicationPerformSideEffects.calls.all()) {
        expect(call.object).toBe(instancedPromptApplication);
      }
    });

    it(`does not handle any invalid requests`, () => {
      expect(
        instancedPromptApplicationNonexistentInstanceEventHandler
      ).not.toHaveBeenCalled();
    });

    it(`does not handle any nonexistent instances`, () => {
      expect(
        instancedPromptApplicationInvalidRequestEventHandler
      ).not.toHaveBeenCalled();
    });

    it(`lists the sessions of the previous state`, () => {
      expect(instancedPromptApplicationListSessions).toHaveBeenCalledWith(
        `Test State A`
      );
    });

    it(`lists the sessions of the next state`, () => {
      expect(instancedPromptApplicationListSessions).toHaveBeenCalledWith(
        `Test State B`
      );
    });

    it(`does not list the sessions of any further states`, () => {
      expect(instancedPromptApplicationListSessions).toHaveBeenCalledTimes(2);
    });

    it(`uses the correct "this" when listing sessions of states`, () => {
      for (const call of instancedPromptApplicationListSessions.calls.all()) {
        expect(call.object).toBe(instancedPromptApplication);
      }
    });

    it(`renders the prompt for the incoming request`, () => {
      expect(instancedPromptApplicationRenderPrompt).toHaveBeenCalledWith(
        `Test State A`,
        `Test Instance Id`,
        `Test User Id`,
        `Test Session Id`
      );
    });

    it(`renders the prompt for the requesting session`, () => {
      expect(instancedPromptApplicationRenderPrompt).toHaveBeenCalledWith(
        `Test State B`,
        `Test Instance Id`,
        `Test User Id`,
        `Test Session Id`
      );
    });

    it(`renders the prompt for sessions listed by the previous state`, () => {
      expect(instancedPromptApplicationRenderPrompt).toHaveBeenCalledWith(
        `Test State A`,
        `Test Instance Id`,
        `Test Previous User Id`,
        `Test Previous Session Id`
      );

      expect(instancedPromptApplicationRenderPrompt).toHaveBeenCalledWith(
        `Test State B`,
        `Test Instance Id`,
        `Test Previous User Id`,
        `Test Previous Session Id`
      );
    });

    it(`renders the prompt for sessions listed by the next state`, () => {
      expect(instancedPromptApplicationRenderPrompt).toHaveBeenCalledWith(
        `Test State A`,
        `Test Instance Id`,
        `Test Next User Id`,
        `Test Next Session Id`
      );

      expect(instancedPromptApplicationRenderPrompt).toHaveBeenCalledWith(
        `Test State B`,
        `Test Instance Id`,
        `Test Next User Id`,
        `Test Next Session Id`
      );
    });

    it(`does not render any further prompts`, () => {
      expect(instancedPromptApplicationRenderPrompt).toHaveBeenCalledTimes(6);
    });

    it(`uses the correct "this" when rendering prompts`, () => {
      for (const call of instancedPromptApplicationRenderPrompt.calls.all()) {
        expect(call.object).toBe(instancedPromptApplication);
      }
    });

    it(`returns the generated response`, () => {
      expect(output).toEqual({
        messages: [
          {
            sessionId: `Test Session Id`,
            body: {
              formGroups: [
                {
                  name: `Test Next State Form Group Name`,
                  forms: [],
                },
              ],
            },
          },
          {
            sessionId: `Test Previous Session Id`,
            body: {
              formGroups: [
                {
                  name: `Test Previous Session Next State Form Group Name`,
                  forms: [],
                },
              ],
            },
          },
          {
            sessionId: `Test Next Session Id`,
            body: {
              formGroups: [
                {
                  name: `Test Next Session Next State Form Group Name`,
                  forms: [],
                },
              ],
            },
          },
        ],
      });
    });
  });

  describe(`when form submission succeeds the second time`, () => {
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
      TestVersion
    >;
    let output: WebsocketHostUnserializedOutput<Prompt>;

    beforeAll(async () => {
      instancedPromptApplicationStateKeyValueStoreGet = jasmine
        .createSpy(`instancedPromptApplicationStateKeyValueStoreGet`)
        .and.callFake(async () => {
          const count = instancedPromptApplicationStateKeyValueStoreGet.calls.count();

          switch (count) {
            case 1:
              return {
                type: `successful`,
                value: `Test State A`,
                version: `Test Version A`,
              };

            case 2:
              return {
                type: `successful`,
                value: `Test State C`,
                version: `Test Version B`,
              };

            default:
              throw new Error(`Unexpected call count ${count}.`);
          }
        });

      instancedPromptApplicationStateKeyValueStoreInsert = jasmine.createSpy(
        `instancedPromptApplicationStateKeyValueStoreInsert`
      );

      instancedPromptApplicationStateKeyValueStoreUpdate = jasmine
        .createSpy(`instancedPromptApplicationStateKeyValueStoreUpdate`)
        .and.callFake(
          async (
            key: string,
            value: TestState,
            expectedVersion: TestVersion
          ) => {
            key;
            expectedVersion;

            switch (value) {
              case `Test State B`:
                return {
                  type: `doesNotExistOrVersionDoesNotMatch`,
                };

              case `Test State D`:
                return {
                  type: `successful`,
                };

              default:
                throw new Error(`Unexpected value ${value}.`);
            }
          }
        );

      instancedPromptApplicationRenderPrompt = jasmine
        .createSpy(`instancedPromptApplicationRenderPrompt`)
        .and.callFake(
          async (
            state: TestState,
            instanceId: string,
            userId: string,
            sessionId: string
          ) => {
            instanceId;
            userId;

            switch (state) {
              case `Test State A`:
                switch (sessionId) {
                  case `Test Session Id`:
                    return {
                      formGroups: [
                        {
                          name: `Test Form Group A Name`,
                          forms: [
                            {
                              name: `Test Form Name`,
                              fields: [],
                              submitButtonLabel: `Test Submit Button Label`,
                            },
                          ],
                        },
                      ],
                    };
                  default:
                    throw new Error(`Unexpected session ID "${sessionId}".`);
                }

              case `Test State C`:
                switch (sessionId) {
                  case `Test Session Id`:
                    return {
                      formGroups: [
                        {
                          name: `Test Form Group B Name`,
                          forms: [
                            {
                              name: `Test Form Name`,
                              fields: [],
                              submitButtonLabel: `Test Submit Button Label`,
                            },
                          ],
                        },
                      ],
                    };

                  case `Test Previous Session Id`:
                    return {
                      formGroups: [
                        {
                          name: `Test Previous Session Previous State Form Group Name`,
                          forms: [],
                        },
                      ],
                    };

                  case `Test Next Session Id`:
                    return {
                      formGroups: [
                        {
                          name: `Test Next Session Previous State Form Group Name`,
                          forms: [],
                        },
                      ],
                    };

                  default:
                    throw new Error(`Unexpected session ID "${sessionId}".`);
                }

              case `Test State D`:
                switch (sessionId) {
                  case `Test Session Id`:
                    return {
                      formGroups: [
                        {
                          name: `Test Next State Form Group Name`,
                          forms: [],
                        },
                      ],
                    };

                  case `Test Previous Session Id`:
                    return {
                      formGroups: [
                        {
                          name: `Test Previous Session Next State Form Group Name`,
                          forms: [],
                        },
                      ],
                    };

                  case `Test Next Session Id`:
                    return {
                      formGroups: [
                        {
                          name: `Test Next Session Next State Form Group Name`,
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

      instancedPromptApplicationApplyFormSubmissionCommand = jasmine
        .createSpy(`instancedPromptApplicationApplyFormSubmissionCommand`)
        .and.callFake(
          async (
            state: TestState,
            instanceId: string,
            userId: string,
            sessionId: string,
            formSubmissionCommand: FormSubmissionCommand
          ) => {
            instanceId;
            userId;
            sessionId;
            formSubmissionCommand;

            switch (state) {
              case `Test State A`:
                return `Test State B`;

              case `Test State C`:
                return `Test State D`;

              default:
                throw new Error(`Unexpected state "${state}".`);
            }
          }
        );

      instancedPromptApplicationPerformSideEffects = jasmine
        .createSpy(`instancedPromptApplicationPerformSideEffects`)
        .and.resolveTo();

      instancedPromptApplicationListSessions = jasmine
        .createSpy(`instancedPromptApplicationListSessions`)
        .and.callFake(async (state) => {
          switch (state) {
            case `Test State C`:
              return [
                {
                  sessionId: `Test Previous Session Id`,
                  userId: `Test Previous User Id`,
                },
              ];

            case `Test State D`:
              return [
                {
                  sessionId: `Test Next Session Id`,
                  userId: `Test Next User Id`,
                },
              ];

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

      output = await execute(instancedPromptApplication)({
        body: {
          metadata: { token: `Test Token` },
          command: {
            type: `formSubmission`,
            formName: `Test Form Name`,
            fields: {},
          },
        },
        instanceId: `Test Instance Id`,
        userId: `Test User Id`,
        sessionId: `Test Session Id`,
      });
    });

    it(`gets two instances from the key value store`, () => {
      expect(
        instancedPromptApplicationStateKeyValueStoreGet
      ).toHaveBeenCalledTimes(2);
    });

    it(`uses the correct "this" when getting instances from the key value store`, () => {
      for (const call of instancedPromptApplicationStateKeyValueStoreGet.calls.all()) {
        expect(call.object).toBe(instancedPromptApplication.stateKeyValueStore);
      }
    });

    it(`gets the expected instance from the key value store`, () => {
      for (const args of instancedPromptApplicationStateKeyValueStoreGet.calls.allArgs()) {
        expect(args).toEqual([`Test Instance Id`]);
      }
    });

    it(`does not insert into the state key value store`, () => {
      expect(
        instancedPromptApplicationStateKeyValueStoreInsert
      ).not.toHaveBeenCalled();
    });

    it(`updates the key value store with the first updated state`, () => {
      expect(
        instancedPromptApplicationStateKeyValueStoreUpdate
      ).toHaveBeenCalledWith(
        `Test Instance Id`,
        `Test State B`,
        `Test Version A`
      );
    });

    it(`updates the key value store with the second updated state`, () => {
      expect(
        instancedPromptApplicationStateKeyValueStoreUpdate
      ).toHaveBeenCalledWith(
        `Test Instance Id`,
        `Test State D`,
        `Test Version B`
      );
    });

    it(`does not further update the state key value store`, () => {
      expect(
        instancedPromptApplicationStateKeyValueStoreUpdate
      ).toHaveBeenCalledTimes(2);
    });

    it(`uses the correct "this" when updating the key value store`, () => {
      for (const call of instancedPromptApplicationStateKeyValueStoreUpdate.calls.all()) {
        expect(call.object).toBe(instancedPromptApplication.stateKeyValueStore);
      }
    });

    it(`applies the request to the first previous state`, () => {
      expect(
        instancedPromptApplicationApplyFormSubmissionCommand
      ).toHaveBeenCalledWith(
        `Test State A`,
        `Test Instance Id`,
        `Test User Id`,
        `Test Session Id`,
        {
          type: `formSubmission`,
          formName: `Test Form Name`,
          fields: {},
        }
      );
    });

    it(`applies the request to the second previous state`, () => {
      expect(
        instancedPromptApplicationApplyFormSubmissionCommand
      ).toHaveBeenCalledWith(
        `Test State C`,
        `Test Instance Id`,
        `Test User Id`,
        `Test Session Id`,
        {
          type: `formSubmission`,
          formName: `Test Form Name`,
          fields: {},
        }
      );
    });

    it(`does not apply any further form submission commands`, () => {
      expect(
        instancedPromptApplicationApplyFormSubmissionCommand
      ).toHaveBeenCalledTimes(2);
    });

    it(`uses the correct "this" when applying form submission commands`, () => {
      for (const call of instancedPromptApplicationApplyFormSubmissionCommand.calls.all()) {
        expect(call.object).toBe(instancedPromptApplication);
      }
    });

    it(`performs the expected side effects`, () => {
      expect(instancedPromptApplicationPerformSideEffects).toHaveBeenCalledWith(
        `Test State C`,
        `Test State D`,
        `Test Instance Id`,
        `Test User Id`,
        `Test Session Id`,
        {
          type: `formSubmission`,
          formName: `Test Form Name`,
          fields: {},
        }
      );
    });

    it(`does not perform any further side effects`, () => {
      expect(
        instancedPromptApplicationPerformSideEffects
      ).toHaveBeenCalledTimes(1);
    });

    it(`uses the correct "this" when performing side effects`, () => {
      for (const call of instancedPromptApplicationPerformSideEffects.calls.all()) {
        expect(call.object).toBe(instancedPromptApplication);
      }
    });

    it(`does not handle any invalid requests`, () => {
      expect(
        instancedPromptApplicationNonexistentInstanceEventHandler
      ).not.toHaveBeenCalled();
    });

    it(`does not handle any nonexistent instances`, () => {
      expect(
        instancedPromptApplicationInvalidRequestEventHandler
      ).not.toHaveBeenCalled();
    });

    it(`lists the sessions of the previous state`, () => {
      expect(instancedPromptApplicationListSessions).toHaveBeenCalledWith(
        `Test State C`
      );
    });

    it(`lists the sessions of the next state`, () => {
      expect(instancedPromptApplicationListSessions).toHaveBeenCalledWith(
        `Test State D`
      );
    });

    it(`does not list the sessions of any further states`, () => {
      expect(instancedPromptApplicationListSessions).toHaveBeenCalledTimes(2);
    });

    it(`uses the correct "this" when listing sessions of states`, () => {
      for (const call of instancedPromptApplicationListSessions.calls.all()) {
        expect(call.object).toBe(instancedPromptApplication);
      }
    });

    it(`renders the prompt for the incoming request the first time`, () => {
      expect(instancedPromptApplicationRenderPrompt).toHaveBeenCalledWith(
        `Test State A`,
        `Test Instance Id`,
        `Test User Id`,
        `Test Session Id`
      );
    });

    it(`renders the prompt for the incoming request the second time`, () => {
      expect(instancedPromptApplicationRenderPrompt).toHaveBeenCalledWith(
        `Test State C`,
        `Test Instance Id`,
        `Test User Id`,
        `Test Session Id`
      );
    });

    it(`renders the prompt for the requesting session`, () => {
      expect(instancedPromptApplicationRenderPrompt).toHaveBeenCalledWith(
        `Test State D`,
        `Test Instance Id`,
        `Test User Id`,
        `Test Session Id`
      );
    });

    it(`renders the prompt for sessions listed by the previous state`, () => {
      expect(instancedPromptApplicationRenderPrompt).toHaveBeenCalledWith(
        `Test State C`,
        `Test Instance Id`,
        `Test Previous User Id`,
        `Test Previous Session Id`
      );

      expect(instancedPromptApplicationRenderPrompt).toHaveBeenCalledWith(
        `Test State D`,
        `Test Instance Id`,
        `Test Previous User Id`,
        `Test Previous Session Id`
      );
    });

    it(`renders the prompt for sessions listed by the next state`, () => {
      expect(instancedPromptApplicationRenderPrompt).toHaveBeenCalledWith(
        `Test State C`,
        `Test Instance Id`,
        `Test Next User Id`,
        `Test Next Session Id`
      );

      expect(instancedPromptApplicationRenderPrompt).toHaveBeenCalledWith(
        `Test State D`,
        `Test Instance Id`,
        `Test Next User Id`,
        `Test Next Session Id`
      );
    });

    it(`does not render any further prompts`, () => {
      expect(instancedPromptApplicationRenderPrompt).toHaveBeenCalledTimes(7);
    });

    it(`uses the correct "this" when rendering prompts`, () => {
      for (const call of instancedPromptApplicationRenderPrompt.calls.all()) {
        expect(call.object).toBe(instancedPromptApplication);
      }
    });

    it(`returns the generated response`, () => {
      expect(output).toEqual({
        messages: [
          {
            sessionId: `Test Session Id`,
            body: {
              formGroups: [
                {
                  name: `Test Next State Form Group Name`,
                  forms: [],
                },
              ],
            },
          },
          {
            sessionId: `Test Previous Session Id`,
            body: {
              formGroups: [
                {
                  name: `Test Previous Session Next State Form Group Name`,
                  forms: [],
                },
              ],
            },
          },
          {
            sessionId: `Test Next Session Id`,
            body: {
              formGroups: [
                {
                  name: `Test Next Session Next State Form Group Name`,
                  forms: [],
                },
              ],
            },
          },
        ],
      });
    });
  });

  describe(`when the instance is deleted between the first and second attempts`, () => {
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
      TestVersion
    >;
    let output: WebsocketHostUnserializedOutput<Prompt>;

    beforeAll(async () => {
      instancedPromptApplicationStateKeyValueStoreGet = jasmine
        .createSpy(`instancedPromptApplicationStateKeyValueStoreGet`)
        .and.callFake(async () => {
          const count = instancedPromptApplicationStateKeyValueStoreGet.calls.count();

          switch (count) {
            case 1:
              return {
                type: `successful`,
                value: `Test State A`,
                version: `Test Version A`,
              };

            case 2:
              return {
                type: `doesNotExist`,
              };

            default:
              throw new Error(`Unexpected call count ${count}.`);
          }
        });

      instancedPromptApplicationStateKeyValueStoreInsert = jasmine.createSpy(
        `instancedPromptApplicationStateKeyValueStoreInsert`
      );

      instancedPromptApplicationStateKeyValueStoreUpdate = jasmine
        .createSpy(`instancedPromptApplicationStateKeyValueStoreUpdate`)
        .and.resolveTo({ type: `doesNotExistOrVersionDoesNotMatch` });

      instancedPromptApplicationRenderPrompt = jasmine
        .createSpy(`instancedPromptApplicationRenderPrompt`)
        .and.callFake(
          async (
            state: TestState,
            instanceId: string,
            userId: string,
            sessionId: string
          ) => {
            instanceId;
            userId;
            sessionId;

            switch (state) {
              case `Test State A`:
                return {
                  formGroups: [
                    {
                      name: `Test Form Group A Name`,
                      forms: [
                        {
                          name: `Test Form Name`,
                          fields: [],
                          submitButtonLabel: `Test Submit Button Label`,
                        },
                      ],
                    },
                  ],
                };

              case `Test State B`:
                return {
                  formGroups: [
                    {
                      name: `Test Form Group B Name`,
                      forms: [
                        {
                          name: `Test Form Name`,
                          fields: [],
                          submitButtonLabel: `Test Submit Button Label`,
                        },
                      ],
                    },
                  ],
                };

              default:
                throw new Error(`Unexpected state "${state}".`);
            }
          }
        );

      instancedPromptApplicationApplyFormSubmissionCommand = jasmine
        .createSpy(`instancedPromptApplicationApplyFormSubmissionCommand`)
        .and.resolveTo(`Test State B`);

      instancedPromptApplicationPerformSideEffects = jasmine.createSpy(
        `instancedPromptApplicationPerformSideEffects`
      );

      instancedPromptApplicationListSessions = jasmine.createSpy(
        `instancedPromptApplicationListSessions`
      );

      instancedPromptApplicationInvalidRequestEventHandler = jasmine.createSpy(
        `instancedPromptApplicationInvalidRequestEventHandler`
      );

      instancedPromptApplicationNonexistentInstanceEventHandler = jasmine
        .createSpy(`instancedPromptApplicationNonexistentInstanceEventHandler`)
        .and.resolveTo({
          messages: [
            {
              sessionId: `Test Session Id`,
              body: {
                formGroups: [{ name: `Test Output Form Group`, forms: [] }],
              },
            },
          ],
        });

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

      output = await execute(instancedPromptApplication)({
        body: {
          metadata: { token: `Test Token` },
          command: {
            type: `formSubmission`,
            formName: `Test Form Name`,
            fields: {},
          },
        },
        instanceId: `Test Instance Id`,
        userId: `Test User Id`,
        sessionId: `Test Session Id`,
      });
    });

    it(`gets two instances from the key value store`, () => {
      expect(
        instancedPromptApplicationStateKeyValueStoreGet
      ).toHaveBeenCalledTimes(2);
    });

    it(`uses the correct "this" when getting instances from the key value store`, () => {
      for (const call of instancedPromptApplicationStateKeyValueStoreGet.calls.all()) {
        expect(call.object).toBe(instancedPromptApplication.stateKeyValueStore);
      }
    });

    it(`gets the expected instance from the key value store`, () => {
      for (const args of instancedPromptApplicationStateKeyValueStoreGet.calls.allArgs()) {
        expect(args).toEqual([`Test Instance Id`]);
      }
    });

    it(`does not insert into the state key value store`, () => {
      expect(
        instancedPromptApplicationStateKeyValueStoreInsert
      ).not.toHaveBeenCalled();
    });

    it(`makes the expected update to the state key value store`, () => {
      expect(
        instancedPromptApplicationStateKeyValueStoreUpdate
      ).toHaveBeenCalledWith(
        `Test Instance Id`,
        `Test State B`,
        `Test Version A`
      );
    });

    it(`does not further update the state key value store`, () => {
      expect(
        instancedPromptApplicationStateKeyValueStoreUpdate
      ).toHaveBeenCalledTimes(1);
    });

    it(`uses the correct "this" when updating the key value store`, () => {
      for (const call of instancedPromptApplicationStateKeyValueStoreUpdate.calls.all()) {
        expect(call.object).toBe(instancedPromptApplication.stateKeyValueStore);
      }
    });

    it(`applies the expected form submission command`, () => {
      expect(
        instancedPromptApplicationApplyFormSubmissionCommand
      ).toHaveBeenCalledWith(
        `Test State A`,
        `Test Instance Id`,
        `Test User Id`,
        `Test Session Id`,
        { type: `formSubmission`, formName: `Test Form Name`, fields: {} }
      );
    });

    it(`does not apply any further form submission commands`, () => {
      expect(
        instancedPromptApplicationApplyFormSubmissionCommand
      ).toHaveBeenCalledTimes(1);
    });

    it(`uses the correct "this" when applying form submission commands`, () => {
      for (const call of instancedPromptApplicationApplyFormSubmissionCommand.calls.all()) {
        expect(call.object).toBe(instancedPromptApplication);
      }
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

    it(`handles one nonexistent instance`, () => {
      expect(
        instancedPromptApplicationNonexistentInstanceEventHandler
      ).toHaveBeenCalledTimes(1);
    });

    it(`uses the correct "this" when handling nonexistent instances`, () => {
      for (const call of instancedPromptApplicationNonexistentInstanceEventHandler.calls.all()) {
        expect(call.object).toBe(instancedPromptApplication);
      }
    });

    it(`passes the event to the nonexistant instance handler`, () => {
      expect(
        instancedPromptApplicationNonexistentInstanceEventHandler
      ).toHaveBeenCalledWith({
        body: {
          metadata: { token: `Test Token` },
          command: {
            type: `formSubmission`,
            formName: `Test Form Name`,
            fields: {},
          },
        },
        instanceId: `Test Instance Id`,
        userId: `Test User Id`,
        sessionId: `Test Session Id`,
      });
    });

    it(`does not list the sessions of any states`, () => {
      expect(instancedPromptApplicationListSessions).not.toHaveBeenCalled();
    });

    it(`renders the first prompt`, () => {
      expect(instancedPromptApplicationRenderPrompt).toHaveBeenCalledWith(
        `Test State A`,
        `Test Instance Id`,
        `Test User Id`,
        `Test Session Id`
      );
    });

    it(`does not render any further prompts`, () => {
      expect(instancedPromptApplicationRenderPrompt).toHaveBeenCalledTimes(1);
    });

    it(`uses the correct "this" when rendering prompts`, () => {
      for (const call of instancedPromptApplicationRenderPrompt.calls.all()) {
        expect(call.object).toBe(instancedPromptApplication);
      }
    });

    it(`returns the expected prompt`, () => {
      expect(output).toEqual({
        messages: [
          {
            sessionId: `Test Session Id`,
            body: {
              formGroups: [{ name: `Test Output Form Group`, forms: [] }],
            },
          },
        ],
      });
    });
  });

  describe(`when the request becomes invalid between the first and second attempts`, () => {
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
      TestVersion
    >;
    let output: WebsocketHostUnserializedOutput<Prompt>;

    beforeAll(async () => {
      instancedPromptApplicationStateKeyValueStoreGet = jasmine
        .createSpy(`instancedPromptApplicationStateKeyValueStoreGet`)
        .and.callFake(async () => {
          const count = instancedPromptApplicationStateKeyValueStoreGet.calls.count();

          switch (count) {
            case 1:
              return {
                type: `successful`,
                value: `Test State A`,
                version: `Test Version A`,
              };

            case 2:
              return {
                type: `successful`,
                value: `Test State C`,
                version: `Test Version B`,
              };

            default:
              throw new Error(`Unexpected call count ${count}.`);
          }
        });

      instancedPromptApplicationStateKeyValueStoreInsert = jasmine.createSpy(
        `instancedPromptApplicationStateKeyValueStoreInsert`
      );

      instancedPromptApplicationStateKeyValueStoreUpdate = jasmine
        .createSpy(`instancedPromptApplicationStateKeyValueStoreUpdate`)
        .and.resolveTo({ type: `doesNotExistOrVersionDoesNotMatch` });

      instancedPromptApplicationRenderPrompt = jasmine
        .createSpy(`instancedPromptApplicationRenderPrompt`)
        .and.callFake(
          async (
            state: TestState,
            instanceId: string,
            userId: string,
            sessionId: string
          ) => {
            instanceId;
            userId;
            sessionId;

            switch (state) {
              case `Test State A`:
                return {
                  formGroups: [
                    {
                      name: `Test Form Group A Name`,
                      forms: [
                        {
                          name: `Test Form Name`,
                          fields: [],
                          submitButtonLabel: `Test Submit Button Label`,
                        },
                      ],
                    },
                  ],
                };

              case `Test State C`:
                return {
                  formGroups: [
                    {
                      name: `Test Form Group B Name`,
                      forms: [
                        {
                          name: `Test Form Name`,
                          fields: [],
                          submitButtonLabel: null,
                        },
                      ],
                    },
                  ],
                };

              default:
                throw new Error(`Unexpected state "${state}".`);
            }
          }
        );

      instancedPromptApplicationApplyFormSubmissionCommand = jasmine
        .createSpy(`instancedPromptApplicationApplyFormSubmissionCommand`)
        .and.resolveTo(`Test State B`);

      instancedPromptApplicationPerformSideEffects = jasmine.createSpy(
        `instancedPromptApplicationPerformSideEffects`
      );

      instancedPromptApplicationListSessions = jasmine.createSpy(
        `instancedPromptApplicationListSessions`
      );

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

      output = await execute(instancedPromptApplication)({
        body: {
          metadata: { token: `Test Token` },
          command: {
            type: `formSubmission`,
            formName: `Test Form Name`,
            fields: {},
          },
        },
        instanceId: `Test Instance Id`,
        userId: `Test User Id`,
        sessionId: `Test Session Id`,
      });
    });

    it(`gets two instances from the key value store`, () => {
      expect(
        instancedPromptApplicationStateKeyValueStoreGet
      ).toHaveBeenCalledTimes(2);
    });

    it(`uses the correct "this" when getting instances from the key value store`, () => {
      for (const call of instancedPromptApplicationStateKeyValueStoreGet.calls.all()) {
        expect(call.object).toBe(instancedPromptApplication.stateKeyValueStore);
      }
    });

    it(`gets the expected instance from the key value store`, () => {
      for (const args of instancedPromptApplicationStateKeyValueStoreGet.calls.allArgs()) {
        expect(args).toEqual([`Test Instance Id`]);
      }
    });

    it(`does not insert into the state key value store`, () => {
      expect(
        instancedPromptApplicationStateKeyValueStoreInsert
      ).not.toHaveBeenCalled();
    });

    it(`makes the first update to the state key value store`, () => {
      expect(
        instancedPromptApplicationStateKeyValueStoreUpdate
      ).toHaveBeenCalledWith(
        `Test Instance Id`,
        `Test State B`,
        `Test Version A`
      );
    });

    it(`does not further update the state key value store`, () => {
      expect(
        instancedPromptApplicationStateKeyValueStoreUpdate
      ).toHaveBeenCalledTimes(1);
    });

    it(`uses the correct "this" when updating the key value store`, () => {
      for (const call of instancedPromptApplicationStateKeyValueStoreUpdate.calls.all()) {
        expect(call.object).toBe(instancedPromptApplication.stateKeyValueStore);
      }
    });

    it(`applies the first form submission command`, () => {
      expect(
        instancedPromptApplicationApplyFormSubmissionCommand
      ).toHaveBeenCalledWith(
        `Test State A`,
        `Test Instance Id`,
        `Test User Id`,
        `Test Session Id`,
        { type: `formSubmission`, formName: `Test Form Name`, fields: {} }
      );
    });

    it(`does not apply any further form submission commands`, () => {
      expect(
        instancedPromptApplicationApplyFormSubmissionCommand
      ).toHaveBeenCalledTimes(1);
    });

    it(`uses the correct "this" when applying form submission commands`, () => {
      for (const call of instancedPromptApplicationApplyFormSubmissionCommand.calls.all()) {
        expect(call.object).toBe(instancedPromptApplication);
      }
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

    it(`does not list the sessions of any states`, () => {
      expect(instancedPromptApplicationListSessions).not.toHaveBeenCalled();
    });

    it(`renders the first prompt`, () => {
      expect(instancedPromptApplicationRenderPrompt).toHaveBeenCalledWith(
        `Test State A`,
        `Test Instance Id`,
        `Test User Id`,
        `Test Session Id`
      );
    });

    it(`renders the second prompt`, () => {
      expect(instancedPromptApplicationRenderPrompt).toHaveBeenCalledWith(
        `Test State C`,
        `Test Instance Id`,
        `Test User Id`,
        `Test Session Id`
      );
    });

    it(`does not render any further prompts`, () => {
      expect(instancedPromptApplicationRenderPrompt).toHaveBeenCalledTimes(2);
    });

    it(`uses the correct "this" when rendering prompts`, () => {
      for (const call of instancedPromptApplicationRenderPrompt.calls.all()) {
        expect(call.object).toBe(instancedPromptApplication);
      }
    });

    it(`returns the expected prompt`, () => {
      expect(output).toEqual({
        messages: [
          {
            sessionId: `Test Session Id`,
            body: {
              formGroups: [
                {
                  name: `Test Form Group B Name`,
                  forms: [
                    {
                      name: `Test Form Name`,
                      fields: [],
                      submitButtonLabel: null,
                    },
                  ],
                },
              ],
            },
          },
        ],
      });
    });
  });

  describe(`when form submission succeeds the third time`, () => {
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
      TestVersion
    >;
    let output: WebsocketHostUnserializedOutput<Prompt>;

    beforeAll(async () => {
      instancedPromptApplicationStateKeyValueStoreGet = jasmine
        .createSpy(`instancedPromptApplicationStateKeyValueStoreGet`)
        .and.callFake(async () => {
          const count = instancedPromptApplicationStateKeyValueStoreGet.calls.count();

          switch (count) {
            case 1:
              return {
                type: `successful`,
                value: `Test State A`,
                version: `Test Version A`,
              };

            case 2:
              return {
                type: `successful`,
                value: `Test State C`,
                version: `Test Version B`,
              };

            case 3:
              return {
                type: `successful`,
                value: `Test State E`,
                version: `Test Version C`,
              };

            default:
              throw new Error(`Unexpected call count ${count}.`);
          }
        });

      instancedPromptApplicationStateKeyValueStoreInsert = jasmine.createSpy(
        `instancedPromptApplicationStateKeyValueStoreInsert`
      );

      instancedPromptApplicationStateKeyValueStoreUpdate = jasmine
        .createSpy(`instancedPromptApplicationStateKeyValueStoreUpdate`)
        .and.callFake(
          async (
            key: string,
            value: TestState,
            expectedVersion: TestVersion
          ) => {
            key;
            expectedVersion;

            switch (value) {
              case `Test State B`:
              case `Test State D`:
                return {
                  type: `doesNotExistOrVersionDoesNotMatch`,
                };

              case `Test State F`:
                return {
                  type: `successful`,
                };

              default:
                throw new Error(`Unexpected value ${value}.`);
            }
          }
        );

      instancedPromptApplicationRenderPrompt = jasmine
        .createSpy(`instancedPromptApplicationRenderPrompt`)
        .and.callFake(
          async (
            state: TestState,
            instanceId: string,
            userId: string,
            sessionId: string
          ) => {
            instanceId;
            userId;

            switch (state) {
              case `Test State A`:
                switch (sessionId) {
                  case `Test Session Id`:
                    return {
                      formGroups: [
                        {
                          name: `Test Form Group A Name`,
                          forms: [
                            {
                              name: `Test Form Name`,
                              fields: [],
                              submitButtonLabel: `Test Submit Button Label`,
                            },
                          ],
                        },
                      ],
                    };
                  default:
                    throw new Error(`Unexpected session ID "${sessionId}".`);
                }

              case `Test State C`:
                switch (sessionId) {
                  case `Test Session Id`:
                    return {
                      formGroups: [
                        {
                          name: `Test Form Group B Name`,
                          forms: [
                            {
                              name: `Test Form Name`,
                              fields: [],
                              submitButtonLabel: `Test Submit Button Label`,
                            },
                          ],
                        },
                      ],
                    };
                  default:
                    throw new Error(`Unexpected session ID "${sessionId}".`);
                }

              case `Test State E`:
                switch (sessionId) {
                  case `Test Session Id`:
                    return {
                      formGroups: [
                        {
                          name: `Test Form Group C Name`,
                          forms: [
                            {
                              name: `Test Form Name`,
                              fields: [],
                              submitButtonLabel: `Test Submit Button Label`,
                            },
                          ],
                        },
                      ],
                    };

                  case `Test Previous Session Id`:
                    return {
                      formGroups: [
                        {
                          name: `Test Previous Session Previous State Form Group Name`,
                          forms: [],
                        },
                      ],
                    };

                  case `Test Next Session Id`:
                    return {
                      formGroups: [
                        {
                          name: `Test Next Session Previous State Form Group Name`,
                          forms: [],
                        },
                      ],
                    };

                  default:
                    throw new Error(`Unexpected session ID "${sessionId}".`);
                }

              case `Test State F`:
                switch (sessionId) {
                  case `Test Session Id`:
                    return {
                      formGroups: [
                        {
                          name: `Test Next State Form Group Name`,
                          forms: [],
                        },
                      ],
                    };

                  case `Test Previous Session Id`:
                    return {
                      formGroups: [
                        {
                          name: `Test Previous Session Next State Form Group Name`,
                          forms: [],
                        },
                      ],
                    };

                  case `Test Next Session Id`:
                    return {
                      formGroups: [
                        {
                          name: `Test Next Session Next State Form Group Name`,
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

      instancedPromptApplicationApplyFormSubmissionCommand = jasmine
        .createSpy(`instancedPromptApplicationApplyFormSubmissionCommand`)
        .and.callFake(
          async (
            state: TestState,
            instanceId: string,
            userId: string,
            sessionId: string,
            formSubmissionCommand: FormSubmissionCommand
          ) => {
            instanceId;
            userId;
            sessionId;
            formSubmissionCommand;

            switch (state) {
              case `Test State A`:
                return `Test State B`;

              case `Test State C`:
                return `Test State D`;

              case `Test State E`:
                return `Test State F`;

              default:
                throw new Error(`Unexpected state "${state}".`);
            }
          }
        );

      instancedPromptApplicationPerformSideEffects = jasmine
        .createSpy(`instancedPromptApplicationPerformSideEffects`)
        .and.resolveTo();

      instancedPromptApplicationListSessions = jasmine
        .createSpy(`instancedPromptApplicationListSessions`)
        .and.callFake(async (state) => {
          switch (state) {
            case `Test State E`:
              return [
                {
                  sessionId: `Test Previous Session Id`,
                  userId: `Test Previous User Id`,
                },
              ];

            case `Test State F`:
              return [
                {
                  sessionId: `Test Next Session Id`,
                  userId: `Test Next User Id`,
                },
              ];

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

      output = await execute(instancedPromptApplication)({
        body: {
          metadata: { token: `Test Token` },
          command: {
            type: `formSubmission`,
            formName: `Test Form Name`,
            fields: {},
          },
        },
        instanceId: `Test Instance Id`,
        userId: `Test User Id`,
        sessionId: `Test Session Id`,
      });
    });

    it(`gets three instances from the key value store`, () => {
      expect(
        instancedPromptApplicationStateKeyValueStoreGet
      ).toHaveBeenCalledTimes(3);
    });

    it(`uses the correct "this" when getting instances from the key value store`, () => {
      for (const call of instancedPromptApplicationStateKeyValueStoreGet.calls.all()) {
        expect(call.object).toBe(instancedPromptApplication.stateKeyValueStore);
      }
    });

    it(`gets the expected instance from the key value store`, () => {
      for (const args of instancedPromptApplicationStateKeyValueStoreGet.calls.allArgs()) {
        expect(args).toEqual([`Test Instance Id`]);
      }
    });

    it(`does not insert into the state key value store`, () => {
      expect(
        instancedPromptApplicationStateKeyValueStoreInsert
      ).not.toHaveBeenCalled();
    });

    it(`updates the key value store with the first updated state`, () => {
      expect(
        instancedPromptApplicationStateKeyValueStoreUpdate
      ).toHaveBeenCalledWith(
        `Test Instance Id`,
        `Test State B`,
        `Test Version A`
      );
    });

    it(`updates the key value store with the second updated state`, () => {
      expect(
        instancedPromptApplicationStateKeyValueStoreUpdate
      ).toHaveBeenCalledWith(
        `Test Instance Id`,
        `Test State D`,
        `Test Version B`
      );
    });

    it(`updates the key value store with the second updated state`, () => {
      expect(
        instancedPromptApplicationStateKeyValueStoreUpdate
      ).toHaveBeenCalledWith(
        `Test Instance Id`,
        `Test State F`,
        `Test Version C`
      );
    });

    it(`does not further update the state key value store`, () => {
      expect(
        instancedPromptApplicationStateKeyValueStoreUpdate
      ).toHaveBeenCalledTimes(3);
    });

    it(`uses the correct "this" when updating the key value store`, () => {
      for (const call of instancedPromptApplicationStateKeyValueStoreUpdate.calls.all()) {
        expect(call.object).toBe(instancedPromptApplication.stateKeyValueStore);
      }
    });

    it(`applies the request to the first previous state`, () => {
      expect(
        instancedPromptApplicationApplyFormSubmissionCommand
      ).toHaveBeenCalledWith(
        `Test State A`,
        `Test Instance Id`,
        `Test User Id`,
        `Test Session Id`,
        {
          type: `formSubmission`,
          formName: `Test Form Name`,
          fields: {},
        }
      );
    });

    it(`applies the request to the first previous state`, () => {
      expect(
        instancedPromptApplicationApplyFormSubmissionCommand
      ).toHaveBeenCalledWith(
        `Test State C`,
        `Test Instance Id`,
        `Test User Id`,
        `Test Session Id`,
        {
          type: `formSubmission`,
          formName: `Test Form Name`,
          fields: {},
        }
      );
    });

    it(`applies the request to the third previous state`, () => {
      expect(
        instancedPromptApplicationApplyFormSubmissionCommand
      ).toHaveBeenCalledWith(
        `Test State E`,
        `Test Instance Id`,
        `Test User Id`,
        `Test Session Id`,
        {
          type: `formSubmission`,
          formName: `Test Form Name`,
          fields: {},
        }
      );
    });

    it(`does not apply any further form submission commands`, () => {
      expect(
        instancedPromptApplicationApplyFormSubmissionCommand
      ).toHaveBeenCalledTimes(3);
    });

    it(`uses the correct "this" when applying form submission commands`, () => {
      for (const call of instancedPromptApplicationApplyFormSubmissionCommand.calls.all()) {
        expect(call.object).toBe(instancedPromptApplication);
      }
    });

    it(`performs the expected side effects`, () => {
      expect(instancedPromptApplicationPerformSideEffects).toHaveBeenCalledWith(
        `Test State E`,
        `Test State F`,
        `Test Instance Id`,
        `Test User Id`,
        `Test Session Id`,
        {
          type: `formSubmission`,
          formName: `Test Form Name`,
          fields: {},
        }
      );
    });

    it(`does not perform any further side effects`, () => {
      expect(
        instancedPromptApplicationPerformSideEffects
      ).toHaveBeenCalledTimes(1);
    });

    it(`uses the correct "this" when performing side effects`, () => {
      for (const call of instancedPromptApplicationPerformSideEffects.calls.all()) {
        expect(call.object).toBe(instancedPromptApplication);
      }
    });

    it(`does not handle any invalid requests`, () => {
      expect(
        instancedPromptApplicationNonexistentInstanceEventHandler
      ).not.toHaveBeenCalled();
    });

    it(`does not handle any nonexistent instances`, () => {
      expect(
        instancedPromptApplicationInvalidRequestEventHandler
      ).not.toHaveBeenCalled();
    });

    it(`lists the sessions of the previous state`, () => {
      expect(instancedPromptApplicationListSessions).toHaveBeenCalledWith(
        `Test State E`
      );
    });

    it(`lists the sessions of the next state`, () => {
      expect(instancedPromptApplicationListSessions).toHaveBeenCalledWith(
        `Test State F`
      );
    });

    it(`does not list the sessions of any further states`, () => {
      expect(instancedPromptApplicationListSessions).toHaveBeenCalledTimes(2);
    });

    it(`uses the correct "this" when listing sessions of states`, () => {
      for (const call of instancedPromptApplicationListSessions.calls.all()) {
        expect(call.object).toBe(instancedPromptApplication);
      }
    });

    it(`renders the prompt for the incoming request the first time`, () => {
      expect(instancedPromptApplicationRenderPrompt).toHaveBeenCalledWith(
        `Test State A`,
        `Test Instance Id`,
        `Test User Id`,
        `Test Session Id`
      );
    });

    it(`renders the prompt for the incoming request the second time`, () => {
      expect(instancedPromptApplicationRenderPrompt).toHaveBeenCalledWith(
        `Test State C`,
        `Test Instance Id`,
        `Test User Id`,
        `Test Session Id`
      );
    });

    it(`renders the prompt for the incoming request the third time`, () => {
      expect(instancedPromptApplicationRenderPrompt).toHaveBeenCalledWith(
        `Test State E`,
        `Test Instance Id`,
        `Test User Id`,
        `Test Session Id`
      );
    });

    it(`renders the prompt for the requesting session`, () => {
      expect(instancedPromptApplicationRenderPrompt).toHaveBeenCalledWith(
        `Test State F`,
        `Test Instance Id`,
        `Test User Id`,
        `Test Session Id`
      );
    });

    it(`renders the prompt for sessions listed by the previous state`, () => {
      expect(instancedPromptApplicationRenderPrompt).toHaveBeenCalledWith(
        `Test State E`,
        `Test Instance Id`,
        `Test Previous User Id`,
        `Test Previous Session Id`
      );

      expect(instancedPromptApplicationRenderPrompt).toHaveBeenCalledWith(
        `Test State F`,
        `Test Instance Id`,
        `Test Previous User Id`,
        `Test Previous Session Id`
      );
    });

    it(`renders the prompt for sessions listed by the next state`, () => {
      expect(instancedPromptApplicationRenderPrompt).toHaveBeenCalledWith(
        `Test State E`,
        `Test Instance Id`,
        `Test Next User Id`,
        `Test Next Session Id`
      );

      expect(instancedPromptApplicationRenderPrompt).toHaveBeenCalledWith(
        `Test State F`,
        `Test Instance Id`,
        `Test Next User Id`,
        `Test Next Session Id`
      );
    });

    it(`does not render any further prompts`, () => {
      expect(instancedPromptApplicationRenderPrompt).toHaveBeenCalledTimes(8);
    });

    it(`uses the correct "this" when rendering prompts`, () => {
      for (const call of instancedPromptApplicationRenderPrompt.calls.all()) {
        expect(call.object).toBe(instancedPromptApplication);
      }
    });

    it(`returns the generated response`, () => {
      expect(output).toEqual({
        messages: [
          {
            sessionId: `Test Session Id`,
            body: {
              formGroups: [
                {
                  name: `Test Next State Form Group Name`,
                  forms: [],
                },
              ],
            },
          },
          {
            sessionId: `Test Previous Session Id`,
            body: {
              formGroups: [
                {
                  name: `Test Previous Session Next State Form Group Name`,
                  forms: [],
                },
              ],
            },
          },
          {
            sessionId: `Test Next Session Id`,
            body: {
              formGroups: [
                {
                  name: `Test Next Session Next State Form Group Name`,
                  forms: [],
                },
              ],
            },
          },
        ],
      });
    });
  });

  describe(`when the instance is deleted between the second and third attempts`, () => {
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
      TestVersion
    >;
    let output: WebsocketHostUnserializedOutput<Prompt>;

    beforeAll(async () => {
      instancedPromptApplicationStateKeyValueStoreGet = jasmine
        .createSpy(`instancedPromptApplicationStateKeyValueStoreGet`)
        .and.callFake(async () => {
          const count = instancedPromptApplicationStateKeyValueStoreGet.calls.count();

          switch (count) {
            case 1:
              return {
                type: `successful`,
                value: `Test State A`,
                version: `Test Version A`,
              };

            case 2:
              return {
                type: `successful`,
                value: `Test State C`,
                version: `Test Version B`,
              };

            case 3:
              return {
                type: `doesNotExist`,
              };

            default:
              throw new Error(`Unexpected call count ${count}.`);
          }
        });

      instancedPromptApplicationStateKeyValueStoreInsert = jasmine.createSpy(
        `instancedPromptApplicationStateKeyValueStoreInsert`
      );

      instancedPromptApplicationStateKeyValueStoreUpdate = jasmine
        .createSpy(`instancedPromptApplicationStateKeyValueStoreUpdate`)
        .and.resolveTo({ type: `doesNotExistOrVersionDoesNotMatch` });

      instancedPromptApplicationRenderPrompt = jasmine
        .createSpy(`instancedPromptApplicationRenderPrompt`)
        .and.callFake(
          async (
            state: TestState,
            instanceId: string,
            userId: string,
            sessionId: string
          ) => {
            instanceId;
            userId;
            sessionId;

            switch (state) {
              case `Test State A`:
                return {
                  formGroups: [
                    {
                      name: `Test Form Group A Name`,
                      forms: [
                        {
                          name: `Test Form Name`,
                          fields: [],
                          submitButtonLabel: `Test Submit Button Label`,
                        },
                      ],
                    },
                  ],
                };

              case `Test State B`:
                return {
                  formGroups: [
                    {
                      name: `Test Form Group B Name`,
                      forms: [
                        {
                          name: `Test Form Name`,
                          fields: [],
                          submitButtonLabel: `Test Submit Button Label`,
                        },
                      ],
                    },
                  ],
                };

              case `Test State C`:
                return {
                  formGroups: [
                    {
                      name: `Test Form Group C Name`,
                      forms: [
                        {
                          name: `Test Form Name`,
                          fields: [],
                          submitButtonLabel: `Test Submit Button Label`,
                        },
                      ],
                    },
                  ],
                };

              default:
                throw new Error(`Unexpected state "${state}".`);
            }
          }
        );

      instancedPromptApplicationApplyFormSubmissionCommand = jasmine
        .createSpy(`instancedPromptApplicationApplyFormSubmissionCommand`)
        .and.callFake(
          async (
            state: TestState,
            instanceId: string,
            userId: string,
            sessionId: string,
            formSubmissionCommand: FormSubmissionCommand
          ) => {
            instanceId;
            userId;
            sessionId;
            formSubmissionCommand;

            switch (state) {
              case `Test State A`:
                return `Test State B`;

              case `Test State C`:
                return `Test State D`;

              default:
                throw new Error(`Unexpected state "${state}".`);
            }
          }
        );

      instancedPromptApplicationPerformSideEffects = jasmine.createSpy(
        `instancedPromptApplicationPerformSideEffects`
      );

      instancedPromptApplicationListSessions = jasmine.createSpy(
        `instancedPromptApplicationListSessions`
      );

      instancedPromptApplicationInvalidRequestEventHandler = jasmine.createSpy(
        `instancedPromptApplicationInvalidRequestEventHandler`
      );

      instancedPromptApplicationNonexistentInstanceEventHandler = jasmine
        .createSpy(`instancedPromptApplicationNonexistentInstanceEventHandler`)
        .and.resolveTo({
          messages: [
            {
              sessionId: `Test Session Id`,
              body: {
                formGroups: [{ name: `Test Output Form Group`, forms: [] }],
              },
            },
          ],
        });

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

      output = await execute(instancedPromptApplication)({
        body: {
          metadata: { token: `Test Token` },
          command: {
            type: `formSubmission`,
            formName: `Test Form Name`,
            fields: {},
          },
        },
        instanceId: `Test Instance Id`,
        userId: `Test User Id`,
        sessionId: `Test Session Id`,
      });
    });

    it(`gets two instances from the key value store`, () => {
      expect(
        instancedPromptApplicationStateKeyValueStoreGet
      ).toHaveBeenCalledTimes(3);
    });

    it(`uses the correct "this" when getting instances from the key value store`, () => {
      for (const call of instancedPromptApplicationStateKeyValueStoreGet.calls.all()) {
        expect(call.object).toBe(instancedPromptApplication.stateKeyValueStore);
      }
    });

    it(`gets the expected instance from the key value store`, () => {
      for (const args of instancedPromptApplicationStateKeyValueStoreGet.calls.allArgs()) {
        expect(args).toEqual([`Test Instance Id`]);
      }
    });

    it(`does not insert into the state key value store`, () => {
      expect(
        instancedPromptApplicationStateKeyValueStoreInsert
      ).not.toHaveBeenCalled();
    });

    it(`makes the first update to the state key value store`, () => {
      expect(
        instancedPromptApplicationStateKeyValueStoreUpdate
      ).toHaveBeenCalledWith(
        `Test Instance Id`,
        `Test State B`,
        `Test Version A`
      );
    });

    it(`makes the second update to the state key value store`, () => {
      expect(
        instancedPromptApplicationStateKeyValueStoreUpdate
      ).toHaveBeenCalledWith(
        `Test Instance Id`,
        `Test State D`,
        `Test Version B`
      );
    });

    it(`does not further update the state key value store`, () => {
      expect(
        instancedPromptApplicationStateKeyValueStoreUpdate
      ).toHaveBeenCalledTimes(2);
    });

    it(`uses the correct "this" when updating the key value store`, () => {
      for (const call of instancedPromptApplicationStateKeyValueStoreUpdate.calls.all()) {
        expect(call.object).toBe(instancedPromptApplication.stateKeyValueStore);
      }
    });

    it(`applies the first form submission command`, () => {
      expect(
        instancedPromptApplicationApplyFormSubmissionCommand
      ).toHaveBeenCalledWith(
        `Test State A`,
        `Test Instance Id`,
        `Test User Id`,
        `Test Session Id`,
        { type: `formSubmission`, formName: `Test Form Name`, fields: {} }
      );
    });

    it(`applies the second form submission command`, () => {
      expect(
        instancedPromptApplicationApplyFormSubmissionCommand
      ).toHaveBeenCalledWith(
        `Test State C`,
        `Test Instance Id`,
        `Test User Id`,
        `Test Session Id`,
        { type: `formSubmission`, formName: `Test Form Name`, fields: {} }
      );
    });

    it(`does not apply any further form submission commands`, () => {
      expect(
        instancedPromptApplicationApplyFormSubmissionCommand
      ).toHaveBeenCalledTimes(2);
    });

    it(`uses the correct "this" when applying form submission commands`, () => {
      for (const call of instancedPromptApplicationApplyFormSubmissionCommand.calls.all()) {
        expect(call.object).toBe(instancedPromptApplication);
      }
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

    it(`handles one nonexistent instance`, () => {
      expect(
        instancedPromptApplicationNonexistentInstanceEventHandler
      ).toHaveBeenCalledTimes(1);
    });

    it(`uses the correct "this" when handling nonexistent instances`, () => {
      for (const call of instancedPromptApplicationNonexistentInstanceEventHandler.calls.all()) {
        expect(call.object).toBe(instancedPromptApplication);
      }
    });

    it(`passes the event to the nonexistant instance handler`, () => {
      expect(
        instancedPromptApplicationNonexistentInstanceEventHandler
      ).toHaveBeenCalledWith({
        body: {
          metadata: { token: `Test Token` },
          command: {
            type: `formSubmission`,
            formName: `Test Form Name`,
            fields: {},
          },
        },
        instanceId: `Test Instance Id`,
        userId: `Test User Id`,
        sessionId: `Test Session Id`,
      });
    });

    it(`does not list the sessions of any states`, () => {
      expect(instancedPromptApplicationListSessions).not.toHaveBeenCalled();
    });

    it(`renders the first prompt`, () => {
      expect(instancedPromptApplicationRenderPrompt).toHaveBeenCalledWith(
        `Test State A`,
        `Test Instance Id`,
        `Test User Id`,
        `Test Session Id`
      );
    });

    it(`renders the second prompt`, () => {
      expect(instancedPromptApplicationRenderPrompt).toHaveBeenCalledWith(
        `Test State C`,
        `Test Instance Id`,
        `Test User Id`,
        `Test Session Id`
      );
    });

    it(`does not render any further prompts`, () => {
      expect(instancedPromptApplicationRenderPrompt).toHaveBeenCalledTimes(2);
    });

    it(`uses the correct "this" when rendering prompts`, () => {
      for (const call of instancedPromptApplicationRenderPrompt.calls.all()) {
        expect(call.object).toBe(instancedPromptApplication);
      }
    });

    it(`returns the expected prompt`, () => {
      expect(output).toEqual({
        messages: [
          {
            sessionId: `Test Session Id`,
            body: {
              formGroups: [{ name: `Test Output Form Group`, forms: [] }],
            },
          },
        ],
      });
    });
  });

  describe(`when the request becomes invalid between the second and third attempts`, () => {
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
      TestVersion
    >;
    let output: WebsocketHostUnserializedOutput<Prompt>;

    beforeAll(async () => {
      instancedPromptApplicationStateKeyValueStoreGet = jasmine
        .createSpy(`instancedPromptApplicationStateKeyValueStoreGet`)
        .and.callFake(async () => {
          const count = instancedPromptApplicationStateKeyValueStoreGet.calls.count();

          switch (count) {
            case 1:
              return {
                type: `successful`,
                value: `Test State A`,
                version: `Test Version A`,
              };

            case 2:
              return {
                type: `successful`,
                value: `Test State C`,
                version: `Test Version B`,
              };

            case 3:
              return {
                type: `successful`,
                value: `Test State E`,
                version: `Test Version C`,
              };

            default:
              throw new Error(`Unexpected call count ${count}.`);
          }
        });

      instancedPromptApplicationStateKeyValueStoreInsert = jasmine.createSpy(
        `instancedPromptApplicationStateKeyValueStoreInsert`
      );

      instancedPromptApplicationStateKeyValueStoreUpdate = jasmine
        .createSpy(`instancedPromptApplicationStateKeyValueStoreUpdate`)
        .and.resolveTo({ type: `doesNotExistOrVersionDoesNotMatch` });

      instancedPromptApplicationRenderPrompt = jasmine
        .createSpy(`instancedPromptApplicationRenderPrompt`)
        .and.callFake(
          async (
            state: TestState,
            instanceId: string,
            userId: string,
            sessionId: string
          ) => {
            instanceId;
            userId;
            sessionId;

            switch (state) {
              case `Test State A`:
                return {
                  formGroups: [
                    {
                      name: `Test Form Group A Name`,
                      forms: [
                        {
                          name: `Test Form Name`,
                          fields: [],
                          submitButtonLabel: `Test Submit Button Label`,
                        },
                      ],
                    },
                  ],
                };

              case `Test State C`:
                return {
                  formGroups: [
                    {
                      name: `Test Form Group B Name`,
                      forms: [
                        {
                          name: `Test Form Name`,
                          fields: [],
                          submitButtonLabel: `Test Submit Button Label`,
                        },
                      ],
                    },
                  ],
                };

              case `Test State E`:
                return {
                  formGroups: [
                    {
                      name: `Test Form Group C Name`,
                      forms: [
                        {
                          name: `Test Form Name`,
                          fields: [],
                          submitButtonLabel: null,
                        },
                      ],
                    },
                  ],
                };

              default:
                throw new Error(`Unexpected state "${state}".`);
            }
          }
        );

      instancedPromptApplicationApplyFormSubmissionCommand = jasmine
        .createSpy(`instancedPromptApplicationApplyFormSubmissionCommand`)
        .and.callFake(
          async (
            state: TestState,
            instanceId: string,
            userId: string,
            sessionId: string,
            formSubmissionCommand: FormSubmissionCommand
          ) => {
            instanceId;
            userId;
            sessionId;
            formSubmissionCommand;

            switch (state) {
              case `Test State A`:
                return `Test State B`;

              case `Test State C`:
                return `Test State D`;

              default:
                throw new Error(`Unexpected state "${state}".`);
            }
          }
        );

      instancedPromptApplicationPerformSideEffects = jasmine.createSpy(
        `instancedPromptApplicationPerformSideEffects`
      );

      instancedPromptApplicationListSessions = jasmine.createSpy(
        `instancedPromptApplicationListSessions`
      );

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

      output = await execute(instancedPromptApplication)({
        body: {
          metadata: { token: `Test Token` },
          command: {
            type: `formSubmission`,
            formName: `Test Form Name`,
            fields: {},
          },
        },
        instanceId: `Test Instance Id`,
        userId: `Test User Id`,
        sessionId: `Test Session Id`,
      });
    });

    it(`gets three instances from the key value store`, () => {
      expect(
        instancedPromptApplicationStateKeyValueStoreGet
      ).toHaveBeenCalledTimes(3);
    });

    it(`uses the correct "this" when getting instances from the key value store`, () => {
      for (const call of instancedPromptApplicationStateKeyValueStoreGet.calls.all()) {
        expect(call.object).toBe(instancedPromptApplication.stateKeyValueStore);
      }
    });

    it(`gets the expected instance from the key value store`, () => {
      for (const args of instancedPromptApplicationStateKeyValueStoreGet.calls.allArgs()) {
        expect(args).toEqual([`Test Instance Id`]);
      }
    });

    it(`does not insert into the state key value store`, () => {
      expect(
        instancedPromptApplicationStateKeyValueStoreInsert
      ).not.toHaveBeenCalled();
    });

    it(`makes the first update to the state key value store`, () => {
      expect(
        instancedPromptApplicationStateKeyValueStoreUpdate
      ).toHaveBeenCalledWith(
        `Test Instance Id`,
        `Test State B`,
        `Test Version A`
      );
    });

    it(`makes the second update to the state key value store`, () => {
      expect(
        instancedPromptApplicationStateKeyValueStoreUpdate
      ).toHaveBeenCalledWith(
        `Test Instance Id`,
        `Test State D`,
        `Test Version B`
      );
    });

    it(`does not further update the state key value store`, () => {
      expect(
        instancedPromptApplicationStateKeyValueStoreUpdate
      ).toHaveBeenCalledTimes(2);
    });

    it(`uses the correct "this" when updating the key value store`, () => {
      for (const call of instancedPromptApplicationStateKeyValueStoreUpdate.calls.all()) {
        expect(call.object).toBe(instancedPromptApplication.stateKeyValueStore);
      }
    });

    it(`applies the first form submission command`, () => {
      expect(
        instancedPromptApplicationApplyFormSubmissionCommand
      ).toHaveBeenCalledWith(
        `Test State A`,
        `Test Instance Id`,
        `Test User Id`,
        `Test Session Id`,
        { type: `formSubmission`, formName: `Test Form Name`, fields: {} }
      );
    });

    it(`applies the second form submission command`, () => {
      expect(
        instancedPromptApplicationApplyFormSubmissionCommand
      ).toHaveBeenCalledWith(
        `Test State C`,
        `Test Instance Id`,
        `Test User Id`,
        `Test Session Id`,
        { type: `formSubmission`, formName: `Test Form Name`, fields: {} }
      );
    });

    it(`does not apply any further form submission commands`, () => {
      expect(
        instancedPromptApplicationApplyFormSubmissionCommand
      ).toHaveBeenCalledTimes(2);
    });

    it(`uses the correct "this" when applying form submission commands`, () => {
      for (const call of instancedPromptApplicationApplyFormSubmissionCommand.calls.all()) {
        expect(call.object).toBe(instancedPromptApplication);
      }
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

    it(`does not list the sessions of any states`, () => {
      expect(instancedPromptApplicationListSessions).not.toHaveBeenCalled();
    });

    it(`renders the first prompt`, () => {
      expect(instancedPromptApplicationRenderPrompt).toHaveBeenCalledWith(
        `Test State A`,
        `Test Instance Id`,
        `Test User Id`,
        `Test Session Id`
      );
    });

    it(`renders the second prompt`, () => {
      expect(instancedPromptApplicationRenderPrompt).toHaveBeenCalledWith(
        `Test State C`,
        `Test Instance Id`,
        `Test User Id`,
        `Test Session Id`
      );
    });

    it(`renders the third prompt`, () => {
      expect(instancedPromptApplicationRenderPrompt).toHaveBeenCalledWith(
        `Test State E`,
        `Test Instance Id`,
        `Test User Id`,
        `Test Session Id`
      );
    });

    it(`does not render any further prompts`, () => {
      expect(instancedPromptApplicationRenderPrompt).toHaveBeenCalledTimes(3);
    });

    it(`uses the correct "this" when rendering prompts`, () => {
      for (const call of instancedPromptApplicationRenderPrompt.calls.all()) {
        expect(call.object).toBe(instancedPromptApplication);
      }
    });

    it(`returns the expected prompt`, () => {
      expect(output).toEqual({
        messages: [
          {
            sessionId: `Test Session Id`,
            body: {
              formGroups: [
                {
                  name: `Test Form Group C Name`,
                  forms: [
                    {
                      name: `Test Form Name`,
                      fields: [],
                      submitButtonLabel: null,
                    },
                  ],
                },
              ],
            },
          },
        ],
      });
    });
  });
});
