export type DeleteOrKeepUnsetFormSubmissionRequestFileField = null;
export type KeepSetFormSubmissionRequestFileField = `$keep`;
export type ReplaceWithBase64FormSubmissionRequestFileField = string;

export type FormSubmissionRequestRequiredFileFieldWithValue =
  | KeepSetFormSubmissionRequestFileField
  | ReplaceWithBase64FormSubmissionRequestFileField;

export type FormSubmissionRequestRequiredFileField = ReplaceWithBase64FormSubmissionRequestFileField;

export type FormSubmissionRequestNullableFileFieldWithValue =
  | DeleteOrKeepUnsetFormSubmissionRequestFileField
  | KeepSetFormSubmissionRequestFileField
  | ReplaceWithBase64FormSubmissionRequestFileField;

export type FormSubmissionRequestNullableFileField =
  | DeleteOrKeepUnsetFormSubmissionRequestFileField
  | ReplaceWithBase64FormSubmissionRequestFileField;

export type FormSubmissionRequestFileField =
  | FormSubmissionRequestRequiredFileFieldWithValue
  | FormSubmissionRequestRequiredFileField
  | FormSubmissionRequestNullableFileFieldWithValue
  | FormSubmissionRequestNullableFileField;
