import { h, text, VDOM } from "hyperapp-cjs";
import { view } from ".";
import { State } from "../state";

describe(`view`, () => {
  describe(`message`, () => {
    let output: VDOM<State>;

    beforeAll(() => {
      output = view({
        type: `message`,
        content: `Test Content`,
      });
    });

    it(`defers to messageView`, () => {
      expect(output).toEqual(
        h(`p`, { class: `message` }, text(`Test Content`)) as VDOM<State>
      );
    });
  });

  describe(`prompt`, () => {
    let channelSend: jasmine.Spy;
    let output: VDOM<State>;

    beforeAll(() => {
      channelSend = jasmine.createSpy(`channelSend`);

      output = view({
        type: `prompt`,
        prompt: { formGroups: [] },
        formGroups: {},
        channelSend,
        mode: `interactive`,
      });
    });

    it(`defers to promptView`, () => {
      expect(output).toEqual(
        h(
          `div`,
          { class: [`interactive`, `prompt`] },
          h(`div`, { class: `form-groups` }, [])
        ) as VDOM<State>
      );
    });

    it(`does not send a message through the channel`, () => {
      expect(channelSend).not.toHaveBeenCalled();
    });
  });
});
