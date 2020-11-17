import { Form, FormGroup } from "@endless-trash/prompt";
import { convertToAttributeValue } from "../convert-to-attribute-value";
import { FormState } from "../form-state";
import { initialFieldsState } from "../initial-fields-state";

export function initialFormState(formGroup: FormGroup, form: Form): FormState {
  return {
    form,
    id: `${convertToAttributeValue(formGroup.name)}--${convertToAttributeValue(
      form.name
    )}`,
    fields: initialFieldsState(formGroup, form),
  };
}
