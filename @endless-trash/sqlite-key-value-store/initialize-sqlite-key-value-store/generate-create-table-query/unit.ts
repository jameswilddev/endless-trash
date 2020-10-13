import { generateCreateTableQuery } from ".";

describe(`generateCreateTableQuery`, () => {
  it(`generates the expected query`, () => {
    expect(
      generateCreateTableQuery({
        filename: `Test File Name`,
        tableName: `Test Table Name`,
        keyColumnName: `Test Key Column Name`,
        valueColumnName: `Test Value Column Name`,
        versionColumnName: `Test Version Column Name`,
      })
    ).toEqual(
      `CREATE TABLE 'Test Table Name' ('Test Key Column Name' TEXT PRIMARY KEY NOT NULL, 'Test Value Column Name' TEXT NOT NULL, 'Test Version Column Name' INTEGER NOT NULL);`
    );
  });
});
