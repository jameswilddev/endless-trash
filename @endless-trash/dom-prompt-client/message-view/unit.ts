import { h, text, VDOM } from "hyperapp-cjs";
import { messageView } from ".";
import { State } from "../state";

describe(`messageView`, () => {
  let output: VDOM<State>;

  beforeAll(() => {
    output = messageView({
      type: `message`,
      content: `Test Content`,
    });
  });

  it(`renders as expected`, () => {
    expect(output).toEqual(
      h(`p`, { class: `message` }, text(`Test Content`)) as VDOM<State>
    );
  });
});
