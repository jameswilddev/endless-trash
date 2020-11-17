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
            editableField: {
              type: `string`,
              name: `testFieldA`,
              label: `Test Field A Label`,
              minimumLength: 2,
              maximumLength: null,
              value: `Test Field A Value`,
            },
            id: `test-form-name--test-field-a`,
            parsed: `Test Field A Parsed`,
            raw: `Test Field A Raw`,
          },
          testFieldB: {
            editableField: {
              type: `string`,
              name: `testFieldB`,
              label: `Test Field B Label`,
              minimumLength: 2,
              maximumLength: null,
              value: `Test Field B Value`,
            },
            id: `test-form-name--test-field-b`,
            parsed: null,
            raw: `Test Field B Raw`,
          },
          testFieldC: {
            editableField: {
              type: `string`,
              name: `testFieldC`,
              label: `Test Field C Label`,
              minimumLength: 2,
              maximumLength: null,
              value: `Test Field C Value`,
            },
            id: `test-form-name--test-field-c`,
            parsed: `Test Field C Parsed`,
            raw: `Test Field C Raw`,
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
            editableField: {
              type: `string`,
              name: `testFieldA`,
              label: `Test Field A Label`,
              minimumLength: 2,
              maximumLength: null,
              value: `Test Field A Value`,
            },
            id: `test-form-name--test-field-a`,
            parsed: `Test Field A Parsed`,
            raw: `Test Field A Raw`,
          },
          testFieldB: {
            editableField: {
              type: `string`,
              name: `testFieldB`,
              label: `Test Field B Label`,
              minimumLength: 2,
              maximumLength: null,
              value: `Test Field B Value`,
            },
            id: `test-form-name--test-field-a`,
            parsed: undefined,
            raw: `Test Field B Raw`,
          },
          testFieldC: {
            editableField: {
              type: `string`,
              name: `testFieldC`,
              label: `Test Field C Label`,
              minimumLength: 2,
              maximumLength: null,
              value: `Test Field C Value`,
            },
            id: `test-form-name--test-field-a`,
            parsed: `Test Field C Parsed`,
            raw: `Test Field C Raw`,
          },
        },
      });
    });

    it(`returns true`, () => {
      expect(output).toBeTrue();
    });
  });
});
