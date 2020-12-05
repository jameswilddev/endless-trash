import { Json } from "@endless-trash/immutable-json-type";
import { EditableField } from "../field";

export function requestFieldIsValid(
  editableField: EditableField,
  requestField: Json
): boolean {
  switch (editableField.type) {
    case `float`: {
      if (requestField === null) {
        return !editableField.required;
      } else if (typeof requestField !== `number`) {
        return false;
      } else if (
        editableField.minimum !== null &&
        editableField.minimum[1] === `inclusive` &&
        requestField < editableField.minimum[0]
      ) {
        return false;
      } else if (
        editableField.minimum !== null &&
        editableField.minimum[1] === `exclusive` &&
        requestField <= editableField.minimum[0]
      ) {
        return false;
      } else if (
        editableField.maximum !== null &&
        editableField.maximum[1] === `inclusive` &&
        requestField > editableField.maximum[0]
      ) {
        return false;
      } else if (
        editableField.maximum !== null &&
        editableField.maximum[1] === `exclusive` &&
        requestField >= editableField.maximum[0]
      ) {
        return false;
      } else {
        return true;
      }
    }

    case `integer`: {
      if (requestField === null) {
        return !editableField.required;
      } else if (typeof requestField !== `number`) {
        return false;
      } else if (!Number.isSafeInteger(requestField)) {
        return false;
      } else if (
        editableField.minimum !== null &&
        editableField.minimum[1] === `inclusive` &&
        requestField < editableField.minimum[0]
      ) {
        return false;
      } else if (
        editableField.minimum !== null &&
        editableField.minimum[1] === `exclusive` &&
        requestField <= editableField.minimum[0]
      ) {
        return false;
      } else if (
        editableField.maximum !== null &&
        editableField.maximum[1] === `inclusive` &&
        requestField > editableField.maximum[0]
      ) {
        return false;
      } else if (
        editableField.maximum !== null &&
        editableField.maximum[1] === `exclusive` &&
        requestField >= editableField.maximum[0]
      ) {
        return false;
      } else {
        return true;
      }
    }

    case `string`: {
      if (typeof requestField !== `string`) {
        return false;
      } else if (
        editableField.minimumLength !== null &&
        requestField.length < editableField.minimumLength
      ) {
        return false;
      } else if (
        editableField.maximumLength !== null &&
        requestField.length > editableField.maximumLength
      ) {
        return false;
      } else {
        return true;
      }
    }
  }
}
