import { Form, FormGroup } from "@endless-trash/prompt";
import { FormState } from "../form-state";
import { FormsState } from "../forms-state";
import { initialFormState } from "../initial-form-state";

export function initialFormsState(
  formGroup: FormGroup,
  forms: ReadonlyArray<Form>
): FormsState {
  const output: { [name: string]: FormState } = {};

  for (const form of forms) {
    output[form.name] = initialFormState(formGroup, form);
  }

  return output;
}
