import { FieldState } from "../field-state";

export function fieldStateInvalid(fieldState: FieldState): boolean {
  switch (fieldState.type) {
    case `text`:
      return fieldState.parsed === undefined;

    case `static`:
      return false;
  }
}
