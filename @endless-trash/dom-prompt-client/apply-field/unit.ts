import { EditableField } from "@endless-trash/prompt";
import { applyField } from ".";
import { FieldState } from "../field-state";

describe(`applyField`, () => {
  describe(`when the field has not changed`, () => {
    let result: FieldState;

    beforeAll(() => {
      const fieldState: FieldState = {
        editableField: {
          type: `integer`,
          name: `Test Name`,
          label: `Test Label`,
          minimum: null,
          maximum: null,
          required: true,
          value: 24.7,
        },
        parsed: 12.1,
        raw: `Test Raw`,
      };

      const editableField: EditableField = {
        type: `integer`,
        name: `Test Name`,
        label: `Test Label`,
        minimum: null,
        maximum: null,
        required: true,
        value: 24.7,
      };

      result = applyField(fieldState, editableField);
    });

    it(`returns the current state`, () => {
      expect(result).toEqual({
        editableField: {
          type: `integer`,
          name: `Test Name`,
          label: `Test Label`,
          minimum: null,
          maximum: null,
          required: true,
          value: 24.7,
        },
        parsed: 12.1,
        raw: `Test Raw`,
      });
    });
  });

  describe(`when the field has changed`, () => {
    let result: FieldState;

    beforeAll(() => {
      const fieldState: FieldState = {
        editableField: {
          type: `integer`,
          name: `Test Name`,
          label: `Test Label`,
          minimum: null,
          maximum: null,
          required: true,
          value: 24.7,
        },
        parsed: 12.1,
        raw: `Test Raw`,
      };

      const editableField: EditableField = {
        type: `integer`,
        name: `Test Name`,
        label: `Test Label`,
        minimum: null,
        maximum: null,
        required: true,
        value: 24.2,
      };

      result = applyField(fieldState, editableField);
    });

    it(`returns the field's default state`, () => {
      expect(result).toEqual({
        editableField: {
          type: `integer`,
          name: `Test Name`,
          label: `Test Label`,
          minimum: null,
          maximum: null,
          required: true,
          value: 24.2,
        },
        parsed: 24.2,
        raw: `24.2`,
      });
    });
  });
});
