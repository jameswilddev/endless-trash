import { Json, JsonObject } from "@endless-trash/immutable-json-type";
import { Prompt } from "../prompt";
import { Request } from "../request";
import { commandIsValid } from "./command-is-valid";
import { metadataIsValid } from "./metadata-is-valid";

export function requestIsValid(
  prompt: Prompt,
  metadataContentIsValid: (metadata: JsonObject) => boolean,
  request: Json
): null | Request {
  if (request === null) {
    return null;
  } else if (typeof request !== `object`) {
    return null;
  } else if (Array.isArray(request)) {
    return null;
  } else if (!Object.prototype.hasOwnProperty.call(request, `metadata`)) {
    return null;
  } else if (!Object.prototype.hasOwnProperty.call(request, `command`)) {
    return null;
  } else if (Object.keys(request).length > 2) {
    return null;
  } else if (!metadataIsValid(metadataContentIsValid, request.metadata)) {
    return null;
  } else if (!commandIsValid(prompt, request.command)) {
    return null;
  } else {
    return request as Request;
  }
}
