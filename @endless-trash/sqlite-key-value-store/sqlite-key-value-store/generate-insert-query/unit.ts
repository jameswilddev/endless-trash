import { generateInsertQuery } from ".";

describe(`generateInsertQuery`, () => {
  it(`generates the expected query`, () => {
    expect(
      generateInsertQuery({
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
      `INSERT INTO 'Test Table Name' ('Test Key Column Name', 'Test Value Column Name', 'Test Version Column Name') VALUES (?, ?, 0);`
    );
  });
});
