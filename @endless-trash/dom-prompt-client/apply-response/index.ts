import { ActionDescriptor } from "hyperapp-cjs";
import { applyMessage } from "../apply-message";
import { applyPrompt } from "../apply-prompt";
import { ApplyPromptProps } from "../apply-prompt-props";
import { State } from "../state";

export function applyResponse(
  state: State,
  props: ApplyPromptProps
): ActionDescriptor<State, ApplyPromptProps> | ActionDescriptor<State, string> {
  state;

  if (props.prompt.formGroups) {
    return [applyPrompt, props];
  } else {
    return [
      applyMessage,
      `An unexpected response was received:\n\n${JSON.stringify(
        props.prompt,
        null,
        2
      )}\n\nPlease refresh to reconnect.`,
    ];
  }
}
