export type FormSubmissionRequestRequiredFloatField = number;

export type FormSubmissionRequestNullableFloatField = null | number;

export type FormSubmissionRequestFloatField =
  | FormSubmissionRequestRequiredFloatField
  | FormSubmissionRequestNullableFloatField;
