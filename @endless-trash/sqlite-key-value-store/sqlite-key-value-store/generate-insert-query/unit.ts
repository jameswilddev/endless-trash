import { generateInsertQuery } from ".";

describe(`generateInsertQuery`, () => {
  it(`generates the expected query`, () => {
    expect(
      generateInsertQuery({
        filename: `Test File Name`,
        tableName: `Test Table Name`,
        keyColumnName: `Test Key Column Name`,
        valueColumnName: `Test Value Column Name`,
        versionColumnName: `Test Version Column Name`,
      })
    ).toEqual(
      `INSERT INTO 'Test Table Name' ('Test Key Column Name', 'Test Value Column Name', 'Test Version Column Name') VALUES (?, ?, 0);`
    );
  });
});
