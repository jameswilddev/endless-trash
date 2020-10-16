import { FileStoreGetUrlResult, FileStore } from "@endless-trash/file-store";
import { SqliteFileStoreConfiguration } from "../sqlite-file-store-configuration";
import { generateDeleteQuery } from "./generate-delete-query";
import { generateInsertQuery } from "./generate-insert-query";
import { generateSelectContentQuery } from "./generate-select-content-query";
import { generateSelectPathsQuery } from "./generate-select-paths-query";
import {
  escapeLike,
  executeAll,
  executeGet,
  executeRun,
} from "@endless-trash/sqlite-helpers";

const doesNotExist: { readonly type: `doesNotExist` } = {
  type: `doesNotExist`,
};

export class SqliteFileStore implements FileStore {
  constructor(
    private readonly sqliteFileStoreConfiguration: SqliteFileStoreConfiguration
  ) {}

  private readonly deleteQuery = generateDeleteQuery(
    this.sqliteFileStoreConfiguration
  );

  private readonly insertQuery = generateInsertQuery(
    this.sqliteFileStoreConfiguration
  );

  private readonly selectContentQuery = generateSelectContentQuery(
    this.sqliteFileStoreConfiguration
  );

  private readonly selectPathsQuery = generateSelectPathsQuery(
    this.sqliteFileStoreConfiguration
  );

  async delete(path: string): Promise<void> {
    await executeRun(
      this.sqliteFileStoreConfiguration.sqliteConfiguration,
      false,
      this.deleteQuery,
      [path]
    );
  }

  async getUrl(path: string): Promise<FileStoreGetUrlResult> {
    const content = await executeGet<{ readonly content: Buffer }>(
      this.sqliteFileStoreConfiguration.sqliteConfiguration,
      this.selectContentQuery,
      [path]
    );

    if (content === undefined) {
      return doesNotExist;
    } else {
      return {
        type: `successful`,
        url: `data:;base64,${content.content.toString(`base64`)}`,
      };
    }
  }

  async listPaths(prefix: string): Promise<ReadonlyArray<string>> {
    const rows = await executeAll<{ readonly path: string }>(
      this.sqliteFileStoreConfiguration.sqliteConfiguration,
      this.selectPathsQuery,
      [`${escapeLike(prefix)}%`]
    );

    return rows.map((row) => row.path);
  }

  async save(path: string, content: Buffer): Promise<void> {
    await executeRun(
      this.sqliteFileStoreConfiguration.sqliteConfiguration,
      false,
      this.insertQuery,
      [path, content]
    );
  }
}
