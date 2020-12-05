import { EditableField } from "./editable-field";
import { StaticField } from "./static-field";

export {
  FloatField,
  IntegerField,
  StringField,
  EditableField,
} from "./editable-field";
export {
  AudioField,
  ImageField,
  VideoField,
  MediaField,
  ParagraphField,
  SubtitleField,
  TitleField,
  MessageField,
  StaticField,
} from "./static-field";

export type Field = EditableField | StaticField;
