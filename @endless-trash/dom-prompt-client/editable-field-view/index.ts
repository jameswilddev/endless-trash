import { EditableField, RequestField } from "@endless-trash/prompt";
import { h, VDOM } from "hyperapp-cjs";
import { editableFieldImplementations } from "../editable-field-implementations";
import { EditableFieldImplementation } from "../editable-field-implementations/editable-field-implementation";
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
  const fieldState = formState.fields[fieldName];

  const editableFieldImplementation = editableFieldImplementations[
    fieldState.editableField.type
  ] as EditableFieldImplementation<EditableField, RequestField>;

  const raw = fieldState.raw;
  const parsed = editableFieldImplementation.parseValue(raw);
  const valid =
    parsed !== undefined &&
    editableFieldImplementation.validateValue(fieldState.editableField, parsed);

  const disabled = promptState.sendState !== null;

  return h(
    `div`,
    {
      class: [valid ? `valid` : `invalid`, `field`],
      id: fieldState.id,
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
