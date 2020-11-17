import { Form, FormGroup } from "@endless-trash/prompt";
import { applyFields } from "../apply-fields";
import { FormState } from "../form-state";

export function applyForm(
  formGroup: FormGroup,
  formState: FormState,
  form: Form
): FormState {
  return {
    ...formState,
    form,
    fields: applyFields(formGroup, form, formState.fields),
  };
}
