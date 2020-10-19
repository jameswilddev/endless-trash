import { Json } from "@endless-trash/immutable-json-type";
import { EventHandler } from "@endless-trash/event-handler";
import {
  BodyParserInput,
  BodyParserOutput,
  BodyParser,
} from "@endless-trash/body-parser";

import { textBodyParser } from "@endless-trash/text-body-parser";

export const jsonBodyParser: BodyParser<Json> = <
  TInput extends BodyParserInput,
  TSuccessfulOutput,
  TFailureOutput
>(
  onSuccessful: EventHandler<
    Pick<TInput, Exclude<keyof TInput, keyof BodyParserOutput<Json>>> &
      BodyParserOutput<Json>,
    TSuccessfulOutput
  >,
  onFailure: EventHandler<TInput, TFailureOutput>
): EventHandler<TInput, TSuccessfulOutput | TFailureOutput> => {
  return async (input) => {
    return textBodyParser(async (withParsedText) => {
      let json: Json;

      try {
        json = JSON.parse(withParsedText.body);
      } catch (e) {
        return await onFailure(input);
      }

      return await onSuccessful({
        ...withParsedText,
        body: json,
      });
    }, onFailure)(input);
  };
};
