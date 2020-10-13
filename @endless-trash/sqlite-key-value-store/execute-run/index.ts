import { SqliteKeyValueStoreConfiguration } from "../sqlite-key-value-store-configuration";
import { execute } from "../execute";

export async function executeRun(
  sqliteKeyValueStoreConfiguration: SqliteKeyValueStoreConfiguration,
  mode: number,
  query: string,
  bindings: ReadonlyArray<string | number | null | boolean>
): Promise<number> {
  return await execute(
    sqliteKeyValueStoreConfiguration,
    mode,
    async (database) => {
      return await new Promise((resolve, reject) => {
        database.run(query, bindings, function (err) {
          if (err) {
            reject(err);
          } else {
            resolve(this.changes);
          }
        });
      });
    }
  );
}
