import { Json } from "@endless-trash/immutable-json-type";

export type Metadata = {
  readonly [key: string]: Json;
};
