import { convertEventToInput } from ".";
import { WebsocketHostInput } from "@endless-trash/websocket-host";

type Injected = {
  readonly testInjectedKey: `Test Injected Value`;
};

describe(`convertEventToInput`, () => {
  describe(`without a body`, () => {
    let result: WebsocketHostInput & Injected;

    beforeAll(() => {
      result = convertEventToInput(
        { testInjectedKey: `Test Injected Value` },
        {
          body: null,
          isBase64Encoded: false,
          requestContext: {
            connectionId: `Test Connection Id`,
          },
        }
      );
    });

    it(`returns the expected input`, () => {
      expect(result).toEqual({
        testInjectedKey: `Test Injected Value`,
        body: null,
        sessionId: `Test Connection Id`,
      });
    });
  });

  describe(`with a string body`, () => {
    let result: WebsocketHostInput & Injected;

    beforeAll(() => {
      result = convertEventToInput(
        { testInjectedKey: `Test Injected Value` },
        {
          body: `Test Body`,
          isBase64Encoded: false,
          requestContext: {
            connectionId: `Test Connection Id`,
          },
        }
      );
    });

    it(`returns the expected input`, () => {
      expect(result).toEqual({
        testInjectedKey: `Test Injected Value`,
        body: `Test Body`,
        sessionId: `Test Connection Id`,
      });
    });
  });

  describe(`with a binary body`, () => {
    let result: WebsocketHostInput & Injected;

    beforeAll(() => {
      result = convertEventToInput(
        { testInjectedKey: `Test Injected Value` },
        {
          body: `5NpW6uhB5hQXKw==`,
          isBase64Encoded: true,
          requestContext: {
            connectionId: `Test Connection Id`,
          },
        }
      );
    });

    it(`returns the expected input`, () => {
      expect(result).toEqual({
        testInjectedKey: `Test Injected Value`,
        body: Buffer.from(
          Uint8Array.from([228, 218, 86, 234, 232, 65, 230, 20, 23, 43])
        ),
        sessionId: `Test Connection Id`,
      });
    });
  });
});
