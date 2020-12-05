import { MediaField } from "./media-field";
import { MessageField } from "./message-field";

export { AudioField, ImageField, VideoField, MediaField } from "./media-field";

export {
  ParagraphField,
  SubtitleField,
  TitleField,
  MessageField,
} from "./message-field";

export type StaticField = MediaField | MessageField;
