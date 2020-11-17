import { h, text, VDOM } from "hyperapp-cjs";
import { MessageField } from "@endless-trash/prompt";
import { State } from "../state";
import { FormState } from "../form-state";
import { convertToAttributeValue } from "../convert-to-attribute-value";

export function messageFieldView(
  formState: FormState,
  messageField: MessageField,
  type: string
): VDOM<State> {
  return h(
    type,
    {
      class: [messageField.type, `field`],
      id: `${formState.id}--${convertToAttributeValue(messageField.name)}`,
    },
    text(messageField.content)
  );
}
