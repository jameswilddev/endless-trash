import { generateDeleteQuery } from ".";

describe(`generateDeleteQuery`, () => {
  it(`generates the expected query`, () => {
    expect(
      generateDeleteQuery({
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
      `DELETE FROM 'Test Table Name' WHERE 'Test Table Name'.'Test Path Column Name' = ?;`
    );
  });
});
