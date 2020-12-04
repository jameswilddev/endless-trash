import { ActionDescriptor, h, text, VDOM } from "hyperapp-cjs";
import { formView } from ".";
import { PromptState } from "../prompt-state";
import { State } from "../state";

describe(`formView`, () => {
  describe(`when the prompt is in interactive mode`, () => {
    describe(`when the form has a submit button`, () => {
      describe(`when the form is valid`, () => {
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
            mode: `interactive`,
            channelSend,
          };

          output = formView(
            promptState,
            `Test Form Group Name`,
            `Test Form Name`
          );
        });

        it(`renders as expected`, () => {
          expect(output).toEqual(
            h(
              `form`,
              {
                class: [`valid`, `form`, `with-submit-button`],
                id: `test-form-id`,
              },
              [
                h(`div`, { class: `fields` }, [
                  h(
                    `h2`,
                    {
                      class: [`subtitle`, `field`],
                      id: `test-other-field-id`,
                    },
                    text(`Test Other Field Content`)
                  ),
                  h(
                    `div`,
                    {
                      class: [`valid`, `integer`, `field`],
                      id: `test-field-id`,
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
                        readonly: false,
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
                    disabled: false,
                  },
                  text(`Test Submit Button Label`)
                ),
              ]
            ) as VDOM<State>
          );
        });

        it(`does not send a message through the channel`, () => {
          expect(channelSend).not.toHaveBeenCalled();
        });
      });

      describe(`when the form is invalid`, () => {
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
                        raw: `2d4`,
                      },
                    },
                  },
                },
              },
            },
            mode: `interactive`,
            channelSend,
          };

          output = formView(
            promptState,
            `Test Form Group Name`,
            `Test Form Name`
          );
        });

        it(`renders as expected`, () => {
          expect(output).toEqual(
            h(
              `form`,
              {
                class: [`invalid`, `form`, `with-submit-button`],
                id: `test-form-id`,
              },
              [
                h(`div`, { class: `fields` }, [
                  h(
                    `h2`,
                    {
                      class: [`subtitle`, `field`],
                      id: `test-other-field-id`,
                    },
                    text(`Test Other Field Content`)
                  ),
                  h(
                    `div`,
                    {
                      class: [`invalid`, `integer`, `field`],
                      id: `test-field-id`,
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
                        value: `2d4`,
                        readonly: false,
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
            ) as VDOM<State>
          );
        });

        it(`does not send a message through the channel`, () => {
          expect(channelSend).not.toHaveBeenCalled();
        });
      });
    });

    describe(`when the form does not have a submit button`, () => {
      describe(`when the form is valid`, () => {
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
                      submitButtonLabel: null,
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
            mode: `interactive`,
            channelSend,
          };

          output = formView(
            promptState,
            `Test Form Group Name`,
            `Test Form Name`
          );
        });

        it(`renders as expected`, () => {
          expect(output).toEqual(
            h(
              `form`,
              {
                class: [`valid`, `form`, `without-submit-button`],
                id: `test-form-id`,
              },
              [
                h(`div`, { class: `fields` }, [
                  h(
                    `h2`,
                    {
                      class: [`subtitle`, `field`],
                      id: `test-other-field-id`,
                    },
                    text(`Test Other Field Content`)
                  ),
                  h(
                    `div`,
                    {
                      class: [`valid`, `integer`, `field`],
                      id: `test-field-id`,
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
              ]
            ) as VDOM<State>
          );
        });

        it(`does not send a message through the channel`, () => {
          expect(channelSend).not.toHaveBeenCalled();
        });
      });

      describe(`when the form is invalid`, () => {
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
                      submitButtonLabel: null,
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
                        raw: `2d4`,
                      },
                    },
                  },
                },
              },
            },
            mode: `interactive`,
            channelSend,
          };

          output = formView(
            promptState,
            `Test Form Group Name`,
            `Test Form Name`
          );
        });

        it(`renders as expected`, () => {
          expect(output).toEqual(
            h(
              `form`,
              {
                class: [`invalid`, `form`, `without-submit-button`],
                id: `test-form-id`,
              },
              [
                h(`div`, { class: `fields` }, [
                  h(
                    `h2`,
                    {
                      class: [`subtitle`, `field`],
                      id: `test-other-field-id`,
                    },
                    text(`Test Other Field Content`)
                  ),
                  h(
                    `div`,
                    {
                      class: [`invalid`, `integer`, `field`],
                      id: `test-field-id`,
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
                        value: `2d4`,
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
              ]
            ) as VDOM<State>
          );
        });

        it(`does not send a message through the channel`, () => {
          expect(channelSend).not.toHaveBeenCalled();
        });
      });
    });
  });

  describe(`when the prompt is being sent`, () => {
    describe(`when the form has a submit button`, () => {
      describe(`when the form is valid`, () => {
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
            mode: `beingSent`,
            channelSend,
          };

          output = formView(
            promptState,
            `Test Form Group Name`,
            `Test Form Name`
          );
        });

        it(`renders as expected`, () => {
          expect(output).toEqual(
            h(
              `form`,
              {
                class: [`valid`, `form`, `with-submit-button`],
                id: `test-form-id`,
              },
              [
                h(`div`, { class: `fields` }, [
                  h(
                    `h2`,
                    {
                      class: [`subtitle`, `field`],
                      id: `test-other-field-id`,
                    },
                    text(`Test Other Field Content`)
                  ),
                  h(
                    `div`,
                    {
                      class: [`valid`, `integer`, `field`],
                      id: `test-field-id`,
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
            ) as VDOM<State>
          );
        });

        it(`does not send a message through the channel`, () => {
          expect(channelSend).not.toHaveBeenCalled();
        });
      });

      describe(`when the form is invalid`, () => {
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
                        raw: `2d4`,
                      },
                    },
                  },
                },
              },
            },
            mode: `beingSent`,
            channelSend,
          };

          output = formView(
            promptState,
            `Test Form Group Name`,
            `Test Form Name`
          );
        });

        it(`renders as expected`, () => {
          expect(output).toEqual(
            h(
              `form`,
              {
                class: [`invalid`, `form`, `with-submit-button`],
                id: `test-form-id`,
              },
              [
                h(`div`, { class: `fields` }, [
                  h(
                    `h2`,
                    {
                      class: [`subtitle`, `field`],
                      id: `test-other-field-id`,
                    },
                    text(`Test Other Field Content`)
                  ),
                  h(
                    `div`,
                    {
                      class: [`invalid`, `integer`, `field`],
                      id: `test-field-id`,
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
                        value: `2d4`,
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
            ) as VDOM<State>
          );
        });

        it(`does not send a message through the channel`, () => {
          expect(channelSend).not.toHaveBeenCalled();
        });
      });
    });

    describe(`when the form does not have a submit button`, () => {
      describe(`when the form is valid`, () => {
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
                      submitButtonLabel: null,
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
            mode: `beingSent`,
            channelSend,
          };

          output = formView(
            promptState,
            `Test Form Group Name`,
            `Test Form Name`
          );
        });

        it(`renders as expected`, () => {
          expect(output).toEqual(
            h(
              `form`,
              {
                class: [`valid`, `form`, `without-submit-button`],
                id: `test-form-id`,
              },
              [
                h(`div`, { class: `fields` }, [
                  h(
                    `h2`,
                    {
                      class: [`subtitle`, `field`],
                      id: `test-other-field-id`,
                    },
                    text(`Test Other Field Content`)
                  ),
                  h(
                    `div`,
                    {
                      class: [`valid`, `integer`, `field`],
                      id: `test-field-id`,
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
              ]
            ) as VDOM<State>
          );
        });

        it(`does not send a message through the channel`, () => {
          expect(channelSend).not.toHaveBeenCalled();
        });
      });

      describe(`when the form is invalid`, () => {
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
                      submitButtonLabel: null,
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
                        raw: `2d4`,
                      },
                    },
                  },
                },
              },
            },
            mode: `beingSent`,
            channelSend,
          };

          output = formView(
            promptState,
            `Test Form Group Name`,
            `Test Form Name`
          );
        });

        it(`renders as expected`, () => {
          expect(output).toEqual(
            h(
              `form`,
              {
                class: [`invalid`, `form`, `without-submit-button`],
                id: `test-form-id`,
              },
              [
                h(`div`, { class: `fields` }, [
                  h(
                    `h2`,
                    {
                      class: [`subtitle`, `field`],
                      id: `test-other-field-id`,
                    },
                    text(`Test Other Field Content`)
                  ),
                  h(
                    `div`,
                    {
                      class: [`invalid`, `integer`, `field`],
                      id: `test-field-id`,
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
                        value: `2d4`,
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
              ]
            ) as VDOM<State>
          );
        });

        it(`does not send a message through the channel`, () => {
          expect(channelSend).not.toHaveBeenCalled();
        });
      });
    });
  });

  describe(`when a response to the prompt is being awaited`, () => {
    describe(`when the form has a submit button`, () => {
      describe(`when the form is valid`, () => {
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

          output = formView(
            promptState,
            `Test Form Group Name`,
            `Test Form Name`
          );
        });

        it(`renders as expected`, () => {
          expect(output).toEqual(
            h(
              `form`,
              {
                class: [`valid`, `form`, `with-submit-button`],
                id: `test-form-id`,
              },
              [
                h(`div`, { class: `fields` }, [
                  h(
                    `h2`,
                    {
                      class: [`subtitle`, `field`],
                      id: `test-other-field-id`,
                    },
                    text(`Test Other Field Content`)
                  ),
                  h(
                    `div`,
                    {
                      class: [`valid`, `integer`, `field`],
                      id: `test-field-id`,
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
            ) as VDOM<State>
          );
        });

        it(`does not send a message through the channel`, () => {
          expect(channelSend).not.toHaveBeenCalled();
        });
      });

      describe(`when the form is invalid`, () => {
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
                        raw: `2d4`,
                      },
                    },
                  },
                },
              },
            },
            mode: `awaitingResponse`,
            channelSend,
          };

          output = formView(
            promptState,
            `Test Form Group Name`,
            `Test Form Name`
          );
        });

        it(`renders as expected`, () => {
          expect(output).toEqual(
            h(
              `form`,
              {
                class: [`invalid`, `form`, `with-submit-button`],
                id: `test-form-id`,
              },
              [
                h(`div`, { class: `fields` }, [
                  h(
                    `h2`,
                    {
                      class: [`subtitle`, `field`],
                      id: `test-other-field-id`,
                    },
                    text(`Test Other Field Content`)
                  ),
                  h(
                    `div`,
                    {
                      class: [`invalid`, `integer`, `field`],
                      id: `test-field-id`,
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
                        value: `2d4`,
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
            ) as VDOM<State>
          );
        });

        it(`does not send a message through the channel`, () => {
          expect(channelSend).not.toHaveBeenCalled();
        });
      });
    });

    describe(`when the form does not have a submit button`, () => {
      describe(`when the form is valid`, () => {
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
                      submitButtonLabel: null,
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

          output = formView(
            promptState,
            `Test Form Group Name`,
            `Test Form Name`
          );
        });

        it(`renders as expected`, () => {
          expect(output).toEqual(
            h(
              `form`,
              {
                class: [`valid`, `form`, `without-submit-button`],
                id: `test-form-id`,
              },
              [
                h(`div`, { class: `fields` }, [
                  h(
                    `h2`,
                    {
                      class: [`subtitle`, `field`],
                      id: `test-other-field-id`,
                    },
                    text(`Test Other Field Content`)
                  ),
                  h(
                    `div`,
                    {
                      class: [`valid`, `integer`, `field`],
                      id: `test-field-id`,
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
              ]
            ) as VDOM<State>
          );
        });

        it(`does not send a message through the channel`, () => {
          expect(channelSend).not.toHaveBeenCalled();
        });
      });

      describe(`when the form is invalid`, () => {
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
                      submitButtonLabel: null,
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
                        raw: `2d4`,
                      },
                    },
                  },
                },
              },
            },
            mode: `awaitingResponse`,
            channelSend,
          };

          output = formView(
            promptState,
            `Test Form Group Name`,
            `Test Form Name`
          );
        });

        it(`renders as expected`, () => {
          expect(output).toEqual(
            h(
              `form`,
              {
                class: [`invalid`, `form`, `without-submit-button`],
                id: `test-form-id`,
              },
              [
                h(`div`, { class: `fields` }, [
                  h(
                    `h2`,
                    {
                      class: [`subtitle`, `field`],
                      id: `test-other-field-id`,
                    },
                    text(`Test Other Field Content`)
                  ),
                  h(
                    `div`,
                    {
                      class: [`invalid`, `integer`, `field`],
                      id: `test-field-id`,
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
                        value: `2d4`,
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
              ]
            ) as VDOM<State>
          );
        });

        it(`does not send a message through the channel`, () => {
          expect(channelSend).not.toHaveBeenCalled();
        });
      });
    });
  });
});
