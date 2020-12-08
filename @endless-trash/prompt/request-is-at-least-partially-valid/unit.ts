import { Json } from "@endless-trash/immutable-json-type";
import { requestIsAtLeastPartiallyValid } from ".";
import { AtLeastPartiallyValidRequest } from "../at-least-partially-valid-request";

describe(`requestIsAtLeastPartiallyValid`, () => {
  describe(`valid`, () => {
    let output: null | AtLeastPartiallyValidRequest;

    beforeAll(() => {
      output = requestIsAtLeastPartiallyValid({
        metadata: { testMetadataKey: `Test Metadata Value` },
        command: `Test Command`,
      });
    });

    it(`returns the input`, () => {
      expect(output).toEqual({
        metadata: { testMetadataKey: `Test Metadata Value` },
        command: `Test Command`,
      } as AtLeastPartiallyValidRequest);
    });
  });

  function rejects(description: string, value: Json): void {
    describe(description, () => {
      let output: null | AtLeastPartiallyValidRequest;

      beforeAll(() => {
        output = requestIsAtLeastPartiallyValid(value);
      });

      it(`is rejected`, () => {
        expect(output).toBeNull();
      });
    });
  }

  rejects(`missing metadata`, { command: { type: `refresh` } });

  rejects(`missing command`, { metadata: {} });

  rejects(`unexpected properties`, {
    metadata: {},
    command: { type: `refresh` },
    testUnexpectedKey: `Test Unexpected Value`,
  });

  rejects(`null`, null);

  rejects(`arrays`, []);

  rejects(`empty objects`, {});

  rejects(`false`, false);

  rejects(`true`, true);

  rejects(`numbers`, 5.21);

  rejects(`strings`, `Test String`);

  rejects(`metadata null`, {
    metadata: null,
    command: `Test Command`,
  });

  rejects(`metadata array`, {
    metadata: [],
    command: `Test Command`,
  });

  rejects(`metadata false`, {
    metadata: false,
    command: `Test Command`,
  });

  rejects(`metadata true`, {
    metadata: true,
    command: `Test Command`,
  });

  rejects(`metadata number`, {
    metadata: 5.21,
    command: `Test Command`,
  });

  rejects(`metadata string`, {
    metadata: `Test String`,
    command: `Test Command`,
  });
});
