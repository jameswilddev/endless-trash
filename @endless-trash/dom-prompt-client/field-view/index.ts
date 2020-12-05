import { VDOM } from "hyperapp-cjs";
import { editableFieldView } from "../editable-field-view";
import { PromptState } from "../prompt-state";
import { State } from "../state";
import { staticFieldView } from "../static-field-view";

export function fieldView(
  promptState: PromptState,
  formGroupName: string,
  formName: string,
  fieldName: string
): VDOM<State> {
  const formGroupState = promptState.formGroups[formGroupName];
  const formState = formGroupState.forms[formName];
  const fieldState = formState.fields[fieldName];

  switch (fieldState.type) {
    case `text`:
      return editableFieldView(promptState, formGroupName, formName, fieldName);

    case `static`:
      return staticFieldView(fieldState);
  }
}
