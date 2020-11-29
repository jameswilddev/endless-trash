import { formStateInvalid } from ".";

describe(`formStateInvalid`, () => {
  describe(`when all fields are valid`, () => {
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
            raw: `Test Field D Raw`,
          },
        },
      });
    });

    it(`returns false`, () => {
      expect(output).toBeFalse();
    });
  });

  describe(`when a field is invalid`, () => {
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
            raw: `T`,
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
