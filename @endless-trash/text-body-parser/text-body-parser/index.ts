import { TextDecoder } from "util";
import { EventHandler } from "@endless-trash/event-handler";
import {
  BodyParserInput,
  BodyParserOutput,
  BodyParser,
} from "@endless-trash/body-parser";

const decoder = new TextDecoder(`utf-8`, { fatal: true });

export const textBodyParser: BodyParser<string> = <
  TInput extends BodyParserInput,
  TSuccessfulOutput,
  TFailureOutput
>(
  onSuccessful: EventHandler<
    Pick<TInput, Exclude<keyof TInput, keyof BodyParserOutput<string>>> &
      BodyParserOutput<string>,
    TSuccessfulOutput
  >,
  onFailure: EventHandler<TInput, TFailureOutput>
): EventHandler<TInput, TSuccessfulOutput | TFailureOutput> => {
  return async (input) => {
    if (input.body === null) {
      return await onSuccessful({
        ...input,
        body: ``,
      });
    } else if (input.body instanceof Buffer) {
      let body: string;

      try {
        body = decoder.decode(input.body);
      } catch (e) {
        return await onFailure(input);
      }

      return await onSuccessful({
        ...input,
        body,
      });
    } else {
      return await onSuccessful({
        ...input,
        body: input.body,
      });
    }
  };
};
