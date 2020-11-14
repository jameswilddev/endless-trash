import { Form } from "@endless-trash/prompt";
import { FormState } from "../form-state";
import { FormsState } from "../forms-state";
import { initialFormState } from "../initial-form-state";

export function initialFormsState(forms: ReadonlyArray<Form>): FormsState {
  const output: { [name: string]: FormState } = {};

  for (const form of forms) {
    output[form.name] = initialFormState(form);
  }

  return output;
}
