import { Field } from "../field";

export type Form = {
  readonly name: string;
  readonly fields: ReadonlyArray<Field>;
  readonly submitButtonLabel: null | string;
};
