import { JsonObject } from "@endless-trash/immutable-json-type";
import { Prompt } from "@endless-trash/prompt";
import { AtLeastPartiallyValidRequest } from "@endless-trash/prompt/at-least-partially-valid-request";
import { WebsocketHostUnserializedOutput } from "@endless-trash/websocket-host-body-serializer";
import { parseMetadata } from ".";
import { HasInvalidRequestEventHandler } from "../has-invalid-request-event-handler";

describe(`parseMetadata`, () => {
  describe(`when valid`, () => {
    let onSuccessful: jasmine.Spy;
    let invalidRequestEventHandler: jasmine.Spy;
    let hasInvalidRequestEventHandler: HasInvalidRequestEventHandler;
    let output: WebsocketHostUnserializedOutput<Prompt>;

    beforeAll(async () => {
      onSuccessful = jasmine.createSpy(`onSuccess`).and.resolveTo({
        messages: [
          {
            body: {
              formGroups: [
                { name: `Test Successful Form Group Name`, forms: [] },
              ],
            },
            sessionId: `Test Session Id`,
          },
        ],
      });

      invalidRequestEventHandler = jasmine.createSpy(
        `invalidRequestEventHandler`
      );

      hasInvalidRequestEventHandler = { invalidRequestEventHandler };

      output = await parseMetadata<{
        readonly body: AtLeastPartiallyValidRequest;
        readonly sessionId: string;
        readonly testAdditionalKey: `Test Additional Value`;
      }>(
        onSuccessful,
        hasInvalidRequestEventHandler
      )({
        body: {
          metadata: {
            token: `f00982a4-372d-4d62-bd69-b89352a07d25-84865957-9997-4500-ba4c-884cc63a916a`,
          },
          command: `Test Command`,
        },
        sessionId: `Test Session Id`,
        testAdditionalKey: `Test Additional Value`,
      });
    });

    it(`executes the success callback once`, () => {
      expect(onSuccessful).toHaveBeenCalledTimes(1);
    });

    it(`executes the success callback with the extracted metadata`, () => {
      expect(onSuccessful).toHaveBeenCalledWith({
        body: {
          metadata: {
            token: `f00982a4-372d-4d62-bd69-b89352a07d25-84865957-9997-4500-ba4c-884cc63a916a`,
          },
          command: `Test Command`,
        },
        instanceId: `f00982a4-372d-4d62-bd69-b89352a07d25`,
        userId: `84865957-9997-4500-ba4c-884cc63a916a`,
        sessionId: `Test Session Id`,
        testAdditionalKey: `Test Additional Value`,
      });
    });

    it(`returns the result of the success callback`, () => {
      expect(output).toEqual({
        messages: [
          {
            body: {
              formGroups: [
                { name: `Test Successful Form Group Name`, forms: [] },
              ],
            },
            sessionId: `Test Session Id`,
          },
        ],
      });
    });

    it(`does not execute the invalid request event handler`, () => {
      expect(invalidRequestEventHandler).not.toHaveBeenCalled();
    });
  });

  function rejects(description: string, metadata: JsonObject): void {
    describe(description, () => {
      let onSuccessful: jasmine.Spy;
      let invalidRequestEventHandler: jasmine.Spy;
      let hasInvalidRequestEventHandler: HasInvalidRequestEventHandler;
      let output: WebsocketHostUnserializedOutput<Prompt>;

      beforeAll(async () => {
        onSuccessful = jasmine.createSpy(`onSuccess`);

        invalidRequestEventHandler = jasmine
          .createSpy(`invalidRequestEventHandler`)
          .and.resolveTo({
            messages: [
              {
                body: {
                  formGroups: [
                    { name: `Test Failure Form Group Name`, forms: [] },
                  ],
                },
                sessionId: `Test Session Id`,
              },
            ],
          });

        hasInvalidRequestEventHandler = { invalidRequestEventHandler };

        output = await parseMetadata<{
          readonly body: AtLeastPartiallyValidRequest;
          readonly sessionId: string;
          readonly testAdditionalKey: `Test Additional Value`;
        }>(
          onSuccessful,
          hasInvalidRequestEventHandler
        )({
          body: { metadata: metadata, command: `Test Command` },
          sessionId: `Test Session Id`,
          testAdditionalKey: `Test Additional Value`,
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
          body: { metadata: metadata, command: `Test Command` },
          sessionId: `Test Session Id`,
          testAdditionalKey: `Test Additional Value`,
        });
      });

      it(`executes the invalid request event handler with the correct "this"`, () => {
        for (const call of invalidRequestEventHandler.calls.all()) {
          expect(call.object).toBe(hasInvalidRequestEventHandler);
        }
      });

      it(`returns the result of the failure callback`, () => {
        expect(output).toEqual({
          messages: [
            {
              body: {
                formGroups: [
                  { name: `Test Failure Form Group Name`, forms: [] },
                ],
              },
              sessionId: `Test Session Id`,
            },
          ],
        });
      });
    });
  }

  rejects(`token missing`, {});

  rejects(`token invalid`, { token: 456 });

  rejects(`unexpected properties`, {
    token: `f00982a4-372d-4d62-bd69-b89352a07d25-84865957-9997-4500-ba4c-884cc63a916a`,
    testUnexpectedKey: `Test Unexpected Value`,
  });
});
