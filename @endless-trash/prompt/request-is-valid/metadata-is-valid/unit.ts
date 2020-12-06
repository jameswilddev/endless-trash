import { Json } from "@endless-trash/immutable-json-type";
import { metadataIsValid } from ".";

describe(`metadataIsValid`, () => {
  describe(`when valid`, () => {
    let metadataContentIsValid: jasmine.Spy;
    let output: boolean;

    beforeAll(() => {
      metadataContentIsValid = jasmine
        .createSpy(`metadataContentIsValid`)
        .and.returnValue(true);

      output = metadataIsValid(metadataContentIsValid, {
        testKey: `Test Value`,
      });
    });

    it(`executes the callback once`, () => {
      expect(metadataContentIsValid).toHaveBeenCalledTimes(1);
    });

    it(`executes the callback with the metadata`, () => {
      expect(metadataContentIsValid).toHaveBeenCalledWith({
        testKey: `Test Value`,
      });
    });

    it(`returns true`, () => {
      expect(output).toBeTrue();
    });
  });

  describe(`when valid, other than the callback returning false`, () => {
    let metadataContentIsValid: jasmine.Spy;
    let output: boolean;

    beforeAll(() => {
      metadataContentIsValid = jasmine
        .createSpy(`metadataContentIsValid`)
        .and.returnValue(false);

      output = metadataIsValid(metadataContentIsValid, {
        testKey: `Test Value`,
      });
    });

    it(`executes the callback once`, () => {
      expect(metadataContentIsValid).toHaveBeenCalledTimes(1);
    });

    it(`executes the callback with the metadata`, () => {
      expect(metadataContentIsValid).toHaveBeenCalledWith({
        testKey: `Test Value`,
      });
    });

    it(`returns false`, () => {
      expect(output).toBeFalse();
    });
  });

  function rejects(description: string, metadata: Json): void {
    describe(description, () => {
      let metadataContentIsValid: jasmine.Spy;
      let output: boolean;

      beforeAll(() => {
        metadataContentIsValid = jasmine.createSpy(`metadataContentIsValid`);

        output = metadataIsValid(metadataContentIsValid, metadata);
      });

      it(`does not execute the callback`, () => {
        expect(metadataContentIsValid).not.toHaveBeenCalled();
      });

      it(`returns false`, () => {
        expect(output).toBeFalse();
      });
    });
  }

  rejects(`null`, null);

  rejects(`arrays`, []);

  rejects(`false`, false);

  rejects(`true`, true);

  rejects(`numbers`, 5.21);

  rejects(`strings`, `Test String`);
});
