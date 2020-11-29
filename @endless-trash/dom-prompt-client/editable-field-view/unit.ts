import { h, text, VDOM } from "hyperapp-cjs";
import { editableFieldView } from ".";
import { PromptState } from "../prompt-state";
import { State } from "../state";

describe(`editableFieldView`, () => {
  describe(`when the prompt is in interactive mode`, () => {
    describe(`when the form has a submit button`, () => {
      describe(`when the raw value is not parseable`, () => {
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
                        raw: `Test Non-Parseable`,
                      },
                    },
                  },
                },
              },
            },
            mode: `interactive`,
            channelSend,
          };

          output = editableFieldView(
            promptState,
            `Test Form Group Name`,
            `Test Form Name`,
            `Test Field Name`
          );
        });

        it(`renders as expected`, () => {
          expect(output).toEqual(
            h(
              `div`,
              { class: [`invalid`, `integer`, `field`], id: `test-field-id` },
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
                  value: `Test Non-Parseable`,
                  readonly: false,
                }),
              ]
            ) as VDOM<State>
          );
        });

        it(`does not send a message through the channel`, () => {
          expect(channelSend).not.toHaveBeenCalled();
        });
      });

      describe(`when the raw value is parseable, but invalid`, () => {
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
                        raw: `11`,
                      },
                    },
                  },
                },
              },
            },
            mode: `interactive`,
            channelSend,
          };

          output = editableFieldView(
            promptState,
            `Test Form Group Name`,
            `Test Form Name`,
            `Test Field Name`
          );
        });

        it(`renders as expected`, () => {
          expect(output).toEqual(
            h(
              `div`,
              { class: [`invalid`, `integer`, `field`], id: `test-field-id` },
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
                  value: `11`,
                  readonly: false,
                }),
              ]
            ) as VDOM<State>
          );
        });

        it(`does not send a message through the channel`, () => {
          expect(channelSend).not.toHaveBeenCalled();
        });
      });

      describe(`when the value is valid`, () => {
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

          output = editableFieldView(
            promptState,
            `Test Form Group Name`,
            `Test Form Name`,
            `Test Field Name`
          );
        });

        it(`renders as expected`, () => {
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
                }),
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
      describe(`when the raw value is not parseable`, () => {
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
                        raw: `Test Non-Parseable`,
                      },
                    },
                  },
                },
              },
            },
            mode: `interactive`,
            channelSend,
          };

          output = editableFieldView(
            promptState,
            `Test Form Group Name`,
            `Test Form Name`,
            `Test Field Name`
          );
        });

        it(`renders as expected`, () => {
          expect(output).toEqual(
            h(
              `div`,
              { class: [`invalid`, `integer`, `field`], id: `test-field-id` },
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
                  value: `Test Non-Parseable`,
                  readonly: true,
                }),
              ]
            ) as VDOM<State>
          );
        });

        it(`does not send a message through the channel`, () => {
          expect(channelSend).not.toHaveBeenCalled();
        });
      });

      describe(`when the raw value is parseable, but invalid`, () => {
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
                        raw: `11`,
                      },
                    },
                  },
                },
              },
            },
            mode: `interactive`,
            channelSend,
          };

          output = editableFieldView(
            promptState,
            `Test Form Group Name`,
            `Test Form Name`,
            `Test Field Name`
          );
        });

        it(`renders as expected`, () => {
          expect(output).toEqual(
            h(
              `div`,
              { class: [`invalid`, `integer`, `field`], id: `test-field-id` },
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
                  value: `11`,
                  readonly: true,
                }),
              ]
            ) as VDOM<State>
          );
        });

        it(`does not send a message through the channel`, () => {
          expect(channelSend).not.toHaveBeenCalled();
        });
      });

      describe(`when the value is valid`, () => {
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

          output = editableFieldView(
            promptState,
            `Test Form Group Name`,
            `Test Form Name`,
            `Test Field Name`
          );
        });

        it(`renders as expected`, () => {
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
                  readonly: true,
                }),
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
      describe(`when the raw value is not parseable`, () => {
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
                        raw: `Test Non-Parseable`,
                      },
                    },
                  },
                },
              },
            },
            mode: `beingSent`,
            channelSend,
          };

          output = editableFieldView(
            promptState,
            `Test Form Group Name`,
            `Test Form Name`,
            `Test Field Name`
          );
        });

        it(`renders as expected`, () => {
          expect(output).toEqual(
            h(
              `div`,
              { class: [`invalid`, `integer`, `field`], id: `test-field-id` },
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
                  value: `Test Non-Parseable`,
                  readonly: true,
                }),
              ]
            ) as VDOM<State>
          );
        });

        it(`does not send a message through the channel`, () => {
          expect(channelSend).not.toHaveBeenCalled();
        });
      });

      describe(`when the raw value is parseable, but invalid`, () => {
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
                        raw: `11`,
                      },
                    },
                  },
                },
              },
            },
            mode: `beingSent`,
            channelSend,
          };

          output = editableFieldView(
            promptState,
            `Test Form Group Name`,
            `Test Form Name`,
            `Test Field Name`
          );
        });

        it(`renders as expected`, () => {
          expect(output).toEqual(
            h(
              `div`,
              { class: [`invalid`, `integer`, `field`], id: `test-field-id` },
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
                  value: `11`,
                  readonly: true,
                }),
              ]
            ) as VDOM<State>
          );
        });

        it(`does not send a message through the channel`, () => {
          expect(channelSend).not.toHaveBeenCalled();
        });
      });

      describe(`when the value is valid`, () => {
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
            mode: `beingSent`,
            channelSend,
          };

          output = editableFieldView(
            promptState,
            `Test Form Group Name`,
            `Test Form Name`,
            `Test Field Name`
          );
        });

        it(`renders as expected`, () => {
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
                  readonly: true,
                }),
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
      describe(`when the raw value is not parseable`, () => {
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
                        raw: `Test Non-Parseable`,
                      },
                    },
                  },
                },
              },
            },
            mode: `beingSent`,
            channelSend,
          };

          output = editableFieldView(
            promptState,
            `Test Form Group Name`,
            `Test Form Name`,
            `Test Field Name`
          );
        });

        it(`renders as expected`, () => {
          expect(output).toEqual(
            h(
              `div`,
              { class: [`invalid`, `integer`, `field`], id: `test-field-id` },
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
                  value: `Test Non-Parseable`,
                  readonly: true,
                }),
              ]
            ) as VDOM<State>
          );
        });

        it(`does not send a message through the channel`, () => {
          expect(channelSend).not.toHaveBeenCalled();
        });
      });

      describe(`when the raw value is parseable, but invalid`, () => {
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
                        raw: `11`,
                      },
                    },
                  },
                },
              },
            },
            mode: `beingSent`,
            channelSend,
          };

          output = editableFieldView(
            promptState,
            `Test Form Group Name`,
            `Test Form Name`,
            `Test Field Name`
          );
        });

        it(`renders as expected`, () => {
          expect(output).toEqual(
            h(
              `div`,
              { class: [`invalid`, `integer`, `field`], id: `test-field-id` },
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
                  value: `11`,
                  readonly: true,
                }),
              ]
            ) as VDOM<State>
          );
        });

        it(`does not send a message through the channel`, () => {
          expect(channelSend).not.toHaveBeenCalled();
        });
      });

      describe(`when the value is valid`, () => {
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
            mode: `beingSent`,
            channelSend,
          };

          output = editableFieldView(
            promptState,
            `Test Form Group Name`,
            `Test Form Name`,
            `Test Field Name`
          );
        });

        it(`renders as expected`, () => {
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
                  readonly: true,
                }),
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
      describe(`when the raw value is not parseable`, () => {
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
                        raw: `Test Non-Parseable`,
                      },
                    },
                  },
                },
              },
            },
            mode: `awaitingResponse`,
            channelSend,
          };

          output = editableFieldView(
            promptState,
            `Test Form Group Name`,
            `Test Form Name`,
            `Test Field Name`
          );
        });

        it(`renders as expected`, () => {
          expect(output).toEqual(
            h(
              `div`,
              { class: [`invalid`, `integer`, `field`], id: `test-field-id` },
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
                  value: `Test Non-Parseable`,
                  readonly: true,
                }),
              ]
            ) as VDOM<State>
          );
        });

        it(`does not send a message through the channel`, () => {
          expect(channelSend).not.toHaveBeenCalled();
        });
      });

      describe(`when the raw value is parseable, but invalid`, () => {
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
                        raw: `11`,
                      },
                    },
                  },
                },
              },
            },
            mode: `awaitingResponse`,
            channelSend,
          };

          output = editableFieldView(
            promptState,
            `Test Form Group Name`,
            `Test Form Name`,
            `Test Field Name`
          );
        });

        it(`renders as expected`, () => {
          expect(output).toEqual(
            h(
              `div`,
              { class: [`invalid`, `integer`, `field`], id: `test-field-id` },
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
                  value: `11`,
                  readonly: true,
                }),
              ]
            ) as VDOM<State>
          );
        });

        it(`does not send a message through the channel`, () => {
          expect(channelSend).not.toHaveBeenCalled();
        });
      });

      describe(`when the value is valid`, () => {
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
            mode: `awaitingResponse`,
            channelSend,
          };

          output = editableFieldView(
            promptState,
            `Test Form Group Name`,
            `Test Form Name`,
            `Test Field Name`
          );
        });

        it(`renders as expected`, () => {
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
                  readonly: true,
                }),
              ]
            ) as VDOM<State>
          );
        });

        it(`does not send a message through the channel`, () => {
          expect(channelSend).not.toHaveBeenCalled();
        });
      });
    });

    describe(`when the form does not have submit button`, () => {
      describe(`when the raw value is not parseable`, () => {
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
                        raw: `Test Non-Parseable`,
                      },
                    },
                  },
                },
              },
            },
            mode: `awaitingResponse`,
            channelSend,
          };

          output = editableFieldView(
            promptState,
            `Test Form Group Name`,
            `Test Form Name`,
            `Test Field Name`
          );
        });

        it(`renders as expected`, () => {
          expect(output).toEqual(
            h(
              `div`,
              { class: [`invalid`, `integer`, `field`], id: `test-field-id` },
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
                  value: `Test Non-Parseable`,
                  readonly: true,
                }),
              ]
            ) as VDOM<State>
          );
        });

        it(`does not send a message through the channel`, () => {
          expect(channelSend).not.toHaveBeenCalled();
        });
      });

      describe(`when the raw value is parseable, but invalid`, () => {
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
                        raw: `11`,
                      },
                    },
                  },
                },
              },
            },
            mode: `awaitingResponse`,
            channelSend,
          };

          output = editableFieldView(
            promptState,
            `Test Form Group Name`,
            `Test Form Name`,
            `Test Field Name`
          );
        });

        it(`renders as expected`, () => {
          expect(output).toEqual(
            h(
              `div`,
              { class: [`invalid`, `integer`, `field`], id: `test-field-id` },
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
                  value: `11`,
                  readonly: true,
                }),
              ]
            ) as VDOM<State>
          );
        });

        it(`does not send a message through the channel`, () => {
          expect(channelSend).not.toHaveBeenCalled();
        });
      });

      describe(`when the value is valid`, () => {
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
            mode: `awaitingResponse`,
            channelSend,
          };

          output = editableFieldView(
            promptState,
            `Test Form Group Name`,
            `Test Form Name`,
            `Test Field Name`
          );
        });

        it(`renders as expected`, () => {
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
                  readonly: true,
                }),
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
