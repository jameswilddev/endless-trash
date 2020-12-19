import { BodySerializer } from "@endless-trash/body-serializer";
import { EventHandler } from "@endless-trash/event-handler";
import { BodySerializerEventHandlerInput } from "./body-serializer-event-handler-input";
import { BodySerializerEventHandlerOutput } from "./body-serializer-event-handler-output";

export { BodySerializerEventHandlerInput } from "./body-serializer-event-handler-input";
export { BodySerializerEventHandlerOutput } from "./body-serializer-event-handler-output";

export function bodySerializerEventHandler<
  TInput,
  TParsed,
  TOutput extends BodySerializerEventHandlerInput<TParsed>
>(
  wrapped: EventHandler<TInput, TOutput>,
  bodySerializer: BodySerializer<TParsed>
): EventHandler<
  TInput,
  Pick<
    TOutput,
    Exclude<keyof TOutput, keyof BodySerializerEventHandlerOutput>
  > &
    BodySerializerEventHandlerOutput
> {
  return async (input) => {
    const output = await wrapped(input);

    return { ...output, body: await bodySerializer(output.body) };
  };
}
