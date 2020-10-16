import { SqliteConfiguration } from "../sqlite-configuration";
import { execute } from "../execute";

export async function executeRun(
  sqliteConfiguration: SqliteConfiguration,
  mode: number,
  query: string,
  bindings: ReadonlyArray<string | number | null | boolean | Buffer>
): Promise<number> {
  return await execute(sqliteConfiguration, mode, async (database) => {
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
