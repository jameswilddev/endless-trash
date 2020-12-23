import { EventHandler } from "@endless-trash/event-handler";
import { AtLeastPartiallyValidRequest, Prompt } from "@endless-trash/prompt";
import { WebsocketHostParsedInput } from "@endless-trash/websocket-host";
import { WebsocketHostUnserializedOutput } from "@endless-trash/websocket-host-body-serializer";
import { HasInvalidRequestEventHandler } from "../has-invalid-request-event-handler";
import { ParsedToken } from "../parsed-token";
import { parseToken } from "./parse-token";

export function parseMetadata<
  TInput extends WebsocketHostParsedInput<AtLeastPartiallyValidRequest>
>(
  onSuccessful: EventHandler<
    Pick<TInput, Exclude<keyof TInput, keyof ParsedToken>> & ParsedToken,
    WebsocketHostUnserializedOutput<Prompt>
  >,
  hasInvalidRequestEventHandler: HasInvalidRequestEventHandler
): EventHandler<TInput, WebsocketHostUnserializedOutput<Prompt>> {
  return async (event) => {
    if (!Object.prototype.hasOwnProperty.call(event.body.metadata, `token`)) {
      return await hasInvalidRequestEventHandler.invalidRequestEventHandler(
        event
      );
    } else if (Object.keys(event.body.metadata).length > 1) {
      return await hasInvalidRequestEventHandler.invalidRequestEventHandler(
        event
      );
    } else {
      const token = parseToken(event.body.metadata.token);

      if (token === null) {
        return await hasInvalidRequestEventHandler.invalidRequestEventHandler(
          event
        );
      } else {
        return await onSuccessful({
          ...event,
          ...token,
        });
      }
    }
  };
}
