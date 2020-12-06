export type RequestRequiredFloatField = number;

export type RequestNullableFloatField = null | number;

export type RequestFloatField =
  | RequestRequiredFloatField
  | RequestNullableFloatField;
