import { FormSubmissionRequestField } from "./form-submission-request-field";

export * from "./form-submission-request-field";

export type FormSubmissionRequest = {
  readonly type: `formSubmission`;
  readonly formName: string;
  readonly fields: {
    readonly [fieldName: string]: FormSubmissionRequestField;
  };
};
