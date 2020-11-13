import { FloatField, RequestFloatField } from "@endless-trash/prompt";
import { removeWhiteSpace } from "../../remove-white-space";
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
};
