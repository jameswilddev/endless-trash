import { generateUpdateQuery } from ".";

describe(`generateUpdateQuery`, () => {
  it(`generates the expected query`, () => {
    expect(
      generateUpdateQuery({
        filename: `Test File Name`,
        tableName: `Test Table Name`,
        keyColumnName: `Test Key Column Name`,
        valueColumnName: `Test Value Column Name`,
        versionColumnName: `Test Version Column Name`,
      })
    ).toEqual(
      `UPDATE 'Test Table Name' SET 'Test Value Column Name' = ?, 'Test Version Column Name' = ? WHERE 'Test Table Name'.'Test Key Column Name' = ? AND 'Test Table Name'.'Test Version Column Name' = ?;`
    );
  });
});
