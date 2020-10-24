import Ajv = require("ajv");
import { Json } from "@endless-trash/immutable-json-type";
import { convertPromptToJsonSchema } from "..";
import { Prompt } from "../prompt";

const ajv = new Ajv();

describe(`convertPromptToJsonSchema`, () => {
  function createPrompt(hasBackButton: boolean): Prompt {
    return {
      hasBackButton,
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
    };
  }

  function accepts(
    description: string,
    hasBackButton: boolean,
    value: Json
  ): void {
    value;

    it(`accepts ${description}`, () => {
      const jsonSchema = convertPromptToJsonSchema(createPrompt(hasBackButton));
      const validateFunction = ajv.compile(jsonSchema);

      expect(validateFunction(value)).toBeTrue();
    });
  }

  function rejects(
    description: string,
    hasBackButton: boolean,
    value: Json,
    error: string
  ): void {
    value;
    error;

    it(`rejects ${description}`, () => {
      const jsonSchema = convertPromptToJsonSchema(createPrompt(hasBackButton));
      const validateFunction = ajv.compile(jsonSchema);

      expect(validateFunction(value)).toBeFalse();
      expect(ajv.errorsText(validateFunction.errors)).toEqual(error);
    });
  }

  describe(`when a back button is not present`, () => {
    accepts(`valid refreshes`, true, {
      type: `refresh`,
    });

    rejects(
      `invalid refreshes`,
      true,
      {
        type: `refresh`,
        testUnexpectedKey: `Test Unexpected Value`,
      },
      `data should NOT have additional properties, data should NOT have additional properties, data should NOT have additional properties, data should NOT have additional properties, data should NOT have additional properties, data should match exactly one schema in oneOf`
    );

    accepts(`valid form submissions`, false, {
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
      false,
      {
        type: `formSubmitted`,
        formName: `Test Form C Name`,
        fields: {
          testFieldCAName: ``,
          testFieldCBName: ``,
          testFieldCCName: `Test Field C C Value`,
        },
      },
      `data should NOT have additional properties, data.formName should be equal to constant, data.fields.testFieldCAName should NOT be shorter than 4 characters, data.formName should be equal to constant, data should match exactly one schema in oneOf`
    );

    rejects(
      `submissions of unsubmissible forms`,
      false,
      {
        type: `formSubmitted`,
        formName: `Test Form B Name`,
        fields: {
          testFieldBAName: `Test Field B A Value`,
        },
      },
      `data should NOT have additional properties, data.formName should be equal to constant, data.formName should be equal to constant, data.formName should be equal to constant, data should match exactly one schema in oneOf`
    );

    rejects(
      `submissions of nonexistent forms`,
      true,
      {
        type: `formSubmitted`,
        formName: `Test Form E Name`,
        fields: {
          testFieldEAName: `Test Field E A Value`,
          testFieldEBName: ``,
          testFieldECName: `Test Field E C Value`,
        },
      },
      `data should NOT have additional properties, data.formName should be equal to constant, data.formName should be equal to constant, data.formName should be equal to constant, data should NOT have additional properties, data should match exactly one schema in oneOf`
    );

    rejects(
      `valid back button presses`,
      false,
      {
        type: `backPressed`,
      },
      `data.type should be equal to constant, data.type should be equal to constant, data.type should be equal to constant, data.type should be equal to constant, data should match exactly one schema in oneOf`
    );

    rejects(
      `invalid back button presses`,
      false,
      {
        type: `backPressed`,
        testUnexpectedKey: `Test Unexpected Value`,
      },
      `data should NOT have additional properties, data should NOT have additional properties, data should NOT have additional properties, data should NOT have additional properties, data should match exactly one schema in oneOf`
    );

    rejects(
      `unexpected request types`,
      false,
      {
        type: `Test Unexpected Request Type`,
      },
      `data.type should be equal to constant, data.type should be equal to constant, data.type should be equal to constant, data.type should be equal to constant, data should match exactly one schema in oneOf`
    );

    rejects(
      `null`,
      false,
      null,
      `data should be object, data should be object, data should be object, data should be object, data should match exactly one schema in oneOf`
    );

    rejects(
      `arrays`,
      false,
      [],
      `data should be object, data should be object, data should be object, data should be object, data should match exactly one schema in oneOf`
    );

    rejects(
      `empty objects`,
      false,
      [],
      `data should be object, data should be object, data should be object, data should be object, data should match exactly one schema in oneOf`
    );

    rejects(
      `false`,
      false,
      false,
      `data should be object, data should be object, data should be object, data should be object, data should match exactly one schema in oneOf`
    );

    rejects(
      `true`,
      false,
      true,
      `data should be object, data should be object, data should be object, data should be object, data should match exactly one schema in oneOf`
    );

    rejects(
      `numbers`,
      false,
      5.21,
      `data should be object, data should be object, data should be object, data should be object, data should match exactly one schema in oneOf`
    );

    rejects(
      `strings`,
      false,
      `Test String`,
      `data should be object, data should be object, data should be object, data should be object, data should match exactly one schema in oneOf`
    );
  });

  describe(`when a back button is present`, () => {
    accepts(`valid refreshes`, true, {
      type: `refresh`,
    });

    rejects(
      `invalid refreshes`,
      true,
      {
        type: `refresh`,
        testUnexpectedKey: `Test Unexpected Value`,
      },
      `data should NOT have additional properties, data should NOT have additional properties, data should NOT have additional properties, data should NOT have additional properties, data should NOT have additional properties, data should match exactly one schema in oneOf`
    );

    accepts(`valid form submissions`, true, {
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
      true,
      {
        type: `formSubmitted`,
        formName: `Test Form C Name`,
        fields: {
          testFieldCAName: ``,
          testFieldCBName: ``,
          testFieldCCName: `Test Field C C Value`,
        },
      },
      `data should NOT have additional properties, data.formName should be equal to constant, data.fields.testFieldCAName should NOT be shorter than 4 characters, data.formName should be equal to constant, data should NOT have additional properties, data should match exactly one schema in oneOf`
    );

    rejects(
      `submissions of unsubmissible forms`,
      true,
      {
        type: `formSubmitted`,
        formName: `Test Form B Name`,
        fields: {
          testFieldBAName: `Test Field B A Value`,
        },
      },
      `data should NOT have additional properties, data.formName should be equal to constant, data.formName should be equal to constant, data.formName should be equal to constant, data should NOT have additional properties, data should match exactly one schema in oneOf`
    );

    rejects(
      `submissions of nonexistent forms`,
      true,
      {
        type: `formSubmitted`,
        formName: `Test Form E Name`,
        fields: {
          testFieldEAName: `Test Field E A Value`,
          testFieldEBName: ``,
          testFieldECName: `Test Field E C Value`,
        },
      },
      `data should NOT have additional properties, data.formName should be equal to constant, data.formName should be equal to constant, data.formName should be equal to constant, data should NOT have additional properties, data should match exactly one schema in oneOf`
    );

    accepts(`valid back button presses`, true, {
      type: `backPressed`,
    });

    rejects(
      `invalid back button presses`,
      true,
      {
        type: `backPressed`,
        testUnexpectedKey: `Test Unexpected Value`,
      },
      `data should NOT have additional properties, data should NOT have additional properties, data should NOT have additional properties, data should NOT have additional properties, data should NOT have additional properties, data should match exactly one schema in oneOf`
    );

    rejects(
      `unexpected request types`,
      true,
      {
        type: `Test Unexpected Request Type`,
      },
      `data.type should be equal to constant, data.type should be equal to constant, data.type should be equal to constant, data.type should be equal to constant, data.type should be equal to constant, data should match exactly one schema in oneOf`
    );

    rejects(
      `null`,
      true,
      null,
      `data should be object, data should be object, data should be object, data should be object, data should be object, data should match exactly one schema in oneOf`
    );

    rejects(
      `arrays`,
      true,
      [],
      `data should be object, data should be object, data should be object, data should be object, data should be object, data should match exactly one schema in oneOf`
    );

    rejects(
      `empty objects`,
      true,
      [],
      `data should be object, data should be object, data should be object, data should be object, data should be object, data should match exactly one schema in oneOf`
    );

    rejects(
      `false`,
      true,
      false,
      `data should be object, data should be object, data should be object, data should be object, data should be object, data should match exactly one schema in oneOf`
    );

    rejects(
      `true`,
      true,
      true,
      `data should be object, data should be object, data should be object, data should be object, data should be object, data should match exactly one schema in oneOf`
    );

    rejects(
      `numbers`,
      true,
      5.21,
      `data should be object, data should be object, data should be object, data should be object, data should be object, data should match exactly one schema in oneOf`
    );

    rejects(
      `strings`,
      true,
      `Test String`,
      `data should be object, data should be object, data should be object, data should be object, data should be object, data should match exactly one schema in oneOf`
    );
  });
});
