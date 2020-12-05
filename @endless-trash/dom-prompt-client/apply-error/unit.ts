import { Action, EffectfulState, State } from "hyperapp-cjs";
import { applyError } from ".";
import { State as DomPromptClientState } from "../state";

describe(`applyError`, () => {
  describe(`error`, () => {
    let output:
      | State<DomPromptClientState>
      | EffectfulState<DomPromptClientState>
      | Action<DomPromptClientState>;

    beforeAll(() => {
      output = applyError(
        {
          type: `error`,
          error: new Error(`Test Previous Error`),
        },
        new Error(`Test New Error`)
      );
    });

    it(`returns the new message state`, () => {
      expect(output as State<DomPromptClientState>).toEqual({
        type: `error`,
        error: new Error(`Test New Error`),
      });
    });
  });

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
      expect(output as State<DomPromptClientState>).toEqual({
        type: `error`,
        error: new Error(`Test New Error`),
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
      expect(output as State<DomPromptClientState>).toEqual({
        type: `error`,
        error: new Error(`Test New Error`),
      });
    });

    it(`does not send a message through the channel`, () => {
      expect(channelSend).not.toHaveBeenCalled();
    });
  });
});
