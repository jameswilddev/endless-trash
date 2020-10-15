import { SqliteFileStoreConfiguration } from "../sqlite-file-store-configuration";
import { execute } from "../execute";

export async function executeRun(
  sqliteFileStoreConfiguration: SqliteFileStoreConfiguration,
  mode: number,
  query: string,
  bindings: ReadonlyArray<string | number | null | boolean | Buffer>
): Promise<number> {
  return await execute(sqliteFileStoreConfiguration, mode, async (database) => {
    return await new Promise((resolve, reject) => {
      database.run(query, bindings, function (err) {
        if (err) {
          reject(err);
        } else {
          resolve(this.changes);
        }
      });
    });
  });
}
