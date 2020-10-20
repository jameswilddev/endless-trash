import { CheckboxField } from "./checkbox-field";
import { FileField } from "./file-field";
import { FloatField } from "./float-field";
import { IntegerField } from "./integer-field";
import { ParagraphField } from "./paragraph-field";
import { StringField } from "./string-field";
import { SubtitleField } from "./subtitle-field";
import { TitleField } from "./title-field";

export { CheckboxField } from "./checkbox-field";
export { FileField } from "./file-field";
export { FloatField } from "./float-field";
export { IntegerField } from "./integer-field";
export { ParagraphField } from "./paragraph-field";
export { StringField } from "./string-field";
export { SubtitleField } from "./subtitle-field";
export { TitleField } from "./title-field";

export type Field =
  | CheckboxField
  | FileField
  | FloatField
  | IntegerField
  | ParagraphField
  | StringField
  | SubtitleField
  | TitleField;
