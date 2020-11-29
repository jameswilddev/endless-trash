import { Action, ActionDescriptor, EffectfulState, State } from "hyperapp-cjs";
import { applyError } from ".";
import { applyMessage } from "../apply-message";
import { State as DomPromptClientState } from "../state";

describe(`applyError`, () => {
  describe(`message`, () => {
    let output:
      | State<DomPromptClientState>
      | EffectfulState<DomPromptClientState>
      | Action<DomPromptClientState>;

    beforeAll(() => {
      output = applyError(
        {
          type: `message`,
          content: `Test Previous Content`,
        },
        new Error(`Test New Error`)
      );
    });

    it(`returns the new message state`, () => {
      expect(output as ActionDescriptor<DomPromptClientState, string>).toEqual([
        applyMessage,
        `A communication error has occurred:\n\nError: Test New Error\n\nPlease refresh to reconnect.`,
      ]);
    });
  });

  describe(`prompt`, () => {
    let channelSend: jasmine.Spy;
    let output:
      | State<DomPromptClientState>
      | EffectfulState<DomPromptClientState>
      | Action<DomPromptClientState>;

    beforeAll(() => {
      channelSend = jasmine.createSpy(`channelSend`);

      output = applyError(
        {
          type: `prompt`,
          prompt: {
            formGroups: [],
          },
          formGroups: {},
          mode: `interactive`,
          channelSend,
        },
        new Error(`Test New Error`)
      );
    });

    it(`returns the new message state`, () => {
      expect(output as ActionDescriptor<DomPromptClientState, string>).toEqual([
        applyMessage,
        `A communication error has occurred:\n\nError: Test New Error\n\nPlease refresh to reconnect.`,
      ]);
    });

    it(`does not send a message through the channel`, () => {
      expect(channelSend).not.toHaveBeenCalled();
    });
  });
});
