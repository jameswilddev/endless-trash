import { EditableField } from "./editable-field";
import { ParagraphField } from "./paragraph-field";
import { SubtitleField } from "./subtitle-field";
import { TitleField } from "./title-field";

export {
  FloatField,
  IntegerField,
  StringField,
  EditableField,
} from "./editable-field";
export { ParagraphField } from "./paragraph-field";
export { SubtitleField } from "./subtitle-field";
export { TitleField } from "./title-field";

export type Field = EditableField | ParagraphField | SubtitleField | TitleField;
