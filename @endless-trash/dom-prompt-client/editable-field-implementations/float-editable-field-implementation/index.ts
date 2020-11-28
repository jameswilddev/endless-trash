import { FloatField, RequestFloatField } from "@endless-trash/prompt";
import { h, text, VDOM } from "hyperapp-cjs";
import { TextFieldState } from "../../field-state/text-field-state";
import { PromptState } from "../../prompt-state";
import { removeWhiteSpace } from "../../remove-white-space";
import { State } from "../../state";
import { EditableFieldImplementation } from "../editable-field-implementation";
import { validateFloatFormat } from "./validate-float-format";

export const floatEditableFieldImplementation: EditableFieldImplementation<
  FloatField,
  RequestFloatField
> = {
  parseValue(raw: string): undefined | RequestFloatField {
    const withoutWhiteSpace = removeWhiteSpace(raw);

    if (withoutWhiteSpace === null) {
      return null;
    } else {
      if (validateFloatFormat(withoutWhiteSpace)) {
        return parseFloat(withoutWhiteSpace);
      } else {
        return undefined;
      }
    }
  },

  validateValue(floatField: FloatField, float: RequestFloatField): boolean {
    if (float === null) {
      return !floatField.required;
    } else if (floatField.minimum !== null && float < floatField.minimum[0]) {
      return false;
    } else if (
      floatField.minimum !== null &&
      floatField.minimum[1] === `exclusive` &&
      float === floatField.minimum[0]
    ) {
      return false;
    } else if (floatField.maximum !== null && float > floatField.maximum[0]) {
      return false;
    } else if (
      floatField.maximum !== null &&
      floatField.maximum[1] === `exclusive` &&
      float === floatField.maximum[0]
    ) {
      return false;
    } else {
      return true;
    }
  },

  convertValueToRaw(value: RequestFloatField): string {
    if (value === null) {
      return ``;
    } else {
      return `${value}`;
    }
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
    const floatField = textFieldState.field as FloatField;

    const id = `${textFieldState.id}--input`;

    return [
      h(`label`, { for: id }, text(textFieldState.field.label)),
      h(`input`, {
        type: `number`,
        id,
        name: textFieldState.id,
        required: floatField.required,
        step: `any`,
        min: floatField.minimum === null ? undefined : floatField.minimum[0],
        max: floatField.maximum === null ? undefined : floatField.maximum[0],
        value: textFieldState.raw,
        readonly: disabled,
      }),
    ];
  },
};
