export type SuccessfulBodyParserResult<TParsed> = {
  readonly type: `successful`;
  readonly body: TParsed;
};
