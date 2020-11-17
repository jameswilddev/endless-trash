import { filterEditableField, Form, FormGroup } from "@endless-trash/prompt";
import { applyField } from "../apply-field";
import { FieldState } from "../field-state";
import { FieldsState } from "../fields-state";
import { initialFieldState } from "../initial-field-state";

export function applyFields(
  formGroup: FormGroup,
  form: Form,
  fieldsState: FieldsState
): FieldsState {
  const output: {
    [name: string]: FieldState;
  } = {};

  for (const field of form.fields) {
    const editableField = filterEditableField(field);

    if (editableField !== null) {
      output[field.name] = Object.prototype.hasOwnProperty.call(
        fieldsState,
        field.name
      )
        ? applyField(fieldsState[field.name], editableField)
        : initialFieldState(formGroup, form, editableField);
    }
  }

  return output;
}
