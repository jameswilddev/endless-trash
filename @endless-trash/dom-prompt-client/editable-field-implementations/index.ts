import {
  FloatField,
  IntegerField,
  RequestFloatField,
  RequestIntegerField,
  RequestStringField,
  StringField,
} from "@endless-trash/prompt";
import { EditableFieldImplementation } from "./editable-field-implementation";
import { floatEditableFieldImplementation } from "./float-editable-field-implementation";
import { integerEditableFieldImplementation } from "./integer-editable-field-implementation";
import { stringEditableFieldImplementation } from "./string-editable-field-implementation";

export const editableFieldImplementations: {
  readonly string: EditableFieldImplementation<StringField, RequestStringField>;
  readonly integer: EditableFieldImplementation<
    IntegerField,
    RequestIntegerField
  >;
  readonly float: EditableFieldImplementation<FloatField, RequestFloatField>;
} = {
  string: stringEditableFieldImplementation,
  integer: integerEditableFieldImplementation,
  float: floatEditableFieldImplementation,
};
// todo: this is a text field, not an editable field
