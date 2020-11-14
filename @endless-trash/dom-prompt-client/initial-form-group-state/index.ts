import { FormGroup } from "@endless-trash/prompt";
import { FormGroupState } from "../form-group-state";
import { initialFormsState } from "../initial-forms-state";

export function initialFormGroupState(formGroup: FormGroup): FormGroupState {
  return {
    formGroup,
    forms: initialFormsState(formGroup.forms),
  };
}
