import { EventHandler } from "@endless-trash/event-handler";
import { Json } from "@endless-trash/immutable-json-type";
import {
  AtLeastPartiallyValidRequest,
  Prompt,
  requestIsAtLeastPartiallyValid,
} from "@endless-trash/prompt";
import { WebsocketHostParsedInput } from "@endless-trash/websocket-host";
import { WebsocketHostUnserializedOutput } from "@endless-trash/websocket-host-body-serializer";
import { HasInvalidRequestEventHandler } from "../has-invalid-request-event-handler";

export function partParseRequest(
  onSuccessful: EventHandler<
    WebsocketHostParsedInput<AtLeastPartiallyValidRequest>,
    WebsocketHostUnserializedOutput<Prompt>
  >,
  hasInvalidRequestEventHandler: HasInvalidRequestEventHandler
): EventHandler<
  WebsocketHostParsedInput<Json>,
  WebsocketHostUnserializedOutput<Prompt>
> {
  return async (event) => {
    const body = requestIsAtLeastPartiallyValid(event.body);

    if (body === null) {
      return await hasInvalidRequestEventHandler.invalidRequestEventHandler(
        event
      );
    } else {
      return await onSuccessful({ ...event, body });
    }
  };
}
