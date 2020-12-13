import { EventHandler } from "@endless-trash/event-handler";

import { AtLeastPartiallyValidRequest } from "@endless-trash/prompt";
import { WebsocketHostParsedInput } from "@endless-trash/websocket-host";
import { ParsedToken } from "../parsed-token";
import { parseToken } from "./parse-token";

export function parseMetadata<
  TInput extends WebsocketHostParsedInput<AtLeastPartiallyValidRequest>,
  TSuccessfulOutput,
  TFailureOutput
>(
  onSuccessful: EventHandler<
    Pick<TInput, Exclude<keyof TInput, keyof ParsedToken>> & ParsedToken,
    TSuccessfulOutput
  >,
  onFailure: EventHandler<TInput, TFailureOutput>
): EventHandler<TInput, TSuccessfulOutput | TFailureOutput> {
  return async (event) => {
    if (!Object.prototype.hasOwnProperty.call(event.body.metadata, `token`)) {
      return await onFailure(event);
    } else if (Object.keys(event.body.metadata).length > 1) {
      return await onFailure(event);
    } else {
      const token = parseToken(event.body.metadata.token);

      if (token === null) {
        return await onFailure(event);
      } else {
        return await onSuccessful({
          ...event,
          ...token,
        });
      }
    }
  };
}
