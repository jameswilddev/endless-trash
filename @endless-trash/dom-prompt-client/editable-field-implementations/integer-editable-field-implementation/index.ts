import { IntegerField, RequestIntegerField } from "@endless-trash/prompt";
import { removeWhiteSpace } from "../../remove-white-space";
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
};
