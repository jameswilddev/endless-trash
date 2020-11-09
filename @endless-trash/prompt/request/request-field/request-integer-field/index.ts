export type RequestRequiredIntegerField = number;

export type RequestNullableIntegerField = null | number;

export type RequestIntegerField =
  | RequestRequiredIntegerField
  | RequestNullableIntegerField;
