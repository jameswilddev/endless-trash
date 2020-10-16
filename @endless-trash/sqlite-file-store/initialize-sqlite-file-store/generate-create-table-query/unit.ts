import { generateCreateTableQuery } from ".";

describe(`generateCreateTableQuery`, () => {
  it(`generates the expected query`, () => {
    expect(
      generateCreateTableQuery({
        tableName: `Test Table Name`,
        pathColumnName: `Test Path Column Name`,
        contentColumnName: `Test Content Column Name`,
        sqliteConfiguration: {
          filename: `Test File Name`,
          maximumAttempts: 3,
          minimumRetryDelayMilliseconds: 125,
          maximumRetryDelayMilliseconds: 250,
        },
      })
    ).toEqual(
      `CREATE TABLE 'Test Table Name' ('Test Path Column Name' TEXT PRIMARY KEY NOT NULL, 'Test Content Column Name' BLOB NOT NULL);`
    );
  });
});
