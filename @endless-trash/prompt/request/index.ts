import { FormSubmissionRequest } from "./form-submission-request";
import { RefreshRequest } from "./refresh-request";

export * from "./form-submission-request";
export * from "./refresh-request";

export type Request = FormSubmissionRequest | RefreshRequest;
