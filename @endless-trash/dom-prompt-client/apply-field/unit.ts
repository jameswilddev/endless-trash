import { applyField } from ".";
import { FieldState } from "../field-state";

describe(`applyField`, () => {
  describe(`when the field has not changed`, () => {
    let result: FieldState;

    beforeAll(() => {
      result = applyField(
        {
          name: `Test Form Group Name`,
          forms: [],
        },
        {
          name: `Test Form Name`,
          fields: [],
          submitButtonLabel: `Test Submit Button Label`,
        },
        {
          type: `text`,
          id: `test-form-group-name--test-form-name--test-name`,
          field: {
            type: `integer`,
            name: `Test Name`,
            label: `Test Label`,
            minimum: null,
            maximum: null,
            required: true,
            value: 24.7,
          },
          raw: `Test Raw`,
        },
        {
          type: `integer`,
          name: `Test Name`,
          label: `Test Label`,
          minimum: null,
          maximum: null,
          required: true,
          value: 24.7,
        }
      );
    });

    it(`returns the current state`, () => {
      expect(result).toEqual({
        type: `text`,
        id: `test-form-group-name--test-form-name--test-name`,
        field: {
          type: `integer`,
          name: `Test Name`,
          label: `Test Label`,
          minimum: null,
          maximum: null,
          required: true,
          value: 24.7,
        },
        raw: `Test Raw`,
      });
    });
  });

  describe(`when the field has changed`, () => {
    let result: FieldState;

    beforeAll(() => {
      result = applyField(
        {
          name: `Test Form Group Name`,
          forms: [],
        },
        {
          name: `Test Form Name`,
          fields: [],
          submitButtonLabel: `Test Submit Button Label`,
        },
        {
          type: `text`,
          id: `test-form-group-name--test-form-name--test-name`,
          field: {
            type: `integer`,
            name: `Test Name`,
            label: `Test Label`,
            minimum: null,
            maximum: null,
            required: true,
            value: 24.7,
          },
          raw: `Test Raw`,
        },
        {
          type: `integer`,
          name: `Test Name`,
          label: `Test Label`,
          minimum: null,
          maximum: null,
          required: true,
          value: 24.1,
        }
      );
    });

    it(`returns the current state`, () => {
      expect(result).toEqual({
        type: `text`,
        id: `test-form-group-name--test-form-name--test-name`,
        field: {
          type: `integer`,
          name: `Test Name`,
          label: `Test Label`,
          minimum: null,
          maximum: null,
          required: true,
          value: 24.1,
        },
        raw: `24.1`,
      });
    });
  });
});
