import { EventHandler } from "@endless-trash/event-handler";
import { Json } from "@endless-trash/immutable-json-type";
import {
  AtLeastPartiallyValidRequest,
  Prompt,
  requestIsAtLeastPartiallyValid,
} from "@endless-trash/prompt";
import { WebsocketHostParsedInput } from "@endless-trash/websocket-host";
import { WebsocketHostUnserializedOutput } from "@endless-trash/websocket-host-body-serializer";

export function partParseRequest(
  onSuccessful: EventHandler<
    WebsocketHostParsedInput<AtLeastPartiallyValidRequest>,
    WebsocketHostUnserializedOutput<Prompt>
  >,
  onFailure: EventHandler<
    WebsocketHostParsedInput<Json>,
    WebsocketHostUnserializedOutput<Prompt>
  >
): EventHandler<
  WebsocketHostParsedInput<Json>,
  WebsocketHostUnserializedOutput<Prompt>
> {
  return async (event) => {
    const body = requestIsAtLeastPartiallyValid(event.body);

    if (body === null) {
      return await onFailure(event);
    } else {
      return await onSuccessful({ ...event, body });
    }
  };
}
