import { StringField, RequestStringField } from "@endless-trash/prompt";
import { EditableFieldImplementation } from "../editable-field-implementation";

export const stringEditableFieldImplementation: EditableFieldImplementation<
  StringField,
  RequestStringField
> = {
  parseValue(raw: string): undefined | RequestStringField {
    return raw.trim();
  },

  validateValue(stringField: StringField, string: RequestStringField): boolean {
    if (
      stringField.minimumLength !== null &&
      string.length < stringField.minimumLength
    ) {
      return false;
    } else if (
      stringField.maximumLength !== null &&
      string.length > stringField.maximumLength
    ) {
      return false;
    } else {
      return true;
    }
  },

  convertValueToRaw(value: RequestStringField): string {
    return value;
  },
};
