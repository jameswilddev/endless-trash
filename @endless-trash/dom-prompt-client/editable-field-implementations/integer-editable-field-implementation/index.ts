import { IntegerField, RequestIntegerField } from "@endless-trash/prompt";
import { h, text, VDOM } from "hyperapp-cjs";
import { PromptState } from "../../prompt-state";
import { removeWhiteSpace } from "../../remove-white-space";
import { State } from "../../state";
import { EditableFieldImplementation } from "../editable-field-implementation";
import { validateIntegerFormat } from "./validate-integer-format";

export const integerEditableFieldImplementation: EditableFieldImplementation<
  IntegerField,
  RequestIntegerField
> = {
  parseValue(raw: string): undefined | RequestIntegerField {
    const withoutWhiteSpace = removeWhiteSpace(raw);

    if (withoutWhiteSpace === null) {
      return null;
    } else {
      if (validateIntegerFormat(withoutWhiteSpace)) {
        return parseInt(withoutWhiteSpace);
      } else {
        return undefined;
      }
    }
  },

  validateValue(
    integerField: IntegerField,
    integer: RequestIntegerField
  ): boolean {
    if (integer === null) {
      return !integerField.required;
    } else if (
      integerField.minimum !== null &&
      integer < integerField.minimum[0]
    ) {
      return false;
    } else if (
      integerField.minimum !== null &&
      integerField.minimum[1] === `exclusive` &&
      integer === integerField.minimum[0]
    ) {
      return false;
    } else if (
      integerField.maximum !== null &&
      integer > integerField.maximum[0]
    ) {
      return false;
    } else if (
      integerField.maximum !== null &&
      integerField.maximum[1] === `exclusive` &&
      integer === integerField.maximum[0]
    ) {
      return false;
    } else {
      return true;
    }
  },

  convertValueToRaw(value: RequestIntegerField): string {
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
    fieldName: string
  ): ReadonlyArray<VDOM<State>> {
    const formGroupState = promptState.formGroups[formGroupName];
    const formState = formGroupState.forms[formName];
    const fieldState = formState.fields[fieldName];

    const id = `${fieldState.id}--input`;

    const integerField = fieldState.editableField as IntegerField;

    return [
      h(`label`, { for: id }, text(fieldState.editableField.label)),
      h(`input`, {
        type: `number`,
        id,
        name: fieldState.id,
        required: integerField.required,
        step: 1,
        min:
          integerField.minimum === null ? undefined : integerField.minimum[0],
        max:
          integerField.maximum === null ? undefined : integerField.maximum[0],
        value: fieldState.raw,
      }),
    ];
  },
};
