import { FloatField, IntegerField, StringField } from "@endless-trash/prompt";
import { RawFieldValue } from "../../raw-field-value";

export type TextFieldState = {
  readonly type: `text`;
  readonly id: string;
  readonly field: StringField | IntegerField | FloatField;
  readonly raw: RawFieldValue;
};
