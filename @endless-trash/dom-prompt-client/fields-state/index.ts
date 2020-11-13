import { FieldState } from "../field-state";

export type FieldsState = {
  readonly [name: string]: FieldState;
};
