export type WebsocketHostOutputMessage = {
  readonly sessionId: string;

  readonly body: null | string | Buffer;
};
