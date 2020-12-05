import { h, VDOM } from "hyperapp-cjs";
import { formView } from "../form-view";
import { PromptState } from "../prompt-state";
import { State } from "../state";

export function formGroupView(
  promptState: PromptState,
  formGroupName: string
): VDOM<State> {
  const formGroupState = promptState.formGroups[formGroupName];

  return h(
    `div`,
    {
      class: `form-group`,
      id: formGroupState.id,
      key: formGroupState.id,
    },
    h(
      `div`,
      {
        class: `forms`,
      },
      formGroupState.formGroup.forms.map((form) =>
        formView(promptState, formGroupName, form.name)
      )
    )
  );
}
