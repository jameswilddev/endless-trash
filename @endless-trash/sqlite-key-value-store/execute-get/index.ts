import { OPEN_READONLY } from "sqlite3";
import { SqliteKeyValueStoreConfiguration } from "../sqlite-key-value-store-configuration";
import { execute } from "../execute";

export async function executeGet<
  T extends { [key: string]: number | string | null | boolean }
>(
  sqliteKeyValueStoreConfiguration: SqliteKeyValueStoreConfiguration,
  query: string,
  bindings: ReadonlyArray<string | number | null | boolean>
): Promise<undefined | T> {
  return await execute(
    sqliteKeyValueStoreConfiguration,
    OPEN_READONLY,
    async (database) => {
      return await new Promise((resolve, reject) => {
        database.get(query, bindings, function (err, row) {
          if (err) {
            reject(err);
          } else {
            resolve(row);
          }
        });
      });
    }
  );
}
