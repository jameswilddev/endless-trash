import { FormState } from "../form-state";

export type FormsState = {
  readonly [name: string]: FormState;
};
