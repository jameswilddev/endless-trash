import Ajv = require("ajv");
import { Json } from "@endless-trash/immutable-json-type";
import { convertPromptToJsonSchema } from "..";
import { Prompt } from "../prompt";

const ajv = new Ajv();

describe(`convertPromptToJsonSchema`, () => {
  let validateFunction: Ajv.ValidateFunction;

  beforeAll(() => {
    const prompt: Prompt = {
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

    const jsonSchema = convertPromptToJsonSchema(prompt);

    validateFunction = ajv.compile(jsonSchema);
  });

  function accepts(description: string, value: Json): void {
    it(`accepts ${description}`, () => {
      expect(validateFunction(value)).toBeTrue();
    });
  }

  function rejects(description: string, value: Json, error: string): void {
    it(`rejects ${description}`, () => {
      expect(validateFunction(value)).toBeFalse();
      expect(ajv.errorsText(validateFunction.errors)).toEqual(error);
    });
  }

  accepts(`valid refreshes`, {
    type: `refresh`,
  });

  rejects(
    `invalid refreshes`,
    {
      type: `refresh`,
      testUnexpectedKey: `Test Unexpected Value`,
    },
    `data should NOT have additional properties, data should NOT have additional properties, data should NOT have additional properties, data should NOT have additional properties, data should NOT have additional properties, data should NOT have additional properties, data should match exactly one schema in oneOf`
  );

  accepts(`valid form submissions`, {
    type: `formSubmitted`,
    formName: `Test Form C Name`,
    fields: {
      testFieldCAName: `Test Field C A Value`,
      testFieldCBName: ``,
      testFieldCCName: `Test Field C C Value`,
    },
  });

  rejects(
    `invalid form submissions`,
    {
      type: `formSubmitted`,
      formName: `Test Form C Name`,
      fields: {
        testFieldCAName: ``,
        testFieldCBName: ``,
        testFieldCCName: `Test Field C C Value`,
      },
    },
    `data should NOT have additional properties, data.formName should be equal to constant, data.formName should be equal to constant, data.fields.testFieldCAName should NOT be shorter than 4 characters, data.formName should be equal to constant, data.formName should be equal to constant, data should match exactly one schema in oneOf`
  );

  rejects(
    `submissions of unsubmissible forms`,
    {
      type: `formSubmitted`,
      formName: `Test Form B Name`,
      fields: {
        testFieldBAName: `Test Field B A Value`,
      },
    },
    `data should NOT have additional properties, data.formName should be equal to constant, data.formName should be equal to constant, data.formName should be equal to constant, data.formName should be equal to constant, data.formName should be equal to constant, data should match exactly one schema in oneOf`
  );

  rejects(
    `submissions of nonexistent forms`,
    {
      type: `formSubmitted`,
      formName: `Test Form E Name`,
      fields: {
        testFieldEAName: `Test Field E A Value`,
        testFieldEBName: ``,
        testFieldECName: `Test Field E C Value`,
      },
    },
    `data should NOT have additional properties, data.formName should be equal to constant, data.formName should be equal to constant, data.formName should be equal to constant, data.formName should be equal to constant, data.formName should be equal to constant, data should match exactly one schema in oneOf`
  );

  rejects(
    `unexpected request types`,
    {
      type: `Test Unexpected Request Type`,
    },
    `data.type should be equal to constant, data.type should be equal to constant, data.type should be equal to constant, data.type should be equal to constant, data.type should be equal to constant, data.type should be equal to constant, data should match exactly one schema in oneOf`
  );

  rejects(
    `null`,
    null,
    `data should be object, data should be object, data should be object, data should be object, data should be object, data should be object, data should match exactly one schema in oneOf`
  );

  rejects(
    `arrays`,
    [],
    `data should be object, data should be object, data should be object, data should be object, data should be object, data should be object, data should match exactly one schema in oneOf`
  );

  rejects(
    `empty objects`,
    [],
    `data should be object, data should be object, data should be object, data should be object, data should be object, data should be object, data should match exactly one schema in oneOf`
  );

  rejects(
    `false`,
    false,
    `data should be object, data should be object, data should be object, data should be object, data should be object, data should be object, data should match exactly one schema in oneOf`
  );

  rejects(
    `true`,
    true,
    `data should be object, data should be object, data should be object, data should be object, data should be object, data should be object, data should match exactly one schema in oneOf`
  );

  rejects(
    `numbers`,
    5.21,
    `data should be object, data should be object, data should be object, data should be object, data should be object, data should be object, data should match exactly one schema in oneOf`
  );

  rejects(
    `strings`,
    `Test String`,
    `data should be object, data should be object, data should be object, data should be object, data should be object, data should be object, data should match exactly one schema in oneOf`
  );
});
