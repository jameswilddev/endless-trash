import { Json } from "@endless-trash/immutable-json-type";
import { AtLeastPartiallyValidRequest } from "../at-least-partially-valid-request";

export function requestIsAtLeastPartiallyValid(
  request: Json
): null | AtLeastPartiallyValidRequest {
  if (request === null) {
    return null;
  } else if (typeof request !== `object`) {
    return null;
  } else if (Array.isArray(request)) {
    return null;
  } else if (!Object.prototype.hasOwnProperty.call(request, `metadata`)) {
    return null;
  } else if (request.metadata === null) {
    return null;
  } else if (typeof request.metadata !== `object`) {
    return null;
  } else if (Array.isArray(request.metadata)) {
    return null;
  } else if (!Object.prototype.hasOwnProperty.call(request, `command`)) {
    return null;
  } else if (Object.keys(request).length > 2) {
    return null;
  } else {
    return request as AtLeastPartiallyValidRequest;
  }
}
