import { Json } from "@endless-trash/immutable-json-type";
import { Prompt } from "../prompt";
import { Request } from "../request";
import { requestFormIsValid } from "./request-form-is-valid";

export function requestIsValid(prompt: Prompt, request: Json): null | Request {
  for (const formGroup of prompt.formGroups) {
    for (const form of formGroup.forms) {
      if (requestFormIsValid(form, request)) {
        return request as Request;
      } else {
        continue;
      }
    }
  }

  return null;
}
