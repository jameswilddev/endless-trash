import { generateSelectContentQuery } from ".";

describe(`generateSelectContentQuery`, () => {
  it(`generates the expected query`, () => {
    expect(
      generateSelectContentQuery({
        filename: `Test File Name`,
        tableName: `Test Table Name`,
        pathColumnName: `Test Path Column Name`,
        contentColumnName: `Test Content Column Name`,
      })
    ).toEqual(
      `SELECT 'Test Table Name'.'Test Content Column Name' content FROM 'Test Table Name' WHERE 'Test Table Name'.'Test Path Column Name' = ? LIMIT 1;`
    );
  });
});
