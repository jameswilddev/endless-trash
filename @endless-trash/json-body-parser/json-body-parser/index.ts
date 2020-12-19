import { Json } from "@endless-trash/immutable-json-type";
import { BodyParser } from "@endless-trash/body-parser";
import { textBodyParser } from "@endless-trash/text-body-parser";

export const jsonBodyParser: BodyParser<Json> = async (body) => {
  const parsedAsText = await textBodyParser(body);

  switch (parsedAsText.type) {
    case `successful`:
      try {
        return { type: `successful`, body: JSON.parse(parsedAsText.body) };
      } catch (e) {
        return { type: `unsuccessful` };
      }

    case `unsuccessful`:
      return parsedAsText;
  }
};
