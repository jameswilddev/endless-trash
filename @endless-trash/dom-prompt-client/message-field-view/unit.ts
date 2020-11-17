import { MessageField } from "@endless-trash/prompt";
import { h, text, VDOM } from "hyperapp-cjs";
import { messageFieldView } from ".";
import { FormState } from "../form-state";
import { State } from "../state";

describe(`messageFieldView`, () => {
  let output: VDOM<State>;

  beforeAll(() => {
    const formState: FormState = {
      form: {
        name: `Test Form Name`,
        fields: [],
        submitButtonLabel: `Test Submit Button Label`,
      },
      id: `Test Form Id`,
      fields: {},
    };

    const messageField: MessageField = {
      type: `subtitle`,
      name: `Test Message Field Name`,
      content: `Test Content`,
    };

    output = messageFieldView(formState, messageField, `Test Type`);
  });

  it(`generates the expected HTML`, () => {
    expect(output).toEqual(
      h(
        `Test Type`,
        {
          class: [`subtitle`, `field`],
          id: `Test Form Id--test-message-field-name`,
        },
        text(`Test Content`)
      ) as VDOM<State>
    );
  });
});
