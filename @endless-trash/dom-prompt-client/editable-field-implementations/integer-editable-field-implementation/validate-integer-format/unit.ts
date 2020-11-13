import { validateIntegerFormat } from ".";

describe(`validateIntegerFormat`, () => {
  function invalidScenario(description: string, text: string): void {
    describe(description, () => {
      let result: boolean;

      beforeAll(() => {
        result = validateIntegerFormat(text);
      });

      it(`returns false`, () => {
        expect(result).toBeFalse();
      });
    });
  }

  function validScenario(description: string, text: string): void {
    describe(description, () => {
      let result: boolean;

      beforeAll(() => {
        result = validateIntegerFormat(text);
      });

      it(`returns true`, () => {
        expect(result).toBeTrue();
      });
    });
  }

  invalidScenario(`positive nothing`, `+`);
  invalidScenario(`negative nothing`, `-`);
  invalidScenario(`decimal`, `.`);
  invalidScenario(`positive decimal`, `+.`);
  invalidScenario(`negative decimal`, `-.`);
  invalidScenario(`letter`, `q`);
  invalidScenario(`positive letter`, `+q`);
  invalidScenario(`negative letter`, `-q`);
  invalidScenario(`symbol`, `$`);
  invalidScenario(`positive symbol`, `+$`);
  invalidScenario(`negative symbol`, `-$`);
  invalidScenario(`double positive`, `++`);
  invalidScenario(`positive negative`, `+-`);
  invalidScenario(`negative positive`, `-+`);
  invalidScenario(`double negative`, `--`);

  invalidScenario(`positive digits prefixed positive`, `++527`);
  invalidScenario(`negative digits prefixed positive`, `-+527`);
  invalidScenario(`positive digits prefixed negative`, `+-527`);
  invalidScenario(`negative digits prefixed negative`, `--527`);
  invalidScenario(`digits prefixed decimal`, `.527`);
  invalidScenario(`positive digits prefixed decimal`, `+.527`);
  invalidScenario(`negative digits prefixed decimal`, `-.527`);
  invalidScenario(`digits prefixed symbol`, `$527`);
  invalidScenario(`positive digits prefixed symbol`, `+$527`);
  invalidScenario(`negative digits prefixed symbol`, `-$527`);

  invalidScenario(`digits containing positive`, `52+7`);
  invalidScenario(`positive digits containing positive`, `+52+7`);
  invalidScenario(`negative digits containing positive`, `-52+7`);
  invalidScenario(`digits containing negative`, `52-7`);
  invalidScenario(`positive digits containing negative`, `+52-7`);
  invalidScenario(`negative digits containing negative`, `-52-7`);
  invalidScenario(`digits containing decimal`, `52.7`);
  invalidScenario(`positive digits containing decimal`, `+52.7`);
  invalidScenario(`negative digits containing decimal`, `-52.7`);
  invalidScenario(`digits containing symbol`, `52$7`);
  invalidScenario(`positive digits containing symbol`, `+52$7`);
  invalidScenario(`negative digits containing symbol`, `-52$7`);

  invalidScenario(`digits suffixed positive`, `527+`);
  invalidScenario(`positive digits suffixed positive`, `+527+`);
  invalidScenario(`negative digits suffixed positive`, `-527+`);
  invalidScenario(`digits suffixed negative`, `527-`);
  invalidScenario(`positive digits suffixed negative`, `+527-`);
  invalidScenario(`negative digits suffixed negative`, `-527-`);
  invalidScenario(`digits suffixed decimal`, `527.`);
  invalidScenario(`positive digits suffixed decimal`, `+527.`);
  invalidScenario(`negative digits suffixed decimal`, `-527.`);
  invalidScenario(`digits suffixed symbol`, `527$`);
  invalidScenario(`positive digits suffixed symbol`, `+527$`);
  invalidScenario(`negative digits suffixed symbol`, `-527$`);

  validScenario(`zero`, `0`);
  validScenario(`negative zero`, `-0`);
  validScenario(`positive zero`, `+0`);
  validScenario(`digit`, `5`);
  validScenario(`negative digit`, `-5`);
  validScenario(`positive digit`, `+5`);
  validScenario(`digits`, `527`);
  validScenario(`negative digits`, `-527`);
  validScenario(`positive digits`, `+527`);
});
