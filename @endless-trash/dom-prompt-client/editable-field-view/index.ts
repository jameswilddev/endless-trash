import { EditableField, RequestField } from "@endless-trash/prompt";
import { h, VDOM } from "hyperapp-cjs";
import { editableFieldImplementations } from "../editable-field-implementations";
import { EditableFieldImplementation } from "../editable-field-implementations/editable-field-implementation";
import { TextFieldState } from "../field-state/text-field-state";
import { PromptState } from "../prompt-state";
import { State } from "../state";

export function editableFieldView(
  promptState: PromptState,
  formGroupName: string,
  formName: string,
  fieldName: string
): VDOM<State> {
  const formGroupState = promptState.formGroups[formGroupName];
  const formState = formGroupState.forms[formName];
  const textFieldState = formState.fields[fieldName] as TextFieldState;

  const editableFieldImplementation = editableFieldImplementations[
    textFieldState.field.type
  ] as EditableFieldImplementation<EditableField, RequestField>;

  const raw = textFieldState.raw;
  const parsed = editableFieldImplementation.parseValue(raw);
  const valid =
    parsed !== undefined &&
    editableFieldImplementation.validateValue(textFieldState.field, parsed);

  const disabled =
    promptState.mode !== `interactive` ||
    formState.form.submitButtonLabel === null;

  return h(
    `div`,
    {
      class: [valid ? `valid` : `invalid`, textFieldState.field.type, `field`],
      id: textFieldState.id,
    },
    editableFieldImplementation.view(
      promptState,
      formGroupName,
      formName,
      fieldName,
      disabled
    )
  );
}
