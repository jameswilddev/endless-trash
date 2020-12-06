import { JsonObject } from "@endless-trash/immutable-json-type";
import { Action, EffectfulState, State } from "hyperapp-cjs";
import { applyMessage } from ".";
import { State as DomPromptClientState } from "../state";

describe(`applyMessage`, () => {
  describe(`error`, () => {
    let output:
      | State<DomPromptClientState>
      | EffectfulState<DomPromptClientState>
      | Action<DomPromptClientState>;

    beforeAll(() => {
      output = applyMessage(
        {
          type: `error`,
          error: `Test Error`,
        },
        `Test New Content`
      );
    });

    it(`returns the error state, unmodified`, () => {
      expect(output as State<DomPromptClientState>).toEqual({
        type: `error`,
        error: `Test Error`,
      });
    });
  });

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
          metadata: { testMetadataKey: `Test Metadata Value` },
        },
        `Test New Content`
      );
    });

    it(`returns the new message state`, () => {
      expect(output as State<DomPromptClientState>).toEqual({
        type: `message`,
        content: `Test New Content`,
        metadata: { testMetadataKey: `Test Metadata Value` } as JsonObject,
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
          metadata: { testMetadataKey: `Test Metadata Value` },
        },
        `Test New Content`
      );
    });

    it(`returns the new message state`, () => {
      expect(output as State<DomPromptClientState>).toEqual({
        type: `message`,
        content: `Test New Content`,
        metadata: { testMetadataKey: `Test Metadata Value` } as JsonObject,
      });
    });

    it(`does not send a message through the channel`, () => {
      expect(channelSend).not.toHaveBeenCalled();
    });
  });
});
