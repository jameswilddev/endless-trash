import { Form, FormGroup } from "@endless-trash/prompt";
import { applyForm } from ".";
import { FormState } from "../form-state";

describe(`applyForm`, () => {
  let output: FormState;

  beforeAll(() => {
    const formGroup: FormGroup = {
      name: `Test Form Group Name`,
      forms: [],
    };

    const formState: FormState = {
      form: {
        name: `Test Previous Form Name`,
        fields: [],
        submitButtonLabel: `Test Previous Submit Button Label`,
      },
      id: `Test Form Id`,
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
          id: `Test Retained Field Id`,
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
          id: `Test Reset Field Id`,
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

    output = applyForm(formGroup, formState, form);
  });

  it(`includes the form`, () => {
    expect(output.form).toEqual({
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
    });
  });

  it(`does not change the id`, () => {
    expect(output.id).toEqual(`Test Form Id`);
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
        id: `Test Retained Field Id`,
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
        id: `Test Reset Field Id`,
        parsed: 31.1,
        raw: `31.1`,
      },
    });
  });
});
