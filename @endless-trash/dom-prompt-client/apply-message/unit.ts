import { Action, EffectfulState, State } from "hyperapp-cjs";
import { applyMessage } from ".";
import { State as DomPromptClientState } from "../state";

describe(`applyMessage`, () => {
  describe(`message`, () => {
    let output:
      | State<DomPromptClientState>
      | EffectfulState<DomPromptClientState>
      | Action<DomPromptClientState>;

    beforeAll(() => {
      output = applyMessage(
        {
          type: `message`,
          content: `Test Previous Content`,
        },
        `Test New Content`
      );
    });

    it(`returns the new message state`, () => {
      expect(output as State<DomPromptClientState>).toEqual({
        type: `message`,
        content: `Test New Content`,
      });
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

      output = applyMessage(
        {
          type: `prompt`,
          prompt: {
            formGroups: [],
          },
          formGroups: {},
          mode: `interactive`,
          channelSend,
        },
        `Test New Content`
      );
    });

    it(`returns the new message state`, () => {
      expect(output as State<DomPromptClientState>).toEqual({
        type: `message`,
        content: `Test New Content`,
      });
    });

    it(`does not send a message through the channel`, () => {
      expect(channelSend).not.toHaveBeenCalled();
    });
  });
});
