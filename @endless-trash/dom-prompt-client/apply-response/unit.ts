import { Prompt } from "@endless-trash/prompt";
import { Action, ActionDescriptor, EffectfulState, State } from "hyperapp-cjs";
import { applyResponse } from ".";
import { applyMessage } from "../apply-message";
import { applyPrompt } from "../apply-prompt";
import { ApplyPromptProps } from "../apply-prompt-props";
import { State as DomPromptClientState } from "../state";

describe(`applyResponse`, () => {
  describe(`when a message is being shown`, () => {
    describe(`when the response appears to be a prompt`, () => {
      let channelSend: jasmine.Spy;

      let output:
        | State<DomPromptClientState>
        | EffectfulState<DomPromptClientState>
        | Action<DomPromptClientState>;

      beforeAll(() => {
        channelSend = jasmine.createSpy(`channelSend`);

        output = applyResponse(
          {
            type: `message`,
            content: `Test Previous Content`,
            metadata: { testMetadataKey: `Test Metadata Value` },
          },
          {
            response: {
              formGroups: [],
            },
            channelSend,
          }
        );
      });

      it(`returns an action descriptor for applying the prompt`, () => {
        expect(
          output as ActionDescriptor<DomPromptClientState, ApplyPromptProps>
        ).toEqual([
          applyPrompt,
          {
            prompt: {
              formGroups: [],
            },
            channelSend,
          },
        ]);
      });

      it(`does not send a message through the channel`, () => {
        expect(channelSend).not.toHaveBeenCalled();
      });
    });

    describe(`when the response does not appear to be a prompt`, () => {
      let channelSend: jasmine.Spy;

      let output:
        | State<DomPromptClientState>
        | EffectfulState<DomPromptClientState>
        | Action<DomPromptClientState>;

      beforeAll(() => {
        channelSend = jasmine.createSpy(`channelSend`);

        output = applyResponse(
          {
            type: `message`,
            content: `Test Previous Content`,
            metadata: { testMetadataKey: `Test Metadata Value` },
          },
          {
            response: ({
              something: {
                which: {
                  is: {
                    not: {
                      a: `prompt`,
                    },
                  },
                },
              },
            } as unknown) as Prompt,
            channelSend,
          }
        );
      });

      it(`returns an action descriptor for applying an error message`, () => {
        expect(
          output as ActionDescriptor<DomPromptClientState, string>
        ).toEqual([
          applyMessage,
          `An unexpected response was received:\n\n{\n  "something": {\n    "which": {\n      "is": {\n        "not": {\n          "a": "prompt"\n        }\n      }\n    }\n  }\n}\n\nPlease refresh to reconnect.`,
        ]);
      });

      it(`does not send a message through the channel`, () => {
        expect(channelSend).not.toHaveBeenCalled();
      });
    });
  });

  describe(`when a prompt is being shown`, () => {
    describe(`when the response appears to be a prompt`, () => {
      let channelSend: jasmine.Spy;

      let output:
        | State<DomPromptClientState>
        | EffectfulState<DomPromptClientState>
        | Action<DomPromptClientState>;

      beforeAll(() => {
        channelSend = jasmine.createSpy(`channelSend`);

        output = applyResponse(
          {
            type: `message`,
            content: `Test Previous Content`,
            metadata: { testMetadataKey: `Test Metadata Value` },
          },
          {
            response: {
              formGroups: [],
            },
            channelSend,
          }
        );
      });

      it(`returns an action descriptor for applying the prompt`, () => {
        expect(
          output as ActionDescriptor<DomPromptClientState, ApplyPromptProps>
        ).toEqual([
          applyPrompt,
          {
            prompt: {
              formGroups: [],
            },
            channelSend,
          },
        ]);
      });

      it(`does not send a message through the channel`, () => {
        expect(channelSend).not.toHaveBeenCalled();
      });
    });

    describe(`when the response does not appear to be a prompt`, () => {
      let channelSend: jasmine.Spy;

      let output:
        | State<DomPromptClientState>
        | EffectfulState<DomPromptClientState>
        | Action<DomPromptClientState>;

      beforeAll(() => {
        channelSend = jasmine.createSpy(`channelSend`);

        output = applyResponse(
          {
            type: `message`,
            content: `Test Previous Content`,
            metadata: { testMetadataKey: `Test Metadata Value` },
          },
          {
            response: ({
              something: {
                which: {
                  is: {
                    not: {
                      a: `prompt`,
                    },
                  },
                },
              },
            } as unknown) as Prompt,
            channelSend,
          }
        );
      });

      it(`returns an action descriptor for applying an error message`, () => {
        expect(
          output as ActionDescriptor<DomPromptClientState, string>
        ).toEqual([
          applyMessage,
          `An unexpected response was received:\n\n{\n  "something": {\n    "which": {\n      "is": {\n        "not": {\n          "a": "prompt"\n        }\n      }\n    }\n  }\n}\n\nPlease refresh to reconnect.`,
        ]);
      });

      it(`does not send a message through the channel`, () => {
        expect(channelSend).not.toHaveBeenCalled();
      });
    });
  });
});
