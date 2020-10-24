import { FormSubmissionRequestCheckboxField } from "./form-submission-request-checkbox-field";
import { FormSubmissionRequestFileField } from "./form-submission-request-file-field";
import { FormSubmissionRequestFloatField } from "./form-submission-request-float-field";
import { FormSubmissionRequestIntegerField } from "./form-submission-request-integer-field";
import { FormSubmissionRequestStringField } from "./form-submission-request-string-field";

export * from "./form-submission-request-checkbox-field";
export * from "./form-submission-request-file-field";
export * from "./form-submission-request-float-field";
export * from "./form-submission-request-integer-field";
export * from "./form-submission-request-string-field";

export type FormSubmissionRequestField =
  | FormSubmissionRequestCheckboxField
  | FormSubmissionRequestFileField
  | FormSubmissionRequestFloatField
  | FormSubmissionRequestIntegerField
  | FormSubmissionRequestStringField;
