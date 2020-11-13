import { isEqual } from "lodash";
import { EditableField } from "@endless-trash/prompt";
import { FieldState } from "../field-state";
import { initialFieldState } from "../initial-field-state";

export function applyField(
  fieldState: FieldState,
  editableField: EditableField
): FieldState {
  if (isEqual(fieldState.editableField, editableField)) {
    return fieldState;
  } else {
    return initialFieldState(editableField);
  }
}
