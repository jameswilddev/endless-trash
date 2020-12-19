import { BodyParserResult } from "@endless-trash/body-parser";
import { textBodyParser } from "..";

describe(`textBodyParser`, () => {
  describe(`when the body is null`, () => {
    let result: BodyParserResult<string>;

    beforeAll(async () => {
      result = await textBodyParser(null);
    });

    it(`returns successfully`, () => {
      expect(result).toEqual({
        type: `successful`,
        body: ``,
      });
    });
  });

  describe(`when the body is a string`, () => {
    let result: BodyParserResult<string>;

    beforeAll(async () => {
      result = await textBodyParser(`Test Body; あ, 𩸽, §.`);
    });

    it(`returns successfully`, () => {
      expect(result).toEqual({
        type: `successful`,
        body: `Test Body; あ, 𩸽, §.`,
      });
    });
  });

  describe(`when the body is an empty buffer`, () => {
    let result: BodyParserResult<string>;

    beforeAll(async () => {
      result = await textBodyParser(Buffer.from(Uint8Array.from([])));
    });

    it(`returns successfully`, () => {
      expect(result).toEqual({
        type: `successful`,
        body: ``,
      });
    });
  });

  describe(`when the body is a buffer containing valid UTF-8`, () => {
    let result: BodyParserResult<string>;

    beforeAll(async () => {
      result = await textBodyParser(
        Buffer.from(
          Uint8Array.from([
            0x54,
            0x65,
            0x73,
            0x74,
            0x20,
            0x42,
            0x6f,
            0x64,
            0x79,
            0x3b,
            0x20,
            0xe3,
            0x81,
            0x82,
            0x2c,
            0x20,
            0xf0,
            0xa9,
            0xb8,
            0xbd,
            0x2c,
            0x20,
            0xc2,
            0xa7,
            0x2e,
          ])
        )
      );
    });

    it(`returns successfully`, () => {
      expect(result).toEqual({
        type: `successful`,
        body: `Test Body; あ, 𩸽, §.`,
      });
    });
  });

  describe(`when the body is a buffer containing invalid UTF-8`, () => {
    let result: BodyParserResult<string>;

    beforeAll(async () => {
      result = await textBodyParser(
        Buffer.from(
          Uint8Array.from([
            0x48,
            0x65,
            0x6c,
            0x6c,
            0x6f,
            0x20,
            0xff,
            0x20,
            0x77,
            0x6f,
            0x72,
            0x6c,
            0x64,
          ])
        )
      );
    });

    it(`returns unsuccessfully`, () => {
      expect(result).toEqual({ type: `unsuccessful` });
    });
  });
});
