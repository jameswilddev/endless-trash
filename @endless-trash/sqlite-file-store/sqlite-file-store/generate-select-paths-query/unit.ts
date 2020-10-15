import { generateSelectPathsQuery } from ".";

describe(`generateSelectPathsQuery`, () => {
  it(`generates the expected query`, () => {
    expect(
      generateSelectPathsQuery({
        filename: `Test File Name`,
        tableName: `Test Table Name`,
        pathColumnName: `Test Path Column Name`,
        contentColumnName: `Test Content Column Name`,
      })
    ).toEqual(
      `SELECT 'Test Table Name'.'Test Path Column Name' path FROM 'Test Table Name' WHERE 'Test Table Name'.'Test Path Column Name' LIKE ? ESCAPE '\\' ORDER BY 'Test Table Name'.'Test Path Column Name';`
    );
  });
});
