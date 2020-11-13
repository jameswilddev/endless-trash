import { FormGroup } from "@endless-trash/prompt";
import { applyForms } from "../apply-forms";
import { FormGroupState } from "../form-group-state";

export function applyFormGroup(
  formGroupState: FormGroupState,
  formGroup: FormGroup
): FormGroupState {
  return {
    forms: applyForms(formGroupState.forms, formGroup.forms),
  };
}
