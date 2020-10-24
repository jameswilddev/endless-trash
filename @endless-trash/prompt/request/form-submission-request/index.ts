import { FormSubmissionRequestField } from "./form-submission-request-field";

export {
  FormSubmissionRequestCheckboxField,
  DeleteOrKeepUnsetFormSubmissionRequestFileField,
  KeepSetFormSubmissionRequestFileField,
  ReplaceWithBase64FormSubmissionRequestFileField,
  FormSubmissionRequestRequiredFileFieldWithValue,
  FormSubmissionRequestRequiredFileField,
  FormSubmissionRequestNullableFileFieldWithValue,
  FormSubmissionRequestNullableFileField,
  FormSubmissionRequestFileField,
  FormSubmissionRequestRequiredFloatField,
  FormSubmissionRequestNullableFloatField,
  FormSubmissionRequestFloatField,
  FormSubmissionRequestRequiredIntegerField,
  FormSubmissionRequestNullableIntegerField,
  FormSubmissionRequestIntegerField,
  FormSubmissionRequestStringField,
  FormSubmissionRequestField,
} from "./form-submission-request-field";

export type FormSubmissionRequest = {
  readonly type: `formSubmission`;
  readonly formName: string;
  readonly fields: {
    readonly [fieldName: string]: FormSubmissionRequestField;
  };
};
