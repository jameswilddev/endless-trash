import { FormGroup } from "@endless-trash/prompt";
import { FormGroupState } from "../form-group-state";
import { FormGroupsState } from "../form-groups-state";
import { initialFormGroupState } from "../initial-form-group-state";

export function initialFormGroupsState(
  formGroups: ReadonlyArray<FormGroup>
): FormGroupsState {
  const output: { [name: string]: FormGroupState } = {};

  for (const formGroup of formGroups) {
    output[formGroup.name] = initialFormGroupState(formGroup);
  }

  return output;
}
