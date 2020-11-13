import { removeWhiteSpace } from ".";

describe(`removeWhiteSpace`, () => {
  function scenario(description: string, input: string, output: string): void {
    describe(description, () => {
      let result: null | string;

      beforeAll(() => {
        result = removeWhiteSpace(input);
      });

      it(`returns the input, sans white space`, () => {
        expect(result).toEqual(output);
      });
    });
  }

  function nullScenario(description: string, input: string): void {
    describe(description, () => {
      let result: null | string;

      beforeAll(() => {
        result = removeWhiteSpace(input);
      });

      it(`returns null`, () => {
        expect(result).toBeNull();
      });
    });
  }

  nullScenario(`empty string`, ``);
  nullScenario(`only white space`, `    \n    \t    \r    `);

  scenario(
    `unpadded characters`,
    `testUnpaddedCharacters`,
    `testUnpaddedCharacters`
  );

  scenario(
    `padded characters`,
    `   \t   \n   \r    testUnpaddedCharacters   \r \n \t    `,
    `testUnpaddedCharacters`
  );

  scenario(
    `padded characters continaing white space`,
    `   \t   \n   \r    Test    \n \t \r Unpadded \n \t \t \r    Characters   \r \n \t    `,
    `TestUnpaddedCharacters`
  );
});
