import { formStateInvalid } from ".";

describe(`formStateInvalid`, () => {
  describe(`when all values are defined`, () => {
    let output: boolean;

    beforeAll(() => {
      output = formStateInvalid({
        form: {
          name: `Test Form Name`,
          fields: [],
          submitButtonLabel: `Test Submit Button Label`,
        },
        id: `test-form-name`,
        fields: {
          testFieldA: {
            type: `text`,
            id: `test-form-name--test-field-a`,
            field: {
              type: `string`,
              name: `testFieldA`,
              label: `Test Field A Label`,
              minimumLength: 2,
              maximumLength: null,
              value: `Test Field A Value`,
            },
            parsed: `Test Field A Parsed`,
            raw: `Test Field A Raw`,
          },
          testFieldB: {
            type: `text`,
            id: `test-form-name--test-field-b`,
            field: {
              type: `string`,
              name: `testFieldB`,
              label: `Test Field B Label`,
              minimumLength: 2,
              maximumLength: null,
              value: `Test Field B Value`,
            },
            parsed: null,
            raw: `Test Field B Raw`,
          },
          testFieldC: {
            type: `static`,
            field: {
              type: `subtitle`,
              name: `testFieldC`,
              content: `Test Field C Content`,
            },
            id: `test-form-name--test-field-c`,
          },
          testFieldD: {
            type: `text`,
            id: `test-form-name--test-field-d`,
            field: {
              type: `string`,
              name: `testFieldD`,
              label: `Test Field D Label`,
              minimumLength: 2,
              maximumLength: null,
              value: `Test Field D Value`,
            },
            parsed: `Test Field D Parsed`,
            raw: `Test Field D Raw`,
          },
        },
      });
    });

    it(`returns false`, () => {
      expect(output).toBeFalse();
    });
  });

  describe(`when a value is undefined`, () => {
    let output: boolean;

    beforeAll(() => {
      output = formStateInvalid({
        form: {
          name: `Test Form Name`,
          fields: [],
          submitButtonLabel: `Test Submit Button Label`,
        },
        id: `test-form-name`,
        fields: {
          testFieldA: {
            type: `text`,
            id: `test-form-name--test-field-a`,
            field: {
              type: `string`,
              name: `testFieldA`,
              label: `Test Field A Label`,
              minimumLength: 2,
              maximumLength: null,
              value: `Test Field A Value`,
            },
            parsed: `Test Field A Parsed`,
            raw: `Test Field A Raw`,
          },
          testFieldB: {
            type: `text`,
            id: `test-form-name--test-field-b`,
            field: {
              type: `string`,
              name: `testFieldB`,
              label: `Test Field B Label`,
              minimumLength: 2,
              maximumLength: null,
              value: `Test Field B Value`,
            },
            parsed: undefined,
            raw: `Test Field B Raw`,
          },
          testFieldC: {
            type: `static`,
            field: {
              type: `subtitle`,
              name: `testFieldC`,
              content: `Test Field C Content`,
            },
            id: `test-form-name--test-field-c`,
          },
          testFieldD: {
            type: `text`,
            id: `test-form-name--test-field-d`,
            field: {
              type: `string`,
              name: `testFieldD`,
              label: `Test Field D Label`,
              minimumLength: 2,
              maximumLength: null,
              value: `Test Field D Value`,
            },
            parsed: `Test Field D Parsed`,
            raw: `Test Field D Raw`,
          },
        },
      });
    });

    it(`returns true`, () => {
      expect(output).toBeTrue();
    });
  });
});
