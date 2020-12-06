import { JsonObject } from "@endless-trash/immutable-json-type";

export type MessageState = {
  readonly type: `message`;
  readonly content: string;
  readonly metadata: JsonObject;
};
