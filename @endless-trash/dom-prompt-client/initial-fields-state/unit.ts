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

  it(`generates state for all fields`, () => {
    expect(output).toEqual({
      "Test Field A": {
        type: `text`,
        id: `test-form-group-name--test-form-name--test-field-a`,
        field: {
          type: `integer`,
          name: `Test Field A`,
          label: `Test Label`,
          minimum: null,
          maximum: null,
          required: true,
          value: 44.5,
        },
        raw: `44.5`,
      },
      "Test Non-Editable Field": {
        type: `static`,
        id: `test-form-group-name--test-form-name--test-non-editable-field`,
        field: {
          type: `subtitle`,
          name: `Test Non-Editable Field`,
          content: `Test Content`,
        },
      },
      "Test Field B": {
        type: `text`,
        id: `test-form-group-name--test-form-name--test-field-b`,
        field: {
          type: `string`,
          name: `Test Field B`,
          label: `Test Label`,
          minimumLength: null,
          maximumLength: 5,
          value: `Test Value B`,
        },
        raw: `Test Value B`,
      },
    });
  });
});
