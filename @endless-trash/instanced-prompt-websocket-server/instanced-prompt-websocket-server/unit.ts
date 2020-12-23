import { Json } from "@endless-trash/immutable-json-type";
import {
  KeyValueStore,
  KeyValueStoreSuccessfulGetResult,
} from "@endless-trash/key-value-store";
import { Prompt } from "@endless-trash/prompt";
import { WebsocketHostUnserializedOutput } from "@endless-trash/websocket-host-body-serializer";
import { WebsocketHostOutput } from "@endless-trash/websocket-host/websocket-host-output";
import { instancedPromptWebsocketServer } from "..";
import { InstancedPromptApplication } from "../instanced-prompt-application";

describe(`instancedPromptWebsocketServer`, () => {
  type TestState = `Test State`;
  type TestVersion = `Test Version`;

  describe(`when the request is not valid json`, () => {
    let instancedPromptApplicationStateKeyValueStoreGet: jasmine.Spy;
    let instancedPromptApplicationStateKeyValueStoreInsert: jasmine.Spy;
    let instancedPromptApplicationStateKeyValueStoreUpdate: jasmine.Spy;
    let instancedPromptApplicationStateKeyValueStore: KeyValueStore<
      TestState,
      TestVersion
    >;
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
    let output: WebsocketHostOutput;

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

      instancedPromptApplicationStateKeyValueStore = {
        get: instancedPromptApplicationStateKeyValueStoreGet,
        insert: instancedPromptApplicationStateKeyValueStoreInsert,
        update: instancedPromptApplicationStateKeyValueStoreUpdate,
      };

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

      instancedPromptApplicationInvalidRequestEventHandler = jasmine
        .createSpy(`instancedPromptApplicationInvalidRequestEventHandler`)
        .and.resolveTo({
          messages: [
            {
              body: { testOutputKey: `Test Output Value` },
              sessionId: `Test Session Id`,
            },
          ],
        } as WebsocketHostUnserializedOutput<Json>);

      instancedPromptApplicationNonexistentInstanceEventHandler = jasmine.createSpy(
        `instancedPromptApplicationNonexistentInstanceEventHandler`
      );

      instancedPromptApplication = {
        stateKeyValueStore: instancedPromptApplicationStateKeyValueStore,
        renderPrompt: instancedPromptApplicationRenderPrompt,
        applyFormSubmissionCommand: instancedPromptApplicationApplyFormSubmissionCommand,
        performSideEffects: instancedPromptApplicationPerformSideEffects,
        listSessions: instancedPromptApplicationListSessions,
        invalidRequestEventHandler: instancedPromptApplicationInvalidRequestEventHandler,
        nonexistentInstanceEventHandler: instancedPromptApplicationNonexistentInstanceEventHandler,
      };

      const eventHandler = instancedPromptWebsocketServer(
        instancedPromptApplication
      );

      output = await eventHandler({
        body: `Test Non-JSON`,
        sessionId: `Test Session Id`,
      });
    });

    it(`does not get from the state store`, () => {
      expect(
        instancedPromptApplicationStateKeyValueStoreGet
      ).not.toHaveBeenCalled();
    });

    it(`does not insert into the state store`, () => {
      expect(
        instancedPromptApplicationStateKeyValueStoreInsert
      ).not.toHaveBeenCalled();
    });

    it(`does not update the state store`, () => {
      expect(
        instancedPromptApplicationStateKeyValueStoreUpdate
      ).not.toHaveBeenCalled();
    });

    it(`does not render any prompts`, () => {
      expect(instancedPromptApplicationRenderPrompt).not.toHaveBeenCalled();
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

    it(`does not list any sessions`, () => {
      expect(instancedPromptApplicationListSessions).not.toHaveBeenCalled();
    });

    it(`handles one invalid request`, () => {
      expect(
        instancedPromptApplicationInvalidRequestEventHandler
      ).toHaveBeenCalledTimes(1);
    });

    it(`passes the input to the invalid request handler`, () => {
      expect(
        instancedPromptApplicationInvalidRequestEventHandler
      ).toHaveBeenCalledWith({
        body: `Test Non-JSON`,
        sessionId: `Test Session Id`,
      });
    });

    it(`uses the correct "this" when handling invalid requests`, () => {
      for (const call of instancedPromptApplicationInvalidRequestEventHandler.calls.all()) {
        expect(call.object).toBe(instancedPromptApplication);
      }
    });

    it(`does not handle any nonexistent instances`, () => {
      expect(
        instancedPromptApplicationNonexistentInstanceEventHandler
      ).not.toHaveBeenCalled();
    });

    it(`returns the result of the invalid request handler`, () => {
      expect(output).toEqual({
        messages: [
          {
            body: `{"testOutputKey":"Test Output Value"}`,
            sessionId: `Test Session Id`,
          },
        ],
      });
    });
  });

  describe(`when the request is not partially valid`, () => {
    let instancedPromptApplicationStateKeyValueStoreGet: jasmine.Spy;
    let instancedPromptApplicationStateKeyValueStoreInsert: jasmine.Spy;
    let instancedPromptApplicationStateKeyValueStoreUpdate: jasmine.Spy;
    let instancedPromptApplicationStateKeyValueStore: KeyValueStore<
      TestState,
      TestVersion
    >;
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
    let output: WebsocketHostOutput;

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

      instancedPromptApplicationStateKeyValueStore = {
        get: instancedPromptApplicationStateKeyValueStoreGet,
        insert: instancedPromptApplicationStateKeyValueStoreInsert,
        update: instancedPromptApplicationStateKeyValueStoreUpdate,
      };

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

      instancedPromptApplicationInvalidRequestEventHandler = jasmine
        .createSpy(`instancedPromptApplicationInvalidRequestEventHandler`)
        .and.resolveTo({
          messages: [
            {
              body: { testOutputKey: `Test Output Value` },
              sessionId: `Test Session Id`,
            },
          ],
        } as WebsocketHostUnserializedOutput<Json>);

      instancedPromptApplicationNonexistentInstanceEventHandler = jasmine.createSpy(
        `instancedPromptApplicationNonexistentInstanceEventHandler`
      );

      instancedPromptApplication = {
        stateKeyValueStore: instancedPromptApplicationStateKeyValueStore,
        renderPrompt: instancedPromptApplicationRenderPrompt,
        applyFormSubmissionCommand: instancedPromptApplicationApplyFormSubmissionCommand,
        performSideEffects: instancedPromptApplicationPerformSideEffects,
        listSessions: instancedPromptApplicationListSessions,
        invalidRequestEventHandler: instancedPromptApplicationInvalidRequestEventHandler,
        nonexistentInstanceEventHandler: instancedPromptApplicationNonexistentInstanceEventHandler,
      };

      const eventHandler = instancedPromptWebsocketServer(
        instancedPromptApplication
      );

      output = await eventHandler({
        body: `"Test Valid JSON Which Is Not A Partially Valid Request"`,
        sessionId: `Test Session Id`,
      });
    });

    it(`does not get from the state store`, () => {
      expect(
        instancedPromptApplicationStateKeyValueStoreGet
      ).not.toHaveBeenCalled();
    });

    it(`does not insert into the state store`, () => {
      expect(
        instancedPromptApplicationStateKeyValueStoreInsert
      ).not.toHaveBeenCalled();
    });

    it(`does not update the state store`, () => {
      expect(
        instancedPromptApplicationStateKeyValueStoreUpdate
      ).not.toHaveBeenCalled();
    });

    it(`does not render any prompts`, () => {
      expect(instancedPromptApplicationRenderPrompt).not.toHaveBeenCalled();
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

    it(`does not list any sessions`, () => {
      expect(instancedPromptApplicationListSessions).not.toHaveBeenCalled();
    });

    it(`handles one invalid request`, () => {
      expect(
        instancedPromptApplicationInvalidRequestEventHandler
      ).toHaveBeenCalledTimes(1);
    });

    it(`passes the input to the invalid request handler`, () => {
      expect(
        instancedPromptApplicationInvalidRequestEventHandler
      ).toHaveBeenCalledWith({
        body: `Test Valid JSON Which Is Not A Partially Valid Request`,
        sessionId: `Test Session Id`,
      });
    });

    it(`uses the correct "this" when handling invalid requests`, () => {
      for (const call of instancedPromptApplicationInvalidRequestEventHandler.calls.all()) {
        expect(call.object).toBe(instancedPromptApplication);
      }
    });

    it(`does not handle any nonexistent instances`, () => {
      expect(
        instancedPromptApplicationNonexistentInstanceEventHandler
      ).not.toHaveBeenCalled();
    });

    it(`returns the result of the invalid request handler`, () => {
      expect(output).toEqual({
        messages: [
          {
            body: `{"testOutputKey":"Test Output Value"}`,
            sessionId: `Test Session Id`,
          },
        ],
      });
    });
  });

  describe(`when the request contains invalid metadata`, () => {
    let instancedPromptApplicationStateKeyValueStoreGet: jasmine.Spy;
    let instancedPromptApplicationStateKeyValueStoreInsert: jasmine.Spy;
    let instancedPromptApplicationStateKeyValueStoreUpdate: jasmine.Spy;
    let instancedPromptApplicationStateKeyValueStore: KeyValueStore<
      TestState,
      TestVersion
    >;
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
    let output: WebsocketHostOutput;

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

      instancedPromptApplicationStateKeyValueStore = {
        get: instancedPromptApplicationStateKeyValueStoreGet,
        insert: instancedPromptApplicationStateKeyValueStoreInsert,
        update: instancedPromptApplicationStateKeyValueStoreUpdate,
      };

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

      instancedPromptApplicationInvalidRequestEventHandler = jasmine
        .createSpy(`instancedPromptApplicationInvalidRequestEventHandler`)
        .and.resolveTo({
          messages: [
            {
              body: { testOutputKey: `Test Output Value` },
              sessionId: `Test Session Id`,
            },
          ],
        } as WebsocketHostUnserializedOutput<Json>);

      instancedPromptApplicationNonexistentInstanceEventHandler = jasmine.createSpy(
        `instancedPromptApplicationNonexistentInstanceEventHandler`
      );

      instancedPromptApplication = {
        stateKeyValueStore: instancedPromptApplicationStateKeyValueStore,
        renderPrompt: instancedPromptApplicationRenderPrompt,
        applyFormSubmissionCommand: instancedPromptApplicationApplyFormSubmissionCommand,
        performSideEffects: instancedPromptApplicationPerformSideEffects,
        listSessions: instancedPromptApplicationListSessions,
        invalidRequestEventHandler: instancedPromptApplicationInvalidRequestEventHandler,
        nonexistentInstanceEventHandler: instancedPromptApplicationNonexistentInstanceEventHandler,
      };

      const eventHandler = instancedPromptWebsocketServer(
        instancedPromptApplication
      );

      output = await eventHandler({
        body: `{\"metadata\":{\"token\":\"f00982a4-372d-4d62-bd69-b89352a07d25-84865957-9997-4500-ba4c-88!cc63a916a\"},\"command\":\"Test Command\"}`,
        sessionId: `Test Session Id`,
      });
    });

    it(`does not get from the state store`, () => {
      expect(
        instancedPromptApplicationStateKeyValueStoreGet
      ).not.toHaveBeenCalled();
    });

    it(`does not insert into the state store`, () => {
      expect(
        instancedPromptApplicationStateKeyValueStoreInsert
      ).not.toHaveBeenCalled();
    });

    it(`does not update the state store`, () => {
      expect(
        instancedPromptApplicationStateKeyValueStoreUpdate
      ).not.toHaveBeenCalled();
    });

    it(`does not render any prompts`, () => {
      expect(instancedPromptApplicationRenderPrompt).not.toHaveBeenCalled();
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

    it(`does not list any sessions`, () => {
      expect(instancedPromptApplicationListSessions).not.toHaveBeenCalled();
    });

    it(`handles one invalid request`, () => {
      expect(
        instancedPromptApplicationInvalidRequestEventHandler
      ).toHaveBeenCalledTimes(1);
    });

    it(`passes the input to the invalid request handler`, () => {
      expect(
        instancedPromptApplicationInvalidRequestEventHandler
      ).toHaveBeenCalledWith({
        body: {
          metadata: {
            token: `f00982a4-372d-4d62-bd69-b89352a07d25-84865957-9997-4500-ba4c-88!cc63a916a`,
          },
          command: `Test Command`,
        },
        sessionId: `Test Session Id`,
      });
    });

    it(`uses the correct "this" when handling invalid requests`, () => {
      for (const call of instancedPromptApplicationInvalidRequestEventHandler.calls.all()) {
        expect(call.object).toBe(instancedPromptApplication);
      }
    });

    it(`does not handle any nonexistent instances`, () => {
      expect(
        instancedPromptApplicationNonexistentInstanceEventHandler
      ).not.toHaveBeenCalled();
    });

    it(`returns the result of the invalid request handler`, () => {
      expect(output).toEqual({
        messages: [
          {
            body: `{"testOutputKey":"Test Output Value"}`,
            sessionId: `Test Session Id`,
          },
        ],
      });
    });
  });

  describe(`on success`, () => {
    let instancedPromptApplicationStateKeyValueStoreGet: jasmine.Spy;
    let instancedPromptApplicationStateKeyValueStoreInsert: jasmine.Spy;
    let instancedPromptApplicationStateKeyValueStoreUpdate: jasmine.Spy;
    let instancedPromptApplicationStateKeyValueStore: KeyValueStore<
      TestState,
      TestVersion
    >;
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
    let output: WebsocketHostOutput;

    beforeAll(async () => {
      instancedPromptApplicationStateKeyValueStoreGet = jasmine
        .createSpy(`instancedPromptApplicationStateKeyValueStoreGet`)
        .and.resolveTo({
          type: `successful`,
          value: `Test State`,
          version: `Test Version`,
        } as KeyValueStoreSuccessfulGetResult<TestState, TestVersion>);

      instancedPromptApplicationStateKeyValueStoreInsert = jasmine.createSpy(
        `instancedPromptApplicationStateKeyValueStoreInsert`
      );

      instancedPromptApplicationStateKeyValueStoreUpdate = jasmine.createSpy(
        `instancedPromptApplicationStateKeyValueStoreUpdate`
      );

      instancedPromptApplicationStateKeyValueStore = {
        get: instancedPromptApplicationStateKeyValueStoreGet,
        insert: instancedPromptApplicationStateKeyValueStoreInsert,
        update: instancedPromptApplicationStateKeyValueStoreUpdate,
      };

      instancedPromptApplicationRenderPrompt = jasmine
        .createSpy(`instancedPromptApplicationRenderPrompt`)
        .and.resolveTo({
          formGroups: [{ name: `Test Form Group Name`, forms: [] }],
        } as Prompt);

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
        stateKeyValueStore: instancedPromptApplicationStateKeyValueStore,
        renderPrompt: instancedPromptApplicationRenderPrompt,
        applyFormSubmissionCommand: instancedPromptApplicationApplyFormSubmissionCommand,
        performSideEffects: instancedPromptApplicationPerformSideEffects,
        listSessions: instancedPromptApplicationListSessions,
        invalidRequestEventHandler: instancedPromptApplicationInvalidRequestEventHandler,
        nonexistentInstanceEventHandler: instancedPromptApplicationNonexistentInstanceEventHandler,
      };

      const eventHandler = instancedPromptWebsocketServer(
        instancedPromptApplication
      );

      output = await eventHandler({
        body: `{\"metadata\":{\"token\":\"f00982a4-372d-4d62-bd69-b89352a07d25-84865957-9997-4500-ba4c-884cc63a916a\"},\"command\":{\"type\":\"refresh\"}}`,
        sessionId: `Test Session Id`,
      });
    });

    it(`gets one instance from the state store`, () => {
      expect(
        instancedPromptApplicationStateKeyValueStoreGet
      ).toHaveBeenCalledTimes(1);
    });

    it(`gets the expected instance from the state store`, () => {
      expect(
        instancedPromptApplicationStateKeyValueStoreGet
      ).toHaveBeenCalledWith(`f00982a4-372d-4d62-bd69-b89352a07d25`);
    });

    it(`does not insert into the state store`, () => {
      expect(
        instancedPromptApplicationStateKeyValueStoreInsert
      ).not.toHaveBeenCalled();
    });

    it(`does not update the state store`, () => {
      expect(
        instancedPromptApplicationStateKeyValueStoreUpdate
      ).not.toHaveBeenCalled();
    });

    it(`renders one prompt`, () => {
      expect(instancedPromptApplicationRenderPrompt).toHaveBeenCalledTimes(1);
    });

    it(`renders the expected prompt`, () => {
      expect(instancedPromptApplicationRenderPrompt).toHaveBeenCalledWith(
        `Test State`,
        `f00982a4-372d-4d62-bd69-b89352a07d25`,
        `84865957-9997-4500-ba4c-884cc63a916a`,
        `Test Session Id`
      );
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

    it(`does not list any sessions`, () => {
      expect(instancedPromptApplicationListSessions).not.toHaveBeenCalled();
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

    it(`returns the serialized messages`, () => {
      expect(output).toEqual({
        messages: [
          {
            body: `{"formGroups":[{"name":"Test Form Group Name","forms":[]}]}`,
            sessionId: `Test Session Id`,
          },
        ],
      });
    });
  });
});
