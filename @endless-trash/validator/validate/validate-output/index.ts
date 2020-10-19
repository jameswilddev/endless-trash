import { Json } from "@endless-trash/immutable-json-type";

export type ValidateOutput<T extends Json> = {
  readonly body: T;
};
