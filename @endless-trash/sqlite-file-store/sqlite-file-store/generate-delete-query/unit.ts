import { generateDeleteQuery } from ".";

describe(`generateDeleteQuery`, () => {
  it(`generates the expected query`, () => {
    expect(
      generateDeleteQuery({
        filename: `Test File Name`,
        tableName: `Test Table Name`,
        pathColumnName: `Test Path Column Name`,
        contentColumnName: `Test Content Column Name`,
      })
    ).toEqual(
      `DELETE FROM 'Test Table Name' WHERE 'Test Table Name'.'Test Path Column Name' = ?;`
    );
  });
});
