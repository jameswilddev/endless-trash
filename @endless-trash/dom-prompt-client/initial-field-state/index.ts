import {
  EditableField,
  Field,
  Form,
  FormGroup,
  RequestField,
} from "@endless-trash/prompt";
import { convertToAttributeValue } from "../convert-to-attribute-value";
import { FieldState } from "../field-state";
import { editableFieldImplementations } from "../editable-field-implementations";
import { EditableFieldImplementation } from "../editable-field-implementations/editable-field-implementation";

export function initialFieldState(
  formGroup: FormGroup,
  form: Form,
  field: Field
): FieldState {
  const id = `${convertToAttributeValue(
    formGroup.name
  )}--${convertToAttributeValue(form.name)}--${convertToAttributeValue(
    field.name
  )}`;

  switch (field.type) {
    case `float`:
    case `integer`:
    case `string`:
      const editableFieldImplementation = editableFieldImplementations[
        field.type
      ] as EditableFieldImplementation<EditableField, RequestField>;

      return {
        type: `text`,
        id,
        field,
        raw: editableFieldImplementation.convertValueToRaw(field.value),
      };

    case `paragraph`:
    case `subtitle`:
    case `title`:
    case `video`:
    case `audio`:
    case `image`:
      return {
        type: `static`,
        id,
        field,
      };
  }
}
