import { BoundType } from "../../bound-type";

export type IntegerField = {
  readonly name: string;
  readonly type: `integer`;
  readonly label: string;
  readonly value: null | number;
  readonly minimum: null | readonly [number, BoundType];
  readonly maximum: null | readonly [number, BoundType];
  readonly required: boolean;
};
