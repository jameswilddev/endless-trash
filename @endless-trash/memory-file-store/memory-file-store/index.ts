import { FileStoreGetUrlResult, FileStore } from "@endless-trash/file-store";

const doesNotExist: { readonly type: `doesNotExist` } = {
  type: `doesNotExist`,
};

export class MemoryFileStore implements FileStore {
  private readonly data = new Map<string, string>();

  async delete(path: string): Promise<void> {
    this.data.delete(path);
  }

  async getUrl(path: string): Promise<FileStoreGetUrlResult> {
    const url = this.data.get(path);

    if (url === undefined) {
      return doesNotExist;
    } else {
      return { type: `successful`, url };
    }
  }

  async listPaths(prefix: string): Promise<ReadonlyArray<string>> {
    return [...this.data.keys()].filter((key) => key.startsWith(prefix)).sort();
  }

  async save(path: string, content: Buffer): Promise<void> {
    this.data.set(path, `data:;base64,${content.toString(`base64`)}`);
  }
}
