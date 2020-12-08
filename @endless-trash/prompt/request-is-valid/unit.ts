import { JsonObject } from "@endless-trash/immutable-json-type";
import { requestIsValid, Prompt, Request } from "..";

describe(`requestIsValid`, () => {
  let prompt: Prompt;

  beforeAll(() => {
    prompt = {
      formGroups: [
        {
          name: `Test Form Group A Name`,
          forms: [
            {
              name: `Test Form F Name`,
              fields: [
                {
                  name: `testFieldFAName`,
                  type: `string`,
                  value: `Test Field F A Existing Value`,
                  label: `Test Field F A Label`,
                  minimumLength: null,
                  maximumLength: null,
                },
              ],
              submitButtonLabel: `Test Submit Button Label F`,
            },
          ],
        },
        {
          name: `Test Form Group B Name`,
          forms: [
            {
              name: `Test Form A Name`,
              fields: [
                {
                  name: `testFieldAAName`,
                  type: `string`,
                  value: `Test Field A A Existing Value`,
                  label: `Test Field A A Label`,
                  minimumLength: null,
                  maximumLength: null,
                },
              ],
              submitButtonLabel: `Test Submit Button Label A`,
            },
            {
              name: `Test Form B Name`,
              fields: [
                {
                  name: `testFieldBAName`,
                  type: `string`,
                  value: `Test Field B A Existing Value`,
                  label: `Test Field B A Label`,
                  minimumLength: null,
                  maximumLength: null,
                },
              ],
              submitButtonLabel: null,
            },
            {
              name: `Test Form C Name`,
              fields: [
                {
                  name: `testFieldCAName`,
                  type: `string`,
                  value: `Test Field C A Existing Value`,
                  label: `Test Field C A Label`,
                  minimumLength: 4,
                  maximumLength: null,
                },
                {
                  name: `testFieldCBName`,
                  type: `string`,
                  value: `Test Field C B Existing Value`,
                  label: `Test Field C B Label`,
                  minimumLength: null,
                  maximumLength: 20,
                },
                {
                  name: `testFieldCCName`,
                  type: `string`,
                  value: `Test Field C C Existing Value`,
                  label: `Test Field C C Label`,
                  minimumLength: null,
                  maximumLength: 25,
                },
              ],
              submitButtonLabel: `Test Submit Button Label C`,
            },
            {
              name: `Test Form D Name`,
              fields: [
                {
                  name: `testFieldDAName`,
                  type: `string`,
                  value: `Test Field D A Existing Value`,
                  label: `Test Field D A Label`,
                  minimumLength: null,
                  maximumLength: null,
                },
              ],
              submitButtonLabel: `Test Submit Button Label D`,
            },
          ],
        },
        {
          name: `Test Form Group C Name`,
          forms: [
            {
              name: `Test Form G Name`,
              fields: [
                {
                  name: `testFieldGAName`,
                  type: `string`,
                  value: `Test Field G A Existing Value`,
                  label: `Test Field G A Label`,
                  minimumLength: null,
                  maximumLength: null,
                },
              ],
              submitButtonLabel: `Test Submit Button Label G`,
            },
          ],
        },
      ],
    };
  });

  describe(`when the request is valid`, () => {
    let output: null | Request;

    beforeAll(() => {
      output = requestIsValid(prompt, {
        metadata: { testMetadataKey: `Test Metadata Value` },
        command: { type: `refresh` },
      });
    });

    it(`returns the request`, () => {
      expect(output).toEqual({
        metadata: { testMetadataKey: `Test Metadata Value` } as JsonObject,
        command: { type: `refresh` },
      });
    });
  });

  describe(`when the command is invalid`, () => {
    let output: null | Request;

    beforeAll(() => {
      output = requestIsValid(prompt, {
        metadata: { testMetadataKey: `Test Metadata Value` },
        command: {
          type: `refresh`,
          testUnexpectedKey: `Test Unexpected Value`,
        },
      });
    });

    it(`returns null`, () => {
      expect(output).toBeNull();
    });
  });
});
