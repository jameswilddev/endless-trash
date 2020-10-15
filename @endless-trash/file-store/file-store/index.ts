export {
  FileStoreDoesNotExistGetUrlResult,
  FileStoreSuccessfulGetUrlResult,
  FileStoreGetUrlResult,
} from "./file-store-get-url-result";
import { FileStoreGetUrlResult } from "./file-store-get-url-result";

export interface FileStore {
  delete(path: string): Promise<void>;

  getUrl(path: string): Promise<FileStoreGetUrlResult>;

  listPaths(prefix: string): Promise<ReadonlyArray<string>>;

  save(path: string, content: Buffer): Promise<void>;
}
