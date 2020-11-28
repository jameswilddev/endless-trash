import { initialFieldState } from ".";
import { FieldState } from "../field-state";

describe(`initialFieldState`, () => {
  describe(`float`, () => {
    describe(`when the initial value is valid`, () => {
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

      it(`defaults to being parsed`, () => {
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
          parsed: 1.4,
          raw: `1.4`,
        });
      });
    });

    describe(`when the initial value is invalid`, () => {
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
            value: 2.5,
            minimum: [1.1, `inclusive`],
            maximum: [2.3, `inclusive`],
            required: true,
            name: `Test Name`,
            label: `Test Label`,
          }
        );
      });

      it(`defaults to not being parsed`, () => {
        expect(output).toEqual({
          type: `text`,
          id: `test-form-group-name--test-form-name--test-name`,
          field: {
            type: `float`,
            value: 2.5,
            minimum: [1.1, `inclusive`],
            maximum: [2.3, `inclusive`],
            required: true,
            name: `Test Name`,
            label: `Test Label`,
          },
          parsed: undefined,
          raw: `2.5`,
        });
      });
    });
  });

  describe(`integer`, () => {
    describe(`when the initial value is valid`, () => {
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

      it(`defaults to being parsed`, () => {
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
          parsed: 14,
          raw: `14`,
        });
      });
    });

    describe(`when the initial value is invalid`, () => {
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
            value: 24,
            minimum: [10, `inclusive`],
            maximum: [20, `inclusive`],
            required: true,
            name: `Test Name`,
            label: `Test Label`,
          }
        );
      });

      it(`defaults to not being parsed`, () => {
        expect(output).toEqual({
          type: `text`,
          id: `test-form-group-name--test-form-name--test-name`,
          field: {
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

  describe(`string`, () => {
    describe(`when the initial value is valid`, () => {
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

      it(`defaults to being parsed`, () => {
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
          parsed: `Test Value`,
          raw: `Test Value`,
        });
      });
    });

    describe(`when the initial value is invalid`, () => {
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
            maximumLength: 5,
            name: `Test Name`,
            label: `Test Label`,
          }
        );
      });

      it(`defaults to not being parsed`, () => {
        expect(output).toEqual({
          type: `text`,
          id: `test-form-group-name--test-form-name--test-name`,
          field: {
            type: `string`,
            value: `Test Value`,
            minimumLength: 4,
            maximumLength: 5,
            name: `Test Name`,
            label: `Test Label`,
          },
          parsed: undefined,
          raw: `Test Value`,
        });
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
