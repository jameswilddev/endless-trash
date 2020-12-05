import { Json } from "@endless-trash/immutable-json-type";
import { convertPromptToJsonSchema, Prompt, Request } from "..";

describe(`convertPromptToJsonSchema`, () => {
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

  function accepts(description: string, value: Json): void {
    describe(description, () => {
      let output: null | Request;

      beforeAll(() => {
        output = convertPromptToJsonSchema(prompt, value);
      });

      it(`is accepted`, () => {
        expect(output).toEqual(value as Request);
      });
    });
  }

  function rejects(description: string, value: Json): void {
    describe(description, () => {
      let output: null | Request;

      beforeAll(() => {
        output = convertPromptToJsonSchema(prompt, value);
      });

      it(`is rejected`, () => {
        expect(output).toBeNull();
      });
    });
  }

  accepts(`valid form submissions`, {
    formName: `Test Form C Name`,
    fields: {
      testFieldCAName: `Test Field C A Value`,
      testFieldCBName: ``,
      testFieldCCName: `Test Field C C Value`,
    },
  });

  rejects(`invalid form submissions`, {
    formName: `Test Form C Name`,
    fields: {
      testFieldCAName: ``,
      testFieldCBName: ``,
      testFieldCCName: `Test Field C C Value`,
    },
  });

  rejects(`submissions of unsubmissible forms`, {
    formName: `Test Form B Name`,
    fields: {
      testFieldBAName: `Test Field B A Value`,
    },
  });

  rejects(`submissions of nonexistent forms`, {
    formName: `Test Form E Name`,
    fields: {
      testFieldEAName: `Test Field E A Value`,
      testFieldEBName: ``,
      testFieldECName: `Test Field E C Value`,
    },
  });

  rejects(`null`, null);

  rejects(`arrays`, []);

  rejects(`empty objects`, []);

  rejects(`false`, false);

  rejects(`true`, true);

  rejects(`numbers`, 5.21);

  rejects(`strings`, `Test String`);
});
