import { Database } from "sqlite3";
import { SqliteConfiguration } from "../sqlite-configuration";

export async function execute<T>(
  sqliteConfiguration: SqliteConfiguration,
  mode: number,
  execute: (database: Database) => Promise<T>
): Promise<T> {
  let attempts = 0;

  while (true) {
    try {
      let database: undefined | Database;
      try {
        database = await new Promise<Database>((resolve, reject) => {
          // Don't assign the database variable until it's actually open.
          // It won't close unless it successfully opens.
          const databaseReference = new Database(
            sqliteConfiguration.filename,
            mode,
            (err) => {
              if (err) {
                reject(err);
              } else {
                resolve(databaseReference);
              }
            }
          );
        });

        return await execute(database);
      } finally {
        await new Promise<void>((resolve, reject) => {
          if (database) {
            database.close((err) => {
              /* istanbul ignore else */
              if (err === null) {
                resolve();
              } else {
                // We can't hit this reliably from a test.
                reject(err);
              }
            });
          } else {
            resolve();
          }
        });
      }
    } catch (e) {
      // These can happen intermittently when the database is being accessed concurrently.
      if (
        e.message === `SQLITE_CANTOPEN: unable to open database file` ||
        e.message === `SQLITE_READONLY: attempt to write a readonly database` ||
        e.message === `SQLITE_BUSY: database is locked`
      ) {
        if (attempts === sqliteConfiguration.maximumAttempts) {
          throw e;
        } else {
          await new Promise((resolve) =>
            setTimeout(
              resolve,
              sqliteConfiguration.minimumRetryDelayMilliseconds +
                (sqliteConfiguration.maximumRetryDelayMilliseconds -
                  sqliteConfiguration.minimumRetryDelayMilliseconds) *
                  Math.random()
            )
          );
          attempts++;
          continue;
        }
      } else {
        throw e;
      }
    }
  }
}
