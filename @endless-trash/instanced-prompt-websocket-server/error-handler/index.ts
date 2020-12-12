import { EventHandler } from "@endless-trash/event-handler";
import { Prompt } from "@endless-trash/prompt";
import { WebsocketHostParsedInput } from "@endless-trash/websocket-host";
import { WebsocketHostUnserializedOutput } from "@endless-trash/websocket-host-body-serializer";

export function errorHandler(
  prompt: Prompt
): EventHandler<
  WebsocketHostParsedInput<unknown>,
  WebsocketHostUnserializedOutput<Prompt>
> {
  return async (event) => ({
    messages: [
      {
        body: prompt,
        sessionId: event.sessionId,
      },
    ],
  });
}
