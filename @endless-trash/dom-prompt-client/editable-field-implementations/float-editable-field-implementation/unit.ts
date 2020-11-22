import { FloatField, RequestFloatField } from "@endless-trash/prompt";
import { h, text, VDOM } from "hyperapp-cjs";
import { floatEditableFieldImplementation } from ".";
import { PromptState } from "../../prompt-state";
import { RawFieldValue } from "../../raw-field-value";
import { State } from "../../state";

describe(`floatEditableFieldImplementation`, () => {
  describe(`parseValue`, () => {
    function nullScenario(description: string, raw: string): void {
      describe(description, () => {
        let result: null | undefined | number;

        beforeAll(() => {
          result = floatEditableFieldImplementation.parseValue(raw);
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
          result = floatEditableFieldImplementation.parseValue(raw);
        });

        it(`returns undefined`, () => {
          expect(result).toBeUndefined();
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
          result = floatEditableFieldImplementation.parseValue(raw);
        });

        it(`returns the parsed number`, () => {
          expect(result).toEqual(output);
        });
      });
    }

    nullScenario(`when white space`, `  \t   \n  \r   `);

    invalidScenario(`when invalidly formatted`, `123f45.5838`);

    validScenario(
      `when valid`,
      ` \n \t \r 12 3 \t \t .215  \n 4 \r \n`,
      123.2154
    );
  });

  describe(`validateValue`, () => {
    function scenario(
      description: string,
      field: FloatField,
      valid: ReadonlyArray<readonly [string, RequestFloatField]>,
      invalid: ReadonlyArray<readonly [string, RequestFloatField]>
    ): void {
      describe(description, () => {
        for (const subScenario of valid) {
          describe(subScenario[0], () => {
            let result: boolean;

            beforeAll(() => {
              result = floatEditableFieldImplementation.validateValue(
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
              result = floatEditableFieldImplementation.validateValue(
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
        type: `float`,
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
        type: `float`,
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
        type: `float`,
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
        type: `float`,
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
        type: `float`,
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
        type: `float`,
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
        type: `float`,
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
        type: `float`,
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
        type: `float`,
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
        type: `float`,
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
        type: `float`,
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
        type: `float`,
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
        type: `float`,
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
        type: `float`,
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
        type: `float`,
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
        type: `float`,
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
        type: `float`,
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
        type: `float`,
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
        type: `float`,
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
        type: `float`,
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
        type: `float`,
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
        type: `float`,
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
        type: `float`,
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
        type: `float`,
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
        type: `float`,
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
        type: `float`,
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
        type: `float`,
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
        type: `float`,
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
        type: `float`,
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
        type: `float`,
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
        type: `float`,
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
        type: `float`,
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
        type: `float`,
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
        type: `float`,
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
        type: `float`,
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
        type: `float`,
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
        raw = floatEditableFieldImplementation.convertValueToRaw(null);
      });

      it(`returns an empty string`, () => {
        expect(raw).toEqual(``);
      });
    });

    describe(`zero`, () => {
      let raw: RawFieldValue;

      beforeAll(() => {
        raw = floatEditableFieldImplementation.convertValueToRaw(0);
      });

      it(`returns a string representation`, () => {
        expect(raw).toEqual(`0`);
      });
    });

    describe(`negative zero`, () => {
      let raw: RawFieldValue;

      beforeAll(() => {
        raw = floatEditableFieldImplementation.convertValueToRaw(-0);
      });

      it(`returns a string representation`, () => {
        expect(raw).toEqual(`0`);
      });
    });

    describe(`positive decimal`, () => {
      let raw: RawFieldValue;

      beforeAll(() => {
        raw = floatEditableFieldImplementation.convertValueToRaw(0.3);
      });

      it(`returns a string representation`, () => {
        expect(raw).toEqual(`0.3`);
      });
    });

    describe(`negative decimal`, () => {
      let raw: RawFieldValue;

      beforeAll(() => {
        raw = floatEditableFieldImplementation.convertValueToRaw(-0.3);
      });

      it(`returns a string representation`, () => {
        expect(raw).toEqual(`-0.3`);
      });
    });

    describe(`positive integer`, () => {
      let raw: RawFieldValue;

      beforeAll(() => {
        raw = floatEditableFieldImplementation.convertValueToRaw(273);
      });

      it(`returns a string representation`, () => {
        expect(raw).toEqual(`273`);
      });
    });

    describe(`negative integer`, () => {
      let raw: RawFieldValue;

      beforeAll(() => {
        raw = floatEditableFieldImplementation.convertValueToRaw(-273);
      });

      it(`returns a string representation`, () => {
        expect(raw).toEqual(`-273`);
      });
    });

    describe(`positive float`, () => {
      let raw: RawFieldValue;

      beforeAll(() => {
        raw = floatEditableFieldImplementation.convertValueToRaw(273.712);
      });

      it(`returns a string representation`, () => {
        expect(raw).toEqual(`273.712`);
      });
    });

    describe(`negative float`, () => {
      let raw: RawFieldValue;

      beforeAll(() => {
        raw = floatEditableFieldImplementation.convertValueToRaw(-273.712);
      });

      it(`returns a string representation`, () => {
        expect(raw).toEqual(`-273.712`);
      });
    });
  });

  describe(`view`, () => {
    function scenario(
      description: string,
      editableField: FloatField,
      rendered: ReadonlyArray<VDOM<State>>
    ): void {
      describe(description, () => {
        let channelSend: jasmine.Spy;
        let output: ReadonlyArray<VDOM<State>>;

        beforeAll(() => {
          channelSend = jasmine.createSpy(`channelSend`);

          const promptState: PromptState = {
            type: `prompt`,
            prompt: {
              formGroups: [],
            },
            formGroups: {
              "Test Other Form Group Name": {
                formGroup: { name: `Test Other Form Group Name`, forms: [] },
                id: `test-other-form-group-id`,
                forms: {},
              },
              "Test Form Group Name": {
                formGroup: { name: `Test Form Group Name`, forms: [] },
                id: `test-form-group-id`,
                forms: {
                  "Test Other Form Name": {
                    form: {
                      name: `Test Other Form Name`,
                      fields: [],
                      submitButtonLabel: `Test Submit Button Label`,
                    },
                    id: `test-other-form-id`,
                    fields: {},
                  },
                  "Test Form Name": {
                    form: {
                      name: `Test Form Name`,
                      fields: [],
                      submitButtonLabel: `Test Submit Button Label`,
                    },
                    id: `test-form-id`,
                    fields: {
                      "Test Other Field Name": {
                        editableField: {
                          name: `Test Other Field Name`,
                          type: `string`,
                          label: `Test Other Label`,
                          value: `Test Other Value`,
                          minimumLength: 54,
                          maximumLength: 125,
                        },
                        id: `test-other-field-id`,
                        raw: `Test Other Raw`,
                        parsed: `Test Other Parsed`,
                      },
                      "Test Field Name": {
                        editableField,
                        id: `test-field-id`,
                        raw: `Test Raw`,
                        parsed: `Test Parsed`,
                      },
                    },
                  },
                },
              },
            },
            sendState: null,
            channelSend,
          };

          output = floatEditableFieldImplementation.view(
            promptState,
            `Test Form Group Name`,
            `Test Form Name`,
            `Test Field Name`
          );
        });

        it(`generates the expected DOM`, () => {
          expect(output).toEqual(rendered);
        });

        it(`does not send a message through the channel`, () => {
          expect(channelSend).not.toHaveBeenCalled();
        });
      });
    }

    scenario(
      `minimal`,
      {
        name: `Test Field Name`,
        type: `float`,
        label: `Test Label`,
        value: 32,
        minimum: null,
        maximum: null,
        required: false,
      },
      [
        h(`label`, { for: `test-field-id--input` }, text(`Test Label`)),
        h(`input`, {
          type: `number`,
          step: `any`,
          id: `test-field-id--input`,
          name: `test-field-id`,
          required: false,
          min: undefined,
          max: undefined,
          value: `Test Raw`,
        }),
      ]
    );

    scenario(
      `required`,
      {
        name: `Test Field Name`,
        type: `float`,
        label: `Test Label`,
        value: 32,
        minimum: null,
        maximum: null,
        required: true,
      },
      [
        h(`label`, { for: `test-field-id--input` }, text(`Test Label`)),
        h(`input`, {
          type: `number`,
          step: `any`,
          id: `test-field-id--input`,
          name: `test-field-id`,
          required: true,
          min: undefined,
          max: undefined,
          value: `Test Raw`,
        }),
      ]
    );

    scenario(
      `minimum`,
      {
        name: `Test Field Name`,
        type: `float`,
        label: `Test Label`,
        value: 32,
        minimum: [7, `inclusive`],
        maximum: null,
        required: false,
      },
      [
        h(`label`, { for: `test-field-id--input` }, text(`Test Label`)),
        h(`input`, {
          type: `number`,
          step: `any`,
          id: `test-field-id--input`,
          name: `test-field-id`,
          required: false,
          min: 7,
          max: undefined,
          value: `Test Raw`,
        }),
      ]
    );

    scenario(
      `maximum`,
      {
        name: `Test Field Name`,
        type: `float`,
        label: `Test Label`,
        value: 32,
        minimum: null,
        maximum: [7, `inclusive`],
        required: false,
      },
      [
        h(`label`, { for: `test-field-id--input` }, text(`Test Label`)),
        h(`input`, {
          type: `number`,
          step: `any`,
          id: `test-field-id--input`,
          name: `test-field-id`,
          required: false,
          min: undefined,
          max: 7,
          value: `Test Raw`,
        }),
      ]
    );
  });
});
