import { BodyParser } from "@endless-trash/body-parser";
import { EventHandler } from "@endless-trash/event-handler";
import { BodyParserEventHandlerInput } from "./body-parser-event-handler-input";
import { BodyParserEventHandlerOutput } from "./body-parser-event-handler-output";

export function bodyParserEventHandler<
  TInput extends BodyParserEventHandlerInput,
  TParsed,
  TSuccessfulOutput,
  TUnsuccessfulOutput
>(
  bodyParser: BodyParser<TParsed>,
  onSuccessful: EventHandler<
    Pick<
      TInput,
      Exclude<keyof TInput, keyof BodyParserEventHandlerOutput<TParsed>>
    > &
      BodyParserEventHandlerOutput<TParsed>,
    TSuccessfulOutput
  >,
  onUnsuccessful: EventHandler<TInput, TUnsuccessfulOutput>
): EventHandler<TInput, TSuccessfulOutput | TUnsuccessfulOutput> {
  return async (input) => {
    const result = await bodyParser(input.body);

    switch (result.type) {
      case `successful`:
        return await onSuccessful({ ...input, body: result.body });

      case `unsuccessful`:
        return await onUnsuccessful(input);
    }
  };
}
