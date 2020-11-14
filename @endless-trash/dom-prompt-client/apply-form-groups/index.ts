import { FormGroup } from "@endless-trash/prompt";
import { applyFormGroup } from "../apply-form-group";
import { FormGroupState } from "../form-group-state";
import { FormGroupsState } from "../form-groups-state";
import { initialFormGroupState } from "../initial-form-group-state";

export function applyFormGroups(
  formGroupsState: FormGroupsState,
  formGroups: ReadonlyArray<FormGroup>
): FormGroupsState {
  const output: {
    [name: string]: FormGroupState;
  } = {};

  for (const formGroup of formGroups) {
    output[formGroup.name] = applyFormGroup(
      Object.prototype.hasOwnProperty.call(formGroupsState, formGroup.name)
        ? formGroupsState[formGroup.name]
        : initialFormGroupState(formGroup),
      formGroup
    );
  }

  return output;
}
