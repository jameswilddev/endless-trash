import { EditableField, RequestField } from "@endless-trash/prompt";
import { editableFieldImplementations } from "../editable-field-implementations";
import { EditableFieldImplementation } from "../editable-field-implementations/editable-field-implementation";
import { FieldState } from "../field-state";

export function fieldStateInvalid(fieldState: FieldState): boolean {
  switch (fieldState.type) {
    case `text`: {
      const editableFieldImplementation = editableFieldImplementations[
        fieldState.field.type
      ] as EditableFieldImplementation<EditableField, RequestField>;

      const parsed = editableFieldImplementation.parseValue(fieldState.raw);

      if (parsed === undefined) {
        return true;
      } else {
        return !editableFieldImplementation.validateValue(
          fieldState.field,
          parsed
        );
      }
    }

    case `static`:
      return false;
  }
}
