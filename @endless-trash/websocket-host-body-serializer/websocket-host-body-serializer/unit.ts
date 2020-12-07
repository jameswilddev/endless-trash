import { websocketHostBodySerializer } from "..";
import { WebsocketHostUnserializedOutputMessage } from "../websocket-host-unserialized-output";

describe(`websocketHostBodySerializer`, () => {
  describe(`on construction`, () => {
    let bodySerializer: jasmine.Spy;

    beforeAll(() => {
      bodySerializer = jasmine.createSpy(`bodySerializer`);

      websocketHostBodySerializer(bodySerializer);
    });

    it(`does not call the body serializer`, () => {
      expect(bodySerializer).not.toHaveBeenCalled();
    });
  });

  describe(`on invocation`, () => {
    let bodySerializer: jasmine.Spy;
    let output: {
      messages: ReadonlyArray<{
        readonly testMessageAKey?: string;
        readonly testMessageBKey?: string;
        readonly testMessageCKey?: string;
        readonly sessionId: string;
        readonly body: null | string | Buffer;
      }>;
      readonly testOutputKey: string;
    };

    beforeAll(async () => {
      type TestInputMessage =
        | `Test Message A Input Body`
        | `Test Message B Input Body`
        | `Test Message C Input Body`;

      bodySerializer = jasmine
        .createSpy(`bodySerializer`)
        .and.callFake(
          async (
            input: WebsocketHostUnserializedOutputMessage<TestInputMessage>
          ) => {
            switch (input.body) {
              case `Test Message A Input Body`:
                return {
                  testMessageAKey: `Test Message A Value`,
                  sessionId: `Test Message A Session Id`,
                  body: `Test Message A Output Body`,
                };
              case `Test Message B Input Body`:
                return {
                  testMessageBKey: `Test Message B Value`,
                  sessionId: `Test Message B Session Id`,
                  body: `Test Message B Output Body`,
                };
              case `Test Message C Input Body`:
                return {
                  testMessageCKey: `Test Message C Value`,
                  sessionId: `Test Message C Session Id`,
                  body: `Test Message C Output Body`,
                };
            }
          }
        );

      const constructed = websocketHostBodySerializer<TestInputMessage>(
        bodySerializer
      );

      output = await constructed({
        messages: [
          {
            testMessageAKey: `Test Message A Value`,
            sessionId: `Test Message A Session Id`,
            body: `Test Message A Input Body`,
          },
          {
            testMessageBKey: `Test Message B Value`,
            sessionId: `Test Message B Session Id`,
            body: `Test Message B Input Body`,
          },
          {
            testMessageCKey: `Test Message C Value`,
            sessionId: `Test Message C Session Id`,
            body: `Test Message C Input Body`,
          },
        ],
        testOutputKey: `Test Output Value`,
      });
    });

    it(`calls the body serializer once per message`, () => {
      expect(bodySerializer).toHaveBeenCalledTimes(3);
    });

    it(`calls the body serializer with the untransformed messages`, () => {
      expect(bodySerializer).toHaveBeenCalledWith({
        testMessageAKey: `Test Message A Value`,
        sessionId: `Test Message A Session Id`,
        body: `Test Message A Input Body`,
      });

      expect(bodySerializer).toHaveBeenCalledWith({
        testMessageBKey: `Test Message B Value`,
        sessionId: `Test Message B Session Id`,
        body: `Test Message B Input Body`,
      });

      expect(bodySerializer).toHaveBeenCalledWith({
        testMessageCKey: `Test Message C Value`,
        sessionId: `Test Message C Session Id`,
        body: `Test Message C Input Body`,
      });
    });

    it(`returns the transformed input`, () => {
      expect(output).toEqual({
        messages: [
          {
            testMessageAKey: `Test Message A Value`,
            sessionId: `Test Message A Session Id`,
            body: `Test Message A Output Body`,
          },
          {
            testMessageBKey: `Test Message B Value`,
            sessionId: `Test Message B Session Id`,
            body: `Test Message B Output Body`,
          },
          {
            testMessageCKey: `Test Message C Value`,
            sessionId: `Test Message C Session Id`,
            body: `Test Message C Output Body`,
          },
        ],
        testOutputKey: `Test Output Value`,
      });
    });
  });
});
