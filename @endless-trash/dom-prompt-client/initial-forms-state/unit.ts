import { Form, FormGroup } from "@endless-trash/prompt";
import { initialFormsState } from ".";
import { FormsState } from "../forms-state";

describe(`initialFormsState`, () => {
  let output: FormsState;

  beforeAll(() => {
    const formGroup: FormGroup = {
      name: `Test Form Group Name`,
      forms: [],
    };

    const forms: ReadonlyArray<Form> = [
      {
        name: `Test Form A Name`,
        fields: [
          {
            type: `string`,
            name: `Test Field A A Name`,
            label: `Test Field A A Label`,
            value: `Test Field A A Value`,
            minimumLength: null,
            maximumLength: null,
          },
          {
            type: `string`,
            name: `Test Field A B Name`,
            label: `Test Field A B Label`,
            value: `Test Field A B Value`,
            minimumLength: null,
            maximumLength: null,
          },
        ],
        submitButtonLabel: `Test Form A Submit Button Label`,
      },
      {
        name: `Test Form B Name`,
        fields: [
          {
            type: `string`,
            name: `Test Field B A Name`,
            label: `Test Field B A Label`,
            value: `Test Field B A Value`,
            minimumLength: null,
            maximumLength: null,
          },
          {
            type: `string`,
            name: `Test Field B B Name`,
            label: `Test Field B B Label`,
            value: `Test Field B B Value`,
            minimumLength: null,
            maximumLength: null,
          },
        ],
        submitButtonLabel: `Test Form B Submit Button Label`,
      },
    ];

    output = initialFormsState(formGroup, forms);
  });

  it(`generates state for the forms`, () => {
    expect(output).toEqual({
      "Test Form A Name": {
        form: {
          name: `Test Form A Name`,
          fields: [
            {
              type: `string`,
              name: `Test Field A A Name`,
              label: `Test Field A A Label`,
              value: `Test Field A A Value`,
              minimumLength: null,
              maximumLength: null,
            },
            {
              type: `string`,
              name: `Test Field A B Name`,
              label: `Test Field A B Label`,
              value: `Test Field A B Value`,
              minimumLength: null,
              maximumLength: null,
            },
          ],
          submitButtonLabel: `Test Form A Submit Button Label`,
        },
        id: `test-form-group-name--test-form-a-name`,
        fields: {
          "Test Field A A Name": {
            editableField: {
              type: `string`,
              name: `Test Field A A Name`,
              label: `Test Field A A Label`,
              value: `Test Field A A Value`,
              minimumLength: null,
              maximumLength: null,
            },
            id: `test-form-group-name--test-form-a-name--test-field-a-a-name`,
            parsed: `Test Field A A Value`,
            raw: `Test Field A A Value`,
          },
          "Test Field A B Name": {
            editableField: {
              type: `string`,
              name: `Test Field A B Name`,
              label: `Test Field A B Label`,
              value: `Test Field A B Value`,
              minimumLength: null,
              maximumLength: null,
            },
            id: `test-form-group-name--test-form-a-name--test-field-a-b-name`,
            parsed: `Test Field A B Value`,
            raw: `Test Field A B Value`,
          },
        },
      },
      "Test Form B Name": {
        form: {
          name: `Test Form B Name`,
          fields: [
            {
              type: `string`,
              name: `Test Field B A Name`,
              label: `Test Field B A Label`,
              value: `Test Field B A Value`,
              minimumLength: null,
              maximumLength: null,
            },
            {
              type: `string`,
              name: `Test Field B B Name`,
              label: `Test Field B B Label`,
              value: `Test Field B B Value`,
              minimumLength: null,
              maximumLength: null,
            },
          ],
          submitButtonLabel: `Test Form B Submit Button Label`,
        },
        id: `test-form-group-name--test-form-b-name`,
        fields: {
          "Test Field B A Name": {
            editableField: {
              type: `string`,
              name: `Test Field B A Name`,
              label: `Test Field B A Label`,
              value: `Test Field B A Value`,
              minimumLength: null,
              maximumLength: null,
            },
            id: `test-form-group-name--test-form-b-name--test-field-b-a-name`,
            parsed: `Test Field B A Value`,
            raw: `Test Field B A Value`,
          },
          "Test Field B B Name": {
            editableField: {
              type: `string`,
              name: `Test Field B B Name`,
              label: `Test Field B B Label`,
              value: `Test Field B B Value`,
              minimumLength: null,
              maximumLength: null,
            },
            id: `test-form-group-name--test-form-b-name--test-field-b-b-name`,
            parsed: `Test Field B B Value`,
            raw: `Test Field B B Value`,
          },
        },
      },
    });
  });
});
