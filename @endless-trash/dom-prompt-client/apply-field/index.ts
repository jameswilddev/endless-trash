import { Field, Form, FormGroup } from "@endless-trash/prompt";
import isEqual = require("lodash/isEqual");
import { FieldState } from "../field-state";
import { initialFieldState } from "../initial-field-state";

export function applyField(
  formGroup: FormGroup,
  form: Form,
  fieldState: FieldState,
  field: Field
): FieldState {
  if (isEqual(fieldState.field, field)) {
    return fieldState;
  } else {
    return initialFieldState(formGroup, form, field);
  }
}
