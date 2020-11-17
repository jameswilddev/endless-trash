import { FormGroup } from "@endless-trash/prompt";
import { applyForm } from "../apply-form";
import { FormState } from "../form-state";
import { FormsState } from "../forms-state";
import { initialFormState } from "../initial-form-state";

export function applyForms(
  formGroup: FormGroup,
  formsState: FormsState
): FormsState {
  const output: {
    [name: string]: FormState;
  } = {};

  for (const form of formGroup.forms) {
    output[form.name] = Object.prototype.hasOwnProperty.call(
      formsState,
      form.name
    )
      ? applyForm(formGroup, formsState[form.name], form)
      : initialFormState(formGroup, form);
  }

  return output;
}
