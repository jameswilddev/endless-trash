import { Command } from "./command";
import { Metadata } from "./metadata";

export {
  RequestRequiredFloatField,
  RequestNullableFloatField,
  RequestFloatField,
  RequestRequiredIntegerField,
  RequestNullableIntegerField,
  RequestIntegerField,
  RequestStringField,
  RequestField,
  FormSubmissionCommand,
  RefreshCommand,
} from "./command";

export { Metadata } from "./metadata";

export type Request = {
  readonly command: Command;
  readonly metadata: Metadata;
};
