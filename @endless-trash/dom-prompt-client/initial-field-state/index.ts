import { EditableField, RequestField } from "@endless-trash/prompt";
import { editableFieldImplementations } from "../editable-field-implementations";
import { EditableFieldImplementation } from "../editable-field-implementations/editable-field-implementation";
import { FieldState } from "../field-state";

export function initialFieldState(editableField: EditableField): FieldState {
  const editableFieldImplementation = editableFieldImplementations[
    editableField.type
  ] as EditableFieldImplementation<EditableField, RequestField>;

  return {
    editableField: editableField,
    parsed: editableFieldImplementation.validateValue(
      editableField,
      editableField.value
    )
      ? editableField.value
      : undefined,
    raw: editableFieldImplementation.convertValueToRaw(editableField.value),
  };
}
