import { convertEventToInput } from ".";

type Injected = {
  readonly testInjectedKey: `Test Injected Value`;
};

const inject: Injected = { testInjectedKey: `Test Injected Value` };

type Result = {
  readonly testInjectedKey: `Test Injected Value`;
  readonly body: null | string | Uint8Array;
  readonly sessionId: string;
};

describe(`convertEventToInput`, () => {
  describe(`without a body`, () => {
    let result: Result;

    beforeAll(() => {
      result = convertEventToInput(inject, {
        body: null,
        isBase64Encoded: false,
        requestContext: {
          connectionId: `Test Connection Id`,
        },
      });
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
    let result: Result;

    beforeAll(() => {
      result = convertEventToInput(inject, {
        body: `Test Body`,
        isBase64Encoded: false,
        requestContext: {
          connectionId: `Test Connection Id`,
        },
      });
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
    let result: Result;

    beforeAll(() => {
      result = convertEventToInput(inject, {
        body: `5NpW6uhB5hQXKw==`,
        isBase64Encoded: true,
        requestContext: {
          connectionId: `Test Connection Id`,
        },
      });
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

  describe(`when injected values are overwritten`, () => {
    type AlternativeInjected = {
      readonly testInjectedKey: `Test Injected Value`;
      readonly sessionId: string;
    };

    const alternativeInject: AlternativeInjected = {
      testInjectedKey: `Test Injected Value`,
      sessionId: `Test Injected Session Id`,
    };

    let result: Result;

    beforeAll(() => {
      result = convertEventToInput(alternativeInject, {
        body: null,
        isBase64Encoded: false,
        requestContext: {
          connectionId: `Test Connection Id`,
        },
      });
    });

    it(`returns the expected input`, () => {
      expect(result).toEqual({
        testInjectedKey: `Test Injected Value`,
        body: null,
        sessionId: `Test Connection Id`,
      });
    });
  });
});
