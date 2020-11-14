import { updateField } from ".";
import { PromptState } from "../prompt-state";

describe(`updateField`, () => {
  let output: PromptState;

  beforeAll(() => {
    const promptState: PromptState = {
      prompt: {
        formGroups: [],
      },
      formGroups: {
        "Test Other Form Group Name": {
          formGroup: {
            name: `Test Other Form Group Name`,
            forms: [],
          },
          forms: {
            "Test Form Name": {
              form: {
                name: `Test Form Name`,
                fields: [],
                submitButtonLabel: `Test Submit Button Label`,
              },
              fields: {
                "Test Other Field Name": {
                  editableField: {
                    type: `integer`,
                    name: `Test Other Field Name`,
                    label: `Test Label`,
                    minimum: null,
                    maximum: null,
                    required: true,
                    value: 44.5,
                  },
                  parsed: 85.1,
                  raw: `Test Other Raw`,
                },
                "Test Field Name": {
                  editableField: {
                    type: `integer`,
                    name: `Test Field Name`,
                    label: `Test Label`,
                    minimum: null,
                    maximum: null,
                    required: true,
                    value: 44.5,
                  },
                  parsed: 93.1,
                  raw: `Test Other Raw`,
                },
              },
            },
            "Test Other Form Name": {
              form: {
                name: `Test Other Form Name`,
                fields: [],
                submitButtonLabel: `Test Submit Button Label`,
              },
              fields: {
                "Test Other Field Name": {
                  editableField: {
                    type: `integer`,
                    name: `Test Other Field Name`,
                    label: `Test Label`,
                    minimum: null,
                    maximum: null,
                    required: true,
                    value: 44.5,
                  },
                  parsed: 85.1,
                  raw: `Test Other Raw`,
                },
                "Test Field Name": {
                  editableField: {
                    type: `integer`,
                    name: `Test Field Name`,
                    label: `Test Label`,
                    minimum: null,
                    maximum: null,
                    required: true,
                    value: 44.5,
                  },
                  parsed: 93.1,
                  raw: `Test Other Raw`,
                },
              },
            },
          },
        },
        "Test Form Group Name": {
          formGroup: {
            name: `Test Form Group Name`,
            forms: [],
          },
          forms: {
            "Test Form Name": {
              form: {
                name: `Test Form Name`,
                fields: [],
                submitButtonLabel: `Test Submit Button Label`,
              },
              fields: {
                "Test Other Field Name": {
                  editableField: {
                    type: `integer`,
                    name: `Test Other Field Name`,
                    label: `Test Label`,
                    minimum: null,
                    maximum: null,
                    required: true,
                    value: 44.5,
                  },
                  parsed: 85.1,
                  raw: `Test Other Raw`,
                },
                "Test Field Name": {
                  editableField: {
                    type: `integer`,
                    name: `Test Field Name`,
                    label: `Test Label`,
                    minimum: null,
                    maximum: null,
                    required: true,
                    value: 44.5,
                  },
                  parsed: 494.2,
                  raw: `Test Raw`,
                },
              },
            },
            "Test Other Form Name": {
              form: {
                name: `Test Other Form Name`,
                fields: [],
                submitButtonLabel: `Test Submit Button Label`,
              },
              fields: {
                "Test Other Field Name": {
                  editableField: {
                    type: `integer`,
                    name: `Test Other Field Name`,
                    label: `Test Label`,
                    minimum: null,
                    maximum: null,
                    required: true,
                    value: 44.5,
                  },
                  parsed: 85.1,
                  raw: `Test Other Raw`,
                },
                "Test Field Name": {
                  editableField: {
                    type: `integer`,
                    name: `Test Field Name`,
                    label: `Test Label`,
                    minimum: null,
                    maximum: null,
                    required: true,
                    value: 44.5,
                  },
                  parsed: 93.1,
                  raw: `Test Other Raw`,
                },
              },
            },
          },
        },
      },
      send: null,
    };

    output = updateField(
      promptState,
      `Test Form Group Name`,
      `Test Form Name`,
      `Test Field Name`,
      184.2,
      `Test Updated Raw`
    );
  });

  it(`replaces the field's raw value`, () => {
    expect(output).toEqual({
      prompt: {
        formGroups: [],
      },
      formGroups: {
        "Test Other Form Group Name": {
          formGroup: {
            name: `Test Other Form Group Name`,
            forms: [],
          },
          forms: {
            "Test Form Name": {
              form: {
                name: `Test Form Name`,
                fields: [],
                submitButtonLabel: `Test Submit Button Label`,
              },
              fields: {
                "Test Other Field Name": {
                  editableField: {
                    type: `integer`,
                    name: `Test Other Field Name`,
                    label: `Test Label`,
                    minimum: null,
                    maximum: null,
                    required: true,
                    value: 44.5,
                  },
                  parsed: 85.1,
                  raw: `Test Other Raw`,
                },
                "Test Field Name": {
                  editableField: {
                    type: `integer`,
                    name: `Test Field Name`,
                    label: `Test Label`,
                    minimum: null,
                    maximum: null,
                    required: true,
                    value: 44.5,
                  },
                  parsed: 93.1,
                  raw: `Test Other Raw`,
                },
              },
            },
            "Test Other Form Name": {
              form: {
                name: `Test Other Form Name`,
                fields: [],
                submitButtonLabel: `Test Submit Button Label`,
              },
              fields: {
                "Test Other Field Name": {
                  editableField: {
                    type: `integer`,
                    name: `Test Other Field Name`,
                    label: `Test Label`,
                    minimum: null,
                    maximum: null,
                    required: true,
                    value: 44.5,
                  },
                  parsed: 85.1,
                  raw: `Test Other Raw`,
                },
                "Test Field Name": {
                  editableField: {
                    type: `integer`,
                    name: `Test Field Name`,
                    label: `Test Label`,
                    minimum: null,
                    maximum: null,
                    required: true,
                    value: 44.5,
                  },
                  parsed: 93.1,
                  raw: `Test Other Raw`,
                },
              },
            },
          },
        },
        "Test Form Group Name": {
          formGroup: {
            name: `Test Form Group Name`,
            forms: [],
          },
          forms: {
            "Test Form Name": {
              form: {
                name: `Test Form Name`,
                fields: [],
                submitButtonLabel: `Test Submit Button Label`,
              },
              fields: {
                "Test Other Field Name": {
                  editableField: {
                    type: `integer`,
                    name: `Test Other Field Name`,
                    label: `Test Label`,
                    minimum: null,
                    maximum: null,
                    required: true,
                    value: 44.5,
                  },
                  parsed: 85.1,
                  raw: `Test Other Raw`,
                },
                "Test Field Name": {
                  editableField: {
                    type: `integer`,
                    name: `Test Field Name`,
                    label: `Test Label`,
                    minimum: null,
                    maximum: null,
                    required: true,
                    value: 44.5,
                  },
                  parsed: 184.2,
                  raw: `Test Updated Raw`,
                },
              },
            },
            "Test Other Form Name": {
              form: {
                name: `Test Other Form Name`,
                fields: [],
                submitButtonLabel: `Test Submit Button Label`,
              },
              fields: {
                "Test Other Field Name": {
                  editableField: {
                    type: `integer`,
                    name: `Test Other Field Name`,
                    label: `Test Label`,
                    minimum: null,
                    maximum: null,
                    required: true,
                    value: 44.5,
                  },
                  parsed: 85.1,
                  raw: `Test Other Raw`,
                },
                "Test Field Name": {
                  editableField: {
                    type: `integer`,
                    name: `Test Field Name`,
                    label: `Test Label`,
                    minimum: null,
                    maximum: null,
                    required: true,
                    value: 44.5,
                  },
                  parsed: 93.1,
                  raw: `Test Other Raw`,
                },
              },
            },
          },
        },
      },
      send: null,
    });
  });
});
