import { isEqual } from "lodash";
import { EditableField, RequestField } from "@endless-trash/prompt";
import { FieldState } from "../field-state";
import { editableFieldImplementations } from "../editable-field-implementations";
import { EditableFieldImplementation } from "../editable-field-implementations/editable-field-implementation";

export function applyField(
  fieldState: FieldState,
  editableField: EditableField
): FieldState {
  if (isEqual(fieldState.editableField, editableField)) {
    return fieldState;
  } else {
    const editableFieldImplementation = editableFieldImplementations[
      editableField.type
    ] as EditableFieldImplementation<EditableField, RequestField>;

    return {
      editableField,
      id: fieldState.id,
      parsed: editableFieldImplementation.validateValue(
        editableField,
        editableField.value
      )
        ? editableField.value
        : undefined,
      raw: editableFieldImplementation.convertValueToRaw(editableField.value),
    };
  }
}
