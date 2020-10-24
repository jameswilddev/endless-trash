import { WebsocketHostOutputMessage } from "./websocket-host-output-message";

export * from "./websocket-host-output-message";

export type WebsocketHostOutput = {
  readonly messages: ReadonlyArray<WebsocketHostOutputMessage>;
};
