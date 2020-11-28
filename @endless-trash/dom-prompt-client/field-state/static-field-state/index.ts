import { StaticField } from "@endless-trash/prompt";

export type StaticFieldState = {
  readonly type: `static`;
  readonly id: string;
  readonly field: StaticField;
};
