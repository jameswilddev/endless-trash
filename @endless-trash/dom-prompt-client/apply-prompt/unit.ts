import { Prompt } from "@endless-trash/prompt";
import { applyPrompt } from ".";
import { ErrorState } from "../error-state";
import { MessageState } from "../message-state";
import { PromptState } from "../prompt-state";
import { State } from "../state";

describe(`applyPrompt`, () => {
  describe(`error`, () => {
    let channelSend: jasmine.Spy;
    let output: State;

    beforeAll(() => {
      channelSend = jasmine.createSpy(`channelSend`);

      const errorState: ErrorState = {
        type: `error`,
        error: new Error(`Test Error`),
      };

      const prompt: Prompt = {
        formGroups: [
          {
            name: `Test Added Form Group`,
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
            ],
          },
        ],
      };

      output = applyPrompt(errorState, {
        prompt,
        channelSend,
      }) as State;
    });

    it(`returns the current state`, () => {
      expect(output).toEqual({
        type: `error`,
        error: new Error(`Test Error`),
      });
    });

    it(`does not send a message through the channel`, () => {
      expect(channelSend).not.toHaveBeenCalled();
    });
  });

  describe(`message`, () => {
    let channelSend: jasmine.Spy;
    let output: PromptState;

    beforeAll(() => {
      channelSend = jasmine.createSpy(`channelSend`);

      const messageState: MessageState = {
        type: `message`,
        content: `Test Content`,
      };

      const prompt: Prompt = {
        formGroups: [
          {
            name: `Test Added Form Group`,
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
            ],
          },
        ],
      };

      output = applyPrompt(messageState, {
        prompt,
        channelSend,
      }) as PromptState;
    });

    it(`includes the type`, () => {
      expect(output.type).toEqual(`prompt`);
    });

    it(`includes the prompt`, () => {
      expect(output.prompt).toEqual({
        formGroups: [
          {
            name: `Test Added Form Group`,
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
            ],
          },
        ],
      });
    });

    it(`applies form group state`, () => {
      expect(output.formGroups).toEqual({
        "Test Added Form Group": {
          formGroup: {
            name: `Test Added Form Group`,
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
            ],
          },
          id: `test-added-form-group`,
          forms: {
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
              id: `test-added-form-group--test-added-form`,
              fields: {
                "Test Added Field": {
                  type: `text`,
                  id: `test-added-form-group--test-added-form--test-added-field`,
                  field: {
                    type: `integer`,
                    name: `Test Added Field`,
                    label: `Test Label`,
                    minimum: null,
                    maximum: null,
                    required: true,
                    value: 64.5,
                  },
                  raw: `64.5`,
                },
              },
            },
          },
        },
      });
    });

    it(`initializes the mode to interactive`, () => {
      expect(output.mode).toEqual(`interactive`);
    });

    it(`includes the channel's send callback`, () => {
      expect(output.channelSend).toBe(channelSend);
    });

    it(`does not send a message through the channel`, () => {
      expect(channelSend).not.toHaveBeenCalled();
    });
  });

  describe(`prompt`, () => {
    let channelSend: jasmine.Spy;
    let output: PromptState;

    beforeAll(() => {
      channelSend = jasmine.createSpy(`channelSend`);

      const promptState: PromptState = {
        type: `prompt`,
        prompt: {
          formGroups: [],
        },
        formGroups: {
          "Test Removed Form Group": {
            formGroup: {
              name: `Test Removed Form Group`,
              forms: [],
            },
            id: `test-removed-form-group`,
            forms: {
              "Test Removed Form": {
                form: {
                  name: `Test Removed Form`,
                  fields: [],
                  submitButtonLabel: `Test Removed Form`,
                },
                id: `test-removed-form-group--test-removed-form`,
                fields: {
                  "Test Removed Field": {
                    type: `text`,
                    id: `test-removed-form-group--test-removed-form--test-removed-field`,
                    field: {
                      type: `integer`,
                      name: `Test Removed Field`,
                      label: `Test Label`,
                      minimum: null,
                      maximum: null,
                      required: true,
                      value: 87.4,
                    },
                    raw: `Test Removed Raw`,
                  },
                },
              },
            },
          },
          "Test Retained Form Group": {
            formGroup: {
              name: `Test Retained Form Group`,
              forms: [],
            },
            id: `test-retained-form-group`,
            forms: {
              "Test Retained Form": {
                form: {
                  name: `Test Retained Form`,
                  fields: [],
                  submitButtonLabel: `Test Previous Retained Form`,
                },
                id: `test-retained-form-group--test-retained-form`,
                fields: {
                  "Test Retained Field": {
                    type: `text`,
                    id: `test-retained-form-group--test-retained-form--test-retained-field`,
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
                    id: `test-retained-form-group--test-retained-form--test-reset-field`,
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
                },
              },
            },
          },
        },
        mode: `awaitingResponse`,
        channelSend,
      };

      const prompt: Prompt = {
        formGroups: [
          {
            name: `Test Added Form Group`,
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
            ],
          },
          {
            name: `Test Retained Form Group`,
            forms: [
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
          },
        ],
      };

      output = applyPrompt(promptState, { prompt, channelSend }) as PromptState;
    });

    it(`includes the type`, () => {
      expect(output.type).toEqual(`prompt`);
    });

    it(`includes the prompt`, () => {
      expect(output.prompt).toEqual({
        formGroups: [
          {
            name: `Test Added Form Group`,
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
            ],
          },
          {
            name: `Test Retained Form Group`,
            forms: [
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
          },
        ],
      });
    });

    it(`applies form group state`, () => {
      expect(output.formGroups).toEqual({
        "Test Added Form Group": {
          formGroup: {
            name: `Test Added Form Group`,
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
            ],
          },
          id: `test-added-form-group`,
          forms: {
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
              id: `test-added-form-group--test-added-form`,
              fields: {
                "Test Added Field": {
                  type: `text`,
                  id: `test-added-form-group--test-added-form--test-added-field`,
                  field: {
                    type: `integer`,
                    name: `Test Added Field`,
                    label: `Test Label`,
                    minimum: null,
                    maximum: null,
                    required: true,
                    value: 64.5,
                  },
                  raw: `64.5`,
                },
              },
            },
          },
        },
        "Test Retained Form Group": {
          formGroup: {
            name: `Test Retained Form Group`,
            forms: [
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
          },
          id: `test-retained-form-group`,
          forms: {
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
              id: `test-retained-form-group--test-retained-form`,
              fields: {
                "Test Retained Field": {
                  type: `text`,
                  id: `test-retained-form-group--test-retained-form--test-retained-field`,
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
                  id: `test-retained-form-group--test-retained-form--test-reset-field`,
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
                },
              },
            },
          },
        },
      });
    });

    it(`resets the mode to interactive`, () => {
      expect(output.mode).toEqual(`interactive`);
    });

    it(`includes the channel's send callback`, () => {
      expect(output.channelSend).toBe(channelSend);
    });

    it(`does not send a message through the channel`, () => {
      expect(channelSend).not.toHaveBeenCalled();
    });
  });
});
