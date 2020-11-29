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
        type: `text`,
        id: `test-form-group-name--test-form-name--test-removed-field`,
        field: {
          type: `integer`,
          name: `Test Removed Field`,
          label: `Test Label`,
          minimum: null,
          maximum: null,
          required: true,
          value: 24.7,
        },
        raw: `Test Removed Raw`,
      },
      "Test Converted To Non-Editable Field": {
        type: `text`,
        id: `test-form-group-name--test-form-name--test-converted-to-non-editable-field`,
        field: {
          type: `integer`,
          name: `Test Converted To Non-Editable Field`,
          label: `Test Label`,
          minimum: null,
          maximum: null,
          required: true,
          value: 6.54,
        },
        raw: `Test Converted To Non-Editable Raw`,
      },
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
        raw: `Test Reset Raw`,
      },
    };

    output = applyFields(formGroup, form, fieldsState);
  });

  it(`adds state for added fields`, () => {
    expect(output[`Test Added Field`]).toEqual({
      type: `text`,
      id: `test-form-group-name--test-form-name--test-added-field`,
      field: {
        type: `integer`,
        name: `Test Added Field`,
        label: `Test Label`,
        minimum: null,
        maximum: null,
        required: true,
        value: 44.5,
      },
      raw: `44.5`,
    });
  });

  it(`retains state for fields which have not changed`, () => {
    expect(output[`Test Retained Field`]).toEqual({
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
      raw: `Test Retained Raw`,
    });
  });

  it(`resets state for fields which have changed`, () => {
    expect(output[`Test Reset Field`]).toEqual({
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
      raw: `31.1`,
    });
  });

  it(`resets state for fields which have become static`, () => {
    expect(output[`Test Converted To Non-Editable Field`]).toEqual({
      type: `static`,
      id: `test-form-group-name--test-form-name--test-converted-to-non-editable-field`,
      field: {
        type: `subtitle`,
        name: `Test Converted To Non-Editable Field`,
        content: `Test Content`,
      },
    });
  });

  it(`adds state for static fields`, () => {
    expect(output[`Test Added Non-Editable Field`]).toEqual({
      type: `static`,
      id: `test-form-group-name--test-form-name--test-added-non-editable-field`,
      field: {
        type: `subtitle`,
        name: `Test Added Non-Editable Field`,
        content: `Test Content`,
      },
    });
  });

  it(`does not include any other fields`, () => {
    expect(Object.keys(output).length).toEqual(5);
  });
});
