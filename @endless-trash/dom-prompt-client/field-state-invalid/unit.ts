import { fieldStateInvalid } from ".";

describe(`fieldStateValid`, () => {
  describe(`text`, () => {
    describe(`when not parseable`, () => {
      let output: boolean;

      beforeAll(() => {
        output = fieldStateInvalid({
          type: `text`,
          id: `Test Id`,
          field: {
            type: `integer`,
            name: `Test Name`,
            label: `Test Label`,
            minimum: [10, `inclusive`],
            maximum: [20, `inclusive`],
            required: true,
            value: null,
          },
          raw: `14q`,
        });
      });

      it(`returns true`, () => {
        expect(output).toBeTrue();
      });
    });

    describe(`when parseable but not valid`, () => {
      let output: boolean;

      beforeAll(() => {
        output = fieldStateInvalid({
          type: `text`,
          id: `Test Id`,
          field: {
            type: `integer`,
            name: `Test Name`,
            label: `Test Label`,
            minimum: [10, `inclusive`],
            maximum: [20, `inclusive`],
            required: true,
            value: null,
          },
          raw: `23`,
        });
      });

      it(`returns true`, () => {
        expect(output).toBeTrue();
      });
    });

    describe(`when parseable and valid`, () => {
      let output: boolean;

      beforeAll(() => {
        output = fieldStateInvalid({
          type: `text`,
          id: `Test Id`,
          field: {
            type: `integer`,
            name: `Test Name`,
            label: `Test Label`,
            minimum: [10, `inclusive`],
            maximum: [20, `inclusive`],
            required: true,
            value: null,
          },
          raw: `14`,
        });
      });

      it(`returns false`, () => {
        expect(output).toBeFalse();
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
