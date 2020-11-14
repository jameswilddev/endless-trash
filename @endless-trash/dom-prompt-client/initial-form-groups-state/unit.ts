import { FormGroup } from "@endless-trash/prompt";
import { initialFormGroupsState } from ".";
import { FormGroupsState } from "../form-groups-state";

describe(`initialFormGroupsState`, () => {
  let output: FormGroupsState;

  beforeAll(() => {
    const formGroups: ReadonlyArray<FormGroup> = [
      {
        name: `Test Form Group A Name`,
        forms: [
          {
            name: `Test Form A A Name`,
            fields: [
              {
                type: `string`,
                name: `Test Field A A A Name`,
                label: `Test Field A A A Label`,
                value: `Test Field A A A Value`,
                minimumLength: null,
                maximumLength: null,
              },
              {
                type: `string`,
                name: `Test Field A A B Name`,
                label: `Test Field A A B Label`,
                value: `Test Field A A B Value`,
                minimumLength: null,
                maximumLength: null,
              },
            ],
            submitButtonLabel: `Test Form A A Submit Button Label`,
          },
          {
            name: `Test Form A B Name`,
            fields: [
              {
                type: `string`,
                name: `Test Field A B A Name`,
                label: `Test Field A B A Label`,
                value: `Test Field A B A Value`,
                minimumLength: null,
                maximumLength: null,
              },
              {
                type: `string`,
                name: `Test Field A B B Name`,
                label: `Test Field A B B Label`,
                value: `Test Field A B B Value`,
                minimumLength: null,
                maximumLength: null,
              },
            ],
            submitButtonLabel: `Test Form A B Submit Button Label`,
          },
        ],
      },
      {
        name: `Test Form Group B Name`,
        forms: [
          {
            name: `Test Form B A Name`,
            fields: [
              {
                type: `string`,
                name: `Test Field B A A Name`,
                label: `Test Field B A A Label`,
                value: `Test Field B A A Value`,
                minimumLength: null,
                maximumLength: null,
              },
              {
                type: `string`,
                name: `Test Field B A B Name`,
                label: `Test Field B A B Label`,
                value: `Test Field B A B Value`,
                minimumLength: null,
                maximumLength: null,
              },
            ],
            submitButtonLabel: `Test Form B A Submit Button Label`,
          },
          {
            name: `Test Form B B Name`,
            fields: [
              {
                type: `string`,
                name: `Test Field B B A Name`,
                label: `Test Field B B A Label`,
                value: `Test Field B B A Value`,
                minimumLength: null,
                maximumLength: null,
              },
              {
                type: `string`,
                name: `Test Field B B B Name`,
                label: `Test Field B B B Label`,
                value: `Test Field B B B Value`,
                minimumLength: null,
                maximumLength: null,
              },
            ],
            submitButtonLabel: `Test Form B B Submit Button Label`,
          },
        ],
      },
    ];

    output = initialFormGroupsState(formGroups);
  });

  it(`generates state for the form groups`, () => {
    expect(output).toEqual({
      "Test Form Group A Name": {
        formGroup: {
          name: `Test Form Group A Name`,
          forms: [
            {
              name: `Test Form A A Name`,
              fields: [
                {
                  type: `string`,
                  name: `Test Field A A A Name`,
                  label: `Test Field A A A Label`,
                  value: `Test Field A A A Value`,
                  minimumLength: null,
                  maximumLength: null,
                },
                {
                  type: `string`,
                  name: `Test Field A A B Name`,
                  label: `Test Field A A B Label`,
                  value: `Test Field A A B Value`,
                  minimumLength: null,
                  maximumLength: null,
                },
              ],
              submitButtonLabel: `Test Form A A Submit Button Label`,
            },
            {
              name: `Test Form A B Name`,
              fields: [
                {
                  type: `string`,
                  name: `Test Field A B A Name`,
                  label: `Test Field A B A Label`,
                  value: `Test Field A B A Value`,
                  minimumLength: null,
                  maximumLength: null,
                },
                {
                  type: `string`,
                  name: `Test Field A B B Name`,
                  label: `Test Field A B B Label`,
                  value: `Test Field A B B Value`,
                  minimumLength: null,
                  maximumLength: null,
                },
              ],
              submitButtonLabel: `Test Form A B Submit Button Label`,
            },
          ],
        },
        forms: {
          "Test Form A A Name": {
            form: {
              name: `Test Form A A Name`,
              fields: [
                {
                  type: `string`,
                  name: `Test Field A A A Name`,
                  label: `Test Field A A A Label`,
                  value: `Test Field A A A Value`,
                  minimumLength: null,
                  maximumLength: null,
                },
                {
                  type: `string`,
                  name: `Test Field A A B Name`,
                  label: `Test Field A A B Label`,
                  value: `Test Field A A B Value`,
                  minimumLength: null,
                  maximumLength: null,
                },
              ],
              submitButtonLabel: `Test Form A A Submit Button Label`,
            },
            fields: {
              "Test Field A A A Name": {
                editableField: {
                  type: `string`,
                  name: `Test Field A A A Name`,
                  label: `Test Field A A A Label`,
                  value: `Test Field A A A Value`,
                  minimumLength: null,
                  maximumLength: null,
                },
                parsed: `Test Field A A A Value`,
                raw: `Test Field A A A Value`,
              },
              "Test Field A A B Name": {
                editableField: {
                  type: `string`,
                  name: `Test Field A A B Name`,
                  label: `Test Field A A B Label`,
                  value: `Test Field A A B Value`,
                  minimumLength: null,
                  maximumLength: null,
                },
                parsed: `Test Field A A B Value`,
                raw: `Test Field A A B Value`,
              },
            },
          },
          "Test Form A B Name": {
            form: {
              name: `Test Form A B Name`,
              fields: [
                {
                  type: `string`,
                  name: `Test Field A B A Name`,
                  label: `Test Field A B A Label`,
                  value: `Test Field A B A Value`,
                  minimumLength: null,
                  maximumLength: null,
                },
                {
                  type: `string`,
                  name: `Test Field A B B Name`,
                  label: `Test Field A B B Label`,
                  value: `Test Field A B B Value`,
                  minimumLength: null,
                  maximumLength: null,
                },
              ],
              submitButtonLabel: `Test Form A B Submit Button Label`,
            },
            fields: {
              "Test Field A B A Name": {
                editableField: {
                  type: `string`,
                  name: `Test Field A B A Name`,
                  label: `Test Field A B A Label`,
                  value: `Test Field A B A Value`,
                  minimumLength: null,
                  maximumLength: null,
                },
                parsed: `Test Field A B A Value`,
                raw: `Test Field A B A Value`,
              },
              "Test Field A B B Name": {
                editableField: {
                  type: `string`,
                  name: `Test Field A B B Name`,
                  label: `Test Field A B B Label`,
                  value: `Test Field A B B Value`,
                  minimumLength: null,
                  maximumLength: null,
                },
                parsed: `Test Field A B B Value`,
                raw: `Test Field A B B Value`,
              },
            },
          },
        },
      },
      "Test Form Group B Name": {
        formGroup: {
          name: `Test Form Group B Name`,
          forms: [
            {
              name: `Test Form B A Name`,
              fields: [
                {
                  type: `string`,
                  name: `Test Field B A A Name`,
                  label: `Test Field B A A Label`,
                  value: `Test Field B A A Value`,
                  minimumLength: null,
                  maximumLength: null,
                },
                {
                  type: `string`,
                  name: `Test Field B A B Name`,
                  label: `Test Field B A B Label`,
                  value: `Test Field B A B Value`,
                  minimumLength: null,
                  maximumLength: null,
                },
              ],
              submitButtonLabel: `Test Form B A Submit Button Label`,
            },
            {
              name: `Test Form B B Name`,
              fields: [
                {
                  type: `string`,
                  name: `Test Field B B A Name`,
                  label: `Test Field B B A Label`,
                  value: `Test Field B B A Value`,
                  minimumLength: null,
                  maximumLength: null,
                },
                {
                  type: `string`,
                  name: `Test Field B B B Name`,
                  label: `Test Field B B B Label`,
                  value: `Test Field B B B Value`,
                  minimumLength: null,
                  maximumLength: null,
                },
              ],
              submitButtonLabel: `Test Form B B Submit Button Label`,
            },
          ],
        },
        forms: {
          "Test Form B A Name": {
            form: {
              name: `Test Form B A Name`,
              fields: [
                {
                  type: `string`,
                  name: `Test Field B A A Name`,
                  label: `Test Field B A A Label`,
                  value: `Test Field B A A Value`,
                  minimumLength: null,
                  maximumLength: null,
                },
                {
                  type: `string`,
                  name: `Test Field B A B Name`,
                  label: `Test Field B A B Label`,
                  value: `Test Field B A B Value`,
                  minimumLength: null,
                  maximumLength: null,
                },
              ],
              submitButtonLabel: `Test Form B A Submit Button Label`,
            },
            fields: {
              "Test Field B A A Name": {
                editableField: {
                  type: `string`,
                  name: `Test Field B A A Name`,
                  label: `Test Field B A A Label`,
                  value: `Test Field B A A Value`,
                  minimumLength: null,
                  maximumLength: null,
                },
                parsed: `Test Field B A A Value`,
                raw: `Test Field B A A Value`,
              },
              "Test Field B A B Name": {
                editableField: {
                  type: `string`,
                  name: `Test Field B A B Name`,
                  label: `Test Field B A B Label`,
                  value: `Test Field B A B Value`,
                  minimumLength: null,
                  maximumLength: null,
                },
                parsed: `Test Field B A B Value`,
                raw: `Test Field B A B Value`,
              },
            },
          },
          "Test Form B B Name": {
            form: {
              name: `Test Form B B Name`,
              fields: [
                {
                  type: `string`,
                  name: `Test Field B B A Name`,
                  label: `Test Field B B A Label`,
                  value: `Test Field B B A Value`,
                  minimumLength: null,
                  maximumLength: null,
                },
                {
                  type: `string`,
                  name: `Test Field B B B Name`,
                  label: `Test Field B B B Label`,
                  value: `Test Field B B B Value`,
                  minimumLength: null,
                  maximumLength: null,
                },
              ],
              submitButtonLabel: `Test Form B B Submit Button Label`,
            },
            fields: {
              "Test Field B B A Name": {
                editableField: {
                  type: `string`,
                  name: `Test Field B B A Name`,
                  label: `Test Field B B A Label`,
                  value: `Test Field B B A Value`,
                  minimumLength: null,
                  maximumLength: null,
                },
                parsed: `Test Field B B A Value`,
                raw: `Test Field B B A Value`,
              },
              "Test Field B B B Name": {
                editableField: {
                  type: `string`,
                  name: `Test Field B B B Name`,
                  label: `Test Field B B B Label`,
                  value: `Test Field B B B Value`,
                  minimumLength: null,
                  maximumLength: null,
                },
                parsed: `Test Field B B B Value`,
                raw: `Test Field B B B Value`,
              },
            },
          },
        },
      },
    });
  });
});
