export type WebsocketHostUnserializedOutputMessage<TParsed> = {
  readonly sessionId: string;

  readonly body: TParsed;
};
