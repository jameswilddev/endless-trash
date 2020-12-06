import { RequestFloatField } from "./request-float-field";
import { RequestIntegerField } from "./request-integer-field";
import { RequestStringField } from "./request-string-field";

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
  | RequestFloatField
  | RequestIntegerField
  | RequestStringField;
