import { Field, filterEditableField } from "@endless-trash/prompt";
import { FieldState } from "../field-state";
import { FieldsState } from "../fields-state";
import { initialFieldState } from "../initial-field-state";

export function initialFieldsState(fields: ReadonlyArray<Field>): FieldsState {
  const output: { [name: string]: FieldState } = {};

  for (const field of fields) {
    const editableField = filterEditableField(field);

    if (editableField) {
      output[field.name] = initialFieldState(editableField);
    }
  }

  return output;
}
