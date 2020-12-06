import { JsonObject } from "@endless-trash/immutable-json-type";

export function refreshIsValid(command: JsonObject): boolean {
  return Object.keys(command).length === 1;
}
