import { ActionDescriptor, h, text, VDOM } from "hyperapp-cjs";
import { formGroupView } from ".";
import { PromptState } from "../prompt-state";
import { State } from "../state";

describe(`formGroupView`, () => {
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
          formGroup: {
            name: `Test Form Group Name`,
            forms: [
              {
                name: `Test Other Form Name`,
                submitButtonLabel: `Test Other Submit Button Label`,
                fields: [],
              },
              {
                name: `Test Form Name`,
                submitButtonLabel: `Test Submit Button Label`,
                fields: [
                  {
                    name: `Test Other Field Name`,
                    type: `subtitle`,
                    content: `Test Other Value`,
                  },
                  {
                    name: `Test Field Name`,
                    type: `integer`,
                    label: `Test Label`,
                    value: 19,
                    minimum: [14, `inclusive`],
                    maximum: [27, `exclusive`],
                    required: true,
                  },
                ],
              },
            ],
          },
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
                fields: [
                  {
                    name: `Test Other Field Name`,
                    type: `subtitle`,
                    content: `Test Other Value`,
                  },
                  {
                    name: `Test Field Name`,
                    type: `integer`,
                    label: `Test Label`,
                    value: 19,
                    minimum: [14, `inclusive`],
                    maximum: [27, `exclusive`],
                    required: true,
                  },
                ],
              },
              id: `test-form-id`,
              fields: {
                "Test Other Field Name": {
                  type: `static`,
                  id: `test-other-field-id`,
                  field: {
                    name: `Test Other Field Name`,
                    type: `subtitle`,
                    content: `Test Other Field Content`,
                  },
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
      mode: `awaitingResponse`,
      channelSend,
    };

    output = formGroupView(promptState, `Test Form Group Name`);
  });

  it(`renders the expected DOM`, () => {
    expect(output).toEqual(
      h(
        `div`,
        {
          class: `form-group`,
          id: `test-form-group-id`,
          key: `test-form-group-id`,
        },
        h(`div`, { class: `forms` }, [
          h(
            `form`,
            {
              class: [`valid`, `form`, `with-submit-button`],
              id: `test-other-form-id`,
              key: `test-other-form-id`,
              onsubmit: undefined,
            },
            [
              h(`div`, { class: `fields` }, []),
              h(
                `button`,
                {
                  type: `submit`,
                  class: `submit-button`,
                  disabled: true,
                },
                text(`Test Other Submit Button Label`)
              ),
            ]
          ),
          h(
            `form`,
            {
              class: [`valid`, `form`, `with-submit-button`],
              id: `test-form-id`,
              key: `test-form-id`,
              onsubmit: undefined,
            },
            [
              h(`div`, { class: `fields` }, [
                h(
                  `h2`,
                  {
                    class: [`subtitle`, `field`],
                    id: `test-other-field-id`,
                    key: `test-other-field-id`,
                  },
                  text(`Test Other Field Content`)
                ),
                h(
                  `div`,
                  {
                    class: [`valid`, `integer`, `field`],
                    id: `test-field-id`,
                    key: `test-field-id`,
                  },
                  [
                    h(
                      `label`,
                      { for: `test-field-id--input` },
                      text(`Test Label`)
                    ),
                    h(`input`, {
                      type: `number`,
                      id: `test-field-id--input`,
                      name: `test-field-id`,
                      required: true,
                      step: 1,
                      min: 14,
                      max: 27,
                      value: `24`,
                      readonly: true,
                      oninput: (jasmine.any(
                        Function
                      ) as unknown) as ActionDescriptor<State, Event>,
                      onblur: (jasmine.any(
                        Function
                      ) as unknown) as ActionDescriptor<State, FocusEvent>,
                    }),
                  ]
                ),
              ]),
              h(
                `button`,
                {
                  type: `submit`,
                  class: `submit-button`,
                  disabled: true,
                },
                text(`Test Submit Button Label`)
              ),
            ]
          ),
        ])
      ) as VDOM<State>
    );
  });

  it(`does not send a message through the channel`, () => {
    expect(channelSend).not.toHaveBeenCalled();
  });
});
