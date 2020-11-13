import { EditableField, RequestField } from "@endless-trash/prompt";

export type EditableFieldImplementation<
  TEditableField extends EditableField,
  TRequestField extends RequestField
> = {
  parseValue(raw: string): undefined | TRequestField;
  validateValue(editableField: TEditableField, value: TRequestField): boolean;
  convertValueToRaw(value: TRequestField): string;
};
