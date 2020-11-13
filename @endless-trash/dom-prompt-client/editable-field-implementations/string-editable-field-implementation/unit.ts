import { RequestStringField, StringField } from "@endless-trash/prompt";
import { stringEditableFieldImplementation } from ".";
import { RawFieldValue } from "../../raw-field-value";

describe(`stringEditableFieldImplementation`, () => {
  describe(`parseValue`, () => {
    let output: undefined | RequestStringField;

    beforeAll(() => {
      output = stringEditableFieldImplementation.parseValue(
        `  \n  \r    \t   Test \t \n \r Value \t \n \r  `
      );
    });

    it(`trims leading and trailing white space`, () => {
      expect(output).toEqual(`Test \t \n \r Value`);
    });
  });

  describe(`validateValue`, () => {
    function scenario(
      description: string,
      field: StringField,
      valid: ReadonlyArray<readonly [string, RequestStringField]>,
      invalid: ReadonlyArray<readonly [string, RequestStringField]>
    ): void {
      describe(description, () => {
        for (const subScenario of valid) {
          describe(subScenario[0], () => {
            let result: boolean;

            beforeAll(() => {
              result = stringEditableFieldImplementation.validateValue(
                field,
                subScenario[1]
              );
            });

            it(`returns true`, () => {
              expect(result).toBeTrue();
            });
          });
        }

        for (const subScenario of invalid) {
          describe(subScenario[0], () => {
            let result: boolean;

            beforeAll(() => {
              result = stringEditableFieldImplementation.validateValue(
                field,
                subScenario[1]
              );
            });

            it(`returns false`, () => {
              expect(result).toBeFalse();
            });
          });
        }
      });
    }

    scenario(
      `no restrictions`,
      {
        name: `Test Name`,
        type: `string`,
        label: `Test Label`,
        value: `Test Value`,
        minimumLength: null,
        maximumLength: null,
      },
      [
        [`empty`, ``],
        [`value`, `Test Value`],
      ],
      []
    );

    scenario(
      `minimum length`,
      {
        name: `Test Name`,
        type: `string`,
        label: `Test Label`,
        value: `Test Value`,
        minimumLength: 10,
        maximumLength: null,
      },
      [
        [`at minimum length`, `Test Value`],
        [`above minimum length`, `Test Value`],
      ],
      [
        [`empty`, ``],
        [`below minimum length`, `TestValue`],
      ]
    );

    scenario(
      `minimum length maximum length`,
      {
        name: `Test Name`,
        type: `string`,
        label: `Test Label`,
        value: `Test Value`,
        minimumLength: 10,
        maximumLength: 20,
      },
      [
        [`at minimum length`, `Test Value`],
        [`above minimum length`, `Test Value`],
        [`below maximum length`, `Test Longer Value!!`],
        [`at maximum length`, `Test Max Lngth Value`],
      ],
      [
        [`empty`, ``],
        [`below minimum length`, `TestValue`],
        [`above maximum length`, `Test Too Long Value!!`],
      ]
    );

    scenario(
      `maximum length`,
      {
        name: `Test Name`,
        type: `string`,
        label: `Test Label`,
        value: `Test Value`,
        minimumLength: null,
        maximumLength: 20,
      },
      [
        [`empty`, ``],
        [`below maximum length`, `Test Longer Value!!`],
        [`at maximum length`, `Test Max Lngth Value`],
      ],
      [[`above maximum length`, `Test Too Long Value!!`]]
    );
  });

  describe(`convertValueToRaw`, () => {
    let raw: RawFieldValue;

    beforeAll(() => {
      raw = stringEditableFieldImplementation.convertValueToRaw(`Test Value`);
    });

    it(`returns the given value`, () => {
      expect(raw).toEqual(`Test Value`);
    });
  });
});
