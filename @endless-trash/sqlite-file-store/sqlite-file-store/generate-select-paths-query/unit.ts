import { generateSelectPathsQuery } from ".";

describe(`generateSelectPathsQuery`, () => {
  it(`generates the expected query`, () => {
    expect(
      generateSelectPathsQuery({
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
      `SELECT 'Test Table Name'.'Test Path Column Name' path FROM 'Test Table Name' WHERE 'Test Table Name'.'Test Path Column Name' LIKE ? ESCAPE '\\' ORDER BY 'Test Table Name'.'Test Path Column Name';`
    );
  });
});
