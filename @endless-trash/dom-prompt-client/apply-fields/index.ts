import { Form, FormGroup } from "@endless-trash/prompt";
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
    output[field.name] = Object.prototype.hasOwnProperty.call(
      fieldsState,
      field.name
    )
      ? applyField(formGroup, form, fieldsState[field.name], field)
      : initialFieldState(formGroup, form, field);
  }

  return output;
}
