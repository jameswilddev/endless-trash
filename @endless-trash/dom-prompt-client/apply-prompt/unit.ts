import { Prompt } from "@endless-trash/prompt";
import { applyPrompt } from ".";
import { PromptState } from "../prompt-state";

describe(`applyPrompt`, () => {
  let output: PromptState;

  beforeAll(() => {
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
          forms: {
            "Test Removed Form": {
              form: {
                name: `Test Removed Form`,
                fields: [],
                submitButtonLabel: `Test Removed Form`,
              },
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
          forms: {
            "Test Retained Form": {
              form: {
                name: `Test Retained Form`,
                fields: [],
                submitButtonLabel: `Test Previous Retained Form`,
              },
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
                  parsed: 82.4,
                  raw: `Test Reset Raw`,
                },
              },
            },
          },
        },
      },
      send: `awaitingResponse`,
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
                parsed: 31.1,
                raw: `31.1`,
              },
            },
          },
        },
      },
    });
  });

  it(`resets send to null`, () => {
    expect(output.send).toBeNull();
  });
});
