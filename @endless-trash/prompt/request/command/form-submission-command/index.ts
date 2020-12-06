import { RequestField } from "./request-field";

export {
  RequestRequiredFloatField,
  RequestNullableFloatField,
  RequestFloatField,
  RequestRequiredIntegerField,
  RequestNullableIntegerField,
  RequestIntegerField,
  RequestStringField,
  RequestField,
} from "./request-field";

export type FormSubmissionCommand = {
  readonly type: `formSubmission`;
  readonly formName: string;
  readonly fields: {
    readonly [fieldName: string]: RequestField;
  };
};
