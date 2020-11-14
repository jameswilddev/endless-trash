import { FormGroup } from "@endless-trash/prompt";
import { initialFormGroupState } from ".";
import { FormGroupState } from "../form-group-state";

describe(`initialFormGroupState`, () => {
  let output: FormGroupState;

  beforeAll(() => {
    const formGroup: FormGroup = {
      name: `Test Form Group Name`,
      forms: [
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
      ],
    };

    output = initialFormGroupState(formGroup);
  });

  it(`includes the form group`, () => {
    expect(output.formGroup).toEqual({
      name: `Test Form Group Name`,
      forms: [
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
      ],
    });
  });

  it(`includes the forms`, () => {
    expect(output.forms).toEqual({
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
            parsed: `Test Field B B Value`,
            raw: `Test Field B B Value`,
          },
        },
      },
    });
  });
});
