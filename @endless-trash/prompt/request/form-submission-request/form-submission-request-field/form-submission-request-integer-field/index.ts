export type FormSubmissionRequestRequiredIntegerField = number;

export type FormSubmissionRequestNullableIntegerField = null | number;

export type FormSubmissionRequestIntegerField =
  | FormSubmissionRequestRequiredIntegerField
  | FormSubmissionRequestNullableIntegerField;
