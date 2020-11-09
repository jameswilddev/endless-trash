import { Field } from "../field";
import { RequestField } from "../request";

export function convertFieldToRequestField(
  field: Field
): undefined | RequestField {
  switch (field.type) {
    case `float`:
    case `integer`:
    case `string`:
      return field.value;

    case `paragraph`:
    case `subtitle`:
    case `title`:
      return undefined;
  }
}
