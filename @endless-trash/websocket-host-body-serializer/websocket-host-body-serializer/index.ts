import { BodySerializer } from "@endless-trash/body-serializer";
import { PassthroughEventHandler } from "@endless-trash/event-handler";
import {
  WebsocketHostOutput,
  WebsocketHostOutputMessage,
} from "@endless-trash/websocket-host/websocket-host-output";
import { WebsocketHostUnserializedOutput } from "../websocket-host-unserialized-output";

export function websocketHostBodySerializer<TParsed>(
  bodySerializer: BodySerializer<TParsed>
): PassthroughEventHandler<
  WebsocketHostUnserializedOutput<TParsed>,
  WebsocketHostOutput
> {
  return async (input) => {
    const messages: WebsocketHostOutputMessage[] = [];

    for (const message of input.messages) {
      messages.push({
        ...message,
        body: await bodySerializer(message.body),
      });
    }

    return {
      ...input,
      messages,
    };
  };
}
