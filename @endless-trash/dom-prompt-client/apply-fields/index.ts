import { Field, filterEditableField } from "@endless-trash/prompt";
import { applyField } from "../apply-field";
import { FieldState } from "../field-state";
import { FieldsState } from "../fields-state";
import { initialFieldState } from "../initial-field-state";

export function applyFields(
  fieldsState: FieldsState,
  fields: ReadonlyArray<Field>
): FieldsState {
  const output: {
    [name: string]: FieldState;
  } = {};

  for (const field of fields) {
    const editableField = filterEditableField(field);

    if (editableField !== null) {
      output[field.name] = Object.prototype.hasOwnProperty.call(
        fieldsState,
        field.name
      )
        ? applyField(fieldsState[field.name], editableField)
        : initialFieldState(editableField);
    }
  }

  return output;
}
