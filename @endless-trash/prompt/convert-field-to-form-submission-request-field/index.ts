import { Field } from "../field";
import { FormSubmissionRequestField } from "../request";

export function convertFieldToFormSubmissionRequestField(
  field: Field
): undefined | FormSubmissionRequestField {
  switch (field.type) {
    case `checkbox`:
      return field.value;

    case `file`:
      if (field.url === null) {
        return null;
      } else {
        return `$keep`;
      }

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
