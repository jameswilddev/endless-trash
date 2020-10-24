import { CheckboxField } from "./checkbox-field";
import { FileField } from "./file-field";
import { FloatField } from "./float-field";
import { IntegerField } from "./integer-field";
import { StringField } from "./string-field";

export * from "./checkbox-field";
export * from "./file-field";
export * from "./float-field";
export * from "./integer-field";
export * from "./string-field";

export type NamedField =
  | CheckboxField
  | FileField
  | FloatField
  | IntegerField
  | StringField;
