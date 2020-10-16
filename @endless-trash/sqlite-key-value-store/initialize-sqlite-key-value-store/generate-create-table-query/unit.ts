import { generateCreateTableQuery } from ".";

describe(`generateCreateTableQuery`, () => {
  it(`generates the expected query`, () => {
    expect(
      generateCreateTableQuery({
        tableName: `Test Table Name`,
        keyColumnName: `Test Key Column Name`,
        valueColumnName: `Test Value Column Name`,
        versionColumnName: `Test Version Column Name`,
        sqliteConfiguration: {
          filename: `Test File Name`,
          maximumAttempts: 3,
          minimumRetryDelayMilliseconds: 125,
          maximumRetryDelayMilliseconds: 250,
        },
      })
    ).toEqual(
      `CREATE TABLE 'Test Table Name' ('Test Key Column Name' TEXT PRIMARY KEY NOT NULL, 'Test Value Column Name' TEXT NOT NULL, 'Test Version Column Name' INTEGER NOT NULL);`
    );
  });
});
