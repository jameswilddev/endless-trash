import { initialFieldsState } from ".";
import { FieldsState } from "../fields-state";

describe(`initialFieldsState`, () => {
  let output: FieldsState;

  beforeAll(() => {
    output = initialFieldsState(
      { name: `Test Form Group Name`, forms: [] },
      {
        name: `Test Form Name`,
        fields: [
          {
            type: `integer`,
            name: `Test Field A`,
            label: `Test Label`,
            minimum: null,
            maximum: null,
            required: true,
            value: 44.5,
          },
          {
            type: `subtitle`,
            name: `Test Non-Editable Field`,
            content: `Test Content`,
          },
          {
            type: `string`,
            name: `Test Field B`,
            label: `Test Label`,
            minimumLength: null,
            maximumLength: 5,
            value: `Test Value B`,
          },
        ],
        submitButtonLabel: `Test Submit Button Label`,
      }
    );
  });

  it(`generates state for the editable fields`, () => {
    expect(output).toEqual({
      "Test Field A": {
        editableField: {
          type: `integer`,
          name: `Test Field A`,
          label: `Test Label`,
          minimum: null,
          maximum: null,
          required: true,
          value: 44.5,
        },
        id: `test-form-group-name--test-form-name--test-field-a`,
        parsed: 44.5,
        raw: `44.5`,
      },
      "Test Field B": {
        editableField: {
          type: `string`,
          name: `Test Field B`,
          label: `Test Label`,
          minimumLength: null,
          maximumLength: 5,
          value: `Test Value B`,
        },
        id: `test-form-group-name--test-form-name--test-field-b`,
        parsed: undefined,
        raw: `Test Value B`,
      },
    });
  });
});
