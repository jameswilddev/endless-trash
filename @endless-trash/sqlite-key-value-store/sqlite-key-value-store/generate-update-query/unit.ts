import { generateUpdateQuery } from ".";

describe(`generateUpdateQuery`, () => {
  it(`generates the expected query`, () => {
    expect(
      generateUpdateQuery({
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
      `UPDATE 'Test Table Name' SET 'Test Value Column Name' = ?, 'Test Version Column Name' = ? WHERE 'Test Table Name'.'Test Key Column Name' = ? AND 'Test Table Name'.'Test Version Column Name' = ?;`
    );
  });
});
