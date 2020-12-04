import { RequestField } from "@endless-trash/prompt";
import { convertFieldStateToRequestField } from ".";

describe(`convertFieldStateToRequestField`, () => {
  describe(`text`, () => {
    let output: undefined | RequestField;

    beforeAll(() => {
      output = convertFieldStateToRequestField({
        type: `text`,
        id: `Test Id`,
        field: {
          name: `Test Name`,
          type: `float`,
          label: `Test Label`,
          value: null,
          minimum: null,
          maximum: null,
          required: false,
        },
        raw: `   -   12.  5 `,
      });
    });

    it(`returns the field's parsed raw value`, () => {
      expect(output).toEqual(-12.5);
    });
  });

  describe(`static`, () => {
    let output: undefined | RequestField;

    beforeAll(() => {
      output = convertFieldStateToRequestField({
        type: `static`,
        id: `Test Id`,
        field: {
          type: `subtitle`,
          content: `Test Content`,
          name: `Test Name`,
        },
      });
    });

    it(`returns undefined`, () => {
      expect(output).toBeUndefined();
    });
  });
});
