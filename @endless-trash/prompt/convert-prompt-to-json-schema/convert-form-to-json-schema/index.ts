import { JSONSchema7 } from "json-schema";
import { Form } from "../../form";
import { convertFieldToJsonSchema } from "./convert-field-to-json-schema";

export function convertFormToJsonSchema(form: Form): null | JSONSchema7 {
  if (form.submitButtonLabel === null) {
    return null;
  } else {
    let properties: { [name: string]: JSONSchema7 } = {};

    for (const field of form.fields) {
      const property = convertFieldToJsonSchema(field);
      properties = { ...properties, ...property };
    }

    return {
      type: `object`,
      required: [`type`, `formName`, `fields`],
      additionalProperties: false,
      properties: {
        type: {
          const: `formSubmission`,
        },
        formName: {
          const: form.name,
        },
        fields: {
          type: `object`,
          required: Object.keys(properties),
          additionalProperties: false,
          properties,
        },
      },
    };
  }
}
