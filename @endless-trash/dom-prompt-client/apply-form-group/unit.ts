import { FormGroup } from "@endless-trash/prompt";
import { applyFormGroup } from ".";
import { FormGroupState } from "../form-group-state";

describe(`applyFormGroup`, () => {
  let output: FormGroupState;

  beforeAll(() => {
    const formGroupState: FormGroupState = {
      formGroup: {
        name: `Test Form Group Name`,
        forms: [],
      },
      id: `test-form-group-name`,
      forms: {
        "Test Removed Form": {
          form: {
            name: `Test Removed Form`,
            fields: [],
            submitButtonLabel: `Test Previous Removed Submit Button Label`,
          },
          id: `test-form-group-name--test-removed-form`,
          fields: {
            "Test Removed Field": {
              type: `text`,
              id: `test-form-group-name--test-removed-form--test-removed-field`,
              field: {
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
          form: {
            name: `Test Retained Form`,
            fields: [],
            submitButtonLabel: `Test Previous Retained Submit Button Label`,
          },
          id: `test-form-group-name--test-retained-form`,
          fields: {
            "Test Retained Field": {
              type: `text`,
              id: `test-form-group-name--test-retained-form--test-retained-field`,
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
              id: `test-form-group-name--test-retained-form--test-reset-field`,
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
        },
      },
    };

    const formGroup: FormGroup = {
      name: `Test Form Group Name`,
      forms: [
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
      ],
    };

    output = applyFormGroup(formGroupState, formGroup);
  });

  it(`includes the form group`, () => {
    expect(output.formGroup).toEqual({
      name: `Test Form Group Name`,
      forms: [
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
      ],
    });
  });

  it(`does not change the id`, () => {
    expect(output.id).toEqual(`test-form-group-name`);
  });

  it(`applies form state`, () => {
    expect(output.forms).toEqual({
      "Test Added Form": {
        form: {
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
        id: `test-form-group-name--test-added-form`,
        fields: {
          "Test Added Field": {
            type: `text`,
            id: `test-form-group-name--test-added-form--test-added-field`,
            field: {
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
      },
      "Test Retained Form": {
        form: {
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
        id: `test-form-group-name--test-retained-form`,
        fields: {
          "Test Retained Field": {
            type: `text`,
            id: `test-form-group-name--test-retained-form--test-retained-field`,
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
            id: `test-form-group-name--test-retained-form--test-reset-field`,
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
        },
      },
    });
  });
});
