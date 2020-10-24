import { JSONSchema7 } from "json-schema";
import Ajv = require("ajv");
import { Json } from "@endless-trash/immutable-json-type";
import { convertFormToJsonSchema } from ".";

const ajv = new Ajv();

describe(`convertFormToJsonSchema`, () => {
  describe(`when the form does not have a submit button`, () => {
    let jsonSchema: null | JSONSchema7;

    beforeAll(() => {
      jsonSchema = convertFormToJsonSchema({
        name: `Test Form Name`,
        fields: [
          {
            name: `testFieldAName`,
            type: `string`,
            value: `Test Field A Existing Value`,
            label: `Test Field A Label`,
            minimumLength: 4,
            maximumLength: null,
          },
          {
            name: `testFieldBName`,
            type: `string`,
            value: `Test Field B Existing Value`,
            label: `Test Field B Label`,
            minimumLength: null,
            maximumLength: 20,
          },
          {
            name: `testFieldCName`,
            type: `string`,
            value: `Test Field C Existing Value`,
            label: `Test Field C Label`,
            minimumLength: null,
            maximumLength: 25,
          },
        ],
        submitButtonLabel: null,
      });
    });

    it(`returns null`, () => {
      expect(jsonSchema).toBeNull();
    });
  });

  describe(`when the form has a submit button`, () => {
    let validateFunction: Ajv.ValidateFunction;

    beforeAll(() => {
      const jsonSchema = convertFormToJsonSchema({
        name: `Test Form Name`,
        fields: [
          {
            name: `testFieldAName`,
            type: `string`,
            value: `Test Field A Existing Value`,
            label: `Test Field A Label`,
            minimumLength: 4,
            maximumLength: null,
          },
          {
            name: `testFieldBName`,
            type: `string`,
            value: `Test Field B Existing Value`,
            label: `Test Field B Label`,
            minimumLength: null,
            maximumLength: 20,
          },
          {
            name: `testFieldCName`,
            type: `string`,
            value: `Test Field C Existing Value`,
            label: `Test Field C Label`,
            minimumLength: null,
            maximumLength: 25,
          },
        ],
        submitButtonLabel: `Test Submit Button Label`,
      });

      if (jsonSchema === null) {
        fail(`Expected a JSON schema, but returned null.`);
      } else {
        validateFunction = ajv.compile(jsonSchema);
      }
    });

    it(`accepts valid form submissions`, () => {
      const value = {
        type: `formSubmitted`,
        formName: `Test Form Name`,
        fields: {
          testFieldAName: `Test Field A Value`,
          testFieldBName: ``,
          testFieldCName: `Test Field C Value`,
        },
      };

      expect(validateFunction(value)).toBeTrue();
    });

    function rejects(description: string, value: Json, error: string): void {
      it(description, () => {
        expect(validateFunction(value)).toBeFalse();
        expect(ajv.errorsText(validateFunction.errors)).toEqual(error);
      });
    }

    rejects(
      `type missing`,
      {
        formName: `Test Form Name`,
        fields: {
          testFieldAName: `Test Field A Value`,
          testFieldBName: ``,
          testFieldCName: `Test Field C Value`,
        },
      },
      `data should have required property 'type'`
    );

    rejects(
      `type invalid`,
      {
        type: `Test Invalid Type`,
        formName: `Test Form Name`,
        fields: {
          testFieldAName: `Test Field A Value`,
          testFieldBName: ``,
          testFieldCName: `Test Field C Value`,
        },
      },
      `data.type should be equal to constant`
    );

    rejects(
      `formName missing`,
      {
        type: `formSubmitted`,
        fields: {
          testFieldAName: `Test Field A Value`,
          testFieldBName: ``,
          testFieldCName: `Test Field C Value`,
        },
      },
      `data should have required property 'formName'`
    );

    rejects(
      `formName invalid`,
      {
        type: `formSubmitted`,
        formName: `Test Invalid Form Name`,
        fields: {
          testFieldAName: `Test Field A Value`,
          testFieldBName: ``,
          testFieldCName: `Test Field C Value`,
        },
      },
      `data.formName should be equal to constant`
    );

    rejects(
      `fields missing`,
      {
        type: `formSubmitted`,
        formName: `Test Form Name`,
      },
      `data should have required property 'fields'`
    );

    rejects(
      `fields missing properties`,
      {
        type: `formSubmitted`,
        formName: `Test Form Name`,
        fields: {
          testFieldAName: `Test Field A Value`,
          testFieldCName: `Test Field C Value`,
        },
      },
      `data.fields should have required property 'testFieldBName'`
    );

    rejects(
      `fields unexpected properties`,
      {
        type: `formSubmitted`,
        formName: `Test Form Name`,
        fields: {
          testFieldAName: `Test Field A Value`,
          testFieldBName: ``,
          testFieldCName: `Test Field C Value`,
          testUnexpectedKey: `Test Unexpected Value`,
        },
      },
      `data.fields should NOT have additional properties`
    );

    rejects(
      `fields null`,
      {
        type: `formSubmitted`,
        formName: `Test Form Name`,
        fields: null,
      },
      `data.fields should be object`
    );

    rejects(
      `fields false`,
      {
        type: `formSubmitted`,
        formName: `Test Form Name`,
        fields: false,
      },
      `data.fields should be object`
    );

    rejects(
      `fields true`,
      {
        type: `formSubmitted`,
        formName: `Test Form Name`,
        fields: true,
      },
      `data.fields should be object`
    );

    rejects(
      `fields number`,
      {
        type: `formSubmitted`,
        formName: `Test Form Name`,
        fields: 56.2342,
      },
      `data.fields should be object`
    );

    rejects(
      `fields string`,
      {
        type: `formSubmitted`,
        formName: `Test Form Name`,
        fields: `Test String`,
      },
      `data.fields should be object`
    );

    rejects(
      `fields array`,
      {
        type: `formSubmitted`,
        formName: `Test Form Name`,
        fields: [],
      },
      `data.fields should be object`
    );

    rejects(
      `unexpected properties`,
      {
        type: `formSubmitted`,
        formName: `Test Form Name`,
        fields: {
          testFieldAName: `Test Field A Value`,
          testFieldBName: ``,
          testFieldCName: `Test Field C Value`,
        },
        testUnexpectedKey: `Test Unexpected Value`,
      },
      `data should NOT have additional properties`
    );

    rejects(`null`, null, `data should be object`);

    rejects(`arrays`, [], `data should be object`);

    rejects(`false`, false, `data should be object`);

    rejects(`true`, true, `data should be object`);

    rejects(`numbers`, 5.21, `data should be object`);

    rejects(`strings`, `Test String`, `data should be object`);
  });
});
