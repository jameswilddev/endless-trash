import { Json } from "@endless-trash/immutable-json-type";
import { parseToken } from ".";
import { ParsedToken } from "../../parsed-token";

describe(`parseToken`, () => {
  describe(`valid`, () => {
    let output: null | ParsedToken;

    beforeAll(() => {
      output = parseToken(
        `f00982a4-372d-4d62-bd69-b89352a07d25-84865957-9997-4500-ba4c-884cc63a916a`
      );
    });

    it(`returns the instance and user IDs`, () => {
      expect(output).toEqual({
        instanceId: `f00982a4-372d-4d62-bd69-b89352a07d25`,
        userId: `84865957-9997-4500-ba4c-884cc63a916a`,
      });
    });
  });

  function rejects(description: string, token: Json): void {
    describe(description, () => {
      let output: null | ParsedToken;

      beforeAll(() => {
        output = parseToken(token);
      });

      it(`returns null`, () => {
        expect(output).toBeNull();
      });
    });
  }

  rejects(`false`, false);
  rejects(`true`, true);
  rejects(`null`, null);
  rejects(`number`, 45.2);
  rejects(`arrays`, []);
  rejects(`objects`, {});
  rejects(
    `truncated`,
    `f00982a4-372d-4d62-bd69-b89352a07d25-84865957-9997-4500-ba4c-884cc63a916`
  );
  rejects(
    `extended`,
    `f00982a4-372d-4d62-bd69-b89352a07d25-84865957-9997-4500-ba4c-884cc63a916a4`
  );
  rejects(
    `misplaced separator`,
    `f00982a4-372d-4d62b-d69-b89352a07d25-84865957-9997-4500-ba4c-884cc63a916`
  );
  rejects(
    `invalid character`,
    `f00982a4-372d-4d62-bd69-b89352q07d25-84865957-9997-4500-ba4c-884cc63a916`
  );
  rejects(
    `invalid separator`,
    `f00982a4-372d-4d62-bd69_b89352a07d25-84865957-9997-4500-ba4c-884cc63a916`
  );
});
