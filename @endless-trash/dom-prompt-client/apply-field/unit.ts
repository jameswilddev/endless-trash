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
        id: `Test Id`,
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
        id: `Test Id`,
        parsed: 12.1,
        raw: `Test Raw`,
      });
    });
  });

  describe(`when the field has changed`, () => {
    describe(`when the field's initial value is valid`, () => {
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
          id: `Test Id`,
          parsed: 12.1,
          raw: `Test Raw`,
        };

        const editableField: EditableField = {
          type: `integer`,
          value: 14,
          minimum: [10, `inclusive`],
          maximum: [20, `inclusive`],
          required: true,
          name: `Test Name`,
          label: `Test Label`,
        };

        result = applyField(fieldState, editableField);
      });

      it(`returns the field's default state`, () => {
        expect(result).toEqual({
          editableField: {
            type: `integer`,
            value: 14,
            minimum: [10, `inclusive`],
            maximum: [20, `inclusive`],
            required: true,
            name: `Test Name`,
            label: `Test Label`,
          },
          id: `Test Id`,
          parsed: 14,
          raw: `14`,
        });
      });
    });

    describe(`when the field's initial value is invalid`, () => {
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
          id: `Test Id`,
          parsed: 12.1,
          raw: `Test Raw`,
        };

        const editableField: EditableField = {
          type: `integer`,
          value: 24,
          minimum: [10, `inclusive`],
          maximum: [20, `inclusive`],
          required: true,
          name: `Test Name`,
          label: `Test Label`,
        };

        result = applyField(fieldState, editableField);
      });

      it(`returns the field's default state`, () => {
        expect(result).toEqual({
          editableField: {
            type: `integer`,
            value: 24,
            minimum: [10, `inclusive`],
            maximum: [20, `inclusive`],
            required: true,
            name: `Test Name`,
            label: `Test Label`,
          },
          id: `Test Id`,
          parsed: undefined,
          raw: `24`,
        });
      });
    });
  });
});
