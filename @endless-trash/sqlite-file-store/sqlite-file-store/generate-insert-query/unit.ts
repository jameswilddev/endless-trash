import { generateInsertQuery } from ".";

describe(`generateInsertQuery`, () => {
  it(`generates the expected query`, () => {
    expect(
      generateInsertQuery({
        filename: `Test File Name`,
        tableName: `Test Table Name`,
        pathColumnName: `Test Path Column Name`,
        contentColumnName: `Test Content Column Name`,
      })
    ).toEqual(
      `INSERT OR REPLACE INTO 'Test Table Name' ('Test Path Column Name', 'Test Content Column Name') VALUES (?, ?);`
    );
  });
});
