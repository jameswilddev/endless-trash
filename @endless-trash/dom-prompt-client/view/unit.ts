import { ActionTransform, h, text, VDOM } from "hyperapp-cjs";
import { view } from ".";
import { State } from "../state";

describe(`view`, () => {
  describe(`error`, () => {
    let output: VDOM<State>;

    beforeAll(() => {
      output = view({
        type: `error`,
        error: `Test Error`,
      });
    });

    it(`defers to messageView`, () => {
      expect(output).toEqual(
        h(`div`, { class: `error` }, [
          h(`p`, {}, text(`A communication error has occurred:\n\nTest Error`)),
          h(
            `button`,
            {
              type: `button`,
              onclick: (jasmine.any(Function) as unknown) as ActionTransform<
                State,
                Event
              >,
            },
            text(`Reload`)
          ),
        ]) as VDOM<State>
      );
    });
  });

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
