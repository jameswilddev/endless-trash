export type WebsocketHostOutputMessage = {
  readonly connectionId: string;

  readonly body: null | string | Buffer;
};
