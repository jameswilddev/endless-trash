import { SqliteConfiguration } from "../sqlite-configuration";
import { execute } from "../execute";
import { OPEN_CREATE, OPEN_READWRITE } from "sqlite3";

export async function executeRun(
  sqliteConfiguration: SqliteConfiguration,
  createIfMissing: boolean,
  query: string,
  bindings: ReadonlyArray<string | number | null | boolean | Buffer>
): Promise<number> {
  const mode = createIfMissing ? OPEN_CREATE | OPEN_READWRITE : OPEN_READWRITE;

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
