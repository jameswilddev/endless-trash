import { NamedField } from "./named-field";
import { ParagraphField } from "./paragraph-field";
import { SubtitleField } from "./subtitle-field";
import { TitleField } from "./title-field";

export {
  CheckboxField,
  FileField,
  FloatField,
  IntegerField,
  StringField,
  NamedField,
} from "./named-field";
export { ParagraphField } from "./paragraph-field";
export { SubtitleField } from "./subtitle-field";
export { TitleField } from "./title-field";

export type Field = NamedField | ParagraphField | SubtitleField | TitleField;
