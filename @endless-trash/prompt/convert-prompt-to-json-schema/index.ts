import { JSONSchema7 } from "json-schema";
import { Prompt } from "../prompt";
import { convertFormToJsonSchema } from "./convert-form-to-json-schema";

export function convertPromptToJsonSchema(prompt: Prompt): JSONSchema7 {
  const oneOf: JSONSchema7[] = [
    {
      type: `object`,
      required: [`type`],
      additionalProperties: false,
      properties: {
        type: {
          const: `refresh`,
        },
      },
    },
    ...prompt.forms
      .map(convertFormToJsonSchema)
      .filter((jsonSchema): jsonSchema is JSONSchema7 => jsonSchema !== null),
  ];

  if (prompt.hasBackButton) {
    oneOf.push({
      type: `object`,
      required: [`type`],
      additionalProperties: false,
      properties: {
        type: {
          const: `backPressed`,
        },
      },
    });
  }

  return { oneOf };
}
