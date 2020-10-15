import { generateCreateTableQuery } from ".";

describe(`generateCreateTableQuery`, () => {
  it(`generates the expected query`, () => {
    expect(
      generateCreateTableQuery({
        filename: `Test File Name`,
        tableName: `Test Table Name`,
        pathColumnName: `Test Path Column Name`,
        contentColumnName: `Test Content Column Name`,
      })
    ).toEqual(
      `CREATE TABLE 'Test Table Name' ('Test Path Column Name' TEXT PRIMARY KEY NOT NULL, 'Test Content Column Name' BLOB NOT NULL);`
    );
  });
});
