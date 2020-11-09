import { JSONSchema7 } from "json-schema";
import { Prompt } from "../prompt";
import { convertFormToJsonSchema } from "./convert-form-to-json-schema";

export function convertPromptToJsonSchema(prompt: Prompt): JSONSchema7 {
  return {
    oneOf: Object.values(prompt.formGroups)
      .map((formGroup) => formGroup.forms)
      .reduce((a, b) => [...a, ...b], [])
      .map(convertFormToJsonSchema)
      .filter((jsonSchema): jsonSchema is JSONSchema7 => jsonSchema !== null),
  };
}
