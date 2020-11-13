import { FormGroupState } from "../form-group-state";

export type FormGroupsState = {
  readonly [name: string]: FormGroupState;
};
