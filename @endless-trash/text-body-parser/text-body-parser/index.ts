import { TextDecoder } from "util";
import { BodyParser } from "@endless-trash/body-parser";

const decoder = new TextDecoder(`utf-8`, { fatal: true });

export const textBodyParser: BodyParser<string> = async (body) => {
  if (body === null) {
    return {
      type: `successful`,
      body: ``,
    };
  } else if (body instanceof Buffer) {
    let parsed: string;

    try {
      parsed = decoder.decode(body);
    } catch (e) {
      return { type: `unsuccessful` };
    }

    return { type: `successful`, body: parsed };
  } else {
    return {
      type: `successful`,
      body: body,
    };
  }
};
