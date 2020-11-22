import { Prompt } from "@endless-trash/prompt";
import { applyPrompt } from ".";
import { PromptState } from "../prompt-state";

describe(`applyPrompt`, () => {
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
          id: `Test Removed Form Group Id`,
          forms: {
            "Test Removed Form": {
              form: {
                name: `Test Removed Form`,
                fields: [],
                submitButtonLabel: `Test Removed Form`,
              },
              id: `Test Removed Form Id`,
              fields: {
                "Test Removed Field": {
                  editableField: {
                    type: `integer`,
                    name: `Test Removed Field`,
                    label: `Test Label`,
                    minimum: null,
                    maximum: null,
                    required: true,
                    value: 87.4,
                  },
                  id: `Test Removed Field Id`,
                  parsed: 13.3,
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
          id: `Test Retained Form Group Id`,
          forms: {
            "Test Retained Form": {
              form: {
                name: `Test Retained Form`,
                fields: [],
                submitButtonLabel: `Test Previous Retained Form`,
              },
              id: `Test Retained Form Id`,
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
            },
          },
        },
      },
      sendState: `awaitingResponse`,
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

    output = applyPrompt(promptState, prompt);
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
                editableField: {
                  type: `integer`,
                  name: `Test Added Field`,
                  label: `Test Label`,
                  minimum: null,
                  maximum: null,
                  required: true,
                  value: 64.5,
                },
                id: `test-added-form-group--test-added-form--test-added-field`,
                parsed: 64.5,
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
        id: `Test Retained Form Group Id`,
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
            id: `Test Retained Form Id`,
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
                  value: 31.1,
                },
                id: `Test Reset Field Id`,
                parsed: 31.1,
                raw: `31.1`,
              },
            },
          },
        },
      },
    });
  });

  it(`resets the send state to null`, () => {
    expect(output.sendState).toBeNull();
  });

  it(`includes the channel's send callback`, () => {
    expect(output.channelSend).toBe(channelSend);
  });

  it(`does not send a message through the channel`, () => {
    expect(channelSend).not.toHaveBeenCalled();
  });
});
