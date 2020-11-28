import { h, text, VDOM } from "hyperapp-cjs";
import { State } from "../state";
import { StaticFieldState } from "../field-state/static-field-state";
import { elementMappings } from "./element-mappings";

export function messageFieldView(
  staticFieldState: StaticFieldState
): VDOM<State> {
  return h(
    elementMappings[staticFieldState.field.type],
    {
      class: [staticFieldState.field.type, `field`],
      id: staticFieldState.id,
    },
    text(staticFieldState.field.content)
  );
}
