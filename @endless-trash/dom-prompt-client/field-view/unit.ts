import { ActionDescriptor, h, text, VDOM } from "hyperapp-cjs";
import { PromptState } from "../prompt-state";
import { State } from "../state";
import { fieldView } from ".";

describe(`fieldView`, () => {
  describe(`text`, () => {
    let channelSend: jasmine.Spy;
    let output: VDOM<State>;

    beforeAll(() => {
      channelSend = jasmine.createSpy(`channelSend`);

      const promptState: PromptState = {
        type: `prompt`,
        prompt: {
          formGroups: [],
        },
        formGroups: {
          "Test Other Form Group Name": {
            formGroup: { name: `Test Other Form Group Name`, forms: [] },
            id: `test-other-form-group-id`,
            forms: {},
          },
          "Test Form Group Name": {
            formGroup: { name: `Test Form Group Name`, forms: [] },
            id: `test-form-group-id`,
            forms: {
              "Test Other Form Name": {
                form: {
                  name: `Test Other Form Name`,
                  submitButtonLabel: `Test Other Submit Button Label`,
                  fields: [],
                },
                id: `test-other-form-id`,
                fields: {},
              },
              "Test Form Name": {
                form: {
                  name: `Test Form Name`,
                  submitButtonLabel: `Test Submit Button Label`,
                  fields: [],
                },
                id: `test-form-id`,
                fields: {
                  "Test Other Field Name": {
                    type: `text`,
                    id: `test-other-field-id`,
                    field: {
                      name: `Test Other Field Name`,
                      type: `string`,
                      label: `Test Other Label`,
                      value: `Test Other Value`,
                      minimumLength: null,
                      maximumLength: null,
                    },
                    raw: `Test Other Raw`,
                  },
                  "Test Field Name": {
                    type: `text`,
                    id: `test-field-id`,
                    field: {
                      name: `Test Field Name`,
                      type: `integer`,
                      label: `Test Label`,
                      value: 19,
                      minimum: [14, `inclusive`],
                      maximum: [27, `exclusive`],
                      required: true,
                    },
                    raw: `24`,
                  },
                },
              },
            },
          },
        },
        mode: `interactive`,
        channelSend,
      };

      output = fieldView(
        promptState,
        `Test Form Group Name`,
        `Test Form Name`,
        `Test Field Name`
      );
    });

    it(`defers to testFieldView`, () => {
      expect(output).toEqual(
        h(
          `div`,
          { class: [`valid`, `integer`, `field`], id: `test-field-id` },
          [
            h(`label`, { for: `test-field-id--input` }, text(`Test Label`)),
            h(`input`, {
              type: `number`,
              id: `test-field-id--input`,
              name: `test-field-id`,
              required: true,
              step: 1,
              min: 14,
              max: 27,
              value: `24`,
              readonly: false,
              oninput: (jasmine.any(Function) as unknown) as ActionDescriptor<
                State,
                Event
              >,
              onblur: (jasmine.any(Function) as unknown) as ActionDescriptor<
                State,
                FocusEvent
              >,
            }),
          ]
        ) as VDOM<State>
      );
    });

    it(`does not send a message through the channel`, () => {
      expect(channelSend).not.toHaveBeenCalled();
    });
  });

  describe(`static`, () => {
    let channelSend: jasmine.Spy;
    let output: VDOM<State>;

    beforeAll(() => {
      channelSend = jasmine.createSpy(`channelSend`);

      const promptState: PromptState = {
        type: `prompt`,
        prompt: {
          formGroups: [],
        },
        formGroups: {
          "Test Other Form Group Name": {
            formGroup: { name: `Test Other Form Group Name`, forms: [] },
            id: `test-other-form-group-id`,
            forms: {},
          },
          "Test Form Group Name": {
            formGroup: { name: `Test Form Group Name`, forms: [] },
            id: `test-form-group-id`,
            forms: {
              "Test Other Form Name": {
                form: {
                  name: `Test Other Form Name`,
                  submitButtonLabel: `Test Other Submit Button Label`,
                  fields: [],
                },
                id: `test-other-form-id`,
                fields: {},
              },
              "Test Form Name": {
                form: {
                  name: `Test Form Name`,
                  submitButtonLabel: `Test Submit Button Label`,
                  fields: [],
                },
                id: `test-form-id`,
                fields: {
                  "Test Other Field Name": {
                    type: `text`,
                    id: `test-other-field-id`,
                    field: {
                      name: `Test Other Field Name`,
                      type: `string`,
                      label: `Test Other Label`,
                      value: `Test Other Value`,
                      minimumLength: null,
                      maximumLength: null,
                    },
                    raw: `Test Other Raw`,
                  },
                  "Test Field Name": {
                    type: `static`,
                    id: `Test Id`,
                    field: {
                      type: `subtitle`,
                      content: `Test Content`,
                      name: `Test Name`,
                    },
                  },
                },
              },
            },
          },
        },
        mode: `interactive`,
        channelSend,
      };

      output = fieldView(
        promptState,
        `Test Form Group Name`,
        `Test Form Name`,
        `Test Field Name`
      );
    });

    it(`defers to staticFieldView`, () => {
      expect(output).toEqual(
        h(
          `h2`,
          {
            class: [`subtitle`, `field`],
            id: `Test Id`,
          },
          text(`Test Content`)
        ) as VDOM<State>
      );
    });

    it(`does not send a message through the channel`, () => {
      expect(channelSend).not.toHaveBeenCalled();
    });
  });
});
