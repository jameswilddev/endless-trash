import { Form } from "@endless-trash/prompt";
import { applyForm } from "../apply-form";
import { FormState } from "../form-state";
import { FormsState } from "../forms-state";
import { initialFormState } from "../initial-form-state";

export function applyForms(
  formsState: FormsState,
  forms: ReadonlyArray<Form>
): FormsState {
  const output: {
    [name: string]: FormState;
  } = {};

  for (const form of forms) {
    output[form.name] = applyForm(
      Object.prototype.hasOwnProperty.call(formsState, form.name)
        ? formsState[form.name]
        : initialFormState(form),
      form
    );
  }

  return output;
}
