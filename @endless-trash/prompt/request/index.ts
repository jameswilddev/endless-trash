import { RequestField } from "./request-field";

export {
  RequestCheckboxField,
  DeleteOrKeepUnsetRequestFileField,
  KeepSetRequestFileField,
  ReplaceWithBase64RequestFileField,
  RequestRequiredFileFieldWithValue,
  RequestRequiredFileField,
  RequestNullableFileFieldWithValue,
  RequestNullableFileField,
  RequestFileField,
  RequestRequiredFloatField,
  RequestNullableFloatField,
  RequestFloatField,
  RequestRequiredIntegerField,
  RequestNullableIntegerField,
  RequestIntegerField,
  RequestStringField,
  RequestField,
} from "./request-field";

export type Request = {
  readonly formName: string;
  readonly fields: {
    readonly [fieldName: string]: RequestField;
  };
};
