import { OPEN_READONLY } from "sqlite3";
import { SqliteFileStoreConfiguration } from "../sqlite-file-store-configuration";
import { execute } from "../execute";

export async function executeAll<
  T extends { [key: string]: number | string | null | boolean | Buffer }
>(
  sqliteFileStoreConfiguration: SqliteFileStoreConfiguration,
  query: string,
  bindings: ReadonlyArray<string | number | null | boolean | Buffer>
): Promise<ReadonlyArray<T>> {
  return await execute(
    sqliteFileStoreConfiguration,
    OPEN_READONLY,
    async (database) => {
      return await new Promise((resolve, reject) => {
        database.all(query, bindings, function (err, rows) {
          if (err) {
            reject(err);
          } else {
            resolve(rows);
          }
        });
      });
    }
  );
}
