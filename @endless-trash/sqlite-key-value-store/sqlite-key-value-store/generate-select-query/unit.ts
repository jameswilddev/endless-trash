import { generateSelectQuery } from ".";

describe(`generateSelectQuery`, () => {
  it(`generates the expected query`, () => {
    expect(
      generateSelectQuery({
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
      `SELECT 'Test Table Name'.'Test Value Column Name' value, 'Test Table Name'.'Test Version Column Name' version FROM 'Test Table Name' WHERE 'Test Table Name'.'Test Key Column Name' = ? LIMIT 1;`
    );
  });
});
