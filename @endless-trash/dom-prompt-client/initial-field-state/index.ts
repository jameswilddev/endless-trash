import {
  EditableField,
  Form,
  FormGroup,
  RequestField,
} from "@endless-trash/prompt";
import { convertToAttributeValue } from "../convert-to-attribute-value";
import { editableFieldImplementations } from "../editable-field-implementations";
import { EditableFieldImplementation } from "../editable-field-implementations/editable-field-implementation";
import { FieldState } from "../field-state";

export function initialFieldState(
  formGroup: FormGroup,
  form: Form,
  editableField: EditableField
): FieldState {
  const editableFieldImplementation = editableFieldImplementations[
    editableField.type
  ] as EditableFieldImplementation<EditableField, RequestField>;

  return {
    editableField,
    id: `${convertToAttributeValue(formGroup.name)}--${convertToAttributeValue(
      form.name
    )}--${convertToAttributeValue(editableField.name)}`,
    parsed: editableFieldImplementation.validateValue(
      editableField,
      editableField.value
    )
      ? editableField.value
      : undefined,
    raw: editableFieldImplementation.convertValueToRaw(editableField.value),
  };
}
