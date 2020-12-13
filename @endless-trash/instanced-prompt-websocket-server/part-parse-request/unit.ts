import { Prompt } from "@endless-trash/prompt";
import { WebsocketHostUnserializedOutput } from "@endless-trash/websocket-host-body-serializer";
import { partParseRequest } from ".";

describe(`partParseRequest`, () => {
  describe(`on construction`, () => {
    let onSuccessful: jasmine.Spy;
    let onFailure: jasmine.Spy;

    beforeAll(() => {
      onSuccessful = jasmine.createSpy(`onSuccessful`);
      onFailure = jasmine.createSpy(`onFailure`);

      partParseRequest(onSuccessful, onFailure);
    });

    it(`does not execute the success callback`, () => {
      expect(onSuccessful).not.toHaveBeenCalled();
    });

    it(`does not execute the failure callback`, () => {
      expect(onFailure).not.toHaveBeenCalled();
    });
  });

  describe(`given a valid request`, () => {
    let onSuccessful: jasmine.Spy;
    let onFailure: jasmine.Spy;
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

      onFailure = jasmine.createSpy(`onFailure`);

      output = await partParseRequest(
        onSuccessful,
        onFailure
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

    it(`does not execute the failure callback`, () => {
      expect(onFailure).not.toHaveBeenCalled();
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
    let onFailure: jasmine.Spy;
    let output: WebsocketHostUnserializedOutput<Prompt>;

    beforeAll(async () => {
      onSuccessful = jasmine.createSpy(`onSuccessful`);

      onFailure = jasmine.createSpy(`onFailure`).and.resolveTo({
        messages: [
          {
            body: {
              formGroups: [{ name: `Test Failure Form Group`, forms: [] }],
            },
            sessionId: `Test Session Id`,
          },
        ],
      });

      output = await partParseRequest(
        onSuccessful,
        onFailure
      )({
        sessionId: `Test Session Id`,
        body: `Test Invalid Body`,
      });
    });

    it(`does not execute the success callback`, () => {
      expect(onSuccessful).not.toHaveBeenCalled();
    });

    it(`executes the failure callback once`, () => {
      expect(onFailure).toHaveBeenCalledTimes(1);
    });

    it(`executes the failure callback with the event`, () => {
      expect(onFailure).toHaveBeenCalledWith({
        sessionId: `Test Session Id`,
        body: `Test Invalid Body`,
      });
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
