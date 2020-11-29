import { h, VDOM } from "hyperapp-cjs";
import { formGroupView } from "../form-group-view";
import { PromptState } from "../prompt-state";
import { State } from "../state";

export function promptView(promptState: PromptState): VDOM<State> {
  let classNames: string[];

  switch (promptState.mode) {
    case `interactive`:
      classNames = [`interactive`, `prompt`];
      break;

    case `beingSent`:
      classNames = [`prompt`, `being-sent`];
      break;

    case `awaitingResponse`:
      classNames = [`prompt`, `awaiting-response`];
      break;
  }

  return h(
    `div`,
    {
      class: classNames,
    },
    h(
      `div`,
      {
        class: `form-groups`,
      },
      promptState.prompt.formGroups.map((formGroup) =>
        formGroupView(promptState, formGroup.name)
      )
    )
  );
}
