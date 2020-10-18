import { WebsocketHostInput } from "@endless-trash/websocket-host";

export function convertEventToInput<T>(
  inject: T,
  event: {
    readonly body: null | string;
    readonly isBase64Encoded: boolean;
    readonly requestContext: {
      readonly connectionId?: string;
    };
  }
): WebsocketHostInput & T {
  return {
    ...inject,
    sessionId: event.requestContext.connectionId as string,
    body: event.body
      ? event.isBase64Encoded
        ? Buffer.from(event.body, `base64`)
        : event.body
      : null,
  };
}
