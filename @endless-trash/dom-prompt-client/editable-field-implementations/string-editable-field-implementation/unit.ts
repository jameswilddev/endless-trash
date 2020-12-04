import { RequestStringField, StringField } from "@endless-trash/prompt";
import { ActionDescriptor, ActionTransform, h, text, VDOM } from "hyperapp-cjs";
import { stringEditableFieldImplementation } from ".";
import { PromptState } from "../../prompt-state";
import { RawFieldValue } from "../../raw-field-value";
import { State } from "../../state";
import { updateFieldRaw } from "../../update-field-raw";
import { UpdateFieldRawProps } from "../../update-field-raw-props";

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

  describe(`view`, () => {
    function scenario(
      description: string,
      field: StringField,
      disabled: boolean,
      rendered: ReadonlyArray<VDOM<State>>
    ): void {
      describe(description, () => {
        function subScenario<TValue>(
          description: string,
          act: (
            prompState: PromptState,
            output: ReadonlyArray<VDOM<State>>
          ) => TValue,
          assert: (value: () => TValue) => void
        ): void {
          describe(description, () => {
            let channelSend: jasmine.Spy;
            let value: TValue;

            beforeAll(() => {
              channelSend = jasmine.createSpy(`channelSend`);

              const promptState: PromptState = {
                type: `prompt`,
                prompt: {
                  formGroups: [],
                },
                formGroups: {
                  "Test Other Form Group Name": {
                    formGroup: {
                      name: `Test Other Form Group Name`,
                      forms: [],
                    },
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
                            type: `text`,
                            id: `test-other-field-id`,
                            field: {
                              name: `Test Other Field Name`,
                              type: `string`,
                              label: `Test Other Label`,
                              value: `Test Other Value`,
                              minimumLength: 54,
                              maximumLength: 125,
                            },
                            raw: `Test Other Raw`,
                          },
                          "Test Field Name": {
                            type: `text`,
                            id: `test-field-id`,
                            field,
                            raw: `Test Raw`,
                          },
                        },
                      },
                    },
                  },
                },
                mode: `interactive`,
                channelSend,
              };

              value = act(
                promptState,
                stringEditableFieldImplementation.view(
                  promptState,
                  `Test Form Group Name`,
                  `Test Form Name`,
                  `Test Field Name`,
                  disabled
                )
              );
            });

            assert(() => value);

            it(`does not send a message through the channel`, () => {
              expect(channelSend).not.toHaveBeenCalled();
            });
          });
        }

        subScenario(
          `without interacting`,
          (_, output) => output,
          (valueFactory) => {
            it(`generates the expected DOM`, () => {
              expect(valueFactory()).toEqual(rendered);
            });
          }
        );

        subScenario(
          `on input`,
          (promptState, output) =>
            (output[1].props.oninput as ActionTransform<State, Event>)(
              promptState,
              ({
                target: { value: `Test Raw` },
              } as unknown) as Event
            ) as ActionDescriptor<State, UpdateFieldRawProps>,
          (valueFactory) => {
            it(`returns the expected action descriptor`, () => {
              expect(valueFactory()).toEqual([
                updateFieldRaw,
                {
                  formGroupName: `Test Form Group Name`,
                  formName: `Test Form Name`,
                  fieldName: `Test Field Name`,
                  raw: `Test Raw`,
                },
              ]);
            });
          }
        );

        subScenario(
          `on blur`,
          (promptState, output) =>
            (output[1].props.onblur as ActionTransform<State, Event>)(
              promptState,
              ({
                target: { value: `Test Raw` },
              } as unknown) as Event
            ) as ActionDescriptor<State, UpdateFieldRawProps>,
          (valueFactory) => {
            it(`returns the expected action descriptor`, () => {
              expect(valueFactory()).toEqual([
                updateFieldRaw,
                {
                  formGroupName: `Test Form Group Name`,
                  formName: `Test Form Name`,
                  fieldName: `Test Field Name`,
                  raw: `Test Raw`,
                },
              ]);
            });
          }
        );
      });
    }

    scenario(
      `minimal`,
      {
        name: `Test Field Name`,
        type: `string`,
        label: `Test Label`,
        value: `Test Value`,
        minimumLength: null,
        maximumLength: null,
      },
      false,
      [
        h(`label`, { for: `test-field-id--input` }, text(`Test Label`)),
        h(`input`, {
          type: `text`,
          id: `test-field-id--input`,
          name: `test-field-id`,
          required: false,
          minlength: undefined,
          maxlength: undefined,
          value: `Test Raw`,
          readonly: false,
          oninput: (jasmine.any(Function) as unknown) as ActionDescriptor<
            State,
            Event
          >,
          onblur: (jasmine.any(Function) as unknown) as ActionDescriptor<
            State,
            FocusEvent
          >,
        }),
      ]
    );

    scenario(
      `minimum length zero`,
      {
        name: `Test Field Name`,
        type: `string`,
        label: `Test Label`,
        value: `Test Value`,
        minimumLength: 0,
        maximumLength: null,
      },
      false,
      [
        h(`label`, { for: `test-field-id--input` }, text(`Test Label`)),
        h(`input`, {
          type: `text`,
          id: `test-field-id--input`,
          name: `test-field-id`,
          required: false,
          minlength: undefined,
          maxlength: undefined,
          value: `Test Raw`,
          readonly: false,
          oninput: (jasmine.any(Function) as unknown) as ActionDescriptor<
            State,
            Event
          >,
          onblur: (jasmine.any(Function) as unknown) as ActionDescriptor<
            State,
            FocusEvent
          >,
        }),
      ]
    );

    scenario(
      `minimum length one`,
      {
        name: `Test Field Name`,
        type: `string`,
        label: `Test Label`,
        value: `Test Value`,
        minimumLength: 1,
        maximumLength: null,
      },
      false,
      [
        h(`label`, { for: `test-field-id--input` }, text(`Test Label`)),
        h(`input`, {
          type: `text`,
          id: `test-field-id--input`,
          name: `test-field-id`,
          required: true,
          minlength: 1,
          maxlength: undefined,
          value: `Test Raw`,
          readonly: false,
          oninput: (jasmine.any(Function) as unknown) as ActionDescriptor<
            State,
            Event
          >,
          onblur: (jasmine.any(Function) as unknown) as ActionDescriptor<
            State,
            FocusEvent
          >,
        }),
      ]
    );

    scenario(
      `minimum length two`,
      {
        name: `Test Field Name`,
        type: `string`,
        label: `Test Label`,
        value: `Test Value`,
        minimumLength: 2,
        maximumLength: null,
      },
      false,
      [
        h(`label`, { for: `test-field-id--input` }, text(`Test Label`)),
        h(`input`, {
          type: `text`,
          id: `test-field-id--input`,
          name: `test-field-id`,
          required: true,
          minlength: 2,
          maxlength: undefined,
          value: `Test Raw`,
          readonly: false,
          oninput: (jasmine.any(Function) as unknown) as ActionDescriptor<
            State,
            Event
          >,
          onblur: (jasmine.any(Function) as unknown) as ActionDescriptor<
            State,
            FocusEvent
          >,
        }),
      ]
    );

    scenario(
      `maximum length`,
      {
        name: `Test Field Name`,
        type: `string`,
        label: `Test Label`,
        value: `Test Value`,
        minimumLength: null,
        maximumLength: 5,
      },
      false,
      [
        h(`label`, { for: `test-field-id--input` }, text(`Test Label`)),
        h(`input`, {
          type: `text`,
          id: `test-field-id--input`,
          name: `test-field-id`,
          required: false,
          minlength: undefined,
          maxlength: 5,
          value: `Test Raw`,
          readonly: false,
          oninput: (jasmine.any(Function) as unknown) as ActionDescriptor<
            State,
            Event
          >,
          onblur: (jasmine.any(Function) as unknown) as ActionDescriptor<
            State,
            FocusEvent
          >,
        }),
      ]
    );

    scenario(
      `disabled`,
      {
        name: `Test Field Name`,
        type: `string`,
        label: `Test Label`,
        value: `Test Value`,
        minimumLength: null,
        maximumLength: 5,
      },
      true,
      [
        h(`label`, { for: `test-field-id--input` }, text(`Test Label`)),
        h(`input`, {
          type: `text`,
          id: `test-field-id--input`,
          name: `test-field-id`,
          required: false,
          minlength: undefined,
          maxlength: 5,
          value: `Test Raw`,
          readonly: true,
          oninput: (jasmine.any(Function) as unknown) as ActionDescriptor<
            State,
            Event
          >,
          onblur: (jasmine.any(Function) as unknown) as ActionDescriptor<
            State,
            FocusEvent
          >,
        }),
      ]
    );
  });
});
