import { updateFieldRaw } from ".";
import { MessageState } from "../message-state";
import { PromptState } from "../prompt-state";
import { State } from "../state";

describe(`updateFieldRaw`, () => {
  describe(`message`, () => {
    let output: State;

    beforeAll(() => {
      const messageState: MessageState = {
        type: `message`,
        content: `Test Content`,
      };

      output = updateFieldRaw(messageState, {
        formGroupName: `Test Form Group Name`,
        formName: `Test Form Name`,
        fieldName: `Test Field Name`,
        raw: `Test Updated Raw`,
      });
    });

    it(`returns the state`, () => {
      expect(output).toEqual({
        type: `message`,
        content: `Test Content`,
      });
    });
  });

  describe(`prompt`, () => {
    let channelSend: jasmine.Spy;
    let output: State;

    beforeAll(() => {
      channelSend = jasmine.createSpy(`channelSend`);

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
            id: `test-other-form-group-name`,
            forms: {
              "Test Form Name": {
                form: {
                  name: `Test Form Name`,
                  fields: [],
                  submitButtonLabel: `Test Submit Button Label`,
                },
                id: `test-other-form-group-name--test-form-name`,
                fields: {
                  "Test Other Field Name": {
                    type: `text`,
                    id: `test-other-form-group-name--test-form-name--test-other-field-name`,
                    field: {
                      type: `integer`,
                      name: `Test Other Field Name`,
                      label: `Test Label`,
                      minimum: null,
                      maximum: null,
                      required: true,
                      value: 44.5,
                    },
                    raw: `Test Other Raw`,
                  },
                  "Test Field Name": {
                    type: `text`,
                    id: `test-other-form-group-name--test-form-name--test-field-name`,
                    field: {
                      type: `integer`,
                      name: `Test Field Name`,
                      label: `Test Label`,
                      minimum: null,
                      maximum: null,
                      required: true,
                      value: 44.5,
                    },
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
                id: `test-other-form-group-name--test-other-form-name`,
                fields: {
                  "Test Other Field Name": {
                    type: `text`,
                    id: `test-other-form-group-name--test-other-form-name--test-other-field-name`,
                    field: {
                      type: `integer`,
                      name: `Test Other Field Name`,
                      label: `Test Label`,
                      minimum: null,
                      maximum: null,
                      required: true,
                      value: 44.5,
                    },
                    raw: `Test Other Raw`,
                  },
                  "Test Field Name": {
                    type: `text`,
                    id: `test-other-form-group-name--test-other-form-name--test-field-name`,
                    field: {
                      type: `integer`,
                      name: `Test Field Name`,
                      label: `Test Label`,
                      minimum: null,
                      maximum: null,
                      required: true,
                      value: 44.5,
                    },
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
            id: `test-form-group-name`,
            forms: {
              "Test Form Name": {
                form: {
                  name: `Test Form Name`,
                  fields: [],
                  submitButtonLabel: `Test Submit Button Label`,
                },
                id: `test-form-group-name--test-form-name`,
                fields: {
                  "Test Other Field Name": {
                    type: `text`,
                    id: `test-form-group-name--test-form-name--test-other-field-name`,
                    field: {
                      type: `integer`,
                      name: `Test Other Field Name`,
                      label: `Test Label`,
                      minimum: null,
                      maximum: null,
                      required: true,
                      value: 44.5,
                    },
                    raw: `Test Other Raw`,
                  },
                  "Test Field Name": {
                    type: `text`,
                    id: `test-form-group-name--test-form-name--test-field-name`,
                    field: {
                      type: `integer`,
                      name: `Test Field Name`,
                      label: `Test Label`,
                      minimum: null,
                      maximum: null,
                      required: true,
                      value: 44.5,
                    },
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
                id: `test-form-group-name--test-other-form-name`,
                fields: {
                  "Test Other Field Name": {
                    type: `text`,
                    id: `test-form-group-name--test-other-form-name--test-other-field-name`,
                    field: {
                      type: `integer`,
                      name: `Test Other Field Name`,
                      label: `Test Label`,
                      minimum: null,
                      maximum: null,
                      required: true,
                      value: 44.5,
                    },
                    raw: `Test Other Raw`,
                  },
                  "Test Field Name": {
                    type: `text`,
                    id: `test-form-group-name--test-other-form-name--test-field-name`,
                    field: {
                      type: `integer`,
                      name: `Test Field Name`,
                      label: `Test Label`,
                      minimum: null,
                      maximum: null,
                      required: true,
                      value: 44.5,
                    },
                    raw: `Test Other Raw`,
                  },
                },
              },
            },
          },
        },
        mode: `interactive`,
        channelSend,
      };

      output = updateFieldRaw(promptState, {
        formGroupName: `Test Form Group Name`,
        formName: `Test Form Name`,
        fieldName: `Test Field Name`,
        raw: `Test Updated Raw`,
      });
    });

    it(`replaces the field's parsed and raw values`, () => {
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
            id: `test-other-form-group-name`,
            forms: {
              "Test Form Name": {
                form: {
                  name: `Test Form Name`,
                  fields: [],
                  submitButtonLabel: `Test Submit Button Label`,
                },
                id: `test-other-form-group-name--test-form-name`,
                fields: {
                  "Test Other Field Name": {
                    type: `text`,
                    id: `test-other-form-group-name--test-form-name--test-other-field-name`,
                    field: {
                      type: `integer`,
                      name: `Test Other Field Name`,
                      label: `Test Label`,
                      minimum: null,
                      maximum: null,
                      required: true,
                      value: 44.5,
                    },
                    raw: `Test Other Raw`,
                  },
                  "Test Field Name": {
                    type: `text`,
                    id: `test-other-form-group-name--test-form-name--test-field-name`,
                    field: {
                      type: `integer`,
                      name: `Test Field Name`,
                      label: `Test Label`,
                      minimum: null,
                      maximum: null,
                      required: true,
                      value: 44.5,
                    },
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
                id: `test-other-form-group-name--test-other-form-name`,
                fields: {
                  "Test Other Field Name": {
                    type: `text`,
                    id: `test-other-form-group-name--test-other-form-name--test-other-field-name`,
                    field: {
                      type: `integer`,
                      name: `Test Other Field Name`,
                      label: `Test Label`,
                      minimum: null,
                      maximum: null,
                      required: true,
                      value: 44.5,
                    },
                    raw: `Test Other Raw`,
                  },
                  "Test Field Name": {
                    type: `text`,
                    id: `test-other-form-group-name--test-other-form-name--test-field-name`,
                    field: {
                      type: `integer`,
                      name: `Test Field Name`,
                      label: `Test Label`,
                      minimum: null,
                      maximum: null,
                      required: true,
                      value: 44.5,
                    },
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
            id: `test-form-group-name`,
            forms: {
              "Test Form Name": {
                form: {
                  name: `Test Form Name`,
                  fields: [],
                  submitButtonLabel: `Test Submit Button Label`,
                },
                id: `test-form-group-name--test-form-name`,
                fields: {
                  "Test Other Field Name": {
                    type: `text`,
                    id: `test-form-group-name--test-form-name--test-other-field-name`,
                    field: {
                      type: `integer`,
                      name: `Test Other Field Name`,
                      label: `Test Label`,
                      minimum: null,
                      maximum: null,
                      required: true,
                      value: 44.5,
                    },
                    raw: `Test Other Raw`,
                  },
                  "Test Field Name": {
                    type: `text`,
                    id: `test-form-group-name--test-form-name--test-field-name`,
                    field: {
                      type: `integer`,
                      name: `Test Field Name`,
                      label: `Test Label`,
                      minimum: null,
                      maximum: null,
                      required: true,
                      value: 44.5,
                    },
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
                id: `test-form-group-name--test-other-form-name`,
                fields: {
                  "Test Other Field Name": {
                    type: `text`,
                    id: `test-form-group-name--test-other-form-name--test-other-field-name`,
                    field: {
                      type: `integer`,
                      name: `Test Other Field Name`,
                      label: `Test Label`,
                      minimum: null,
                      maximum: null,
                      required: true,
                      value: 44.5,
                    },
                    raw: `Test Other Raw`,
                  },
                  "Test Field Name": {
                    type: `text`,
                    id: `test-form-group-name--test-other-form-name--test-field-name`,
                    field: {
                      type: `integer`,
                      name: `Test Field Name`,
                      label: `Test Label`,
                      minimum: null,
                      maximum: null,
                      required: true,
                      value: 44.5,
                    },
                    raw: `Test Other Raw`,
                  },
                },
              },
            },
          },
        },
        mode: `interactive`,
        channelSend,
      });
    });

    it(`does not send a message through the channel`, () => {
      expect(channelSend).not.toHaveBeenCalled();
    });
  });
});
