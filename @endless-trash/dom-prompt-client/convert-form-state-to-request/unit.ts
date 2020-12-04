import { Request } from "@endless-trash/prompt";
import { convertFormStateToRequest } from ".";

describe(`convertFormStateToRequest`, () => {
  let output: Request;

  beforeAll(() => {
    output = convertFormStateToRequest({
      form: {
        name: `Test Form Name`,
        fields: [
          {
            name: `Test Field A Name`,
            type: `float`,
            label: `Test Label`,
            value: null,
            minimum: null,
            maximum: null,
            required: false,
          },
          {
            type: `subtitle`,
            content: `Test Content`,
            name: `Test Name`,
          },
          {
            name: `Test Field C Name`,
            type: `integer`,
            label: `Test Label`,
            value: null,
            minimum: null,
            maximum: null,
            required: false,
          },
        ],
        submitButtonLabel: `Test Submit Button Label`,
      },
      id: `Test Id`,
      fields: {
        "Test Field A Name": {
          type: `text`,
          id: `Test Id`,
          field: {
            name: `Test Field A Name`,
            type: `float`,
            label: `Test Label`,
            value: null,
            minimum: null,
            maximum: null,
            required: false,
          },
          raw: `   -   12.  5 `,
        },
        "Test Field B Name": {
          type: `static`,
          id: `Test Id`,
          field: {
            type: `subtitle`,
            content: `Test Content`,
            name: `Test Name`,
          },
        },
        "Test Field C Name": {
          type: `text`,
          id: `Test Id`,
          field: {
            name: `Test Field C Name`,
            type: `integer`,
            label: `Test Label`,
            value: null,
            minimum: null,
            maximum: null,
            required: false,
          },
          raw: `    `,
        },
      },
    });
  });

  it(`includes the form's name`, () => {
    expect(output.formName).toEqual(`Test Form Name`);
  });

  it(`includes the fields' values`, () => {
    expect(output.fields).toEqual({
      "Test Field A Name": -12.5,
      "Test Field C Name": null,
    });
  });
});
