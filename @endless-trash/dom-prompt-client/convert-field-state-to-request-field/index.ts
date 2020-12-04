import { EditableField, RequestField } from "@endless-trash/prompt";
import { editableFieldImplementations } from "../editable-field-implementations";
import { EditableFieldImplementation } from "../editable-field-implementations/editable-field-implementation";
import { FieldState } from "../field-state";

export function convertFieldStateToRequestField(
  fieldState: FieldState
): undefined | RequestField {
  switch (fieldState.type) {
    case `text`:
      const editableFieldImplementation = editableFieldImplementations[
        fieldState.field.type
      ] as EditableFieldImplementation<EditableField, RequestField>;

      return editableFieldImplementation.parseValue(fieldState.raw);

    case `static`:
      return undefined;
  }
}
