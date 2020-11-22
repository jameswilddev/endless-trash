import { EditableField, RequestField } from "@endless-trash/prompt";
import { VDOM } from "hyperapp-cjs";
import { PromptState } from "../../prompt-state";
import { State } from "../../state";

export type EditableFieldImplementation<
  TEditableField extends EditableField,
  TRequestField extends RequestField
> = {
  parseValue(raw: string): undefined | TRequestField;
  validateValue(editableField: TEditableField, value: TRequestField): boolean;
  convertValueToRaw(value: TRequestField): string;
  view(
    promptState: PromptState,
    formGroupName: string,
    formName: string,
    fieldName: string,
    disabled: boolean
  ): ReadonlyArray<VDOM<State>>;
};
