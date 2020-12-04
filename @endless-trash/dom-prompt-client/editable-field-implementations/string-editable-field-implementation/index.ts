import { StringField, RequestStringField } from "@endless-trash/prompt";
import { ActionTransform, h, text, VDOM } from "hyperapp-cjs";
import { TextFieldState } from "../../field-state/text-field-state";
import { PromptState } from "../../prompt-state";
import { State } from "../../state";
import { updateFieldRaw } from "../../update-field-raw";
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
    fieldName: string,
    disabled: boolean
  ): ReadonlyArray<VDOM<State>> {
    const formGroupState = promptState.formGroups[formGroupName];
    const formState = formGroupState.forms[formName];
    const textFieldState = formState.fields[fieldName] as TextFieldState;
    const stringField = textFieldState.field as StringField;

    const id = `${textFieldState.id}--input`;

    const eventHandler: ActionTransform<State, Event> = (state, event) => {
      state;

      event = event as Event;
      const target = event.target as HTMLInputElement;

      return [
        updateFieldRaw,
        {
          formGroupName,
          formName,
          fieldName,
          raw: target.value,
        },
      ];
    };

    return [
      h(`label`, { for: id }, text(stringField.label)),
      h(`input`, {
        type: `text`,
        id,
        name: textFieldState.id,
        required:
          stringField.minimumLength !== null && stringField.minimumLength > 0,
        minlength: stringField.minimumLength || undefined,
        maxlength:
          stringField.maximumLength === null
            ? undefined
            : stringField.maximumLength,
        value: textFieldState.raw,
        readonly: disabled,
        oninput: eventHandler,
        onblur: eventHandler,
      }),
    ];
  },
};
