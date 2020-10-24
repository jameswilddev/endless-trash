import { NamedField } from "./named-field";
import { ParagraphField } from "./paragraph-field";
import { SubtitleField } from "./subtitle-field";
import { TitleField } from "./title-field";

export * from "./named-field";
export * from "./paragraph-field";
export * from "./subtitle-field";
export * from "./title-field";

export type Field = NamedField | ParagraphField | SubtitleField | TitleField;
