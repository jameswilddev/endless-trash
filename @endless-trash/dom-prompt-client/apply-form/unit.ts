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
        name: `Test Form Name`,
        fields: [],
        submitButtonLabel: `Test Submit Button Label`,
      },
      id: `test-form-group-name--test-form-name`,
      fields: {
        "Test Retained Field": {
          type: `text`,
          id: `test-form-group-name--test-form-name--test-retained-field`,
          field: {
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
          type: `text`,
          id: `test-form-group-name--test-form-name--test-reset-field`,
          field: {
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
      name: `Test Form Name`,
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
      name: `Test Form Name`,
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
    expect(output.id).toEqual(`test-form-group-name--test-form-name`);
  });

  it(`applies field state`, () => {
    expect(output.fields).toEqual({
      "Test Retained Field": {
        type: `text`,
        id: `test-form-group-name--test-form-name--test-retained-field`,
        field: {
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
        type: `text`,
        id: `test-form-group-name--test-form-name--test-reset-field`,
        field: {
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
