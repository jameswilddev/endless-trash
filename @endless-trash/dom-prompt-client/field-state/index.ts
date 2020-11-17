import { RequestField, EditableField } from "@endless-trash/prompt";
import { RawFieldValue } from "../raw-field-value";

export type FieldState = {
  readonly editableField: EditableField;
  readonly id: string;
  readonly parsed: undefined | RequestField;
  readonly raw: RawFieldValue;
};
