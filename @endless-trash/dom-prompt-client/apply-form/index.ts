import { Form } from "@endless-trash/prompt";
import { applyFields } from "../apply-fields";
import { FormState } from "../form-state";

export function applyForm(formState: FormState, form: Form): FormState {
  return {
    form,
    fields: applyFields(formState.fields, form.fields),
  };
}
