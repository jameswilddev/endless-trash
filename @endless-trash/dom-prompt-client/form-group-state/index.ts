import { FormGroup } from "@endless-trash/prompt";
import { FormsState } from "../forms-state";

export type FormGroupState = {
  readonly formGroup: FormGroup;
  readonly forms: FormsState;
};
