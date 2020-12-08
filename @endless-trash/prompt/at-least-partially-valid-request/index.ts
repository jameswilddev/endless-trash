import { Json, JsonObject } from "@endless-trash/immutable-json-type";

export type AtLeastPartiallyValidRequest = {
  readonly metadata: JsonObject;
  readonly command: Json;
};
