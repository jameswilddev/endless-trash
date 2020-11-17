import { Form, FormGroup } from "@endless-trash/prompt";
import { applyFields } from ".";
import { FieldsState } from "../fields-state";

describe(`applyFields`, () => {
  let output: FieldsState;

  beforeAll(() => {
    const formGroup: FormGroup = {
      name: `Test Form Group Name`,
      forms: [],
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
        {
          type: `subtitle`,
          name: `Test Converted To Non-Editable Field`,
          content: `Test Content`,
        },
        {
          type: `integer`,
          name: `Test Added Field`,
          label: `Test Label`,
          minimum: null,
          maximum: null,
          required: true,
          value: 44.5,
        },
        {
          type: `subtitle`,
          name: `Test Added Non-Editable Field`,
          content: `Test Content`,
        },
      ],
      submitButtonLabel: `Test Submit Button Label`,
    };

    const fieldsState: FieldsState = {
      "Test Removed Field": {
        editableField: {
          type: `integer`,
          name: `Test Removed Field`,
          label: `Test Label`,
          minimum: null,
          maximum: null,
          required: true,
          value: 24.7,
        },
        id: `Test Removed Id`,
        parsed: 12.1,
        raw: `Test Removed Raw`,
      },
      "Test Converted To Non-Editable Field": {
        editableField: {
          type: `integer`,
          name: `Test Converted To Non-Editable Field`,
          label: `Test Label`,
          minimum: null,
          maximum: null,
          required: true,
          value: 6.54,
        },
        id: `Test Converted To Non-Editable Id`,
        parsed: 7.6,
        raw: `Test Converted To Non-Editable Raw`,
      },
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
        id: `Test Retained Id`,
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
        id: `Test Reset Id`,
        parsed: 82.4,
        raw: `Test Reset Raw`,
      },
    };

    output = applyFields(formGroup, form, fieldsState);
  });

  it(`adds state for added fields`, () => {
    expect(output[`Test Added Field`]).toEqual({
      editableField: {
        type: `integer`,
        name: `Test Added Field`,
        label: `Test Label`,
        minimum: null,
        maximum: null,
        required: true,
        value: 44.5,
      },
      id: `test-form-group-name--test-form-name--test-added-field`,
      parsed: 44.5,
      raw: `44.5`,
    });
  });

  it(`retains state for fields which have not changed`, () => {
    expect(output[`Test Retained Field`]).toEqual({
      editableField: {
        type: `integer`,
        name: `Test Retained Field`,
        label: `Test Label`,
        minimum: null,
        maximum: null,
        required: true,
        value: 44.5,
      },
      id: `Test Retained Id`,
      parsed: 11.2,
      raw: `Test Retained Raw`,
    });
  });

  it(`resets state for fields which have changed`, () => {
    expect(output[`Test Reset Field`]).toEqual({
      editableField: {
        type: `integer`,
        name: `Test Reset Field`,
        label: `Test Label`,
        minimum: null,
        maximum: null,
        required: true,
        value: 31.1,
      },
      id: `Test Reset Id`,
      parsed: 31.1,
      raw: `31.1`,
    });
  });

  it(`does not include any other fields`, () => {
    expect(Object.keys(output).length).toEqual(3);
  });
});
