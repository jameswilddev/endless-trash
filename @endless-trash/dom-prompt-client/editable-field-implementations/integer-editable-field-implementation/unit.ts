import { IntegerField, RequestIntegerField } from "@endless-trash/prompt";
import { integerEditableFieldImplementation } from ".";
import { RawFieldValue } from "../../raw-field-value";

describe(`integerEditableFieldImplementation`, () => {
  describe(`parseValue`, () => {
    function nullScenario(description: string, raw: RawFieldValue): void {
      describe(description, () => {
        let result: null | undefined | number;

        beforeAll(() => {
          result = integerEditableFieldImplementation.parseValue(raw);
        });

        it(`returns null`, () => {
          expect(result).toBeNull();
        });
      });
    }

    function invalidScenario(description: string, raw: RawFieldValue): void {
      describe(description, () => {
        let result: null | undefined | number;

        beforeAll(() => {
          result = integerEditableFieldImplementation.parseValue(raw);
        });

        it(`returns undefined`, () => {
          expect(result).toBeUndefined;
        });
      });
    }

    function validScenario(
      description: string,
      raw: RawFieldValue,
      output: number
    ): void {
      describe(description, () => {
        let result: null | undefined | number;

        beforeAll(() => {
          result = integerEditableFieldImplementation.parseValue(raw);
        });

        it(`returns the parsed number`, () => {
          expect(result).toEqual(output);
        });
      });
    }

    nullScenario(`when white space`, `  \t   \n  \r   `);

    invalidScenario(`when invalidly formatted`, `123f45`);

    invalidScenario(`when an invalid value`, ` \n \t \r 12 3 \t \t \r \n`);

    validScenario(`when valid`, ` \n \t \r 12 3 \t \t \r \n`, 123);
  });

  describe(`validateValue`, () => {
    function scenario(
      description: string,
      field: IntegerField,
      valid: ReadonlyArray<readonly [string, RequestIntegerField]>,
      invalid: ReadonlyArray<readonly [string, RequestIntegerField]>
    ): void {
      describe(description, () => {
        for (const subScenario of valid) {
          describe(subScenario[0], () => {
            let result: boolean;

            beforeAll(() => {
              result = integerEditableFieldImplementation.validateValue(
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
              result = integerEditableFieldImplementation.validateValue(
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
      `nullable`,
      {
        name: `Test Name`,
        type: `integer`,
        label: `Test Label`,
        value: null,
        minimum: null,
        maximum: null,
        required: false,
      },
      [
        [`null`, null],
        [`value`, 36],
      ],
      []
    );

    scenario(
      `nullable with value`,
      {
        name: `Test Name`,
        type: `integer`,
        label: `Test Label`,
        value: 29,
        minimum: null,
        maximum: null,
        required: false,
      },
      [
        [`null`, null],
        [`value`, 36],
      ],
      []
    );

    scenario(
      `nullable with inclusive minimum`,
      {
        name: `Test Name`,
        type: `integer`,
        label: `Test Label`,
        value: null,
        minimum: [26, `inclusive`],
        maximum: null,
        required: false,
      },
      [
        [`null`, null],
        [`minimum`, 26],
        [`above minimum`, 27],
      ],
      [[`below minimum`, 25]]
    );

    scenario(
      `nullable with inclusive minimum with value`,
      {
        name: `Test Name`,
        type: `integer`,
        label: `Test Label`,
        value: 29,
        minimum: [26, `inclusive`],
        maximum: null,
        required: false,
      },
      [
        [`null`, null],
        [`minimum`, 26],
        [`above minimum`, 27],
      ],
      [[`below minimum`, 25]]
    );

    scenario(
      `nullable with exclusive minimum`,
      {
        name: `Test Name`,
        type: `integer`,
        label: `Test Label`,
        value: null,
        minimum: [26, `exclusive`],
        maximum: null,
        required: false,
      },
      [
        [`null`, null],
        [`above minimum`, 27],
      ],
      [
        [`below minimum`, 25],
        [`minimum`, 26],
      ]
    );

    scenario(
      `nullable with exclusive minimum with value`,
      {
        name: `Test Name`,
        type: `integer`,
        label: `Test Label`,
        value: 29,
        minimum: [26, `exclusive`],
        maximum: null,
        required: false,
      },
      [
        [`null`, null],
        [`above minimum`, 27],
      ],
      [
        [`below minimum`, 25],
        [`minimum`, 26],
      ]
    );

    scenario(
      `nullable with inclusive maximum`,
      {
        name: `Test Name`,
        type: `integer`,
        label: `Test Label`,
        value: null,
        minimum: null,
        maximum: [44, `inclusive`],
        required: false,
      },
      [
        [`null`, null],
        [`value`, 36],
        [`below maximum`, 43],
        [`maximum`, 44],
      ],
      [[`above maximum`, 45]]
    );

    scenario(
      `nullable with inclusive maximum with value`,
      {
        name: `Test Name`,
        type: `integer`,
        label: `Test Label`,
        value: 29,
        minimum: null,
        maximum: [44, `inclusive`],
        required: false,
      },
      [
        [`null`, null],
        [`value`, 36],
        [`below maximum`, 43],
        [`maximum`, 44],
      ],
      [[`above maximum`, 45]]
    );

    scenario(
      `nullable with inclusive minimum with inclusive maximum`,
      {
        name: `Test Name`,
        type: `integer`,
        label: `Test Label`,
        value: null,
        minimum: [26, `inclusive`],
        maximum: [44, `inclusive`],
        required: false,
      },
      [
        [`null`, null],
        [`minimum`, 26],
        [`above minimum`, 27],
        [`below maximum`, 43],
        [`maximum`, 44],
      ],
      [
        [`below minimum`, 25],
        [`above maximum`, 45],
      ]
    );

    scenario(
      `nullable with inclusive minimum with inclusive maximum with value`,
      {
        name: `Test Name`,
        type: `integer`,
        label: `Test Label`,
        value: 29,
        minimum: [26, `inclusive`],
        maximum: [44, `inclusive`],
        required: false,
      },
      [
        [`null`, null],
        [`minimum`, 26],
        [`above minimum`, 27],
        [`below maximum`, 43],
        [`maximum`, 44],
      ],
      [
        [`below minimum`, 25],
        [`above maximum`, 45],
      ]
    );

    scenario(
      `nullable with exclusive minimum with inclusive maximum`,
      {
        name: `Test Name`,
        type: `integer`,
        label: `Test Label`,
        value: null,
        minimum: [26, `exclusive`],
        maximum: [44, `inclusive`],
        required: false,
      },
      [
        [`null`, null],
        [`above minimum`, 27],
        [`below maximum`, 43],
        [`maximum`, 44],
      ],
      [
        [`below minimum`, 25],
        [`minimum`, 26],
        [`above maximum`, 45],
      ]
    );

    scenario(
      `nullable with exclusive minimum with inclusive maximum with value`,
      {
        name: `Test Name`,
        type: `integer`,
        label: `Test Label`,
        value: 29,
        minimum: [26, `exclusive`],
        maximum: [44, `inclusive`],
        required: false,
      },
      [
        [`null`, null],
        [`above minimum`, 27],
        [`below maximum`, 43],
        [`maximum`, 44],
      ],
      [
        [`below minimum`, 25],
        [`minimum`, 26],
        [`above maximum`, 45],
      ]
    );

    scenario(
      `nullable with exclusive maximum`,
      {
        name: `Test Name`,
        type: `integer`,
        label: `Test Label`,
        value: null,
        minimum: null,
        maximum: [44, `exclusive`],
        required: false,
      },
      [
        [`null`, null],
        [`value`, 36],
        [`below maximum`, 43],
      ],
      [
        [`maximum`, 44],
        [`above maximum`, 45],
      ]
    );

    scenario(
      `nullable with exclusive maximum with value`,
      {
        name: `Test Name`,
        type: `integer`,
        label: `Test Label`,
        value: 29,
        minimum: null,
        maximum: [44, `exclusive`],
        required: false,
      },
      [
        [`null`, null],
        [`value`, 36],
        [`below maximum`, 43],
      ],
      [
        [`maximum`, 44],
        [`above maximum`, 45],
      ]
    );

    scenario(
      `nullable with inclusive minimum with exclusive maximum`,
      {
        name: `Test Name`,
        type: `integer`,
        label: `Test Label`,
        value: null,
        minimum: [26, `inclusive`],
        maximum: [44, `exclusive`],
        required: false,
      },
      [
        [`null`, null],
        [`minimum`, 26],
        [`above minimum`, 27],
        [`below maximum`, 43],
      ],
      [
        [`below minimum`, 25],
        [`maximum`, 44],
        [`above maximum`, 45],
      ]
    );

    scenario(
      `nullable with inclusive minimum with exclusive maximum with value`,
      {
        name: `Test Name`,
        type: `integer`,
        label: `Test Label`,
        value: 29,
        minimum: [26, `inclusive`],
        maximum: [44, `exclusive`],
        required: false,
      },
      [
        [`null`, null],
        [`minimum`, 26],
        [`above minimum`, 27],
        [`below maximum`, 43],
      ],
      [
        [`below minimum`, 25],
        [`maximum`, 44],
        [`above maximum`, 45],
      ]
    );

    scenario(
      `nullable with exclusive minimum with exclusive maximum`,
      {
        name: `Test Name`,
        type: `integer`,
        label: `Test Label`,
        value: null,
        minimum: [26, `exclusive`],
        maximum: [44, `exclusive`],
        required: false,
      },
      [
        [`null`, null],
        [`above minimum`, 27],
        [`below maximum`, 43],
      ],
      [
        [`below minimum`, 25],
        [`minimum`, 26],
        [`maximum`, 44],
        [`above maximum`, 45],
      ]
    );

    scenario(
      `nullable with exclusive minimum with exclusive maximum with value`,
      {
        name: `Test Name`,
        type: `integer`,
        label: `Test Label`,
        value: 29,
        minimum: [26, `exclusive`],
        maximum: [44, `exclusive`],
        required: false,
      },
      [
        [`null`, null],
        [`above minimum`, 27],
        [`below maximum`, 43],
      ],
      [
        [`below minimum`, 25],
        [`minimum`, 26],
        [`maximum`, 44],
        [`above maximum`, 45],
      ]
    );

    scenario(
      `required`,
      {
        name: `Test Name`,
        type: `integer`,
        label: `Test Label`,
        value: null,
        minimum: null,
        maximum: null,
        required: true,
      },
      [[`value`, 36]],
      [[`null`, null]]
    );

    scenario(
      `required with value`,
      {
        name: `Test Name`,
        type: `integer`,
        label: `Test Label`,
        value: 29,
        minimum: null,
        maximum: null,
        required: true,
      },
      [[`value`, 36]],
      [[`null`, null]]
    );

    scenario(
      `required with inclusive minimum`,
      {
        name: `Test Name`,
        type: `integer`,
        label: `Test Label`,
        value: null,
        minimum: [26, `inclusive`],
        maximum: null,
        required: true,
      },
      [
        [`minimum`, 26],
        [`above minimum`, 27],
      ],
      [
        [`null`, null],
        [`below minimum`, 25],
      ]
    );

    scenario(
      `required with inclusive minimum with value`,
      {
        name: `Test Name`,
        type: `integer`,
        label: `Test Label`,
        value: 29,
        minimum: [26, `inclusive`],
        maximum: null,
        required: true,
      },
      [
        [`minimum`, 26],
        [`above minimum`, 27],
      ],
      [
        [`null`, null],
        [`below minimum`, 25],
      ]
    );

    scenario(
      `required with exclusive minimum`,
      {
        name: `Test Name`,
        type: `integer`,
        label: `Test Label`,
        value: null,
        minimum: [26, `exclusive`],
        maximum: null,
        required: true,
      },
      [[`above minimum`, 27]],
      [
        [`null`, null],
        [`below minimum`, 25],
        [`minimum`, 26],
      ]
    );

    scenario(
      `required with exclusive minimum with value`,
      {
        name: `Test Name`,
        type: `integer`,
        label: `Test Label`,
        value: 29,
        minimum: [26, `exclusive`],
        maximum: null,
        required: true,
      },
      [[`above minimum`, 27]],
      [
        [`null`, null],
        [`below minimum`, 25],
        [`minimum`, 26],
      ]
    );

    scenario(
      `required with inclusive maximum`,
      {
        name: `Test Name`,
        type: `integer`,
        label: `Test Label`,
        value: null,
        minimum: null,
        maximum: [44, `inclusive`],
        required: true,
      },
      [
        [`value`, 36],
        [`below maximum`, 43],
        [`maximum`, 44],
      ],
      [
        [`null`, null],
        [`above maximum`, 45],
      ]
    );

    scenario(
      `required with inclusive maximum with value`,
      {
        name: `Test Name`,
        type: `integer`,
        label: `Test Label`,
        value: 29,
        minimum: null,
        maximum: [44, `inclusive`],
        required: true,
      },
      [
        [`value`, 36],
        [`below maximum`, 43],
        [`maximum`, 44],
      ],
      [
        [`null`, null],
        [`above maximum`, 45],
      ]
    );

    scenario(
      `required with inclusive minimum with inclusive maximum`,
      {
        name: `Test Name`,
        type: `integer`,
        label: `Test Label`,
        value: null,
        minimum: [26, `inclusive`],
        maximum: [44, `inclusive`],
        required: true,
      },
      [
        [`minimum`, 26],
        [`above minimum`, 27],
        [`below maximum`, 43],
        [`maximum`, 44],
      ],
      [
        [`null`, null],
        [`below minimum`, 25],
        [`above maximum`, 45],
      ]
    );

    scenario(
      `required with inclusive minimum with inclusive maximum with value`,
      {
        name: `Test Name`,
        type: `integer`,
        label: `Test Label`,
        value: 29,
        minimum: [26, `inclusive`],
        maximum: [44, `inclusive`],
        required: true,
      },
      [
        [`minimum`, 26],
        [`above minimum`, 27],
        [`below maximum`, 43],
        [`maximum`, 44],
      ],
      [
        [`null`, null],
        [`below minimum`, 25],
        [`above maximum`, 45],
      ]
    );

    scenario(
      `required with exclusive minimum with inclusive maximum`,
      {
        name: `Test Name`,
        type: `integer`,
        label: `Test Label`,
        value: null,
        minimum: [26, `exclusive`],
        maximum: [44, `inclusive`],
        required: true,
      },
      [
        [`above minimum`, 27],
        [`below maximum`, 43],
        [`maximum`, 44],
      ],
      [
        [`null`, null],
        [`below minimum`, 25],
        [`minimum`, 26],
        [`above maximum`, 45],
      ]
    );

    scenario(
      `required with exclusive minimum with inclusive maximum with value`,
      {
        name: `Test Name`,
        type: `integer`,
        label: `Test Label`,
        value: 29,
        minimum: [26, `exclusive`],
        maximum: [44, `inclusive`],
        required: true,
      },
      [
        [`above minimum`, 27],
        [`below maximum`, 43],
        [`maximum`, 44],
      ],
      [
        [`null`, null],
        [`below minimum`, 25],
        [`minimum`, 26],
        [`above maximum`, 45],
      ]
    );

    scenario(
      `required with exclusive maximum`,
      {
        name: `Test Name`,
        type: `integer`,
        label: `Test Label`,
        value: null,
        minimum: null,
        maximum: [44, `exclusive`],
        required: true,
      },
      [
        [`value`, 36],
        [`below maximum`, 43],
      ],
      [
        [`null`, null],
        [`maximum`, 44],
        [`above maximum`, 45],
      ]
    );

    scenario(
      `required with exclusive maximum with value`,
      {
        name: `Test Name`,
        type: `integer`,
        label: `Test Label`,
        value: 29,
        minimum: null,
        maximum: [44, `exclusive`],
        required: true,
      },
      [
        [`value`, 36],
        [`below maximum`, 43],
      ],
      [
        [`null`, null],
        [`maximum`, 44],
        [`above maximum`, 45],
      ]
    );

    scenario(
      `required with inclusive minimum with exclusive maximum`,
      {
        name: `Test Name`,
        type: `integer`,
        label: `Test Label`,
        value: null,
        minimum: [26, `inclusive`],
        maximum: [44, `exclusive`],
        required: true,
      },
      [
        [`minimum`, 26],
        [`above minimum`, 27],
        [`below maximum`, 43],
      ],
      [
        [`null`, null],
        [`below minimum`, 25],
        [`maximum`, 44],
        [`above maximum`, 45],
      ]
    );

    scenario(
      `required with inclusive minimum with exclusive maximum with value`,
      {
        name: `Test Name`,
        type: `integer`,
        label: `Test Label`,
        value: 29,
        minimum: [26, `inclusive`],
        maximum: [44, `exclusive`],
        required: true,
      },
      [
        [`minimum`, 26],
        [`above minimum`, 27],
        [`below maximum`, 43],
      ],
      [
        [`null`, null],
        [`below minimum`, 25],
        [`maximum`, 44],
        [`above maximum`, 45],
      ]
    );

    scenario(
      `required with exclusive minimum with exclusive maximum`,
      {
        name: `Test Name`,
        type: `integer`,
        label: `Test Label`,
        value: null,
        minimum: [26, `exclusive`],
        maximum: [44, `exclusive`],
        required: true,
      },
      [
        [`above minimum`, 27],
        [`below maximum`, 43],
      ],
      [
        [`null`, null],
        [`below minimum`, 25],
        [`minimum`, 26],
        [`maximum`, 44],
        [`above maximum`, 45],
      ]
    );

    scenario(
      `required with exclusive minimum with exclusive maximum with value`,
      {
        name: `Test Name`,
        type: `integer`,
        label: `Test Label`,
        value: 29,
        minimum: [26, `exclusive`],
        maximum: [44, `exclusive`],
        required: true,
      },
      [
        [`above minimum`, 27],
        [`below maximum`, 43],
      ],
      [
        [`null`, null],
        [`below minimum`, 25],
        [`minimum`, 26],
        [`maximum`, 44],
        [`above maximum`, 45],
      ]
    );
  });

  describe(`convertValueToRaw`, () => {
    describe(`null`, () => {
      let raw: RawFieldValue;

      beforeAll(() => {
        raw = integerEditableFieldImplementation.convertValueToRaw(null);
      });

      it(`returns an empty string`, () => {
        expect(raw).toEqual(``);
      });
    });

    describe(`zero`, () => {
      let raw: RawFieldValue;

      beforeAll(() => {
        raw = integerEditableFieldImplementation.convertValueToRaw(0);
      });

      it(`returns a string representation`, () => {
        expect(raw).toEqual(`0`);
      });
    });

    describe(`negative zero`, () => {
      let raw: RawFieldValue;

      beforeAll(() => {
        raw = integerEditableFieldImplementation.convertValueToRaw(-0);
      });

      it(`returns a string representation`, () => {
        expect(raw).toEqual(`0`);
      });
    });

    describe(`positive integer`, () => {
      let raw: RawFieldValue;

      beforeAll(() => {
        raw = integerEditableFieldImplementation.convertValueToRaw(273);
      });

      it(`returns a string representation`, () => {
        expect(raw).toEqual(`273`);
      });
    });

    describe(`negative integer`, () => {
      let raw: RawFieldValue;

      beforeAll(() => {
        raw = integerEditableFieldImplementation.convertValueToRaw(-273);
      });

      it(`returns a string representation`, () => {
        expect(raw).toEqual(`-273`);
      });
    });
  });
});
