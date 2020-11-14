import { Form } from "@endless-trash/prompt";
import { FormState } from "../form-state";
import { initialFieldsState } from "../initial-fields-state";

export function initialFormState(form: Form): FormState {
  return {
    form,
    fields: initialFieldsState(form.fields),
  };
}
