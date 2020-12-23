import { Prompt } from "@endless-trash/prompt";
import { WebsocketHostUnserializedOutput } from "@endless-trash/websocket-host-body-serializer";
import { partParseRequest } from ".";
import { HasInvalidRequestEventHandler } from "../has-invalid-request-event-handler";

describe(`partParseRequest`, () => {
  describe(`on construction`, () => {
    let onSuccessful: jasmine.Spy;
    let invalidRequestEventHandler: jasmine.Spy;
    let hasInvalidRequestEventHandler: HasInvalidRequestEventHandler;

    beforeAll(() => {
      onSuccessful = jasmine.createSpy(`onSuccessful`);

      invalidRequestEventHandler = jasmine.createSpy(
        `invalidRequestEventHandler`
      );
      hasInvalidRequestEventHandler = { invalidRequestEventHandler };

      partParseRequest(onSuccessful, hasInvalidRequestEventHandler);
    });

    it(`does not execute the success callback`, () => {
      expect(onSuccessful).not.toHaveBeenCalled();
    });

    it(`does not execute the invalid request event handler`, () => {
      expect(invalidRequestEventHandler).not.toHaveBeenCalled();
    });
  });

  describe(`given a valid request`, () => {
    let onSuccessful: jasmine.Spy;
    let invalidRequestEventHandler: jasmine.Spy;
    let hasInvalidRequestEventHandler: HasInvalidRequestEventHandler;
    let output: WebsocketHostUnserializedOutput<Prompt>;

    beforeAll(async () => {
      onSuccessful = jasmine.createSpy(`onSuccessful`).and.resolveTo({
        messages: [
          {
            body: {
              formGroups: [{ name: `Test Successful Form Group`, forms: [] }],
            },
            sessionId: `Test Session Id`,
          },
        ],
      });

      invalidRequestEventHandler = jasmine.createSpy(
        `invalidRequestEventHandler`
      );
      hasInvalidRequestEventHandler = { invalidRequestEventHandler };

      output = await partParseRequest(
        onSuccessful,
        hasInvalidRequestEventHandler
      )({
        sessionId: `Test Session Id`,
        body: {
          metadata: {},
          command: {},
        },
      });
    });

    it(`executes the success callback once`, () => {
      expect(onSuccessful).toHaveBeenCalledTimes(1);
    });

    it(`executes the success callback with the event`, () => {
      expect(onSuccessful).toHaveBeenCalledWith({
        sessionId: `Test Session Id`,
        body: {
          metadata: {},
          command: {},
        },
      });
    });

    it(`does not execute the invalid request event handler`, () => {
      expect(invalidRequestEventHandler).not.toHaveBeenCalled();
    });

    it(`returns the output of the failure callback`, () => {
      expect(output).toEqual({
        messages: [
          {
            body: {
              formGroups: [{ name: `Test Successful Form Group`, forms: [] }],
            },
            sessionId: `Test Session Id`,
          },
        ],
      });
    });
  });

  describe(`given an invalid request`, () => {
    let onSuccessful: jasmine.Spy;
    let invalidRequestEventHandler: jasmine.Spy;
    let hasInvalidRequestEventHandler: HasInvalidRequestEventHandler;
    let output: WebsocketHostUnserializedOutput<Prompt>;

    beforeAll(async () => {
      onSuccessful = jasmine.createSpy(`onSuccessful`);

      invalidRequestEventHandler = jasmine
        .createSpy(`invalidRequestEventHandler`)
        .and.resolveTo({
          messages: [
            {
              body: {
                formGroups: [{ name: `Test Failure Form Group`, forms: [] }],
              },
              sessionId: `Test Session Id`,
            },
          ],
        });
      hasInvalidRequestEventHandler = { invalidRequestEventHandler };

      output = await partParseRequest(
        onSuccessful,
        hasInvalidRequestEventHandler
      )({
        sessionId: `Test Session Id`,
        body: `Test Invalid Body`,
      });
    });

    it(`does not execute the success callback`, () => {
      expect(onSuccessful).not.toHaveBeenCalled();
    });

    it(`executes the invalid request event handler once`, () => {
      expect(invalidRequestEventHandler).toHaveBeenCalledTimes(1);
    });

    it(`executes the invalid request event handler with the event`, () => {
      expect(invalidRequestEventHandler).toHaveBeenCalledWith({
        sessionId: `Test Session Id`,
        body: `Test Invalid Body`,
      });
    });

    it(`executes the invalid request event handler with the correct "this"`, () => {
      for (const call of invalidRequestEventHandler.calls.all()) {
        expect(call.object).toBe(hasInvalidRequestEventHandler);
      }
    });

    it(`returns the output of the failure callback`, () => {
      expect(output).toEqual({
        messages: [
          {
            body: {
              formGroups: [{ name: `Test Failure Form Group`, forms: [] }],
            },
            sessionId: `Test Session Id`,
          },
        ],
      });
    });
  });
});
