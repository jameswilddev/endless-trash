import { fieldStateInvalid } from "../field-state-invalid";
import { FormState } from "../form-state";

export function formStateInvalid(formState: FormState): boolean {
  for (const name in formState.fields) {
    if (fieldStateInvalid(formState.fields[name])) {
      return true;
    }
  }

  return false;
}
