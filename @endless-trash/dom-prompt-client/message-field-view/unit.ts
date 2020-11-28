import { h, text, VDOM } from "hyperapp-cjs";
import { messageFieldView } from ".";
import { State } from "../state";

describe(`messageFieldView`, () => {
  let output: VDOM<State>;

  beforeAll(() => {
    output = messageFieldView({
      type: `static`,
      id: `Test Id`,
      field: {
        type: `subtitle`,
        content: `Test Content`,
        name: `Test Name`,
      },
    });
  });

  it(`generates the expected HTML`, () => {
    expect(output).toEqual(
      h(
        `h2`,
        {
          class: [`subtitle`, `field`],
          id: `Test Id`,
        },
        text(`Test Content`)
      ) as VDOM<State>
    );
  });
});
