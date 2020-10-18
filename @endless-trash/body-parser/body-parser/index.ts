import { EventHandler } from "@endless-trash/event-handler";
import { BodyParserInput } from "./body-parser-input";
import { BodyParserOutput } from "./body-parser-output";

export { BodyParserInput } from "./body-parser-input";
export { BodyParserOutput } from "./body-parser-output";

export interface BodyParser<
  TInput extends BodyParserInput,
  TParsed,
  TSuccessfulOutput,
  TFailureOutput
> {
  (
    onSuccessful: EventHandler<
      Pick<TInput, Exclude<keyof TInput, keyof BodyParserOutput<TParsed>>> &
        BodyParserOutput<TParsed>,
      TSuccessfulOutput
    >,
    onFailure: EventHandler<TInput, TFailureOutput>
  ): EventHandler<TInput, TSuccessfulOutput | TFailureOutput>;
}
