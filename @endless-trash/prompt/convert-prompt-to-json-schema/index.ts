import { Json } from "@endless-trash/immutable-json-type";
import { Prompt } from "../prompt";
import { Request } from "../request";
import { convertFormToJsonSchema } from "./convert-form-to-json-schema";

export function convertPromptToJsonSchema(
  prompt: Prompt,
  request: Json
): null | Request {
  for (const formGroup of prompt.formGroups) {
    for (const form of formGroup.forms) {
      if (convertFormToJsonSchema(form, request)) {
        return request as Request;
      } else {
        continue;
      }
    }
  }

  return null;
}
