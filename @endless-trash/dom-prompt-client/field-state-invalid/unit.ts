import { fieldStateInvalid } from ".";

describe(`fieldStateValid`, () => {
  describe(`text`, () => {
    describe(`when truthy`, () => {
      let output: boolean;

      beforeAll(() => {
        output = fieldStateInvalid({
          type: `text`,
          id: `Test Id`,
          field: {
            type: `string`,
            name: `Test Name`,
            label: `Test Label`,
            minimumLength: null,
            maximumLength: null,
            value: `Test Value`,
          },
          raw: `Test Raw`,
          parsed: `Test Parsed`,
        });
      });

      it(`returns false`, () => {
        expect(output).toBeFalse();
      });
    });

    describe(`when falsy`, () => {
      let output: boolean;

      beforeAll(() => {
        output = fieldStateInvalid({
          type: `text`,
          id: `Test Id`,
          field: {
            type: `string`,
            name: `Test Name`,
            label: `Test Label`,
            minimumLength: null,
            maximumLength: null,
            value: `Test Value`,
          },
          raw: `Test Raw`,
          parsed: null,
        });
      });

      it(`returns false`, () => {
        expect(output).toBeFalse();
      });
    });

    describe(`when undefined`, () => {
      let output: boolean;

      beforeAll(() => {
        output = fieldStateInvalid({
          type: `text`,
          id: `Test Id`,
          field: {
            type: `string`,
            name: `Test Name`,
            label: `Test Label`,
            minimumLength: null,
            maximumLength: null,
            value: `Test Value`,
          },
          raw: `Test Raw`,
          parsed: undefined,
        });
      });

      it(`returns true`, () => {
        expect(output).toBeTrue();
      });
    });
  });

  describe(`static`, () => {
    let output: boolean;

    beforeAll(() => {
      output = fieldStateInvalid({
        type: `static`,
        id: `Test Id`,
        field: {
          type: `subtitle`,
          content: `Test Content`,
          name: `Test Name`,
        },
      });
    });

    it(`returns false`, () => {
      expect(output).toBeFalse();
    });
  });
});
