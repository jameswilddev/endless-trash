import { validateFloatFormat } from ".";

describe(`validateFloatFormat`, () => {
  function invalidScenario(description: string, text: string): void {
    describe(description, () => {
      let result: boolean;

      beforeAll(() => {
        result = validateFloatFormat(text);
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
        result = validateFloatFormat(text);
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

  invalidScenario(`positive digits prefixed positive`, `++527142`);
  invalidScenario(`negative digits prefixed positive`, `-+527142`);
  invalidScenario(`positive digits prefixed negative`, `+-527142`);
  invalidScenario(`negative digits prefixed negative`, `--527142`);
  validScenario(`digits prefixed decimal`, `.527142`);
  validScenario(`positive digits prefixed decimal`, `+.527142`);
  validScenario(`negative digits prefixed decimal`, `-.527142`);
  invalidScenario(`digits prefixed symbol`, `$527142`);
  invalidScenario(`positive digits prefixed symbol`, `+$527142`);
  invalidScenario(`negative digits prefixed symbol`, `-$527142`);

  invalidScenario(`digits containing positive`, `52+7142`);
  invalidScenario(`positive digits containing positive`, `+52+7142`);
  invalidScenario(`negative digits containing positive`, `-52+7142`);
  invalidScenario(`digits containing negative`, `52-7142`);
  invalidScenario(`positive digits containing negative`, `+52-7142`);
  invalidScenario(`negative digits containing negative`, `-52-7142`);
  validScenario(`digits containing decimal`, `52.7142`);
  validScenario(`positive digits containing decimal`, `+52.7142`);
  validScenario(`negative digits containing decimal`, `-52.7142`);
  invalidScenario(`digits containing symbol`, `52$7142`);
  invalidScenario(`positive digits containing symbol`, `+52$7142`);
  invalidScenario(`negative digits containing symbol`, `-52$7142`);

  invalidScenario(`digits suffixed positive`, `527142+`);
  invalidScenario(`positive digits suffixed positive`, `+527142+`);
  invalidScenario(`negative digits suffixed positive`, `-527142+`);
  invalidScenario(`digits suffixed negative`, `527142-`);
  invalidScenario(`positive digits suffixed negative`, `+527142-`);
  invalidScenario(`negative digits suffixed negative`, `-527142-`);
  validScenario(`digits suffixed decimal`, `527142.`);
  validScenario(`positive digits suffixed decimal`, `+527142.`);
  validScenario(`negative digits suffixed decimal`, `-527142.`);
  invalidScenario(`digits suffixed symbol`, `527142$`);
  invalidScenario(`positive digits suffixed symbol`, `+527142$`);
  invalidScenario(`negative digits suffixed symbol`, `-527142$`);

  invalidScenario(`positive decimal prefixed positive`, `++.527142`);
  invalidScenario(`negative decimal prefixed positive`, `-+.527142`);
  invalidScenario(`positive decimal prefixed negative`, `+-.527142`);
  invalidScenario(`negative decimal prefixed negative`, `--.527142`);
  invalidScenario(`decimal prefixed decimal`, `..527142`);
  invalidScenario(`positive decimal prefixed decimal`, `+..527142`);
  invalidScenario(`negative decimal prefixed decimal`, `-..527142`);
  invalidScenario(`decimal prefixed symbol`, `$.527142`);
  invalidScenario(`positive decimal prefixed symbol`, `+$.527142`);
  invalidScenario(`negative decimal prefixed symbol`, `-$.527142`);

  invalidScenario(`decimal containing positive`, `.52+7142`);
  invalidScenario(`positive decimal containing positive`, `+.52+7142`);
  invalidScenario(`negative decimal containing positive`, `-.52+7142`);
  invalidScenario(`decimal containing negative`, `.52-7142`);
  invalidScenario(`positive decimal containing negative`, `+.52-7142`);
  invalidScenario(`negative decimal containing negative`, `-.52-7142`);
  invalidScenario(`decimal containing decimal`, `.52.7142`);
  invalidScenario(`positive decimal containing decimal`, `+.52.7142`);
  invalidScenario(`negative decimal containing decimal`, `-.52.7142`);
  invalidScenario(`decimal containing symbol`, `.52$7142`);
  invalidScenario(`positive decimal containing symbol`, `+.52$7142`);
  invalidScenario(`negative decimal containing symbol`, `-.52$7142`);

  invalidScenario(`decimal suffixed positive`, `.527142+`);
  invalidScenario(`positive decimal suffixed positive`, `+.527142+`);
  invalidScenario(`negative decimal suffixed positive`, `-.527142+`);
  invalidScenario(`decimal suffixed negative`, `.527142-`);
  invalidScenario(`positive decimal suffixed negative`, `+.527142-`);
  invalidScenario(`negative decimal suffixed negative`, `-.527142-`);
  invalidScenario(`decimal suffixed decimal`, `.527142.`);
  invalidScenario(`positive decimal suffixed decimal`, `+.527142.`);
  invalidScenario(`negative decimal suffixed decimal`, `-.527142.`);
  invalidScenario(`decimal suffixed symbol`, `.527142$`);
  invalidScenario(`positive decimal suffixed symbol`, `+.527142$`);
  invalidScenario(`negative decimal suffixed symbol`, `-.527142$`);

  invalidScenario(`positive suffixed digits prefixed positive`, `++527142.`);
  invalidScenario(`negative suffixed digits prefixed positive`, `-+527142.`);
  invalidScenario(`positive suffixed digits prefixed negative`, `+-527142.`);
  invalidScenario(`negative suffixed digits prefixed negative`, `--527142.`);
  invalidScenario(`suffixed digits prefixed decimal`, `.527142.`);
  invalidScenario(`positive suffixed digits prefixed decimal`, `+.527142.`);
  invalidScenario(`negative suffixed digits prefixed decimal`, `-.527142.`);
  invalidScenario(`suffixed digits prefixed symbol`, `$527142.`);
  invalidScenario(`positive suffixed digits prefixed symbol`, `+$527142.`);
  invalidScenario(`negative suffixed digits prefixed symbol`, `-$527142.`);

  invalidScenario(`suffixed digits containing positive`, `52+7142.`);
  invalidScenario(`positive suffixed digits containing positive`, `+52+7142.`);
  invalidScenario(`negative suffixed digits containing positive`, `-52+7142.`);
  invalidScenario(`suffixed digits containing negative`, `52-7142.`);
  invalidScenario(`positive suffixed digits containing negative`, `+52-7142.`);
  invalidScenario(`negative suffixed digits containing negative`, `-52-7142.`);
  invalidScenario(`suffixed digits containing decimal`, `52.7142.`);
  invalidScenario(`positive suffixed digits containing decimal`, `+52.7142.`);
  invalidScenario(`negative suffixed digits containing decimal`, `-52.7142.`);
  invalidScenario(`suffixed digits containing symbol`, `52$7142.`);
  invalidScenario(`positive suffixed digits containing symbol`, `+52$7142.`);
  invalidScenario(`negative suffixed digits containing symbol`, `-52$7142.`);

  invalidScenario(`suffixed digits suffixed positive`, `527142+.`);
  invalidScenario(`positive suffixed digits suffixed positive`, `+527142+.`);
  invalidScenario(`negative suffixed digits suffixed positive`, `-527142+.`);
  invalidScenario(`suffixed digits suffixed negative`, `527142-.`);
  invalidScenario(`positive suffixed digits suffixed negative`, `+527142-.`);
  invalidScenario(`negative suffixed digits suffixed negative`, `-527142-.`);
  invalidScenario(`suffixed digits suffixed decimal`, `527142..`);
  invalidScenario(`positive suffixed digits suffixed decimal`, `+527142..`);
  invalidScenario(`negative suffixed digits suffixed decimal`, `-527142..`);
  invalidScenario(`suffixed digits suffixed symbol`, `527142$.`);
  invalidScenario(`positive suffixed digits suffixed symbol`, `+527142$.`);
  invalidScenario(`negative suffixed digits suffixed symbol`, `-527142$.`);

  invalidScenario(`digits containing double decimal`, `52..71421`);
  invalidScenario(`positive digits containing double decimal`, `+52..71421`);
  invalidScenario(`negative digits containing double decimal`, `-52..71421`);
  invalidScenario(`digits containing two decimals`, `52.714.21`);
  invalidScenario(`positive digits containing two decimals`, `+52.714.21`);
  invalidScenario(`negative digits containing two decimals`, `-52.714.21`);

  validScenario(`zero`, `0`);
  validScenario(`negative zero`, `-0`);
  validScenario(`positive zero`, `+0`);
  validScenario(`digit`, `5`);
  validScenario(`negative digit`, `-5`);
  validScenario(`positive digit`, `+5`);
  validScenario(`digits`, `527142`);
  validScenario(`negative digits`, `-527142`);
  validScenario(`positive digits`, `+527142`);
});
