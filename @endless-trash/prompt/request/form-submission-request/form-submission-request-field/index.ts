import { FormSubmissionRequestCheckboxField } from "./form-submission-request-checkbox-field";
import { FormSubmissionRequestFileField } from "./form-submission-request-file-field";
import { FormSubmissionRequestFloatField } from "./form-submission-request-float-field";
import { FormSubmissionRequestIntegerField } from "./form-submission-request-integer-field";
import { FormSubmissionRequestStringField } from "./form-submission-request-string-field";

export { FormSubmissionRequestCheckboxField } from "./form-submission-request-checkbox-field";
export {
  DeleteOrKeepUnsetFormSubmissionRequestFileField,
  KeepSetFormSubmissionRequestFileField,
  ReplaceWithBase64FormSubmissionRequestFileField,
  FormSubmissionRequestRequiredFileFieldWithValue,
  FormSubmissionRequestRequiredFileField,
  FormSubmissionRequestNullableFileFieldWithValue,
  FormSubmissionRequestNullableFileField,
  FormSubmissionRequestFileField,
} from "./form-submission-request-file-field";
export {
  FormSubmissionRequestRequiredFloatField,
  FormSubmissionRequestNullableFloatField,
  FormSubmissionRequestFloatField,
} from "./form-submission-request-float-field";
export {
  FormSubmissionRequestRequiredIntegerField,
  FormSubmissionRequestNullableIntegerField,
  FormSubmissionRequestIntegerField,
} from "./form-submission-request-integer-field";
export { FormSubmissionRequestStringField } from "./form-submission-request-string-field";

export type FormSubmissionRequestField =
  | FormSubmissionRequestCheckboxField
  | FormSubmissionRequestFileField
  | FormSubmissionRequestFloatField
  | FormSubmissionRequestIntegerField
  | FormSubmissionRequestStringField;
