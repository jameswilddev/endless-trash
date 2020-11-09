import { JSONSchema7 } from "json-schema";
import { Field } from "../../../field";

export function convertFieldToJsonSchema(
  field: Field
): null | { readonly [name: string]: JSONSchema7 } {
  switch (field.type) {
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
