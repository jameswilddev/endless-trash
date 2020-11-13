import { Form } from "@endless-trash/prompt";
import { applyForm } from ".";
import { FormState } from "../form-state";

describe(`applyForm`, () => {
  let output: FormState;

  beforeAll(() => {
    const formState: FormState = {
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
    };

    const form: Form = {
      name: `Test Name`,
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
    };

    output = applyForm(formState, form);
  });

  it(`applies field state`, () => {
    expect(output.fields).toEqual({
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
    });
  });
});
