import { initialFieldState } from ".";
import { FieldState } from "../field-state";

describe(`initialFieldState`, () => {
  describe(`when the initial value is valid`, () => {
    let output: FieldState;

    beforeAll(() => {
      output = initialFieldState({
        type: `integer`,
        value: 14,
        minimum: [10, `inclusive`],
        maximum: [20, `inclusive`],
        required: true,
        name: `Test Name`,
        label: `Test Label`,
      });
    });

    it(`defaults to being parsed`, () => {
      expect(output).toEqual({
        editableField: {
          type: `integer`,
          value: 14,
          minimum: [10, `inclusive`],
          maximum: [20, `inclusive`],
          required: true,
          name: `Test Name`,
          label: `Test Label`,
        },
        parsed: 14,
        raw: `14`,
      });
    });
  });

  describe(`when the initial value is invalid`, () => {
    let output: FieldState;

    beforeAll(() => {
      output = initialFieldState({
        type: `integer`,
        value: 24,
        minimum: [10, `inclusive`],
        maximum: [20, `inclusive`],
        required: true,
        name: `Test Name`,
        label: `Test Label`,
      });
    });

    it(`defaults to not being parsed`, () => {
      expect(output).toEqual({
        editableField: {
          type: `integer`,
          value: 24,
          minimum: [10, `inclusive`],
          maximum: [20, `inclusive`],
          required: true,
          name: `Test Name`,
          label: `Test Label`,
        },
        parsed: undefined,
        raw: `24`,
      });
    });
  });
});
