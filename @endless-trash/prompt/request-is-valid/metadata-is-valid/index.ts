import { Json, JsonObject } from "@endless-trash/immutable-json-type";

export function metadataIsValid(
  metadataContentIsValid: (metadata: JsonObject) => boolean,
  metadata: Json
): boolean {
  if (metadata === null) {
    return false;
  } else if (typeof metadata !== `object`) {
    return false;
  } else if (Array.isArray(metadata)) {
    return false;
  } else if (!metadataContentIsValid(metadata)) {
    return false;
  } else {
    return true;
  }
}
