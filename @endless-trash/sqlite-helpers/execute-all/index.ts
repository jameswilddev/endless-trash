import { OPEN_READONLY } from "sqlite3";
import { execute } from "../execute";
import { SqliteConfiguration } from "../sqlite-configuration";

export async function executeAll<
  T extends { [key: string]: number | string | null | boolean | Buffer }
>(
  sqliteConfiguration: SqliteConfiguration,
  query: string,
  bindings: ReadonlyArray<string | number | null | boolean | Buffer>
): Promise<ReadonlyArray<T>> {
  return await execute(sqliteConfiguration, OPEN_READONLY, async (database) => {
    return await new Promise((resolve, reject) => {
      database.all(query, bindings, function (err, rows) {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  });
}
