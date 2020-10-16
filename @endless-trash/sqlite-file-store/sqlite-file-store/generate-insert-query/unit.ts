import { generateInsertQuery } from ".";

describe(`generateInsertQuery`, () => {
  it(`generates the expected query`, () => {
    expect(
      generateInsertQuery({
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
      `INSERT OR REPLACE INTO 'Test Table Name' ('Test Path Column Name', 'Test Content Column Name') VALUES (?, ?);`
    );
  });
});
