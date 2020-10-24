import { FileStoreDoesNotExistGetUrlResult } from "./file-store-does-not-exist-get-url-result";
import { FileStoreSuccessfulGetUrlResult } from "./file-store-successful-get-url-result";

export * from "./file-store-does-not-exist-get-url-result";
export * from "./file-store-successful-get-url-result";

export type FileStoreGetUrlResult =
  | FileStoreDoesNotExistGetUrlResult
  | FileStoreSuccessfulGetUrlResult;
