import { RequestCheckboxField } from "./request-checkbox-field";
import { RequestFileField } from "./request-file-field";
import { RequestFloatField } from "./request-float-field";
import { RequestIntegerField } from "./request-integer-field";
import { RequestStringField } from "./request-string-field";

export { RequestCheckboxField } from "./request-checkbox-field";
export {
  DeleteOrKeepUnsetRequestFileField,
  KeepSetRequestFileField,
  ReplaceWithBase64RequestFileField,
  RequestRequiredFileFieldWithValue,
  RequestRequiredFileField,
  RequestNullableFileFieldWithValue,
  RequestNullableFileField,
  RequestFileField,
} from "./request-file-field";
export {
  RequestRequiredFloatField,
  RequestNullableFloatField,
  RequestFloatField,
} from "./request-float-field";
export {
  RequestRequiredIntegerField,
  RequestNullableIntegerField,
  RequestIntegerField,
} from "./request-integer-field";
export { RequestStringField } from "./request-string-field";

export type RequestField =
  | RequestCheckboxField
  | RequestFileField
  | RequestFloatField
  | RequestIntegerField
  | RequestStringField;
