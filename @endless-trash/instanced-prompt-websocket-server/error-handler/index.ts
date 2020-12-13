import { EventHandler } from "@endless-trash/event-handler";
import { AtLeastPartiallyValidRequest, Prompt } from "@endless-trash/prompt";
import {
  WebsocketHostInput,
  WebsocketHostParsedInput,
} from "@endless-trash/websocket-host";
import { WebsocketHostUnserializedOutput } from "@endless-trash/websocket-host-body-serializer";
import { Json } from "@endless-trash/immutable-json-type";

export function errorHandler(
  prompt: Prompt
): EventHandler<
  | WebsocketHostInput
  | WebsocketHostParsedInput<Json>
  | WebsocketHostParsedInput<AtLeastPartiallyValidRequest>,
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
