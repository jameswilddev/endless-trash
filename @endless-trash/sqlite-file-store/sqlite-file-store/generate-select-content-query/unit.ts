import { generateSelectContentQuery } from ".";

describe(`generateSelectContentQuery`, () => {
  it(`generates the expected query`, () => {
    expect(
      generateSelectContentQuery({
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
      `SELECT 'Test Table Name'.'Test Content Column Name' content FROM 'Test Table Name' WHERE 'Test Table Name'.'Test Path Column Name' = ? LIMIT 1;`
    );
  });
});
