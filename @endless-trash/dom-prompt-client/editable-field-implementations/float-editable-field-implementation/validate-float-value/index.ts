import { FloatField } from "@endless-trash/prompt";

export function validateFloatValue(
  field: FloatField,
  float: null | number
): boolean {
  if (float === null) {
    return !field.required;
  } else if (field.minimum !== null && float < field.minimum[0]) {
    return false;
  } else if (
    field.minimum !== null &&
    field.minimum[1] === `exclusive` &&
    float === field.minimum[0]
  ) {
    return false;
  } else if (field.maximum !== null && float > field.maximum[0]) {
    return false;
  } else if (
    field.maximum !== null &&
    field.maximum[1] === `exclusive` &&
    float === field.maximum[0]
  ) {
    return false;
  } else {
    return true;
  }
}
