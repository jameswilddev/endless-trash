import { KeyValueStoreDoesNotExistOrVersionDoesNotMatchUpdateResult } from "./key-value-store-does-not-exist-or-version-does-not-match-update-result";
import { KeyValueStoreSuccessfulUpdateResult } from "./key-value-store-successful-update-result";
export { KeyValueStoreDoesNotExistOrVersionDoesNotMatchUpdateResult } from "./key-value-store-does-not-exist-or-version-does-not-match-update-result";
export { KeyValueStoreSuccessfulUpdateResult } from "./key-value-store-successful-update-result";

export type KeyValueStoreUpdateResult<TVersion> =
  | KeyValueStoreDoesNotExistOrVersionDoesNotMatchUpdateResult
  | KeyValueStoreSuccessfulUpdateResult<TVersion>;
