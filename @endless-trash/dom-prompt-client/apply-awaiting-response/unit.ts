import { JsonObject } from "@endless-trash/immutable-json-type";
import { applyAwaitingResponse } from ".";
import { State } from "../state";

describe(`applyAwaitingResponse`, () => {
  describe(`error`, () => {
    let output: State;

    beforeAll(() => {
      output = applyAwaitingResponse({
        type: `error`,
        error: `Test Error`,
      });
    });

    it(`returns the unmodified state`, () => {
      expect(output).toEqual({
        type: `error`,
        error: `Test Error`,
      });
    });
  });

  describe(`message`, () => {
    let output: State;

    beforeAll(() => {
      output = applyAwaitingResponse({
        type: `message`,
        content: `Test Content`,
        metadata: { testMetadataKey: `Test Metadata Value` },
      });
    });

    it(`returns the unmodified state`, () => {
      expect(output).toEqual({
        type: `message`,
        content: `Test Content`,
        metadata: { testMetadataKey: `Test Metadata Value` } as JsonObject,
      });
    });
  });

  describe(`prompt`, () => {
    describe(`interactive`, () => {
      let channelSend: jasmine.Spy;
      let output: State;

      beforeAll(() => {
        channelSend = jasmine.createSpy(`channelSend`);

        output = applyAwaitingResponse({
          type: `prompt`,
          mode: `interactive`,
          prompt: { formGroups: [] },
          formGroups: {},
          channelSend,
          metadata: { testMetadataKey: `Test Metadata Value` },
        });
      });

      it(`returns the unmodified state`, () => {
        expect(output).toEqual({
          type: `prompt`,
          mode: `interactive`,
          prompt: { formGroups: [] },
          formGroups: {},
          channelSend,
          metadata: { testMetadataKey: `Test Metadata Value` } as JsonObject,
        });
      });

      it(`does not send a message through the channel`, () => {
        expect(channelSend).not.toHaveBeenCalled();
      });
    });

    describe(`beingSent`, () => {
      let channelSend: jasmine.Spy;
      let output: State;

      beforeAll(() => {
        channelSend = jasmine.createSpy(`channelSend`);

        output = applyAwaitingResponse({
          type: `prompt`,
          mode: `beingSent`,
          prompt: { formGroups: [] },
          formGroups: {},
          channelSend,
          metadata: { testMetadataKey: `Test Metadata Value` },
        });
      });

      it(`returns the state, with the mode changed to awaitingResponse`, () => {
        expect(output).toEqual({
          type: `prompt`,
          mode: `awaitingResponse`,
          prompt: { formGroups: [] },
          formGroups: {},
          channelSend,
          metadata: { testMetadataKey: `Test Metadata Value` } as JsonObject,
        });
      });

      it(`does not send a message through the channel`, () => {
        expect(channelSend).not.toHaveBeenCalled();
      });
    });

    describe(`awaitingResponse`, () => {
      let channelSend: jasmine.Spy;
      let output: State;

      beforeAll(() => {
        channelSend = jasmine.createSpy(`channelSend`);

        output = applyAwaitingResponse({
          type: `prompt`,
          mode: `awaitingResponse`,
          prompt: { formGroups: [] },
          formGroups: {},
          channelSend,
          metadata: { testMetadataKey: `Test Metadata Value` },
        });
      });

      it(`returns the unmodified state`, () => {
        expect(output).toEqual({
          type: `prompt`,
          mode: `awaitingResponse`,
          prompt: { formGroups: [] },
          formGroups: {},
          channelSend,
          metadata: { testMetadataKey: `Test Metadata Value` } as JsonObject,
        });
      });

      it(`does not send a message through the channel`, () => {
        expect(channelSend).not.toHaveBeenCalled();
      });
    });
  });
});
