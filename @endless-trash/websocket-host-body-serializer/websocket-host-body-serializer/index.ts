import { BodySerializer } from "@endless-trash/body-serializer";
import { EventHandler } from "@endless-trash/event-handler";
import {
  WebsocketHostInput,
  WebsocketHostOutput,
  WebsocketHostOutputMessage,
} from "@endless-trash/websocket-host";
import { WebsocketHostUnserializedOutput } from "../websocket-host-unserialized-output";

export function websocketHostBodySerializer<
  TInput extends WebsocketHostInput,
  TParsed,
  TOutput extends WebsocketHostOutput
>(
  bodySerializer: BodySerializer<TParsed>,
  wrapped: EventHandler<
    TInput,
    Pick<
      TOutput,
      Exclude<keyof TOutput, keyof WebsocketHostUnserializedOutput<TParsed>>
    > &
      WebsocketHostUnserializedOutput<TParsed>
  >
): EventHandler<TInput, TOutput> {
  return async (input) => {
    const output = await wrapped(input);

    const messages: WebsocketHostOutputMessage[] = [];

    for (const message of output.messages) {
      messages.push({
        ...message,
        body: await bodySerializer(message.body),
      });
    }

    return ({
      ...output,
      messages,
    } as unknown) as TOutput;
  };
}
