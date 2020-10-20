import { BoundType } from "../../bound-type";

export type FloatField = {
  readonly name: string;
  readonly type: `float`;
  readonly label: string;
  readonly value: null | number;
  readonly minimum: null | readonly [number, BoundType];
  readonly maximum: null | readonly [number, BoundType];
  readonly required: boolean;
};
