import { BodySerializer } from "@endless-trash/body-serializer";
import { EventHandler } from "@endless-trash/event-handler";
import { WebsocketHostInput } from "@endless-trash/websocket-host/websocket-host-input";
import { websocketHostBodySerializer } from "..";

describe(`websocketHostBodySerializer`, () => {
  describe(`on construction`, () => {
    let bodySerializer: jasmine.Spy;
    let wrapped: jasmine.Spy;

    beforeAll(() => {
      bodySerializer = jasmine.createSpy(`bodySerializer`);
      wrapped = jasmine.createSpy(`wrapped`);

      websocketHostBodySerializer(bodySerializer, wrapped);
    });

    it(`does not call the body serializer`, () => {
      expect(bodySerializer).not.toHaveBeenCalled();
    });

    it(`does not call the wrapped event handler`, () => {
      expect(wrapped).not.toHaveBeenCalled();
    });
  });

  describe(`on invocation`, () => {
    let bodySerializer: jasmine.Spy;
    let wrapped: jasmine.Spy;
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
        .and.callFake(async (input: TestInputMessage) => {
          switch (input) {
            case `Test Message A Input Body`:
              return `Test Message A Output Body`;
            case `Test Message B Input Body`:
              return `Test Message B Output Body`;
            case `Test Message C Input Body`:
              return `Test Message C Output Body`;
          }
        });

      wrapped = jasmine.createSpy(`wrapped`).and.resolveTo({
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

      const constructed = websocketHostBodySerializer<
        {
          sessionId: string;
          body: null | string | Buffer;
          testInputKey: `Test Input Value`;
        },
        TestInputMessage,
        {
          messages: ReadonlyArray<{
            readonly testMessageAKey?: string;
            readonly testMessageBKey?: string;
            readonly testMessageCKey?: string;
            readonly sessionId: string;
            readonly body: TestInputMessage;
          }>;
          readonly testOutputKey: string;
        }
      >(
        bodySerializer as BodySerializer<TestInputMessage>,
        wrapped as EventHandler<
          WebsocketHostInput,
          {
            messages: ReadonlyArray<{
              readonly testMessageAKey?: string;
              readonly testMessageBKey?: string;
              readonly testMessageCKey?: string;
              readonly sessionId: string;
              readonly body: TestInputMessage;
            }>;
            readonly testOutputKey: string;
          }
        >
      );

      output = await constructed({
        sessionId: `Test Session Id`,
        body: `Test Body`,
        testInputKey: `Test Input Value`,
      });
    });

    it(`calls the body serializer once per message`, () => {
      expect(bodySerializer).toHaveBeenCalledTimes(3);
    });

    it(`calls the body serializer with the untransformed messages`, () => {
      expect(bodySerializer).toHaveBeenCalledWith(`Test Message A Input Body`);

      expect(bodySerializer).toHaveBeenCalledWith(`Test Message B Input Body`);

      expect(bodySerializer).toHaveBeenCalledWith(`Test Message C Input Body`);
    });

    it(`calls the wrapped event handler once`, () => {
      expect(wrapped).toHaveBeenCalledTimes(1);
    });

    it(`calls the wrapped event handler with the input`, () => {
      expect(wrapped).toHaveBeenCalledWith({
        sessionId: `Test Session Id`,
        body: `Test Body`,
        testInputKey: `Test Input Value`,
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
