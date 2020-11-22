import { StringField, RequestStringField } from "@endless-trash/prompt";
import { h, text, VDOM } from "hyperapp-cjs";
import { PromptState } from "../../prompt-state";
import { State } from "../../state";
import { EditableFieldImplementation } from "../editable-field-implementation";

export const stringEditableFieldImplementation: EditableFieldImplementation<
  StringField,
  RequestStringField
> = {
  parseValue(raw: string): undefined | RequestStringField {
    return raw.trim();
  },

  validateValue(stringField: StringField, string: RequestStringField): boolean {
    if (
      stringField.minimumLength !== null &&
      string.length < stringField.minimumLength
    ) {
      return false;
    } else if (
      stringField.maximumLength !== null &&
      string.length > stringField.maximumLength
    ) {
      return false;
    } else {
      return true;
    }
  },

  convertValueToRaw(value: RequestStringField): string {
    return value;
  },

  view(
    promptState: PromptState,
    formGroupName: string,
    formName: string,
    fieldName: string
  ): ReadonlyArray<VDOM<State>> {
    const formGroupState = promptState.formGroups[formGroupName];
    const formState = formGroupState.forms[formName];
    const fieldState = formState.fields[fieldName];

    const id = `${fieldState.id}--input`;

    const stringField = fieldState.editableField as StringField;

    return [
      h(`label`, { for: id }, text(fieldState.editableField.label)),
      h(`input`, {
        type: `text`,
        id,
        name: fieldState.id,
        required:
          stringField.minimumLength !== null && stringField.minimumLength > 0,
        minlength: stringField.minimumLength || undefined,
        maxlength:
          stringField.maximumLength === null
            ? undefined
            : stringField.maximumLength,
        value: fieldState.raw,
      }),
    ];
  },
};
