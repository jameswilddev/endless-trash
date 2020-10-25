import { CheckboxField } from "./checkbox-field";
import { FileField } from "./file-field";
import { FloatField } from "./float-field";
import { IntegerField } from "./integer-field";
import { StringField } from "./string-field";

export { CheckboxField } from "./checkbox-field";
export { FileField } from "./file-field";
export { FloatField } from "./float-field";
export { IntegerField } from "./integer-field";
export { StringField } from "./string-field";

export type EditableField =
  | CheckboxField
  | FileField
  | FloatField
  | IntegerField
  | StringField;
