export type WebsocketHostParsedInput<TParsed> = {
  readonly sessionId: string;

  readonly body: TParsed;
};
