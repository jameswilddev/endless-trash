import { Form, FormGroup } from "@endless-trash/prompt";
import { FieldState } from "../field-state";
import { FieldsState } from "../fields-state";
import { initialFieldState } from "../initial-field-state";

export function initialFieldsState(
  formGroup: FormGroup,
  form: Form
): FieldsState {
  const output: { [name: string]: FieldState } = {};

  for (const field of form.fields) {
    output[field.name] = initialFieldState(formGroup, form, field);
  }

  return output;
}
