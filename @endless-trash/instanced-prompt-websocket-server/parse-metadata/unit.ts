import { JsonObject } from "@endless-trash/immutable-json-type";
import { AtLeastPartiallyValidRequest } from "@endless-trash/prompt/at-least-partially-valid-request";
import { parseMetadata } from ".";

describe(`parseMetadata`, () => {
  describe(`when valid`, () => {
    let onSuccessful: jasmine.Spy;
    let onFailure: jasmine.Spy;
    let output: `Test Successful Output` | `Test Failure Output`;

    beforeAll(async () => {
      onSuccessful = jasmine
        .createSpy(`onSuccess`)
        .and.resolveTo(`Test Successful Output`);
      onFailure = jasmine.createSpy(`onFailure`);

      output = await parseMetadata<
        {
          readonly body: AtLeastPartiallyValidRequest;
          readonly sessionId: string;
          readonly testAdditionalKey: `Test Additional Value`;
        },
        `Test Successful Output`,
        `Test Failure Output`
      >(
        onSuccessful,
        onFailure
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
      expect(output).toEqual(`Test Successful Output`);
    });

    it(`does not execute the failure callback`, () => {
      expect(onFailure).not.toHaveBeenCalled();
    });
  });

  function rejects(description: string, metadata: JsonObject): void {
    describe(description, () => {
      let onSuccessful: jasmine.Spy;
      let onFailure: jasmine.Spy;
      let output: `Test Successful Output` | `Test Failure Output`;

      beforeAll(async () => {
        onSuccessful = jasmine.createSpy(`onSuccess`);
        onFailure = jasmine
          .createSpy(`onFailure`)
          .and.resolveTo(`Test Failure Output`);

        output = await parseMetadata<
          {
            readonly body: AtLeastPartiallyValidRequest;
            readonly sessionId: string;
            readonly testAdditionalKey: `Test Additional Value`;
          },
          `Test Successful Output`,
          `Test Failure Output`
        >(
          onSuccessful,
          onFailure
        )({
          body: { metadata: metadata, command: `Test Command` },
          sessionId: `Test Session Id`,
          testAdditionalKey: `Test Additional Value`,
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
          body: { metadata: metadata, command: `Test Command` },
          sessionId: `Test Session Id`,
          testAdditionalKey: `Test Additional Value`,
        });
      });

      it(`returns the result of the failure callback`, () => {
        expect(output).toEqual(`Test Failure Output`);
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
