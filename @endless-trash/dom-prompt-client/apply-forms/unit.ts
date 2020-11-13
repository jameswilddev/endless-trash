import { applyForms } from ".";
import { Form } from "@endless-trash/prompt";
import { FormsState } from "../forms-state";

describe(`applyForms`, () => {
  let output: FormsState;

  beforeAll(() => {
    const formsState: FormsState = {
      "Test Removed Form": {
        fields: {
          "Test Removed Field": {
            editableField: {
              type: `integer`,
              name: `Test Removed Field`,
              label: `Test Label`,
              minimum: null,
              maximum: null,
              required: true,
              value: 87.4,
            },
            parsed: 13.3,
            raw: `Test Removed Raw`,
          },
        },
      },
      "Test Retained Form": {
        fields: {
          "Test Retained Field": {
            editableField: {
              type: `integer`,
              name: `Test Retained Field`,
              label: `Test Label`,
              minimum: null,
              maximum: null,
              required: true,
              value: 44.5,
            },
            parsed: 11.2,
            raw: `Test Retained Raw`,
          },
          "Test Reset Field": {
            editableField: {
              type: `integer`,
              name: `Test Reset Field`,
              label: `Test Label`,
              minimum: null,
              maximum: null,
              required: true,
              value: 74.21,
            },
            parsed: 82.4,
            raw: `Test Reset Raw`,
          },
        },
      },
    };

    const forms: ReadonlyArray<Form> = [
      {
        name: `Test Added Form`,
        fields: [
          {
            type: `integer`,
            name: `Test Added Field`,
            label: `Test Label`,
            minimum: null,
            maximum: null,
            required: true,
            value: 64.5,
          },
        ],
        submitButtonLabel: `Test Submit Button Label`,
      },
      {
        name: `Test Retained Form`,
        fields: [
          {
            type: `integer`,
            name: `Test Reset Field`,
            label: `Test Label`,
            minimum: null,
            maximum: null,
            required: true,
            value: 31.1,
          },
          {
            type: `integer`,
            name: `Test Retained Field`,
            label: `Test Label`,
            minimum: null,
            maximum: null,
            required: true,
            value: 44.5,
          },
        ],
        submitButtonLabel: `Test Submit Button Label`,
      },
    ];

    output = applyForms(formsState, forms);
  });

  it(`adds state for added forms`, () => {
    expect(output[`Test Added Form`]).toEqual({
      fields: {
        "Test Added Field": {
          editableField: {
            type: `integer`,
            name: `Test Added Field`,
            label: `Test Label`,
            minimum: null,
            maximum: null,
            required: true,
            value: 64.5,
          },
          parsed: 64.5,
          raw: `64.5`,
        },
      },
    });
  });

  it(`updates state for retained forms`, () => {
    expect(output[`Test Retained Form`]).toEqual({
      fields: {
        "Test Retained Field": {
          editableField: {
            type: `integer`,
            name: `Test Retained Field`,
            label: `Test Label`,
            minimum: null,
            maximum: null,
            required: true,
            value: 44.5,
          },
          parsed: 11.2,
          raw: `Test Retained Raw`,
        },
        "Test Reset Field": {
          editableField: {
            type: `integer`,
            name: `Test Reset Field`,
            label: `Test Label`,
            minimum: null,
            maximum: null,
            required: true,
            value: 31.1,
          },
          parsed: 31.1,
          raw: `31.1`,
        },
      },
    });
  });

  it(`does not include any further forms`, () => {
    expect(Object.keys(output).length).toEqual(2);
  });
});
