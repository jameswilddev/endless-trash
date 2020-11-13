import { updateFieldRaw } from ".";
import { PromptState } from "../prompt-state";

describe(`updateFieldRaw`, () => {
  let output: PromptState;

  beforeAll(() => {
    const promptState: PromptState = {
      formGroups: {
        "Test Other Form Group Name": {
          forms: {
            "Test Form Name": {
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
          forms: {
            "Test Form Name": {
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
                  raw: `Test Raw`,
                },
              },
            },
            "Test Other Form Name": {
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

    output = updateFieldRaw(
      promptState,
      `Test Form Group Name`,
      `Test Form Name`,
      `Test Field Name`,
      `Test Updated Raw`
    );
  });

  it(`replaces the field's raw value`, () => {
    expect(output).toEqual({
      formGroups: {
        "Test Other Form Group Name": {
          forms: {
            "Test Form Name": {
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
          forms: {
            "Test Form Name": {
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
                  raw: `Test Updated Raw`,
                },
              },
            },
            "Test Other Form Name": {
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
