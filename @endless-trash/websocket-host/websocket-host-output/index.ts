import { WebsocketHostOutputMessage } from "./websocket-host-output-message";
export { WebsocketHostOutputMessage } from "./websocket-host-output-message";

export type WebsocketHostOutput = {
  readonly messages: ReadonlyArray<WebsocketHostOutputMessage>;
};
