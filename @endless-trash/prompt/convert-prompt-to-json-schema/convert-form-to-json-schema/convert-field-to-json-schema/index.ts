import { JSONSchema7 } from "json-schema";
import { Field } from "../../../field";
import { generateBase64Pattern } from "./generate-base64-pattern";

export function convertFieldToJsonSchema(
  field: Field
): null | { readonly [name: string]: JSONSchema7 } {
  switch (field.type) {
    case `checkbox`:
      return {
        [field.name]: {
          type: `boolean`,
        },
      };

    case `file`: {
      let output: JSONSchema7 = {
        type: `string`,
        contentEncoding: `base64`,
        pattern: generateBase64Pattern(field.maximumBytes),
      };

      if (!field.required && field.url === null) {
        output = {
          oneOf: [output, { type: `null` }],
        };
      } else if (!field.required && field.url !== null) {
        output = {
          oneOf: [output, { const: `$keep` }, { type: `null` }],
        };
      } else if (field.required && field.url !== null) {
        output = { oneOf: [output, { const: `$keep` }] };
      }

      return {
        [field.name]: output,
      };
    }

    case `float`: {
      const asRequired: JSONSchema7 = {
        type: `number`,
        exclusiveMinimum:
          field.minimum !== null && field.minimum[1] === `exclusive`
            ? field.minimum[0]
            : undefined,
        minimum:
          field.minimum !== null && field.minimum[1] === `inclusive`
            ? field.minimum[0]
            : undefined,
        exclusiveMaximum:
          field.maximum !== null && field.maximum[1] === `exclusive`
            ? field.maximum[0]
            : undefined,
        maximum:
          field.maximum !== null && field.maximum[1] === `inclusive`
            ? field.maximum[0]
            : undefined,
      };

      const asNullable: JSONSchema7 = field.required
        ? asRequired
        : { oneOf: [asRequired, { type: `null` }] };

      return { [field.name]: asNullable };
    }

    case `integer`: {
      const asRequired: JSONSchema7 = {
        type: `integer`,
        exclusiveMinimum:
          field.minimum && field.minimum[1] === `exclusive`
            ? field.minimum[0]
            : undefined,
        minimum:
          field.minimum && field.minimum[1] === `inclusive`
            ? field.minimum[0]
            : undefined,
        exclusiveMaximum:
          field.maximum && field.maximum[1] === `exclusive`
            ? field.maximum[0]
            : undefined,
        maximum:
          field.maximum && field.maximum[1] === `inclusive`
            ? field.maximum[0]
            : undefined,
      };

      const asNullable: JSONSchema7 = field.required
        ? asRequired
        : { oneOf: [asRequired, { type: `null` }] };

      return { [field.name]: asNullable };
    }

    case `paragraph`:
    case `subtitle`:
    case `title`: {
      return null;
    }

    case `string`: {
      const asRequired: JSONSchema7 = {
        type: `string`,
      };

      if (field.minimumLength !== null) {
        asRequired.minLength = field.minimumLength;
      }

      if (field.maximumLength !== null) {
        asRequired.maxLength = field.maximumLength;
      }

      return {
        [field.name]: asRequired,
      };
    }
  }
}
