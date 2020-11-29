import { initialFieldState } from ".";
import { FieldState } from "../field-state";

describe(`initialFieldState`, () => {
  describe(`float`, () => {
    let output: FieldState;

    beforeAll(() => {
      output = initialFieldState(
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
          type: `float`,
          value: 1.4,
          minimum: [1.1, `inclusive`],
          maximum: [2.3, `inclusive`],
          required: true,
          name: `Test Name`,
          label: `Test Label`,
        }
      );
    });

    it(`generates default state for the field`, () => {
      expect(output).toEqual({
        type: `text`,
        id: `test-form-group-name--test-form-name--test-name`,
        field: {
          type: `float`,
          value: 1.4,
          minimum: [1.1, `inclusive`],
          maximum: [2.3, `inclusive`],
          required: true,
          name: `Test Name`,
          label: `Test Label`,
        },
        raw: `1.4`,
      });
    });
  });

  describe(`integer`, () => {
    let output: FieldState;

    beforeAll(() => {
      output = initialFieldState(
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
          type: `integer`,
          value: 14,
          minimum: [10, `inclusive`],
          maximum: [20, `inclusive`],
          required: true,
          name: `Test Name`,
          label: `Test Label`,
        }
      );
    });

    it(`generates default state for the field`, () => {
      expect(output).toEqual({
        type: `text`,
        id: `test-form-group-name--test-form-name--test-name`,
        field: {
          type: `integer`,
          value: 14,
          minimum: [10, `inclusive`],
          maximum: [20, `inclusive`],
          required: true,
          name: `Test Name`,
          label: `Test Label`,
        },
        raw: `14`,
      });
    });
  });

  describe(`string`, () => {
    let output: FieldState;

    beforeAll(() => {
      output = initialFieldState(
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
          type: `string`,
          value: `Test Value`,
          minimumLength: 4,
          maximumLength: 26,
          name: `Test Name`,
          label: `Test Label`,
        }
      );
    });

    it(`generates default state for the field`, () => {
      expect(output).toEqual({
        type: `text`,
        id: `test-form-group-name--test-form-name--test-name`,
        field: {
          type: `string`,
          value: `Test Value`,
          minimumLength: 4,
          maximumLength: 26,
          name: `Test Name`,
          label: `Test Label`,
        },
        raw: `Test Value`,
      });
    });
  });

  describe(`paragraph`, () => {
    let output: FieldState;

    beforeAll(() => {
      output = initialFieldState(
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
          type: `paragraph`,
          name: `Test Name`,
          content: `Test Content`,
        }
      );
    });

    it(`defaults to being parsed`, () => {
      expect(output).toEqual({
        type: `static`,
        id: `test-form-group-name--test-form-name--test-name`,
        field: {
          type: `paragraph`,
          name: `Test Name`,
          content: `Test Content`,
        },
      });
    });
  });

  describe(`subtitle`, () => {
    let output: FieldState;

    beforeAll(() => {
      output = initialFieldState(
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
          type: `subtitle`,
          name: `Test Name`,
          content: `Test Content`,
        }
      );
    });

    it(`defaults to being parsed`, () => {
      expect(output).toEqual({
        type: `static`,
        id: `test-form-group-name--test-form-name--test-name`,
        field: {
          type: `subtitle`,
          name: `Test Name`,
          content: `Test Content`,
        },
      });
    });
  });

  describe(`title`, () => {
    let output: FieldState;

    beforeAll(() => {
      output = initialFieldState(
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
          type: `title`,
          name: `Test Name`,
          content: `Test Content`,
        }
      );
    });

    it(`defaults to being parsed`, () => {
      expect(output).toEqual({
        type: `static`,
        id: `test-form-group-name--test-form-name--test-name`,
        field: {
          type: `title`,
          name: `Test Name`,
          content: `Test Content`,
        },
      });
    });
  });
});
