import { generateSelectQuery } from ".";

describe(`generateSelectQuery`, () => {
  it(`generates the expected query`, () => {
    expect(
      generateSelectQuery({
        filename: `Test File Name`,
        tableName: `Test Table Name`,
        keyColumnName: `Test Key Column Name`,
        valueColumnName: `Test Value Column Name`,
        versionColumnName: `Test Version Column Name`,
      })
    ).toEqual(
      `SELECT 'Test Table Name'.'Test Value Column Name' value, 'Test Table Name'.'Test Version Column Name' version FROM 'Test Table Name' WHERE 'Test Table Name'.'Test Key Column Name' = ? LIMIT 1;`
    );
  });
});
