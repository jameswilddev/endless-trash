import { OPEN_READONLY } from "sqlite3";
import { SqliteConfiguration } from "../sqlite-configuration";
import { execute } from "../execute";

export async function executeGet<
  T extends { [key: string]: number | string | null | boolean | Buffer }
>(
  sqliteConfiguration: SqliteConfiguration,
  query: string,
  bindings: ReadonlyArray<string | number | null | boolean | Buffer>
): Promise<undefined | T> {
  return await execute(sqliteConfiguration, OPEN_READONLY, async (database) => {
    return await new Promise((resolve, reject) => {
      database.get(query, bindings, function (err, row) {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      });
    });
  });
}
