import { FormGroup } from "@endless-trash/prompt";
import { convertToAttributeValue } from "../convert-to-attribute-value";
import { FormGroupState } from "../form-group-state";
import { initialFormsState } from "../initial-forms-state";

export function initialFormGroupState(formGroup: FormGroup): FormGroupState {
  return {
    formGroup,
    id: convertToAttributeValue(formGroup.name),
    forms: initialFormsState(formGroup, formGroup.forms),
  };
}
