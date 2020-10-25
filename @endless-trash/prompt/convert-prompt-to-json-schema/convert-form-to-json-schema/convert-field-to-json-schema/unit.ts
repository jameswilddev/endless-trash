import { JSONSchema7 } from "json-schema";
import Ajv = require("ajv");
import { Json } from "@endless-trash/immutable-json-type";
import { Field } from "../../..";
import { convertFieldToJsonSchema } from ".";

const ajv = new Ajv();

describe(`convertFieldToJsonSchema`, () => {
  function scenario(
    description: string,
    field: Field,
    accepts: ReadonlyArray<{
      readonly description: string;
      readonly json: Json;
    }>,
    rejects: ReadonlyArray<{
      readonly description: string;
      readonly json: Json;
      readonly error: string;
    }>
  ): void {
    describe(description, () => {
      let validateFunction: Ajv.ValidateFunction;

      beforeAll(() => {
        const properties = convertFieldToJsonSchema(field);

        if (properties === null) {
          fail(`Expected to return a property list, but returned null.`);
        } else {
          validateFunction = ajv.compile({
            type: `object`,
            properties,
            required: Object.keys(properties),
            additionalProperties: false,
          });
        }
      });

      for (const subScenario of accepts) {
        it(`accepts ${subScenario.description}`, () => {
          const successful = validateFunction(subScenario.json);

          expect(successful).toBeTrue();

          if (!successful) {
            fail(ajv.errorsText(validateFunction.errors));
          }
        });
      }

      for (const subScenario of rejects) {
        it(`rejects ${subScenario.description}`, () => {
          expect(validateFunction(subScenario.json)).toBeFalse();
          expect(ajv.errorsText(validateFunction.errors)).toEqual(
            subScenario.error
          );
        });
      }
    });
  }

  function noOutputScenario(description: string, field: Field): void {
    describe(description, () => {
      let output: null | { [name: string]: JSONSchema7 };

      beforeAll(() => {
        output = convertFieldToJsonSchema(field);
      });

      it(`returns null`, () => {
        expect(output).toBeNull();
      });
    });
  }

  scenario(
    `checkbox false`,
    {
      type: `checkbox`,
      name: `testName`,
      label: `Test Label`,
      value: false,
    },
    [
      { description: `unchecked`, json: { testName: false } },
      { description: `checked`, json: { testName: true } },
    ],
    [
      {
        description: `null`,
        json: { testName: null },
        error: `data.testName should be boolean`,
      },
      {
        description: `number`,
        json: { testName: 32.1 },
        error: `data.testName should be boolean`,
      },
      {
        description: `string`,
        json: { testName: `Test String` },
        error: `data.testName should be boolean`,
      },
      {
        description: `array`,
        json: { testName: [] },
        error: `data.testName should be boolean`,
      },
      {
        description: `object`,
        json: { testName: {} },
        error: `data.testName should be boolean`,
      },
    ]
  );

  scenario(
    `checkbox true`,
    {
      type: `checkbox`,
      name: `testName`,
      label: `Test Label`,
      value: true,
    },
    [
      { description: `unchecked`, json: { testName: false } },
      { description: `checked`, json: { testName: true } },
    ],
    [
      {
        description: `null`,
        json: { testName: null },
        error: `data.testName should be boolean`,
      },
      {
        description: `number`,
        json: { testName: 32.1 },
        error: `data.testName should be boolean`,
      },
      {
        description: `string`,
        json: { testName: `Test String` },
        error: `data.testName should be boolean`,
      },
      {
        description: `array`,
        json: { testName: [] },
        error: `data.testName should be boolean`,
      },
      {
        description: `object`,
        json: { testName: {} },
        error: `data.testName should be boolean`,
      },
    ]
  );

  scenario(
    `required file with value with maximum bytes`,
    {
      type: `file`,
      name: `testName`,
      label: `Test Label`,
      url: `Test Url`,
      required: true,
      maximumBytes: 12,
    },
    [
      {
        description: `keep`,
        json: { testName: `$keep` },
      },
      {
        description: `replace at maximum length`,
        json: { testName: `NgjVmSqyuGcBYOE+` },
      },
      {
        description: `replace at below maximum length`,
        json: { testName: `NgjVmSqyuGcB` },
      },
    ],
    [
      {
        description: `null`,
        json: { testName: null },
        error: `data.testName should be string, data.testName should be equal to constant, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `number`,
        json: { testName: 32.1 },
        error: `data.testName should be string, data.testName should be equal to constant, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `string`,
        json: { testName: `Test String` },
        error: `data.testName should match pattern "^(?:[A-Za-z0-9+/]{4}){0,4}$|^(?:[A-Za-z0-9+/]{4}){0,3}[A-Za-z0-9+/]{2}==$|^(?:[A-Za-z0-9+/]{4}){0,3}[A-Za-z0-9+/]{3}=$", data.testName should be equal to constant, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `array`,
        json: { testName: [] },
        error: `data.testName should be string, data.testName should be equal to constant, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `object`,
        json: { testName: {} },
        error: `data.testName should be string, data.testName should be equal to constant, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `too long`,
        json: { testName: `NgjVmSqyuGcBYOE++g==` },
        error: `data.testName should match pattern "^(?:[A-Za-z0-9+/]{4}){0,4}$|^(?:[A-Za-z0-9+/]{4}){0,3}[A-Za-z0-9+/]{2}==$|^(?:[A-Za-z0-9+/]{4}){0,3}[A-Za-z0-9+/]{3}=$", data.testName should be equal to constant, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `false`,
        json: { testName: false },
        error: `data.testName should be string, data.testName should be equal to constant, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `true`,
        json: { testName: true },
        error: `data.testName should be string, data.testName should be equal to constant, data.testName should match exactly one schema in oneOf`,
      },
    ]
  );

  scenario(
    `required file with maximum bytes`,
    {
      type: `file`,
      name: `testName`,
      label: `Test Label`,
      url: null,
      required: true,
      maximumBytes: 12,
    },
    [
      {
        description: `replace at maximum length`,
        json: { testName: `NgjVmSqyuGcBYOE+` },
      },
      {
        description: `replace at below maximum length`,
        json: { testName: `NgjVmSqyuGcB` },
      },
    ],
    [
      {
        description: `null`,
        json: { testName: null },
        error: `data.testName should be string`,
      },
      {
        description: `number`,
        json: { testName: 32.1 },
        error: `data.testName should be string`,
      },
      {
        description: `string`,
        json: { testName: `Test String` },
        error: `data.testName should match pattern "^(?:[A-Za-z0-9+/]{4}){0,4}$|^(?:[A-Za-z0-9+/]{4}){0,3}[A-Za-z0-9+/]{2}==$|^(?:[A-Za-z0-9+/]{4}){0,3}[A-Za-z0-9+/]{3}=$"`,
      },
      {
        description: `array`,
        json: { testName: [] },
        error: `data.testName should be string`,
      },
      {
        description: `object`,
        json: { testName: {} },
        error: `data.testName should be string`,
      },
      {
        description: `too long`,
        json: { testName: `NgjVmSqyuGcBYOE++g==` },
        error: `data.testName should match pattern "^(?:[A-Za-z0-9+/]{4}){0,4}$|^(?:[A-Za-z0-9+/]{4}){0,3}[A-Za-z0-9+/]{2}==$|^(?:[A-Za-z0-9+/]{4}){0,3}[A-Za-z0-9+/]{3}=$"`,
      },
      {
        description: `keep`,
        json: { testName: `$keep` },
        error: `data.testName should match pattern "^(?:[A-Za-z0-9+/]{4}){0,4}$|^(?:[A-Za-z0-9+/]{4}){0,3}[A-Za-z0-9+/]{2}==$|^(?:[A-Za-z0-9+/]{4}){0,3}[A-Za-z0-9+/]{3}=$"`,
      },
      {
        description: `false`,
        json: { testName: false },
        error: `data.testName should be string`,
      },
      {
        description: `true`,
        json: { testName: true },
        error: `data.testName should be string`,
      },
    ]
  );

  scenario(
    `nullable file with value with maximum bytes`,
    {
      type: `file`,
      name: `testName`,
      label: `Test Label`,
      url: `Test Url`,
      required: false,
      maximumBytes: 12,
    },
    [
      {
        description: `keep`,
        json: { testName: `$keep` },
      },
      {
        description: `null`,
        json: { testName: null },
      },
      {
        description: `replace at maximum length`,
        json: { testName: `NgjVmSqyuGcBYOE+` },
      },
      {
        description: `replace at below maximum length`,
        json: { testName: `NgjVmSqyuGcB` },
      },
    ],
    [
      {
        description: `number`,
        json: { testName: 32.1 },
        error: `data.testName should be string, data.testName should be equal to constant, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `string`,
        json: { testName: `Test String` },
        error: `data.testName should match pattern "^(?:[A-Za-z0-9+/]{4}){0,4}$|^(?:[A-Za-z0-9+/]{4}){0,3}[A-Za-z0-9+/]{2}==$|^(?:[A-Za-z0-9+/]{4}){0,3}[A-Za-z0-9+/]{3}=$", data.testName should be equal to constant, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `array`,
        json: { testName: [] },
        error: `data.testName should be string, data.testName should be equal to constant, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `object`,
        json: { testName: {} },
        error: `data.testName should be string, data.testName should be equal to constant, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `too long`,
        json: { testName: `NgjVmSqyuGcBYOE++g==` },
        error: `data.testName should match pattern "^(?:[A-Za-z0-9+/]{4}){0,4}$|^(?:[A-Za-z0-9+/]{4}){0,3}[A-Za-z0-9+/]{2}==$|^(?:[A-Za-z0-9+/]{4}){0,3}[A-Za-z0-9+/]{3}=$", data.testName should be equal to constant, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `false`,
        json: { testName: false },
        error: `data.testName should be string, data.testName should be equal to constant, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `true`,
        json: { testName: true },
        error: `data.testName should be string, data.testName should be equal to constant, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
    ]
  );

  scenario(
    `nullable file with maximum bytes`,
    {
      type: `file`,
      name: `testName`,
      label: `Test Label`,
      url: null,
      required: false,
      maximumBytes: 12,
    },
    [
      {
        description: `null`,
        json: { testName: null },
      },
      {
        description: `replace at maximum length`,
        json: { testName: `NgjVmSqyuGcBYOE+` },
      },
      {
        description: `replace at below maximum length`,
        json: { testName: `NgjVmSqyuGcB` },
      },
    ],
    [
      {
        description: `number`,
        json: { testName: 32.1 },
        error: `data.testName should be string, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `string`,
        json: { testName: `Test String` },
        error: `data.testName should match pattern "^(?:[A-Za-z0-9+/]{4}){0,4}$|^(?:[A-Za-z0-9+/]{4}){0,3}[A-Za-z0-9+/]{2}==$|^(?:[A-Za-z0-9+/]{4}){0,3}[A-Za-z0-9+/]{3}=$", data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `array`,
        json: { testName: [] },
        error: `data.testName should be string, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `object`,
        json: { testName: {} },
        error: `data.testName should be string, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `too long`,
        json: { testName: `NgjVmSqyuGcBYOE++g==` },
        error: `data.testName should match pattern "^(?:[A-Za-z0-9+/]{4}){0,4}$|^(?:[A-Za-z0-9+/]{4}){0,3}[A-Za-z0-9+/]{2}==$|^(?:[A-Za-z0-9+/]{4}){0,3}[A-Za-z0-9+/]{3}=$", data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `keep`,
        json: { testName: `$keep` },
        error: `data.testName should match pattern "^(?:[A-Za-z0-9+/]{4}){0,4}$|^(?:[A-Za-z0-9+/]{4}){0,3}[A-Za-z0-9+/]{2}==$|^(?:[A-Za-z0-9+/]{4}){0,3}[A-Za-z0-9+/]{3}=$", data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `false`,
        json: { testName: false },
        error: `data.testName should be string, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `true`,
        json: { testName: true },
        error: `data.testName should be string, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
    ]
  );

  scenario(
    `required file with value`,
    {
      type: `file`,
      name: `testName`,
      label: `Test Label`,
      url: `Test Url`,
      required: true,
      maximumBytes: null,
    },
    [
      {
        description: `keep`,
        json: { testName: `$keep` },
      },
      {
        description: `replace`,
        json: { testName: `NgjVmSqyuGcBYOE+` },
      },
    ],
    [
      {
        description: `null`,
        json: { testName: null },
        error: `data.testName should be string, data.testName should be equal to constant, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `number`,
        json: { testName: 32.1 },
        error: `data.testName should be string, data.testName should be equal to constant, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `string`,
        json: { testName: `Test String` },
        error: `data.testName should match pattern "^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$", data.testName should be equal to constant, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `array`,
        json: { testName: [] },
        error: `data.testName should be string, data.testName should be equal to constant, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `object`,
        json: { testName: {} },
        error: `data.testName should be string, data.testName should be equal to constant, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `false`,
        json: { testName: false },
        error: `data.testName should be string, data.testName should be equal to constant, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `true`,
        json: { testName: true },
        error: `data.testName should be string, data.testName should be equal to constant, data.testName should match exactly one schema in oneOf`,
      },
    ]
  );

  scenario(
    `required file`,
    {
      type: `file`,
      name: `testName`,
      label: `Test Label`,
      url: null,
      required: true,
      maximumBytes: null,
    },
    [
      {
        description: `replace`,
        json: { testName: `NgjVmSqyuGcBYOE+` },
      },
    ],
    [
      {
        description: `null`,
        json: { testName: null },
        error: `data.testName should be string`,
      },
      {
        description: `number`,
        json: { testName: 32.1 },
        error: `data.testName should be string`,
      },
      {
        description: `string`,
        json: { testName: `Test String` },
        error: `data.testName should match pattern "^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$"`,
      },
      {
        description: `array`,
        json: { testName: [] },
        error: `data.testName should be string`,
      },
      {
        description: `object`,
        json: { testName: {} },
        error: `data.testName should be string`,
      },
      {
        description: `keep`,
        json: { testName: `$keep` },
        error: `data.testName should match pattern "^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$"`,
      },
      {
        description: `false`,
        json: { testName: false },
        error: `data.testName should be string`,
      },
      {
        description: `true`,
        json: { testName: true },
        error: `data.testName should be string`,
      },
    ]
  );

  scenario(
    `nullable file with value`,
    {
      type: `file`,
      name: `testName`,
      label: `Test Label`,
      url: `Test Url`,
      required: false,
      maximumBytes: null,
    },
    [
      {
        description: `keep`,
        json: { testName: `$keep` },
      },
      {
        description: `null`,
        json: { testName: null },
      },
      {
        description: `replace`,
        json: { testName: `NgjVmSqyuGcBYOE+` },
      },
    ],
    [
      {
        description: `number`,
        json: { testName: 32.1 },
        error: `data.testName should be string, data.testName should be equal to constant, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `string`,
        json: { testName: `Test String` },
        error: `data.testName should match pattern "^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$", data.testName should be equal to constant, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `array`,
        json: { testName: [] },
        error: `data.testName should be string, data.testName should be equal to constant, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `object`,
        json: { testName: {} },
        error: `data.testName should be string, data.testName should be equal to constant, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `false`,
        json: { testName: false },
        error: `data.testName should be string, data.testName should be equal to constant, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `true`,
        json: { testName: true },
        error: `data.testName should be string, data.testName should be equal to constant, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
    ]
  );

  scenario(
    `nullable file`,
    {
      type: `file`,
      name: `testName`,
      label: `Test Label`,
      url: null,
      required: false,
      maximumBytes: null,
    },
    [
      {
        description: `null`,
        json: { testName: null },
      },
      {
        description: `replace`,
        json: { testName: `NgjVmSqyuGcBYOE+` },
      },
    ],
    [
      {
        description: `number`,
        json: { testName: 32.1 },
        error: `data.testName should be string, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `string`,
        json: { testName: `Test String` },
        error: `data.testName should match pattern "^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$", data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `array`,
        json: { testName: [] },
        error: `data.testName should be string, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `object`,
        json: { testName: {} },
        error: `data.testName should be string, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `keep`,
        json: { testName: `$keep` },
        error: `data.testName should match pattern "^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$", data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `false`,
        json: { testName: false },
        error: `data.testName should be string, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `true`,
        json: { testName: true },
        error: `data.testName should be string, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
    ]
  );

  scenario(
    `required float with value with exclusive minimum with exclusive maximum`,
    {
      type: `float`,
      name: `testName`,
      label: `Test Label`,
      value: 5.642,
      minimum: [2.14, `exclusive`],
      maximum: [7.21, `exclusive`],
      required: true,
    },
    [
      {
        description: `number between minimum and maximum`,
        json: { testName: 3.01 },
      },
    ],
    [
      {
        description: `null`,
        json: { testName: null },
        error: `data.testName should be number`,
      },
      {
        description: `number below minimum`,
        json: { testName: 2.03 },
        error: `data.testName should be > 2.14`,
      },
      {
        description: `number at minimum`,
        json: { testName: 2.14 },
        error: `data.testName should be > 2.14`,
      },
      {
        description: `number at maximum`,
        json: { testName: 7.21 },
        error: `data.testName should be < 7.21`,
      },
      {
        description: `number above maximum`,
        json: { testName: 7.24 },
        error: `data.testName should be < 7.21`,
      },
      {
        description: `string`,
        json: { testName: `Test String` },
        error: `data.testName should be number`,
      },
      {
        description: `array`,
        json: { testName: [] },
        error: `data.testName should be number`,
      },
      {
        description: `object`,
        json: { testName: {} },
        error: `data.testName should be number`,
      },
      {
        description: `false`,
        json: { testName: false },
        error: `data.testName should be number`,
      },
      {
        description: `true`,
        json: { testName: true },
        error: `data.testName should be number`,
      },
    ]
  );

  scenario(
    `required float with value with exclusive minimum with inclusive maximum`,
    {
      type: `float`,
      name: `testName`,
      label: `Test Label`,
      value: 5.642,
      minimum: [2.14, `exclusive`],
      maximum: [7.21, `inclusive`],
      required: true,
    },
    [
      {
        description: `number between minimum and maximum`,
        json: { testName: 3.01 },
      },
      {
        description: `number at maximum`,
        json: { testName: 7.21 },
      },
    ],
    [
      {
        description: `null`,
        json: { testName: null },
        error: `data.testName should be number`,
      },
      {
        description: `number below minimum`,
        json: { testName: 2.03 },
        error: `data.testName should be > 2.14`,
      },
      {
        description: `number at minimum`,
        json: { testName: 2.14 },
        error: `data.testName should be > 2.14`,
      },
      {
        description: `number above maximum`,
        json: { testName: 7.24 },
        error: `data.testName should be <= 7.21`,
      },
      {
        description: `string`,
        json: { testName: `Test String` },
        error: `data.testName should be number`,
      },
      {
        description: `array`,
        json: { testName: [] },
        error: `data.testName should be number`,
      },
      {
        description: `object`,
        json: { testName: {} },
        error: `data.testName should be number`,
      },
      {
        description: `false`,
        json: { testName: false },
        error: `data.testName should be number`,
      },
      {
        description: `true`,
        json: { testName: true },
        error: `data.testName should be number`,
      },
    ]
  );

  scenario(
    `required float with value with exclusive minimum`,
    {
      type: `float`,
      name: `testName`,
      label: `Test Label`,
      value: 5.642,
      minimum: [2.14, `exclusive`],
      maximum: null,
      required: true,
    },
    [
      {
        description: `number above minimum`,
        json: { testName: 3.01 },
      },
    ],
    [
      {
        description: `null`,
        json: { testName: null },
        error: `data.testName should be number`,
      },
      {
        description: `number below minimum`,
        json: { testName: 2.03 },
        error: `data.testName should be > 2.14`,
      },
      {
        description: `number at minimum`,
        json: { testName: 2.14 },
        error: `data.testName should be > 2.14`,
      },
      {
        description: `string`,
        json: { testName: `Test String` },
        error: `data.testName should be number`,
      },
      {
        description: `array`,
        json: { testName: [] },
        error: `data.testName should be number`,
      },
      {
        description: `object`,
        json: { testName: {} },
        error: `data.testName should be number`,
      },
      {
        description: `false`,
        json: { testName: false },
        error: `data.testName should be number`,
      },
      {
        description: `true`,
        json: { testName: true },
        error: `data.testName should be number`,
      },
    ]
  );

  scenario(
    `required float with value with inclusive minimum with exclusive maximum`,
    {
      type: `float`,
      name: `testName`,
      label: `Test Label`,
      value: 5.642,
      minimum: [2.14, `inclusive`],
      maximum: [7.21, `exclusive`],
      required: true,
    },
    [
      {
        description: `number at minimum`,
        json: { testName: 2.14 },
      },
      {
        description: `number between minimum and maximum`,
        json: { testName: 3.01 },
      },
    ],
    [
      {
        description: `null`,
        json: { testName: null },
        error: `data.testName should be number`,
      },
      {
        description: `number below minimum`,
        json: { testName: 2.03 },
        error: `data.testName should be >= 2.14`,
      },
      {
        description: `number at maximum`,
        json: { testName: 7.21 },
        error: `data.testName should be < 7.21`,
      },
      {
        description: `number above maximum`,
        json: { testName: 7.24 },
        error: `data.testName should be < 7.21`,
      },
      {
        description: `string`,
        json: { testName: `Test String` },
        error: `data.testName should be number`,
      },
      {
        description: `array`,
        json: { testName: [] },
        error: `data.testName should be number`,
      },
      {
        description: `object`,
        json: { testName: {} },
        error: `data.testName should be number`,
      },
      {
        description: `false`,
        json: { testName: false },
        error: `data.testName should be number`,
      },
      {
        description: `true`,
        json: { testName: true },
        error: `data.testName should be number`,
      },
    ]
  );

  scenario(
    `required float with value with inclusive minimum with inclusive maximum`,
    {
      type: `float`,
      name: `testName`,
      label: `Test Label`,
      value: 5.642,
      minimum: [2.14, `inclusive`],
      maximum: [7.21, `inclusive`],
      required: true,
    },
    [
      {
        description: `number at minimum`,
        json: { testName: 2.14 },
      },
      {
        description: `number between minimum and maximum`,
        json: { testName: 3.01 },
      },
      {
        description: `number at maximum`,
        json: { testName: 7.21 },
      },
    ],
    [
      {
        description: `null`,
        json: { testName: null },
        error: `data.testName should be number`,
      },
      {
        description: `number below minimum`,
        json: { testName: 2.03 },
        error: `data.testName should be >= 2.14`,
      },
      {
        description: `number above maximum`,
        json: { testName: 7.24 },
        error: `data.testName should be <= 7.21`,
      },
      {
        description: `string`,
        json: { testName: `Test String` },
        error: `data.testName should be number`,
      },
      {
        description: `array`,
        json: { testName: [] },
        error: `data.testName should be number`,
      },
      {
        description: `object`,
        json: { testName: {} },
        error: `data.testName should be number`,
      },
      {
        description: `false`,
        json: { testName: false },
        error: `data.testName should be number`,
      },
      {
        description: `true`,
        json: { testName: true },
        error: `data.testName should be number`,
      },
    ]
  );

  scenario(
    `required float with value with inclusive minimum`,
    {
      type: `float`,
      name: `testName`,
      label: `Test Label`,
      value: 5.642,
      minimum: [2.14, `inclusive`],
      maximum: null,
      required: true,
    },
    [
      {
        description: `number at minimum`,
        json: { testName: 2.14 },
      },
      {
        description: `number above minimum`,
        json: { testName: 3.01 },
      },
    ],
    [
      {
        description: `null`,
        json: { testName: null },
        error: `data.testName should be number`,
      },
      {
        description: `number below minimum`,
        json: { testName: 2.03 },
        error: `data.testName should be >= 2.14`,
      },
      {
        description: `string`,
        json: { testName: `Test String` },
        error: `data.testName should be number`,
      },
      {
        description: `array`,
        json: { testName: [] },
        error: `data.testName should be number`,
      },
      {
        description: `object`,
        json: { testName: {} },
        error: `data.testName should be number`,
      },
      {
        description: `false`,
        json: { testName: false },
        error: `data.testName should be number`,
      },
      {
        description: `true`,
        json: { testName: true },
        error: `data.testName should be number`,
      },
    ]
  );

  scenario(
    `required float with value with exclusive maximum`,
    {
      type: `float`,
      name: `testName`,
      label: `Test Label`,
      value: 5.642,
      minimum: null,
      maximum: [7.21, `exclusive`],
      required: true,
    },
    [
      {
        description: `number below maximum`,
        json: { testName: 3.01 },
      },
    ],
    [
      {
        description: `null`,
        json: { testName: null },
        error: `data.testName should be number`,
      },
      {
        description: `number at maximum`,
        json: { testName: 7.21 },
        error: `data.testName should be < 7.21`,
      },
      {
        description: `number above maximum`,
        json: { testName: 7.24 },
        error: `data.testName should be < 7.21`,
      },
      {
        description: `string`,
        json: { testName: `Test String` },
        error: `data.testName should be number`,
      },
      {
        description: `array`,
        json: { testName: [] },
        error: `data.testName should be number`,
      },
      {
        description: `object`,
        json: { testName: {} },
        error: `data.testName should be number`,
      },
      {
        description: `false`,
        json: { testName: false },
        error: `data.testName should be number`,
      },
      {
        description: `true`,
        json: { testName: true },
        error: `data.testName should be number`,
      },
    ]
  );

  scenario(
    `required float with value with inclusive maximum`,
    {
      type: `float`,
      name: `testName`,
      label: `Test Label`,
      value: 5.642,
      minimum: null,
      maximum: [7.21, `inclusive`],
      required: true,
    },
    [
      {
        description: `number below maximum`,
        json: { testName: 3.01 },
      },
      {
        description: `number at maximum`,
        json: { testName: 7.21 },
      },
    ],
    [
      {
        description: `null`,
        json: { testName: null },
        error: `data.testName should be number`,
      },
      {
        description: `number above maximum`,
        json: { testName: 7.24 },
        error: `data.testName should be <= 7.21`,
      },
      {
        description: `string`,
        json: { testName: `Test String` },
        error: `data.testName should be number`,
      },
      {
        description: `array`,
        json: { testName: [] },
        error: `data.testName should be number`,
      },
      {
        description: `object`,
        json: { testName: {} },
        error: `data.testName should be number`,
      },
      {
        description: `false`,
        json: { testName: false },
        error: `data.testName should be number`,
      },
      {
        description: `true`,
        json: { testName: true },
        error: `data.testName should be number`,
      },
    ]
  );

  scenario(
    `required float with value`,
    {
      type: `float`,
      name: `testName`,
      label: `Test Label`,
      value: 5.642,
      minimum: null,
      maximum: null,
      required: true,
    },
    [
      {
        description: `number`,
        json: { testName: 3.01 },
      },
    ],
    [
      {
        description: `null`,
        json: { testName: null },
        error: `data.testName should be number`,
      },
      {
        description: `string`,
        json: { testName: `Test String` },
        error: `data.testName should be number`,
      },
      {
        description: `array`,
        json: { testName: [] },
        error: `data.testName should be number`,
      },
      {
        description: `object`,
        json: { testName: {} },
        error: `data.testName should be number`,
      },
      {
        description: `false`,
        json: { testName: false },
        error: `data.testName should be number`,
      },
      {
        description: `true`,
        json: { testName: true },
        error: `data.testName should be number`,
      },
    ]
  );

  scenario(
    `required float with exclusive minimum with exclusive maximum`,
    {
      type: `float`,
      name: `testName`,
      label: `Test Label`,
      value: null,
      minimum: [2.14, `exclusive`],
      maximum: [7.21, `exclusive`],
      required: true,
    },
    [
      {
        description: `number between minimum and maximum`,
        json: { testName: 3.01 },
      },
    ],
    [
      {
        description: `null`,
        json: { testName: null },
        error: `data.testName should be number`,
      },
      {
        description: `number below minimum`,
        json: { testName: 2.03 },
        error: `data.testName should be > 2.14`,
      },
      {
        description: `number at minimum`,
        json: { testName: 2.14 },
        error: `data.testName should be > 2.14`,
      },
      {
        description: `number at maximum`,
        json: { testName: 7.21 },
        error: `data.testName should be < 7.21`,
      },
      {
        description: `number above maximum`,
        json: { testName: 7.24 },
        error: `data.testName should be < 7.21`,
      },
      {
        description: `string`,
        json: { testName: `Test String` },
        error: `data.testName should be number`,
      },
      {
        description: `array`,
        json: { testName: [] },
        error: `data.testName should be number`,
      },
      {
        description: `object`,
        json: { testName: {} },
        error: `data.testName should be number`,
      },
      {
        description: `false`,
        json: { testName: false },
        error: `data.testName should be number`,
      },
      {
        description: `true`,
        json: { testName: true },
        error: `data.testName should be number`,
      },
    ]
  );

  scenario(
    `required float with exclusive minimum with inclusive maximum`,
    {
      type: `float`,
      name: `testName`,
      label: `Test Label`,
      value: null,
      minimum: [2.14, `exclusive`],
      maximum: [7.21, `inclusive`],
      required: true,
    },
    [
      {
        description: `number between minimum and maximum`,
        json: { testName: 3.01 },
      },
      {
        description: `number at maximum`,
        json: { testName: 7.21 },
      },
    ],
    [
      {
        description: `null`,
        json: { testName: null },
        error: `data.testName should be number`,
      },
      {
        description: `number below minimum`,
        json: { testName: 2.03 },
        error: `data.testName should be > 2.14`,
      },
      {
        description: `number at minimum`,
        json: { testName: 2.14 },
        error: `data.testName should be > 2.14`,
      },
      {
        description: `number above maximum`,
        json: { testName: 7.24 },
        error: `data.testName should be <= 7.21`,
      },
      {
        description: `string`,
        json: { testName: `Test String` },
        error: `data.testName should be number`,
      },
      {
        description: `array`,
        json: { testName: [] },
        error: `data.testName should be number`,
      },
      {
        description: `object`,
        json: { testName: {} },
        error: `data.testName should be number`,
      },
      {
        description: `false`,
        json: { testName: false },
        error: `data.testName should be number`,
      },
      {
        description: `true`,
        json: { testName: true },
        error: `data.testName should be number`,
      },
    ]
  );

  scenario(
    `required float with exclusive minimum`,
    {
      type: `float`,
      name: `testName`,
      label: `Test Label`,
      value: null,
      minimum: [2.14, `exclusive`],
      maximum: null,
      required: true,
    },
    [
      {
        description: `number above minimum`,
        json: { testName: 3.01 },
      },
    ],
    [
      {
        description: `null`,
        json: { testName: null },
        error: `data.testName should be number`,
      },
      {
        description: `number below minimum`,
        json: { testName: 2.03 },
        error: `data.testName should be > 2.14`,
      },
      {
        description: `number at minimum`,
        json: { testName: 2.14 },
        error: `data.testName should be > 2.14`,
      },
      {
        description: `string`,
        json: { testName: `Test String` },
        error: `data.testName should be number`,
      },
      {
        description: `array`,
        json: { testName: [] },
        error: `data.testName should be number`,
      },
      {
        description: `object`,
        json: { testName: {} },
        error: `data.testName should be number`,
      },
      {
        description: `false`,
        json: { testName: false },
        error: `data.testName should be number`,
      },
      {
        description: `true`,
        json: { testName: true },
        error: `data.testName should be number`,
      },
    ]
  );

  scenario(
    `required float with inclusive minimum with exclusive maximum`,
    {
      type: `float`,
      name: `testName`,
      label: `Test Label`,
      value: null,
      minimum: [2.14, `inclusive`],
      maximum: [7.21, `exclusive`],
      required: true,
    },
    [
      {
        description: `number at minimum`,
        json: { testName: 2.14 },
      },
      {
        description: `number between minimum and maximum`,
        json: { testName: 3.01 },
      },
    ],
    [
      {
        description: `null`,
        json: { testName: null },
        error: `data.testName should be number`,
      },
      {
        description: `number below minimum`,
        json: { testName: 2.03 },
        error: `data.testName should be >= 2.14`,
      },
      {
        description: `number at maximum`,
        json: { testName: 7.21 },
        error: `data.testName should be < 7.21`,
      },
      {
        description: `number above maximum`,
        json: { testName: 7.24 },
        error: `data.testName should be < 7.21`,
      },
      {
        description: `string`,
        json: { testName: `Test String` },
        error: `data.testName should be number`,
      },
      {
        description: `array`,
        json: { testName: [] },
        error: `data.testName should be number`,
      },
      {
        description: `object`,
        json: { testName: {} },
        error: `data.testName should be number`,
      },
      {
        description: `false`,
        json: { testName: false },
        error: `data.testName should be number`,
      },
      {
        description: `true`,
        json: { testName: true },
        error: `data.testName should be number`,
      },
    ]
  );

  scenario(
    `required float with inclusive minimum with inclusive maximum`,
    {
      type: `float`,
      name: `testName`,
      label: `Test Label`,
      value: null,
      minimum: [2.14, `inclusive`],
      maximum: [7.21, `inclusive`],
      required: true,
    },
    [
      {
        description: `number at minimum`,
        json: { testName: 2.14 },
      },
      {
        description: `number between minimum and maximum`,
        json: { testName: 3.01 },
      },
      {
        description: `number at maximum`,
        json: { testName: 7.21 },
      },
    ],
    [
      {
        description: `null`,
        json: { testName: null },
        error: `data.testName should be number`,
      },
      {
        description: `number below minimum`,
        json: { testName: 2.03 },
        error: `data.testName should be >= 2.14`,
      },
      {
        description: `number above maximum`,
        json: { testName: 7.24 },
        error: `data.testName should be <= 7.21`,
      },
      {
        description: `string`,
        json: { testName: `Test String` },
        error: `data.testName should be number`,
      },
      {
        description: `array`,
        json: { testName: [] },
        error: `data.testName should be number`,
      },
      {
        description: `object`,
        json: { testName: {} },
        error: `data.testName should be number`,
      },
      {
        description: `false`,
        json: { testName: false },
        error: `data.testName should be number`,
      },
      {
        description: `true`,
        json: { testName: true },
        error: `data.testName should be number`,
      },
    ]
  );

  scenario(
    `required float with inclusive minimum`,
    {
      type: `float`,
      name: `testName`,
      label: `Test Label`,
      value: null,
      minimum: [2.14, `inclusive`],
      maximum: null,
      required: true,
    },
    [
      {
        description: `number at minimum`,
        json: { testName: 2.14 },
      },
      {
        description: `number above minimum`,
        json: { testName: 3.01 },
      },
    ],
    [
      {
        description: `null`,
        json: { testName: null },
        error: `data.testName should be number`,
      },
      {
        description: `number below minimum`,
        json: { testName: 2.03 },
        error: `data.testName should be >= 2.14`,
      },
      {
        description: `string`,
        json: { testName: `Test String` },
        error: `data.testName should be number`,
      },
      {
        description: `array`,
        json: { testName: [] },
        error: `data.testName should be number`,
      },
      {
        description: `object`,
        json: { testName: {} },
        error: `data.testName should be number`,
      },
      {
        description: `false`,
        json: { testName: false },
        error: `data.testName should be number`,
      },
      {
        description: `true`,
        json: { testName: true },
        error: `data.testName should be number`,
      },
    ]
  );

  scenario(
    `required float with exclusive maximum`,
    {
      type: `float`,
      name: `testName`,
      label: `Test Label`,
      value: null,
      minimum: null,
      maximum: [7.21, `exclusive`],
      required: true,
    },
    [
      {
        description: `number below maximum`,
        json: { testName: 3.01 },
      },
    ],
    [
      {
        description: `null`,
        json: { testName: null },
        error: `data.testName should be number`,
      },
      {
        description: `number at maximum`,
        json: { testName: 7.21 },
        error: `data.testName should be < 7.21`,
      },
      {
        description: `number above maximum`,
        json: { testName: 7.24 },
        error: `data.testName should be < 7.21`,
      },
      {
        description: `string`,
        json: { testName: `Test String` },
        error: `data.testName should be number`,
      },
      {
        description: `array`,
        json: { testName: [] },
        error: `data.testName should be number`,
      },
      {
        description: `object`,
        json: { testName: {} },
        error: `data.testName should be number`,
      },
      {
        description: `false`,
        json: { testName: false },
        error: `data.testName should be number`,
      },
      {
        description: `true`,
        json: { testName: true },
        error: `data.testName should be number`,
      },
    ]
  );

  scenario(
    `required float with inclusive maximum`,
    {
      type: `float`,
      name: `testName`,
      label: `Test Label`,
      value: null,
      minimum: null,
      maximum: [7.21, `inclusive`],
      required: true,
    },
    [
      {
        description: `number below maximum`,
        json: { testName: 3.01 },
      },
      {
        description: `number at maximum`,
        json: { testName: 7.21 },
      },
    ],
    [
      {
        description: `null`,
        json: { testName: null },
        error: `data.testName should be number`,
      },
      {
        description: `number above maximum`,
        json: { testName: 7.24 },
        error: `data.testName should be <= 7.21`,
      },
      {
        description: `string`,
        json: { testName: `Test String` },
        error: `data.testName should be number`,
      },
      {
        description: `array`,
        json: { testName: [] },
        error: `data.testName should be number`,
      },
      {
        description: `object`,
        json: { testName: {} },
        error: `data.testName should be number`,
      },
      {
        description: `false`,
        json: { testName: false },
        error: `data.testName should be number`,
      },
      {
        description: `true`,
        json: { testName: true },
        error: `data.testName should be number`,
      },
    ]
  );

  scenario(
    `required float`,
    {
      type: `float`,
      name: `testName`,
      label: `Test Label`,
      value: null,
      minimum: null,
      maximum: null,
      required: true,
    },
    [
      {
        description: `number`,
        json: { testName: 3.01 },
      },
    ],
    [
      {
        description: `null`,
        json: { testName: null },
        error: `data.testName should be number`,
      },
      {
        description: `string`,
        json: { testName: `Test String` },
        error: `data.testName should be number`,
      },
      {
        description: `array`,
        json: { testName: [] },
        error: `data.testName should be number`,
      },
      {
        description: `object`,
        json: { testName: {} },
        error: `data.testName should be number`,
      },
      {
        description: `false`,
        json: { testName: false },
        error: `data.testName should be number`,
      },
      {
        description: `true`,
        json: { testName: true },
        error: `data.testName should be number`,
      },
    ]
  );

  scenario(
    `nullable float with value with exclusive minimum with exclusive maximum`,
    {
      type: `float`,
      name: `testName`,
      label: `Test Label`,
      value: 5.642,
      minimum: [2.14, `exclusive`],
      maximum: [7.21, `exclusive`],
      required: false,
    },
    [
      {
        description: `number between minimum and maximum`,
        json: { testName: 3.01 },
      },
      {
        description: `null`,
        json: { testName: null },
      },
    ],
    [
      {
        description: `number below minimum`,
        json: { testName: 2.03 },
        error: `data.testName should be > 2.14, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `number at minimum`,
        json: { testName: 2.14 },
        error: `data.testName should be > 2.14, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `number at maximum`,
        json: { testName: 7.21 },
        error: `data.testName should be < 7.21, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `number above maximum`,
        json: { testName: 7.24 },
        error: `data.testName should be < 7.21, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `string`,
        json: { testName: `Test String` },
        error: `data.testName should be number, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `array`,
        json: { testName: [] },
        error: `data.testName should be number, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `object`,
        json: { testName: {} },
        error: `data.testName should be number, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `false`,
        json: { testName: false },
        error: `data.testName should be number, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `true`,
        json: { testName: true },
        error: `data.testName should be number, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
    ]
  );

  scenario(
    `nullable float with value with exclusive minimum with inclusive maximum`,
    {
      type: `float`,
      name: `testName`,
      label: `Test Label`,
      value: 5.642,
      minimum: [2.14, `exclusive`],
      maximum: [7.21, `inclusive`],
      required: false,
    },
    [
      {
        description: `number between minimum and maximum`,
        json: { testName: 3.01 },
      },
      {
        description: `number at maximum`,
        json: { testName: 7.21 },
      },
      {
        description: `null`,
        json: { testName: null },
      },
    ],
    [
      {
        description: `number below minimum`,
        json: { testName: 2.03 },
        error: `data.testName should be > 2.14, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `number at minimum`,
        json: { testName: 2.14 },
        error: `data.testName should be > 2.14, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `number above maximum`,
        json: { testName: 7.24 },
        error: `data.testName should be <= 7.21, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `string`,
        json: { testName: `Test String` },
        error: `data.testName should be number, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `array`,
        json: { testName: [] },
        error: `data.testName should be number, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `object`,
        json: { testName: {} },
        error: `data.testName should be number, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `false`,
        json: { testName: false },
        error: `data.testName should be number, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `true`,
        json: { testName: true },
        error: `data.testName should be number, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
    ]
  );

  scenario(
    `nullable float with value with exclusive minimum`,
    {
      type: `float`,
      name: `testName`,
      label: `Test Label`,
      value: 5.642,
      minimum: [2.14, `exclusive`],
      maximum: null,
      required: false,
    },
    [
      {
        description: `number above minimum`,
        json: { testName: 3.01 },
      },
      {
        description: `null`,
        json: { testName: null },
      },
    ],
    [
      {
        description: `number below minimum`,
        json: { testName: 2.03 },
        error: `data.testName should be > 2.14, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `number at minimum`,
        json: { testName: 2.14 },
        error: `data.testName should be > 2.14, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `string`,
        json: { testName: `Test String` },
        error: `data.testName should be number, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `array`,
        json: { testName: [] },
        error: `data.testName should be number, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `object`,
        json: { testName: {} },
        error: `data.testName should be number, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `false`,
        json: { testName: false },
        error: `data.testName should be number, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `true`,
        json: { testName: true },
        error: `data.testName should be number, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
    ]
  );

  scenario(
    `nullable float with value with inclusive minimum with exclusive maximum`,
    {
      type: `float`,
      name: `testName`,
      label: `Test Label`,
      value: 5.642,
      minimum: [2.14, `inclusive`],
      maximum: [7.21, `exclusive`],
      required: false,
    },
    [
      {
        description: `number at minimum`,
        json: { testName: 2.14 },
      },
      {
        description: `number between minimum and maximum`,
        json: { testName: 3.01 },
      },
      {
        description: `null`,
        json: { testName: null },
      },
    ],
    [
      {
        description: `number below minimum`,
        json: { testName: 2.03 },
        error: `data.testName should be >= 2.14, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `number at maximum`,
        json: { testName: 7.21 },
        error: `data.testName should be < 7.21, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `number above maximum`,
        json: { testName: 7.24 },
        error: `data.testName should be < 7.21, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `string`,
        json: { testName: `Test String` },
        error: `data.testName should be number, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `array`,
        json: { testName: [] },
        error: `data.testName should be number, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `object`,
        json: { testName: {} },
        error: `data.testName should be number, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `false`,
        json: { testName: false },
        error: `data.testName should be number, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `true`,
        json: { testName: true },
        error: `data.testName should be number, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
    ]
  );

  scenario(
    `nullable float with value with inclusive minimum with inclusive maximum`,
    {
      type: `float`,
      name: `testName`,
      label: `Test Label`,
      value: 5.642,
      minimum: [2.14, `inclusive`],
      maximum: [7.21, `inclusive`],
      required: false,
    },
    [
      {
        description: `number at minimum`,
        json: { testName: 2.14 },
      },
      {
        description: `number between minimum and maximum`,
        json: { testName: 3.01 },
      },
      {
        description: `number at maximum`,
        json: { testName: 7.21 },
      },
      {
        description: `null`,
        json: { testName: null },
      },
    ],
    [
      {
        description: `number below minimum`,
        json: { testName: 2.03 },
        error: `data.testName should be >= 2.14, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `number above maximum`,
        json: { testName: 7.24 },
        error: `data.testName should be <= 7.21, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `string`,
        json: { testName: `Test String` },
        error: `data.testName should be number, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `array`,
        json: { testName: [] },
        error: `data.testName should be number, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `object`,
        json: { testName: {} },
        error: `data.testName should be number, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `false`,
        json: { testName: false },
        error: `data.testName should be number, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `true`,
        json: { testName: true },
        error: `data.testName should be number, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
    ]
  );

  scenario(
    `nullable float with value with inclusive minimum`,
    {
      type: `float`,
      name: `testName`,
      label: `Test Label`,
      value: 5.642,
      minimum: [2.14, `inclusive`],
      maximum: null,
      required: false,
    },
    [
      {
        description: `number at minimum`,
        json: { testName: 2.14 },
      },
      {
        description: `number above minimum`,
        json: { testName: 3.01 },
      },
      {
        description: `null`,
        json: { testName: null },
      },
    ],
    [
      {
        description: `number below minimum`,
        json: { testName: 2.03 },
        error: `data.testName should be >= 2.14, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `string`,
        json: { testName: `Test String` },
        error: `data.testName should be number, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `array`,
        json: { testName: [] },
        error: `data.testName should be number, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `object`,
        json: { testName: {} },
        error: `data.testName should be number, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `false`,
        json: { testName: false },
        error: `data.testName should be number, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `true`,
        json: { testName: true },
        error: `data.testName should be number, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
    ]
  );

  scenario(
    `nullable float with value with exclusive maximum`,
    {
      type: `float`,
      name: `testName`,
      label: `Test Label`,
      value: 5.642,
      minimum: null,
      maximum: [7.21, `exclusive`],
      required: false,
    },
    [
      {
        description: `number below maximum`,
        json: { testName: 3.01 },
      },
      {
        description: `null`,
        json: { testName: null },
      },
    ],
    [
      {
        description: `number at maximum`,
        json: { testName: 7.21 },
        error: `data.testName should be < 7.21, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `number above maximum`,
        json: { testName: 7.24 },
        error: `data.testName should be < 7.21, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `string`,
        json: { testName: `Test String` },
        error: `data.testName should be number, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `array`,
        json: { testName: [] },
        error: `data.testName should be number, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `object`,
        json: { testName: {} },
        error: `data.testName should be number, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `false`,
        json: { testName: false },
        error: `data.testName should be number, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `true`,
        json: { testName: true },
        error: `data.testName should be number, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
    ]
  );

  scenario(
    `nullable float with value with inclusive maximum`,
    {
      type: `float`,
      name: `testName`,
      label: `Test Label`,
      value: 5.642,
      minimum: null,
      maximum: [7.21, `inclusive`],
      required: false,
    },
    [
      {
        description: `number below maximum`,
        json: { testName: 3.01 },
      },
      {
        description: `number at maximum`,
        json: { testName: 7.21 },
      },
      {
        description: `null`,
        json: { testName: null },
      },
    ],
    [
      {
        description: `number above maximum`,
        json: { testName: 7.24 },
        error: `data.testName should be <= 7.21, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `string`,
        json: { testName: `Test String` },
        error: `data.testName should be number, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `array`,
        json: { testName: [] },
        error: `data.testName should be number, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `object`,
        json: { testName: {} },
        error: `data.testName should be number, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `false`,
        json: { testName: false },
        error: `data.testName should be number, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `true`,
        json: { testName: true },
        error: `data.testName should be number, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
    ]
  );

  scenario(
    `nullable float with value`,
    {
      type: `float`,
      name: `testName`,
      label: `Test Label`,
      value: 5.642,
      minimum: null,
      maximum: null,
      required: false,
    },
    [
      {
        description: `number`,
        json: { testName: 3.01 },
      },
      {
        description: `null`,
        json: { testName: null },
      },
    ],
    [
      {
        description: `string`,
        json: { testName: `Test String` },
        error: `data.testName should be number, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `array`,
        json: { testName: [] },
        error: `data.testName should be number, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `object`,
        json: { testName: {} },
        error: `data.testName should be number, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `false`,
        json: { testName: false },
        error: `data.testName should be number, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `true`,
        json: { testName: true },
        error: `data.testName should be number, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
    ]
  );

  scenario(
    `nullable float with exclusive minimum with exclusive maximum`,
    {
      type: `float`,
      name: `testName`,
      label: `Test Label`,
      value: null,
      minimum: [2.14, `exclusive`],
      maximum: [7.21, `exclusive`],
      required: false,
    },
    [
      {
        description: `number between minimum and maximum`,
        json: { testName: 3.01 },
      },
      {
        description: `null`,
        json: { testName: null },
      },
    ],
    [
      {
        description: `number below minimum`,
        json: { testName: 2.03 },
        error: `data.testName should be > 2.14, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `number at minimum`,
        json: { testName: 2.14 },
        error: `data.testName should be > 2.14, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `number at maximum`,
        json: { testName: 7.21 },
        error: `data.testName should be < 7.21, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `number above maximum`,
        json: { testName: 7.24 },
        error: `data.testName should be < 7.21, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `string`,
        json: { testName: `Test String` },
        error: `data.testName should be number, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `array`,
        json: { testName: [] },
        error: `data.testName should be number, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `object`,
        json: { testName: {} },
        error: `data.testName should be number, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `false`,
        json: { testName: false },
        error: `data.testName should be number, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `true`,
        json: { testName: true },
        error: `data.testName should be number, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
    ]
  );

  scenario(
    `nullable float with exclusive minimum with inclusive maximum`,
    {
      type: `float`,
      name: `testName`,
      label: `Test Label`,
      value: null,
      minimum: [2.14, `exclusive`],
      maximum: [7.21, `inclusive`],
      required: false,
    },
    [
      {
        description: `number between minimum and maximum`,
        json: { testName: 3.01 },
      },
      {
        description: `number at maximum`,
        json: { testName: 7.21 },
      },
      {
        description: `null`,
        json: { testName: null },
      },
    ],
    [
      {
        description: `number below minimum`,
        json: { testName: 2.03 },
        error: `data.testName should be > 2.14, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `number at minimum`,
        json: { testName: 2.14 },
        error: `data.testName should be > 2.14, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `number above maximum`,
        json: { testName: 7.24 },
        error: `data.testName should be <= 7.21, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `string`,
        json: { testName: `Test String` },
        error: `data.testName should be number, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `array`,
        json: { testName: [] },
        error: `data.testName should be number, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `object`,
        json: { testName: {} },
        error: `data.testName should be number, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `false`,
        json: { testName: false },
        error: `data.testName should be number, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `true`,
        json: { testName: true },
        error: `data.testName should be number, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
    ]
  );

  scenario(
    `nullable float with exclusive minimum`,
    {
      type: `float`,
      name: `testName`,
      label: `Test Label`,
      value: null,
      minimum: [2.14, `exclusive`],
      maximum: null,
      required: false,
    },
    [
      {
        description: `number above minimum`,
        json: { testName: 3.01 },
      },
      {
        description: `null`,
        json: { testName: null },
      },
    ],
    [
      {
        description: `number below minimum`,
        json: { testName: 2.03 },
        error: `data.testName should be > 2.14, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `number at minimum`,
        json: { testName: 2.14 },
        error: `data.testName should be > 2.14, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `string`,
        json: { testName: `Test String` },
        error: `data.testName should be number, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `array`,
        json: { testName: [] },
        error: `data.testName should be number, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `object`,
        json: { testName: {} },
        error: `data.testName should be number, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `false`,
        json: { testName: false },
        error: `data.testName should be number, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `true`,
        json: { testName: true },
        error: `data.testName should be number, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
    ]
  );

  scenario(
    `nullable float with inclusive minimum with exclusive maximum`,
    {
      type: `float`,
      name: `testName`,
      label: `Test Label`,
      value: null,
      minimum: [2.14, `inclusive`],
      maximum: [7.21, `exclusive`],
      required: false,
    },
    [
      {
        description: `number at minimum`,
        json: { testName: 2.14 },
      },
      {
        description: `number between minimum and maximum`,
        json: { testName: 3.01 },
      },
      {
        description: `null`,
        json: { testName: null },
      },
    ],
    [
      {
        description: `number below minimum`,
        json: { testName: 2.03 },
        error: `data.testName should be >= 2.14, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `number at maximum`,
        json: { testName: 7.21 },
        error: `data.testName should be < 7.21, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `number above maximum`,
        json: { testName: 7.24 },
        error: `data.testName should be < 7.21, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `string`,
        json: { testName: `Test String` },
        error: `data.testName should be number, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `array`,
        json: { testName: [] },
        error: `data.testName should be number, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `object`,
        json: { testName: {} },
        error: `data.testName should be number, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `false`,
        json: { testName: false },
        error: `data.testName should be number, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `true`,
        json: { testName: true },
        error: `data.testName should be number, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
    ]
  );

  scenario(
    `nullable float with inclusive minimum with inclusive maximum`,
    {
      type: `float`,
      name: `testName`,
      label: `Test Label`,
      value: null,
      minimum: [2.14, `inclusive`],
      maximum: [7.21, `inclusive`],
      required: false,
    },
    [
      {
        description: `number at minimum`,
        json: { testName: 2.14 },
      },
      {
        description: `number between minimum and maximum`,
        json: { testName: 3.01 },
      },
      {
        description: `number at maximum`,
        json: { testName: 7.21 },
      },
      {
        description: `null`,
        json: { testName: null },
      },
    ],
    [
      {
        description: `number below minimum`,
        json: { testName: 2.03 },
        error: `data.testName should be >= 2.14, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `number above maximum`,
        json: { testName: 7.24 },
        error: `data.testName should be <= 7.21, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `string`,
        json: { testName: `Test String` },
        error: `data.testName should be number, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `array`,
        json: { testName: [] },
        error: `data.testName should be number, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `object`,
        json: { testName: {} },
        error: `data.testName should be number, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `false`,
        json: { testName: false },
        error: `data.testName should be number, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `true`,
        json: { testName: true },
        error: `data.testName should be number, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
    ]
  );

  scenario(
    `nullable float with inclusive minimum`,
    {
      type: `float`,
      name: `testName`,
      label: `Test Label`,
      value: null,
      minimum: [2.14, `inclusive`],
      maximum: null,
      required: false,
    },
    [
      {
        description: `number at minimum`,
        json: { testName: 2.14 },
      },
      {
        description: `number above minimum`,
        json: { testName: 3.01 },
      },
      {
        description: `null`,
        json: { testName: null },
      },
    ],
    [
      {
        description: `number below minimum`,
        json: { testName: 2.03 },
        error: `data.testName should be >= 2.14, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `string`,
        json: { testName: `Test String` },
        error: `data.testName should be number, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `array`,
        json: { testName: [] },
        error: `data.testName should be number, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `object`,
        json: { testName: {} },
        error: `data.testName should be number, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `false`,
        json: { testName: false },
        error: `data.testName should be number, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `true`,
        json: { testName: true },
        error: `data.testName should be number, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
    ]
  );

  scenario(
    `nullable float with exclusive maximum`,
    {
      type: `float`,
      name: `testName`,
      label: `Test Label`,
      value: null,
      minimum: null,
      maximum: [7.21, `exclusive`],
      required: false,
    },
    [
      {
        description: `number below maximum`,
        json: { testName: 3.01 },
      },
      {
        description: `null`,
        json: { testName: null },
      },
    ],
    [
      {
        description: `number at maximum`,
        json: { testName: 7.21 },
        error: `data.testName should be < 7.21, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `number above maximum`,
        json: { testName: 7.24 },
        error: `data.testName should be < 7.21, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `string`,
        json: { testName: `Test String` },
        error: `data.testName should be number, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `array`,
        json: { testName: [] },
        error: `data.testName should be number, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `object`,
        json: { testName: {} },
        error: `data.testName should be number, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `false`,
        json: { testName: false },
        error: `data.testName should be number, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `true`,
        json: { testName: true },
        error: `data.testName should be number, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
    ]
  );

  scenario(
    `nullable float with inclusive maximum`,
    {
      type: `float`,
      name: `testName`,
      label: `Test Label`,
      value: null,
      minimum: null,
      maximum: [7.21, `inclusive`],
      required: false,
    },
    [
      {
        description: `number below maximum`,
        json: { testName: 3.01 },
      },
      {
        description: `number at maximum`,
        json: { testName: 7.21 },
      },
      {
        description: `null`,
        json: { testName: null },
      },
    ],
    [
      {
        description: `number above maximum`,
        json: { testName: 7.24 },
        error: `data.testName should be <= 7.21, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `string`,
        json: { testName: `Test String` },
        error: `data.testName should be number, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `array`,
        json: { testName: [] },
        error: `data.testName should be number, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `object`,
        json: { testName: {} },
        error: `data.testName should be number, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `false`,
        json: { testName: false },
        error: `data.testName should be number, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `true`,
        json: { testName: true },
        error: `data.testName should be number, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
    ]
  );

  scenario(
    `nullable float`,
    {
      type: `float`,
      name: `testName`,
      label: `Test Label`,
      value: null,
      minimum: null,
      maximum: null,
      required: false,
    },
    [
      {
        description: `number`,
        json: { testName: 3.01 },
      },
      {
        description: `null`,
        json: { testName: null },
      },
    ],
    [
      {
        description: `string`,
        json: { testName: `Test String` },
        error: `data.testName should be number, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `array`,
        json: { testName: [] },
        error: `data.testName should be number, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `object`,
        json: { testName: {} },
        error: `data.testName should be number, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `false`,
        json: { testName: false },
        error: `data.testName should be number, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `true`,
        json: { testName: true },
        error: `data.testName should be number, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
    ]
  );

  scenario(
    `required integer with value with exclusive minimum with exclusive maximum`,
    {
      type: `integer`,
      name: `testName`,
      label: `Test Label`,
      value: 6,
      minimum: [3, `exclusive`],
      maximum: [8, `exclusive`],
      required: true,
    },
    [
      {
        description: `integer between minimum and maximum`,
        json: { testName: 6 },
      },
    ],
    [
      {
        description: `null`,
        json: { testName: null },
        error: `data.testName should be integer`,
      },
      {
        description: `integer below minimum`,
        json: { testName: 2 },
        error: `data.testName should be > 3`,
      },
      {
        description: `integer at minimum`,
        json: { testName: 3 },
        error: `data.testName should be > 3`,
      },
      {
        description: `integer at maximum`,
        json: { testName: 8 },
        error: `data.testName should be < 8`,
      },
      {
        description: `integer above maximum`,
        json: { testName: 9 },
        error: `data.testName should be < 8`,
      },
      {
        description: `float`,
        json: { testName: 5.321 },
        error: `data.testName should be integer`,
      },
      {
        description: `string`,
        json: { testName: `Test String` },
        error: `data.testName should be integer`,
      },
      {
        description: `array`,
        json: { testName: [] },
        error: `data.testName should be integer`,
      },
      {
        description: `object`,
        json: { testName: {} },
        error: `data.testName should be integer`,
      },
      {
        description: `false`,
        json: { testName: false },
        error: `data.testName should be integer`,
      },
      {
        description: `true`,
        json: { testName: true },
        error: `data.testName should be integer`,
      },
    ]
  );

  scenario(
    `required integer with value with exclusive minimum with inclusive maximum`,
    {
      type: `integer`,
      name: `testName`,
      label: `Test Label`,
      value: 6,
      minimum: [3, `exclusive`],
      maximum: [8, `inclusive`],
      required: true,
    },
    [
      {
        description: `integer between minimum and maximum`,
        json: { testName: 6 },
      },
      {
        description: `integer at maximum`,
        json: { testName: 8 },
      },
    ],
    [
      {
        description: `null`,
        json: { testName: null },
        error: `data.testName should be integer`,
      },
      {
        description: `integer below minimum`,
        json: { testName: 2 },
        error: `data.testName should be > 3`,
      },
      {
        description: `integer at minimum`,
        json: { testName: 3 },
        error: `data.testName should be > 3`,
      },
      {
        description: `integer above maximum`,
        json: { testName: 9 },
        error: `data.testName should be <= 8`,
      },
      {
        description: `float`,
        json: { testName: 5.321 },
        error: `data.testName should be integer`,
      },
      {
        description: `string`,
        json: { testName: `Test String` },
        error: `data.testName should be integer`,
      },
      {
        description: `array`,
        json: { testName: [] },
        error: `data.testName should be integer`,
      },
      {
        description: `object`,
        json: { testName: {} },
        error: `data.testName should be integer`,
      },
      {
        description: `false`,
        json: { testName: false },
        error: `data.testName should be integer`,
      },
      {
        description: `true`,
        json: { testName: true },
        error: `data.testName should be integer`,
      },
    ]
  );

  scenario(
    `required integer with value with exclusive minimum`,
    {
      type: `integer`,
      name: `testName`,
      label: `Test Label`,
      value: 6,
      minimum: [3, `exclusive`],
      maximum: null,
      required: true,
    },
    [
      {
        description: `integer above minimum`,
        json: { testName: 4 },
      },
    ],
    [
      {
        description: `null`,
        json: { testName: null },
        error: `data.testName should be integer`,
      },
      {
        description: `integer below minimum`,
        json: { testName: 2 },
        error: `data.testName should be > 3`,
      },
      {
        description: `integer at minimum`,
        json: { testName: 3 },
        error: `data.testName should be > 3`,
      },
      {
        description: `float`,
        json: { testName: 5.321 },
        error: `data.testName should be integer`,
      },
      {
        description: `string`,
        json: { testName: `Test String` },
        error: `data.testName should be integer`,
      },
      {
        description: `array`,
        json: { testName: [] },
        error: `data.testName should be integer`,
      },
      {
        description: `object`,
        json: { testName: {} },
        error: `data.testName should be integer`,
      },
      {
        description: `false`,
        json: { testName: false },
        error: `data.testName should be integer`,
      },
      {
        description: `true`,
        json: { testName: true },
        error: `data.testName should be integer`,
      },
    ]
  );

  scenario(
    `required integer with value with inclusive minimum with exclusive maximum`,
    {
      type: `integer`,
      name: `testName`,
      label: `Test Label`,
      value: 6,
      minimum: [3, `inclusive`],
      maximum: [8, `exclusive`],
      required: true,
    },
    [
      {
        description: `integer at minimum`,
        json: { testName: 3 },
      },
      {
        description: `integer between minimum and maximum`,
        json: { testName: 6 },
      },
    ],
    [
      {
        description: `null`,
        json: { testName: null },
        error: `data.testName should be integer`,
      },
      {
        description: `integer below minimum`,
        json: { testName: 2 },
        error: `data.testName should be >= 3`,
      },
      {
        description: `integer at maximum`,
        json: { testName: 8 },
        error: `data.testName should be < 8`,
      },
      {
        description: `integer above maximum`,
        json: { testName: 9 },
        error: `data.testName should be < 8`,
      },
      {
        description: `float`,
        json: { testName: 5.321 },
        error: `data.testName should be integer`,
      },
      {
        description: `string`,
        json: { testName: `Test String` },
        error: `data.testName should be integer`,
      },
      {
        description: `array`,
        json: { testName: [] },
        error: `data.testName should be integer`,
      },
      {
        description: `object`,
        json: { testName: {} },
        error: `data.testName should be integer`,
      },
      {
        description: `false`,
        json: { testName: false },
        error: `data.testName should be integer`,
      },
      {
        description: `true`,
        json: { testName: true },
        error: `data.testName should be integer`,
      },
    ]
  );

  scenario(
    `required integer with value with inclusive minimum with inclusive maximum`,
    {
      type: `integer`,
      name: `testName`,
      label: `Test Label`,
      value: 6,
      minimum: [3, `inclusive`],
      maximum: [8, `inclusive`],
      required: true,
    },
    [
      {
        description: `integer at minimum`,
        json: { testName: 3 },
      },
      {
        description: `integer between minimum and maximum`,
        json: { testName: 6 },
      },
      {
        description: `integer at maximum`,
        json: { testName: 8 },
      },
    ],
    [
      {
        description: `null`,
        json: { testName: null },
        error: `data.testName should be integer`,
      },
      {
        description: `integer below minimum`,
        json: { testName: 2 },
        error: `data.testName should be >= 3`,
      },
      {
        description: `integer above maximum`,
        json: { testName: 9 },
        error: `data.testName should be <= 8`,
      },
      {
        description: `float`,
        json: { testName: 5.321 },
        error: `data.testName should be integer`,
      },
      {
        description: `string`,
        json: { testName: `Test String` },
        error: `data.testName should be integer`,
      },
      {
        description: `array`,
        json: { testName: [] },
        error: `data.testName should be integer`,
      },
      {
        description: `object`,
        json: { testName: {} },
        error: `data.testName should be integer`,
      },
      {
        description: `false`,
        json: { testName: false },
        error: `data.testName should be integer`,
      },
      {
        description: `true`,
        json: { testName: true },
        error: `data.testName should be integer`,
      },
    ]
  );

  scenario(
    `required integer with value with inclusive minimum`,
    {
      type: `integer`,
      name: `testName`,
      label: `Test Label`,
      value: 6,
      minimum: [3, `inclusive`],
      maximum: null,
      required: true,
    },
    [
      {
        description: `integer at minimum`,
        json: { testName: 3 },
      },
      {
        description: `integer above minimum`,
        json: { testName: 4 },
      },
    ],
    [
      {
        description: `null`,
        json: { testName: null },
        error: `data.testName should be integer`,
      },
      {
        description: `integer below minimum`,
        json: { testName: 2 },
        error: `data.testName should be >= 3`,
      },
      {
        description: `float`,
        json: { testName: 5.321 },
        error: `data.testName should be integer`,
      },
      {
        description: `string`,
        json: { testName: `Test String` },
        error: `data.testName should be integer`,
      },
      {
        description: `array`,
        json: { testName: [] },
        error: `data.testName should be integer`,
      },
      {
        description: `object`,
        json: { testName: {} },
        error: `data.testName should be integer`,
      },
      {
        description: `false`,
        json: { testName: false },
        error: `data.testName should be integer`,
      },
      {
        description: `true`,
        json: { testName: true },
        error: `data.testName should be integer`,
      },
    ]
  );

  scenario(
    `required integer with value with exclusive maximum`,
    {
      type: `integer`,
      name: `testName`,
      label: `Test Label`,
      value: 6,
      minimum: null,
      maximum: [8, `exclusive`],
      required: true,
    },
    [
      {
        description: `integer below maximum`,
        json: { testName: 7 },
      },
    ],
    [
      {
        description: `null`,
        json: { testName: null },
        error: `data.testName should be integer`,
      },
      {
        description: `integer at maximum`,
        json: { testName: 8 },
        error: `data.testName should be < 8`,
      },
      {
        description: `integer above maximum`,
        json: { testName: 9 },
        error: `data.testName should be < 8`,
      },
      {
        description: `float`,
        json: { testName: 5.321 },
        error: `data.testName should be integer`,
      },
      {
        description: `string`,
        json: { testName: `Test String` },
        error: `data.testName should be integer`,
      },
      {
        description: `array`,
        json: { testName: [] },
        error: `data.testName should be integer`,
      },
      {
        description: `object`,
        json: { testName: {} },
        error: `data.testName should be integer`,
      },
      {
        description: `false`,
        json: { testName: false },
        error: `data.testName should be integer`,
      },
      {
        description: `true`,
        json: { testName: true },
        error: `data.testName should be integer`,
      },
    ]
  );

  scenario(
    `required integer with value with inclusive maximum`,
    {
      type: `integer`,
      name: `testName`,
      label: `Test Label`,
      value: 6,
      minimum: null,
      maximum: [8, `inclusive`],
      required: true,
    },
    [
      {
        description: `integer below maximum`,
        json: { testName: 7 },
      },
      {
        description: `integer at maximum`,
        json: { testName: 8 },
      },
    ],
    [
      {
        description: `null`,
        json: { testName: null },
        error: `data.testName should be integer`,
      },
      {
        description: `integer above maximum`,
        json: { testName: 9 },
        error: `data.testName should be <= 8`,
      },
      {
        description: `float`,
        json: { testName: 5.321 },
        error: `data.testName should be integer`,
      },
      {
        description: `string`,
        json: { testName: `Test String` },
        error: `data.testName should be integer`,
      },
      {
        description: `array`,
        json: { testName: [] },
        error: `data.testName should be integer`,
      },
      {
        description: `object`,
        json: { testName: {} },
        error: `data.testName should be integer`,
      },
      {
        description: `false`,
        json: { testName: false },
        error: `data.testName should be integer`,
      },
      {
        description: `true`,
        json: { testName: true },
        error: `data.testName should be integer`,
      },
    ]
  );

  scenario(
    `required integer with value`,
    {
      type: `integer`,
      name: `testName`,
      label: `Test Label`,
      value: 6,
      minimum: null,
      maximum: null,
      required: true,
    },
    [
      {
        description: `integer`,
        json: { testName: 6 },
      },
    ],
    [
      {
        description: `null`,
        json: { testName: null },
        error: `data.testName should be integer`,
      },
      {
        description: `float`,
        json: { testName: 5.321 },
        error: `data.testName should be integer`,
      },
      {
        description: `string`,
        json: { testName: `Test String` },
        error: `data.testName should be integer`,
      },
      {
        description: `array`,
        json: { testName: [] },
        error: `data.testName should be integer`,
      },
      {
        description: `object`,
        json: { testName: {} },
        error: `data.testName should be integer`,
      },
      {
        description: `false`,
        json: { testName: false },
        error: `data.testName should be integer`,
      },
      {
        description: `true`,
        json: { testName: true },
        error: `data.testName should be integer`,
      },
    ]
  );

  scenario(
    `required integer with exclusive minimum with exclusive maximum`,
    {
      type: `integer`,
      name: `testName`,
      label: `Test Label`,
      value: null,
      minimum: [3, `exclusive`],
      maximum: [8, `exclusive`],
      required: true,
    },
    [
      {
        description: `integer between minimum and maximum`,
        json: { testName: 6 },
      },
    ],
    [
      {
        description: `null`,
        json: { testName: null },
        error: `data.testName should be integer`,
      },
      {
        description: `integer below minimum`,
        json: { testName: 2 },
        error: `data.testName should be > 3`,
      },
      {
        description: `integer at minimum`,
        json: { testName: 3 },
        error: `data.testName should be > 3`,
      },
      {
        description: `integer at maximum`,
        json: { testName: 8 },
        error: `data.testName should be < 8`,
      },
      {
        description: `integer above maximum`,
        json: { testName: 9 },
        error: `data.testName should be < 8`,
      },
      {
        description: `float`,
        json: { testName: 5.321 },
        error: `data.testName should be integer`,
      },
      {
        description: `string`,
        json: { testName: `Test String` },
        error: `data.testName should be integer`,
      },
      {
        description: `array`,
        json: { testName: [] },
        error: `data.testName should be integer`,
      },
      {
        description: `object`,
        json: { testName: {} },
        error: `data.testName should be integer`,
      },
      {
        description: `false`,
        json: { testName: false },
        error: `data.testName should be integer`,
      },
      {
        description: `true`,
        json: { testName: true },
        error: `data.testName should be integer`,
      },
    ]
  );

  scenario(
    `required integer with exclusive minimum with inclusive maximum`,
    {
      type: `integer`,
      name: `testName`,
      label: `Test Label`,
      value: null,
      minimum: [3, `exclusive`],
      maximum: [8, `inclusive`],
      required: true,
    },
    [
      {
        description: `integer between minimum and maximum`,
        json: { testName: 6 },
      },
      {
        description: `integer at maximum`,
        json: { testName: 8 },
      },
    ],
    [
      {
        description: `null`,
        json: { testName: null },
        error: `data.testName should be integer`,
      },
      {
        description: `integer below minimum`,
        json: { testName: 2 },
        error: `data.testName should be > 3`,
      },
      {
        description: `integer at minimum`,
        json: { testName: 3 },
        error: `data.testName should be > 3`,
      },
      {
        description: `integer above maximum`,
        json: { testName: 9 },
        error: `data.testName should be <= 8`,
      },
      {
        description: `float`,
        json: { testName: 5.321 },
        error: `data.testName should be integer`,
      },
      {
        description: `string`,
        json: { testName: `Test String` },
        error: `data.testName should be integer`,
      },
      {
        description: `array`,
        json: { testName: [] },
        error: `data.testName should be integer`,
      },
      {
        description: `object`,
        json: { testName: {} },
        error: `data.testName should be integer`,
      },
      {
        description: `false`,
        json: { testName: false },
        error: `data.testName should be integer`,
      },
      {
        description: `true`,
        json: { testName: true },
        error: `data.testName should be integer`,
      },
    ]
  );

  scenario(
    `required integer with exclusive minimum`,
    {
      type: `integer`,
      name: `testName`,
      label: `Test Label`,
      value: null,
      minimum: [3, `exclusive`],
      maximum: null,
      required: true,
    },
    [
      {
        description: `integer above minimum`,
        json: { testName: 4 },
      },
    ],
    [
      {
        description: `null`,
        json: { testName: null },
        error: `data.testName should be integer`,
      },
      {
        description: `integer below minimum`,
        json: { testName: 2 },
        error: `data.testName should be > 3`,
      },
      {
        description: `integer at minimum`,
        json: { testName: 3 },
        error: `data.testName should be > 3`,
      },
      {
        description: `float`,
        json: { testName: 5.321 },
        error: `data.testName should be integer`,
      },
      {
        description: `string`,
        json: { testName: `Test String` },
        error: `data.testName should be integer`,
      },
      {
        description: `array`,
        json: { testName: [] },
        error: `data.testName should be integer`,
      },
      {
        description: `object`,
        json: { testName: {} },
        error: `data.testName should be integer`,
      },
      {
        description: `false`,
        json: { testName: false },
        error: `data.testName should be integer`,
      },
      {
        description: `true`,
        json: { testName: true },
        error: `data.testName should be integer`,
      },
    ]
  );

  scenario(
    `required integer with inclusive minimum with exclusive maximum`,
    {
      type: `integer`,
      name: `testName`,
      label: `Test Label`,
      value: null,
      minimum: [3, `inclusive`],
      maximum: [8, `exclusive`],
      required: true,
    },
    [
      {
        description: `integer at minimum`,
        json: { testName: 3 },
      },
      {
        description: `integer between minimum and maximum`,
        json: { testName: 6 },
      },
    ],
    [
      {
        description: `null`,
        json: { testName: null },
        error: `data.testName should be integer`,
      },
      {
        description: `integer below minimum`,
        json: { testName: 2 },
        error: `data.testName should be >= 3`,
      },
      {
        description: `integer at maximum`,
        json: { testName: 8 },
        error: `data.testName should be < 8`,
      },
      {
        description: `integer above maximum`,
        json: { testName: 9 },
        error: `data.testName should be < 8`,
      },
      {
        description: `float`,
        json: { testName: 5.321 },
        error: `data.testName should be integer`,
      },
      {
        description: `string`,
        json: { testName: `Test String` },
        error: `data.testName should be integer`,
      },
      {
        description: `array`,
        json: { testName: [] },
        error: `data.testName should be integer`,
      },
      {
        description: `object`,
        json: { testName: {} },
        error: `data.testName should be integer`,
      },
      {
        description: `false`,
        json: { testName: false },
        error: `data.testName should be integer`,
      },
      {
        description: `true`,
        json: { testName: true },
        error: `data.testName should be integer`,
      },
    ]
  );

  scenario(
    `required integer with inclusive minimum with inclusive maximum`,
    {
      type: `integer`,
      name: `testName`,
      label: `Test Label`,
      value: null,
      minimum: [3, `inclusive`],
      maximum: [8, `inclusive`],
      required: true,
    },
    [
      {
        description: `integer at minimum`,
        json: { testName: 3 },
      },
      {
        description: `integer between minimum and maximum`,
        json: { testName: 6 },
      },
      {
        description: `integer at maximum`,
        json: { testName: 8 },
      },
    ],
    [
      {
        description: `null`,
        json: { testName: null },
        error: `data.testName should be integer`,
      },
      {
        description: `integer below minimum`,
        json: { testName: 2 },
        error: `data.testName should be >= 3`,
      },
      {
        description: `integer above maximum`,
        json: { testName: 9 },
        error: `data.testName should be <= 8`,
      },
      {
        description: `float`,
        json: { testName: 5.321 },
        error: `data.testName should be integer`,
      },
      {
        description: `string`,
        json: { testName: `Test String` },
        error: `data.testName should be integer`,
      },
      {
        description: `array`,
        json: { testName: [] },
        error: `data.testName should be integer`,
      },
      {
        description: `object`,
        json: { testName: {} },
        error: `data.testName should be integer`,
      },
      {
        description: `false`,
        json: { testName: false },
        error: `data.testName should be integer`,
      },
      {
        description: `true`,
        json: { testName: true },
        error: `data.testName should be integer`,
      },
    ]
  );

  scenario(
    `required integer with inclusive minimum`,
    {
      type: `integer`,
      name: `testName`,
      label: `Test Label`,
      value: null,
      minimum: [3, `inclusive`],
      maximum: null,
      required: true,
    },
    [
      {
        description: `integer at minimum`,
        json: { testName: 3 },
      },
      {
        description: `integer above minimum`,
        json: { testName: 4 },
      },
    ],
    [
      {
        description: `null`,
        json: { testName: null },
        error: `data.testName should be integer`,
      },
      {
        description: `integer below minimum`,
        json: { testName: 2 },
        error: `data.testName should be >= 3`,
      },
      {
        description: `float`,
        json: { testName: 5.321 },
        error: `data.testName should be integer`,
      },
      {
        description: `string`,
        json: { testName: `Test String` },
        error: `data.testName should be integer`,
      },
      {
        description: `array`,
        json: { testName: [] },
        error: `data.testName should be integer`,
      },
      {
        description: `object`,
        json: { testName: {} },
        error: `data.testName should be integer`,
      },
      {
        description: `false`,
        json: { testName: false },
        error: `data.testName should be integer`,
      },
      {
        description: `true`,
        json: { testName: true },
        error: `data.testName should be integer`,
      },
    ]
  );

  scenario(
    `required integer with exclusive maximum`,
    {
      type: `integer`,
      name: `testName`,
      label: `Test Label`,
      value: null,
      minimum: null,
      maximum: [8, `exclusive`],
      required: true,
    },
    [
      {
        description: `integer below maximum`,
        json: { testName: 7 },
      },
    ],
    [
      {
        description: `null`,
        json: { testName: null },
        error: `data.testName should be integer`,
      },
      {
        description: `integer at maximum`,
        json: { testName: 8 },
        error: `data.testName should be < 8`,
      },
      {
        description: `integer above maximum`,
        json: { testName: 9 },
        error: `data.testName should be < 8`,
      },
      {
        description: `float`,
        json: { testName: 5.321 },
        error: `data.testName should be integer`,
      },
      {
        description: `string`,
        json: { testName: `Test String` },
        error: `data.testName should be integer`,
      },
      {
        description: `array`,
        json: { testName: [] },
        error: `data.testName should be integer`,
      },
      {
        description: `object`,
        json: { testName: {} },
        error: `data.testName should be integer`,
      },
      {
        description: `false`,
        json: { testName: false },
        error: `data.testName should be integer`,
      },
      {
        description: `true`,
        json: { testName: true },
        error: `data.testName should be integer`,
      },
    ]
  );

  scenario(
    `required integer with inclusive maximum`,
    {
      type: `integer`,
      name: `testName`,
      label: `Test Label`,
      value: null,
      minimum: null,
      maximum: [8, `inclusive`],
      required: true,
    },
    [
      {
        description: `integer below maximum`,
        json: { testName: 7 },
      },
      {
        description: `integer at maximum`,
        json: { testName: 8 },
      },
    ],
    [
      {
        description: `null`,
        json: { testName: null },
        error: `data.testName should be integer`,
      },
      {
        description: `integer above maximum`,
        json: { testName: 9 },
        error: `data.testName should be <= 8`,
      },
      {
        description: `float`,
        json: { testName: 5.321 },
        error: `data.testName should be integer`,
      },
      {
        description: `string`,
        json: { testName: `Test String` },
        error: `data.testName should be integer`,
      },
      {
        description: `array`,
        json: { testName: [] },
        error: `data.testName should be integer`,
      },
      {
        description: `object`,
        json: { testName: {} },
        error: `data.testName should be integer`,
      },
      {
        description: `false`,
        json: { testName: false },
        error: `data.testName should be integer`,
      },
      {
        description: `true`,
        json: { testName: true },
        error: `data.testName should be integer`,
      },
    ]
  );

  scenario(
    `required integer`,
    {
      type: `integer`,
      name: `testName`,
      label: `Test Label`,
      value: null,
      minimum: null,
      maximum: null,
      required: true,
    },
    [
      {
        description: `integer`,
        json: { testName: 6 },
      },
    ],
    [
      {
        description: `null`,
        json: { testName: null },
        error: `data.testName should be integer`,
      },
      {
        description: `float`,
        json: { testName: 5.321 },
        error: `data.testName should be integer`,
      },
      {
        description: `string`,
        json: { testName: `Test String` },
        error: `data.testName should be integer`,
      },
      {
        description: `array`,
        json: { testName: [] },
        error: `data.testName should be integer`,
      },
      {
        description: `object`,
        json: { testName: {} },
        error: `data.testName should be integer`,
      },
      {
        description: `false`,
        json: { testName: false },
        error: `data.testName should be integer`,
      },
      {
        description: `true`,
        json: { testName: true },
        error: `data.testName should be integer`,
      },
    ]
  );

  scenario(
    `nullable integer with value with exclusive minimum with exclusive maximum`,
    {
      type: `integer`,
      name: `testName`,
      label: `Test Label`,
      value: 6,
      minimum: [3, `exclusive`],
      maximum: [8, `exclusive`],
      required: false,
    },
    [
      {
        description: `integer between minimum and maximum`,
        json: { testName: 6 },
      },
      {
        description: `null`,
        json: { testName: null },
      },
    ],
    [
      {
        description: `integer below minimum`,
        json: { testName: 2 },
        error: `data.testName should be > 3, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `integer at minimum`,
        json: { testName: 3 },
        error: `data.testName should be > 3, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `integer at maximum`,
        json: { testName: 8 },
        error: `data.testName should be < 8, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `integer above maximum`,
        json: { testName: 9 },
        error: `data.testName should be < 8, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `float`,
        json: { testName: 5.321 },
        error: `data.testName should be integer, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `string`,
        json: { testName: `Test String` },
        error: `data.testName should be integer, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `array`,
        json: { testName: [] },
        error: `data.testName should be integer, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `object`,
        json: { testName: {} },
        error: `data.testName should be integer, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `false`,
        json: { testName: false },
        error: `data.testName should be integer, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `true`,
        json: { testName: true },
        error: `data.testName should be integer, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
    ]
  );

  scenario(
    `nullable integer with value with exclusive minimum with inclusive maximum`,
    {
      type: `integer`,
      name: `testName`,
      label: `Test Label`,
      value: 6,
      minimum: [3, `exclusive`],
      maximum: [8, `inclusive`],
      required: false,
    },
    [
      {
        description: `integer between minimum and maximum`,
        json: { testName: 6 },
      },
      {
        description: `integer at maximum`,
        json: { testName: 8 },
      },
      {
        description: `null`,
        json: { testName: null },
      },
    ],
    [
      {
        description: `integer below minimum`,
        json: { testName: 2 },
        error: `data.testName should be > 3, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `integer at minimum`,
        json: { testName: 3 },
        error: `data.testName should be > 3, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `integer above maximum`,
        json: { testName: 9 },
        error: `data.testName should be <= 8, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `float`,
        json: { testName: 5.321 },
        error: `data.testName should be integer, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `string`,
        json: { testName: `Test String` },
        error: `data.testName should be integer, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `array`,
        json: { testName: [] },
        error: `data.testName should be integer, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `object`,
        json: { testName: {} },
        error: `data.testName should be integer, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `false`,
        json: { testName: false },
        error: `data.testName should be integer, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `true`,
        json: { testName: true },
        error: `data.testName should be integer, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
    ]
  );

  scenario(
    `nullable integer with value with exclusive minimum`,
    {
      type: `integer`,
      name: `testName`,
      label: `Test Label`,
      value: 6,
      minimum: [3, `exclusive`],
      maximum: null,
      required: false,
    },
    [
      {
        description: `integer above minimum`,
        json: { testName: 4 },
      },
      {
        description: `null`,
        json: { testName: null },
      },
    ],
    [
      {
        description: `integer below minimum`,
        json: { testName: 2 },
        error: `data.testName should be > 3, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `integer at minimum`,
        json: { testName: 3 },
        error: `data.testName should be > 3, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `float`,
        json: { testName: 5.321 },
        error: `data.testName should be integer, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `string`,
        json: { testName: `Test String` },
        error: `data.testName should be integer, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `array`,
        json: { testName: [] },
        error: `data.testName should be integer, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `object`,
        json: { testName: {} },
        error: `data.testName should be integer, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `false`,
        json: { testName: false },
        error: `data.testName should be integer, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `true`,
        json: { testName: true },
        error: `data.testName should be integer, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
    ]
  );

  scenario(
    `nullable integer with value with inclusive minimum with exclusive maximum`,
    {
      type: `integer`,
      name: `testName`,
      label: `Test Label`,
      value: 6,
      minimum: [3, `inclusive`],
      maximum: [8, `exclusive`],
      required: false,
    },
    [
      {
        description: `integer at minimum`,
        json: { testName: 3 },
      },
      {
        description: `integer between minimum and maximum`,
        json: { testName: 6 },
      },
      {
        description: `null`,
        json: { testName: null },
      },
    ],
    [
      {
        description: `integer below minimum`,
        json: { testName: 2 },
        error: `data.testName should be >= 3, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `integer at maximum`,
        json: { testName: 8 },
        error: `data.testName should be < 8, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `integer above maximum`,
        json: { testName: 9 },
        error: `data.testName should be < 8, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `float`,
        json: { testName: 5.321 },
        error: `data.testName should be integer, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `string`,
        json: { testName: `Test String` },
        error: `data.testName should be integer, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `array`,
        json: { testName: [] },
        error: `data.testName should be integer, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `object`,
        json: { testName: {} },
        error: `data.testName should be integer, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `false`,
        json: { testName: false },
        error: `data.testName should be integer, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `true`,
        json: { testName: true },
        error: `data.testName should be integer, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
    ]
  );

  scenario(
    `nullable integer with value with inclusive minimum with inclusive maximum`,
    {
      type: `integer`,
      name: `testName`,
      label: `Test Label`,
      value: 6,
      minimum: [3, `inclusive`],
      maximum: [8, `inclusive`],
      required: false,
    },
    [
      {
        description: `integer at minimum`,
        json: { testName: 3 },
      },
      {
        description: `integer between minimum and maximum`,
        json: { testName: 6 },
      },
      {
        description: `integer at maximum`,
        json: { testName: 8 },
      },
      {
        description: `null`,
        json: { testName: null },
      },
    ],
    [
      {
        description: `integer below minimum`,
        json: { testName: 2 },
        error: `data.testName should be >= 3, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `integer above maximum`,
        json: { testName: 9 },
        error: `data.testName should be <= 8, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `float`,
        json: { testName: 5.321 },
        error: `data.testName should be integer, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `string`,
        json: { testName: `Test String` },
        error: `data.testName should be integer, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `array`,
        json: { testName: [] },
        error: `data.testName should be integer, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `object`,
        json: { testName: {} },
        error: `data.testName should be integer, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `false`,
        json: { testName: false },
        error: `data.testName should be integer, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `true`,
        json: { testName: true },
        error: `data.testName should be integer, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
    ]
  );

  scenario(
    `nullable integer with value with inclusive minimum`,
    {
      type: `integer`,
      name: `testName`,
      label: `Test Label`,
      value: 6,
      minimum: [3, `inclusive`],
      maximum: null,
      required: false,
    },
    [
      {
        description: `integer at minimum`,
        json: { testName: 3 },
      },
      {
        description: `integer above minimum`,
        json: { testName: 4 },
      },
      {
        description: `null`,
        json: { testName: null },
      },
    ],
    [
      {
        description: `integer below minimum`,
        json: { testName: 2 },
        error: `data.testName should be >= 3, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `float`,
        json: { testName: 5.321 },
        error: `data.testName should be integer, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `string`,
        json: { testName: `Test String` },
        error: `data.testName should be integer, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `array`,
        json: { testName: [] },
        error: `data.testName should be integer, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `object`,
        json: { testName: {} },
        error: `data.testName should be integer, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `false`,
        json: { testName: false },
        error: `data.testName should be integer, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `true`,
        json: { testName: true },
        error: `data.testName should be integer, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
    ]
  );

  scenario(
    `nullable integer with value with exclusive maximum`,
    {
      type: `integer`,
      name: `testName`,
      label: `Test Label`,
      value: 6,
      minimum: null,
      maximum: [8, `exclusive`],
      required: false,
    },
    [
      {
        description: `integer below maximum`,
        json: { testName: 7 },
      },
      {
        description: `null`,
        json: { testName: null },
      },
    ],
    [
      {
        description: `integer at maximum`,
        json: { testName: 8 },
        error: `data.testName should be < 8, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `integer above maximum`,
        json: { testName: 9 },
        error: `data.testName should be < 8, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `float`,
        json: { testName: 5.321 },
        error: `data.testName should be integer, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `string`,
        json: { testName: `Test String` },
        error: `data.testName should be integer, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `array`,
        json: { testName: [] },
        error: `data.testName should be integer, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `object`,
        json: { testName: {} },
        error: `data.testName should be integer, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `false`,
        json: { testName: false },
        error: `data.testName should be integer, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `true`,
        json: { testName: true },
        error: `data.testName should be integer, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
    ]
  );

  scenario(
    `nullable integer with value with inclusive maximum`,
    {
      type: `integer`,
      name: `testName`,
      label: `Test Label`,
      value: 6,
      minimum: null,
      maximum: [8, `inclusive`],
      required: false,
    },
    [
      {
        description: `integer below maximum`,
        json: { testName: 7 },
      },
      {
        description: `integer at maximum`,
        json: { testName: 8 },
      },
      {
        description: `null`,
        json: { testName: null },
      },
    ],
    [
      {
        description: `integer above maximum`,
        json: { testName: 9 },
        error: `data.testName should be <= 8, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `float`,
        json: { testName: 5.321 },
        error: `data.testName should be integer, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `string`,
        json: { testName: `Test String` },
        error: `data.testName should be integer, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `array`,
        json: { testName: [] },
        error: `data.testName should be integer, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `object`,
        json: { testName: {} },
        error: `data.testName should be integer, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `false`,
        json: { testName: false },
        error: `data.testName should be integer, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `true`,
        json: { testName: true },
        error: `data.testName should be integer, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
    ]
  );

  scenario(
    `nullable integer with value`,
    {
      type: `integer`,
      name: `testName`,
      label: `Test Label`,
      value: 6,
      minimum: null,
      maximum: null,
      required: false,
    },
    [
      {
        description: `integer`,
        json: { testName: 6 },
      },
      {
        description: `null`,
        json: { testName: null },
      },
    ],
    [
      {
        description: `float`,
        json: { testName: 5.321 },
        error: `data.testName should be integer, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `string`,
        json: { testName: `Test String` },
        error: `data.testName should be integer, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `array`,
        json: { testName: [] },
        error: `data.testName should be integer, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `object`,
        json: { testName: {} },
        error: `data.testName should be integer, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `false`,
        json: { testName: false },
        error: `data.testName should be integer, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `true`,
        json: { testName: true },
        error: `data.testName should be integer, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
    ]
  );

  scenario(
    `nullable integer with exclusive minimum with exclusive maximum`,
    {
      type: `integer`,
      name: `testName`,
      label: `Test Label`,
      value: null,
      minimum: [3, `exclusive`],
      maximum: [8, `exclusive`],
      required: false,
    },
    [
      {
        description: `integer between minimum and maximum`,
        json: { testName: 6 },
      },
      {
        description: `null`,
        json: { testName: null },
      },
    ],
    [
      {
        description: `integer below minimum`,
        json: { testName: 2 },
        error: `data.testName should be > 3, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `integer at minimum`,
        json: { testName: 3 },
        error: `data.testName should be > 3, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `integer at maximum`,
        json: { testName: 8 },
        error: `data.testName should be < 8, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `integer above maximum`,
        json: { testName: 9 },
        error: `data.testName should be < 8, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `float`,
        json: { testName: 5.321 },
        error: `data.testName should be integer, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `string`,
        json: { testName: `Test String` },
        error: `data.testName should be integer, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `array`,
        json: { testName: [] },
        error: `data.testName should be integer, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `object`,
        json: { testName: {} },
        error: `data.testName should be integer, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `false`,
        json: { testName: false },
        error: `data.testName should be integer, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `true`,
        json: { testName: true },
        error: `data.testName should be integer, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
    ]
  );

  scenario(
    `nullable integer with exclusive minimum with inclusive maximum`,
    {
      type: `integer`,
      name: `testName`,
      label: `Test Label`,
      value: null,
      minimum: [3, `exclusive`],
      maximum: [8, `inclusive`],
      required: false,
    },
    [
      {
        description: `integer between minimum and maximum`,
        json: { testName: 6 },
      },
      {
        description: `integer at maximum`,
        json: { testName: 8 },
      },
      {
        description: `null`,
        json: { testName: null },
      },
    ],
    [
      {
        description: `integer below minimum`,
        json: { testName: 2 },
        error: `data.testName should be > 3, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `integer at minimum`,
        json: { testName: 3 },
        error: `data.testName should be > 3, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `integer above maximum`,
        json: { testName: 9 },
        error: `data.testName should be <= 8, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `float`,
        json: { testName: 5.321 },
        error: `data.testName should be integer, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `string`,
        json: { testName: `Test String` },
        error: `data.testName should be integer, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `array`,
        json: { testName: [] },
        error: `data.testName should be integer, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `object`,
        json: { testName: {} },
        error: `data.testName should be integer, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `false`,
        json: { testName: false },
        error: `data.testName should be integer, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `true`,
        json: { testName: true },
        error: `data.testName should be integer, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
    ]
  );

  scenario(
    `nullable integer with exclusive minimum`,
    {
      type: `integer`,
      name: `testName`,
      label: `Test Label`,
      value: null,
      minimum: [3, `exclusive`],
      maximum: null,
      required: false,
    },
    [
      {
        description: `integer above minimum`,
        json: { testName: 4 },
      },
      {
        description: `null`,
        json: { testName: null },
      },
    ],
    [
      {
        description: `integer below minimum`,
        json: { testName: 2 },
        error: `data.testName should be > 3, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `integer at minimum`,
        json: { testName: 3 },
        error: `data.testName should be > 3, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `float`,
        json: { testName: 5.321 },
        error: `data.testName should be integer, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `string`,
        json: { testName: `Test String` },
        error: `data.testName should be integer, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `array`,
        json: { testName: [] },
        error: `data.testName should be integer, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `object`,
        json: { testName: {} },
        error: `data.testName should be integer, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `false`,
        json: { testName: false },
        error: `data.testName should be integer, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `true`,
        json: { testName: true },
        error: `data.testName should be integer, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
    ]
  );

  scenario(
    `nullable integer with inclusive minimum with exclusive maximum`,
    {
      type: `integer`,
      name: `testName`,
      label: `Test Label`,
      value: null,
      minimum: [3, `inclusive`],
      maximum: [8, `exclusive`],
      required: false,
    },
    [
      {
        description: `integer at minimum`,
        json: { testName: 3 },
      },
      {
        description: `integer between minimum and maximum`,
        json: { testName: 6 },
      },
      {
        description: `null`,
        json: { testName: null },
      },
    ],
    [
      {
        description: `integer below minimum`,
        json: { testName: 2 },
        error: `data.testName should be >= 3, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `integer at maximum`,
        json: { testName: 8 },
        error: `data.testName should be < 8, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `integer above maximum`,
        json: { testName: 9 },
        error: `data.testName should be < 8, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `float`,
        json: { testName: 5.321 },
        error: `data.testName should be integer, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `string`,
        json: { testName: `Test String` },
        error: `data.testName should be integer, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `array`,
        json: { testName: [] },
        error: `data.testName should be integer, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `object`,
        json: { testName: {} },
        error: `data.testName should be integer, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `false`,
        json: { testName: false },
        error: `data.testName should be integer, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `true`,
        json: { testName: true },
        error: `data.testName should be integer, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
    ]
  );

  scenario(
    `nullable integer with inclusive minimum with inclusive maximum`,
    {
      type: `integer`,
      name: `testName`,
      label: `Test Label`,
      value: null,
      minimum: [3, `inclusive`],
      maximum: [8, `inclusive`],
      required: false,
    },
    [
      {
        description: `integer at minimum`,
        json: { testName: 3 },
      },
      {
        description: `integer between minimum and maximum`,
        json: { testName: 6 },
      },
      {
        description: `integer at maximum`,
        json: { testName: 8 },
      },
      {
        description: `null`,
        json: { testName: null },
      },
    ],
    [
      {
        description: `integer below minimum`,
        json: { testName: 2 },
        error: `data.testName should be >= 3, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `integer above maximum`,
        json: { testName: 9 },
        error: `data.testName should be <= 8, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `float`,
        json: { testName: 5.321 },
        error: `data.testName should be integer, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `string`,
        json: { testName: `Test String` },
        error: `data.testName should be integer, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `array`,
        json: { testName: [] },
        error: `data.testName should be integer, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `object`,
        json: { testName: {} },
        error: `data.testName should be integer, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `false`,
        json: { testName: false },
        error: `data.testName should be integer, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `true`,
        json: { testName: true },
        error: `data.testName should be integer, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
    ]
  );

  scenario(
    `nullable integer with inclusive minimum`,
    {
      type: `integer`,
      name: `testName`,
      label: `Test Label`,
      value: null,
      minimum: [3, `inclusive`],
      maximum: null,
      required: false,
    },
    [
      {
        description: `integer at minimum`,
        json: { testName: 3 },
      },
      {
        description: `integer above minimum`,
        json: { testName: 4 },
      },
      {
        description: `null`,
        json: { testName: null },
      },
    ],
    [
      {
        description: `integer below minimum`,
        json: { testName: 2 },
        error: `data.testName should be >= 3, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `float`,
        json: { testName: 5.321 },
        error: `data.testName should be integer, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `string`,
        json: { testName: `Test String` },
        error: `data.testName should be integer, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `array`,
        json: { testName: [] },
        error: `data.testName should be integer, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `object`,
        json: { testName: {} },
        error: `data.testName should be integer, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `false`,
        json: { testName: false },
        error: `data.testName should be integer, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `true`,
        json: { testName: true },
        error: `data.testName should be integer, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
    ]
  );

  scenario(
    `nullable integer with exclusive maximum`,
    {
      type: `integer`,
      name: `testName`,
      label: `Test Label`,
      value: null,
      minimum: null,
      maximum: [8, `exclusive`],
      required: false,
    },
    [
      {
        description: `integer below maximum`,
        json: { testName: 7 },
      },
      {
        description: `null`,
        json: { testName: null },
      },
    ],
    [
      {
        description: `integer at maximum`,
        json: { testName: 8 },
        error: `data.testName should be < 8, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `integer above maximum`,
        json: { testName: 9 },
        error: `data.testName should be < 8, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `float`,
        json: { testName: 5.321 },
        error: `data.testName should be integer, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `string`,
        json: { testName: `Test String` },
        error: `data.testName should be integer, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `array`,
        json: { testName: [] },
        error: `data.testName should be integer, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `object`,
        json: { testName: {} },
        error: `data.testName should be integer, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `false`,
        json: { testName: false },
        error: `data.testName should be integer, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `true`,
        json: { testName: true },
        error: `data.testName should be integer, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
    ]
  );

  scenario(
    `nullable integer with inclusive maximum`,
    {
      type: `integer`,
      name: `testName`,
      label: `Test Label`,
      value: null,
      minimum: null,
      maximum: [8, `inclusive`],
      required: false,
    },
    [
      {
        description: `integer below maximum`,
        json: { testName: 7 },
      },
      {
        description: `integer at maximum`,
        json: { testName: 8 },
      },
      {
        description: `null`,
        json: { testName: null },
      },
    ],
    [
      {
        description: `integer above maximum`,
        json: { testName: 9 },
        error: `data.testName should be <= 8, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `float`,
        json: { testName: 5.321 },
        error: `data.testName should be integer, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `string`,
        json: { testName: `Test String` },
        error: `data.testName should be integer, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `array`,
        json: { testName: [] },
        error: `data.testName should be integer, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `object`,
        json: { testName: {} },
        error: `data.testName should be integer, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `false`,
        json: { testName: false },
        error: `data.testName should be integer, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `true`,
        json: { testName: true },
        error: `data.testName should be integer, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
    ]
  );

  scenario(
    `nullable integer`,
    {
      type: `integer`,
      name: `testName`,
      label: `Test Label`,
      value: null,
      minimum: null,
      maximum: null,
      required: false,
    },
    [
      {
        description: `integer`,
        json: { testName: 6 },
      },
      {
        description: `null`,
        json: { testName: null },
      },
    ],
    [
      {
        description: `float`,
        json: { testName: 5.321 },
        error: `data.testName should be integer, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `string`,
        json: { testName: `Test String` },
        error: `data.testName should be integer, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `array`,
        json: { testName: [] },
        error: `data.testName should be integer, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `object`,
        json: { testName: {} },
        error: `data.testName should be integer, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `false`,
        json: { testName: false },
        error: `data.testName should be integer, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
      {
        description: `true`,
        json: { testName: true },
        error: `data.testName should be integer, data.testName should be null, data.testName should match exactly one schema in oneOf`,
      },
    ]
  );

  noOutputScenario(`paragraph`, {
    type: `paragraph`,
    content: `Test Content`,
    name: `Test Name`,
  });

  scenario(
    `string with minimum length with maximum length`,
    {
      type: `string`,
      name: `testName`,
      label: `Test Label`,
      value: `Test Value`,
      minimumLength: 3,
      maximumLength: 6,
    },
    [
      {
        description: `string at minimum length`,
        json: { testName: `Tes` },
      },
      {
        description: `string at maximum length`,
        json: { testName: `Test S` },
      },
      {
        description: `string between minimum and maximum lengths`,
        json: { testName: `Tests` },
      },
    ],
    [
      {
        description: `string below minimum length`,
        json: { testName: `Te` },
        error: `data.testName should NOT be shorter than 3 characters`,
      },
      {
        description: `string above maximum length`,
        json: { testName: `Test Str` },
        error: `data.testName should NOT be longer than 6 characters`,
      },
      {
        description: `null`,
        json: { testName: null },
        error: `data.testName should be string`,
      },
      {
        description: `number`,
        json: { testName: 5.321 },
        error: `data.testName should be string`,
      },
      {
        description: `array`,
        json: { testName: [] },
        error: `data.testName should be string`,
      },
      {
        description: `object`,
        json: { testName: {} },
        error: `data.testName should be string`,
      },
      {
        description: `false`,
        json: { testName: false },
        error: `data.testName should be string`,
      },
      {
        description: `true`,
        json: { testName: true },
        error: `data.testName should be string`,
      },
    ]
  );

  scenario(
    `string with minimum length`,
    {
      type: `string`,
      name: `testName`,
      label: `Test Label`,
      value: `Test Value`,
      minimumLength: 3,
      maximumLength: null,
    },
    [
      {
        description: `string at minimum length`,
        json: { testName: `Tes` },
      },
      {
        description: `string above minimum length`,
        json: { testName: `Test` },
      },
    ],
    [
      {
        description: `string below minimum length`,
        json: { testName: `Te` },
        error: `data.testName should NOT be shorter than 3 characters`,
      },
      {
        description: `null`,
        json: { testName: null },
        error: `data.testName should be string`,
      },
      {
        description: `number`,
        json: { testName: 5.321 },
        error: `data.testName should be string`,
      },
      {
        description: `array`,
        json: { testName: [] },
        error: `data.testName should be string`,
      },
      {
        description: `object`,
        json: { testName: {} },
        error: `data.testName should be string`,
      },
      {
        description: `false`,
        json: { testName: false },
        error: `data.testName should be string`,
      },
      {
        description: `true`,
        json: { testName: true },
        error: `data.testName should be string`,
      },
    ]
  );

  scenario(
    `string with maximum length`,
    {
      type: `string`,
      name: `testName`,
      label: `Test Label`,
      value: `Test Value`,
      minimumLength: null,
      maximumLength: 6,
    },
    [
      {
        description: `string below maximum length`,
        json: { testName: `Tes` },
      },
      {
        description: `string at maximum length`,
        json: { testName: `Test S` },
      },
    ],
    [
      {
        description: `string above maximum length`,
        json: { testName: `Test Str` },
        error: `data.testName should NOT be longer than 6 characters`,
      },
      {
        description: `null`,
        json: { testName: null },
        error: `data.testName should be string`,
      },
      {
        description: `number`,
        json: { testName: 5.321 },
        error: `data.testName should be string`,
      },
      {
        description: `array`,
        json: { testName: [] },
        error: `data.testName should be string`,
      },
      {
        description: `object`,
        json: { testName: {} },
        error: `data.testName should be string`,
      },
      {
        description: `false`,
        json: { testName: false },
        error: `data.testName should be string`,
      },
      {
        description: `true`,
        json: { testName: true },
        error: `data.testName should be string`,
      },
    ]
  );

  scenario(
    `string`,
    {
      type: `string`,
      name: `testName`,
      label: `Test Label`,
      value: `Test Value`,
      minimumLength: null,
      maximumLength: null,
    },
    [
      {
        description: `string`,
        json: { testName: `Test String` },
      },
    ],
    [
      {
        description: `null`,
        json: { testName: null },
        error: `data.testName should be string`,
      },
      {
        description: `number`,
        json: { testName: 5.321 },
        error: `data.testName should be string`,
      },
      {
        description: `array`,
        json: { testName: [] },
        error: `data.testName should be string`,
      },
      {
        description: `object`,
        json: { testName: {} },
        error: `data.testName should be string`,
      },
      {
        description: `false`,
        json: { testName: false },
        error: `data.testName should be string`,
      },
      {
        description: `true`,
        json: { testName: true },
        error: `data.testName should be string`,
      },
    ]
  );

  noOutputScenario(`subtitle`, {
    type: `subtitle`,
    content: `Test Content`,
    name: `Test Name`,
  });

  noOutputScenario(`title`, {
    type: `title`,
    content: `Test Content`,
    name: `Test Name`,
  });
});
