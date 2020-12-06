import { refreshIsValid } from ".";

describe(`refreshIsValid`, () => {
  describe(`when the request is valid`, () => {
    let output: boolean;

    beforeAll(() => {
      output = refreshIsValid({ type: `refresh` });
    });

    it(`returns true`, () => {
      expect(output).toBeTrue();
    });
  });

  describe(`when there are unexpected fields`, () => {
    let output: boolean;

    beforeAll(() => {
      output = refreshIsValid({
        type: `refresh`,
        testUnexpectedKey: `Test Unexpected Value`,
      });
    });

    it(`returns false`, () => {
      expect(output).toBeFalse();
    });
  });
});
