import { WebsocketHostUnserializedOutputMessage } from "./websocket-host-unserialized-output-message";

export { WebsocketHostUnserializedOutputMessage } from "./websocket-host-unserialized-output-message";

export type WebsocketHostUnserializedOutput<TParsed> = {
  readonly messages: ReadonlyArray<
    WebsocketHostUnserializedOutputMessage<TParsed>
  >;
};
