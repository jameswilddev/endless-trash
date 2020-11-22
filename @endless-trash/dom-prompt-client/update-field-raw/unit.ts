import { ChannelSend } from "@endless-trash/channel";
import { Request } from "@endless-trash/prompt";
import { updateFieldRaw } from ".";
import { PromptState } from "../prompt-state";

describe(`updateFieldRaw`, () => {
  let channelSend: ChannelSend<Request>;
  let output: PromptState;

  beforeAll(() => {
    const channelSend = jasmine.createSpy(`channelSend`);

    const promptState: PromptState = {
      type: `prompt`,
      prompt: {
        formGroups: [],
      },
      formGroups: {
        "Test Other Form Group Name": {
          formGroup: {
            name: `Test Other Form Group Name`,
            forms: [],
          },
          id: `Test Other Id`,
          forms: {
            "Test Form Name": {
              form: {
                name: `Test Form Name`,
                fields: [],
                submitButtonLabel: `Test Submit Button Label`,
              },
              id: `Test Other Id`,
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
                  id: `Test Other Id`,
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
                  id: `Test Other Id`,
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
              id: `Test Other Id`,
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
                  id: `Test Other Id`,
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
                  id: `Test Other Id`,
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
          id: `Test Form Group Id`,
          forms: {
            "Test Form Name": {
              form: {
                name: `Test Form Name`,
                fields: [],
                submitButtonLabel: `Test Submit Button Label`,
              },
              id: `Test Form Id`,
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
                  id: `Test Other Id`,
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
                  id: `Test Field Id`,
                  parsed: 93.1,
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
              id: `Test Other Id`,
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
                  id: `Test Other Id`,
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
                  id: `Test Other Id`,
                  parsed: 93.1,
                  raw: `Test Other Raw`,
                },
              },
            },
          },
        },
      },
      sendState: null,
      channelSend,
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
      type: `prompt`,
      prompt: {
        formGroups: [],
      },
      formGroups: {
        "Test Other Form Group Name": {
          formGroup: {
            name: `Test Other Form Group Name`,
            forms: [],
          },
          id: `Test Other Id`,
          forms: {
            "Test Form Name": {
              form: {
                name: `Test Form Name`,
                fields: [],
                submitButtonLabel: `Test Submit Button Label`,
              },
              id: `Test Other Id`,
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
                  id: `Test Other Id`,
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
                  id: `Test Other Id`,
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
              id: `Test Other Id`,
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
                  id: `Test Other Id`,
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
                  id: `Test Other Id`,
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
          id: `Test Form Group Id`,
          forms: {
            "Test Form Name": {
              form: {
                name: `Test Form Name`,
                fields: [],
                submitButtonLabel: `Test Submit Button Label`,
              },
              id: `Test Form Id`,
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
                  id: `Test Other Id`,
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
                  id: `Test Field Id`,
                  parsed: 93.1,
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
              id: `Test Other Id`,
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
                  id: `Test Other Id`,
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
                  id: `Test Other Id`,
                  parsed: 93.1,
                  raw: `Test Other Raw`,
                },
              },
            },
          },
        },
      },
      sendState: null,
      channelSend,
    });
  });

  it(`does not send a message through the channel`, () => {
    expect(channelSend).not.toHaveBeenCalled();
  });
});
