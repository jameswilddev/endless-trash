import { FormState } from "../form-state";

export function formStateInvalid(formState: FormState): boolean {
  for (const name in formState.fields) {
    if (formState.fields[name].parsed === undefined) {
      return true;
    }
  }

  return false;
}
