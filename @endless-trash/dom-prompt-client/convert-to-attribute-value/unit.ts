import { convertToAttributeValue } from ".";

describe(`convertToAttributeValue`, () => {
  const scenarios: ReadonlyArray<readonly [string, string]> = [
    [`test`, `test`],
    [`Test`, `test`],
    [
      `  \n \r \t  Test String  \n \t \r With TXT White Space \t \t \r \n   `,
      `test-string-with-txt-white-space`,
    ],
    [`test_snake_cased_string`, `test-snake-cased-string`],
    [`test-kebab-cased-string`, `test-kebab-cased-string`],
    [`TEST_SNAKE_CASED_STRING`, `test-snake-cased-string`],
    [`TEST-KEBAB-CASED-STRING`, `test-kebab-cased-string`],
    [`_test_snake_cased_string`, `test-snake-cased-string`],
    [`-test-kebab-cased-string`, `test-kebab-cased-string`],
    [`TestPascalCasedTXTString`, `test-pascal-cased-txt-string`],
    [`testCamelCasedTXTString`, `test-camel-cased-txt-string`],
    [`TestPascalCasedStringTXT`, `test-pascal-cased-string-txt`],
    [`testCamelCasedStringTXT`, `test-camel-cased-string-txt`],
    [`TXTTestPascalCasedString`, `txt-test-pascal-cased-string`],
    [`TestPascalCasedTXString`, `test-pascal-cased-tx-string`],
    [`testCamelCasedTXString`, `test-camel-cased-tx-string`],
    [`TestPascalCasedStringTX`, `test-pascal-cased-string-tx`],
    [`testCamelCasedStringTX`, `test-camel-cased-string-tx`],
    [`TXTestPascalCasedString`, `tx-test-pascal-cased-string`],
    [`TestPascalCasedTString`, `test-pascal-cased-t-string`],
    [`testCamelCasedTString`, `test-camel-cased-t-string`],
    [`TestPascalCasedStringT`, `test-pascal-cased-string-t`],
    [`testCamelCasedStringT`, `test-camel-cased-string-t`],
    [`TTestPascalCasedString`, `t-test-pascal-cased-string`],
    [`TXT`, `txt`],
    [`A B C`, `a-b-c`],
  ];

  for (const scenario of scenarios) {
    describe(`given ${JSON.stringify(scenario[0])}`, () => {
      let output: string;

      beforeAll(() => {
        output = convertToAttributeValue(scenario[0]);
      });

      it(`returns ${JSON.stringify(scenario[1])}`, () => {
        expect(output).toEqual(scenario[1]);
      });
    });
  }
});
