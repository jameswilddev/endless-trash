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
    output[form.name] = Object.prototype.hasOwnProperty.call(
      formsState,
      form.name
    )
      ? applyForm(formsState[form.name], form)
      : initialFormState(form);
  }

  return output;
}
