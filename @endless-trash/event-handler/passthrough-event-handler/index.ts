export interface PassthroughEventHandler<TInput, TOutput> {
  <TActualInput extends TInput>(input: TActualInput): Promise<
    Pick<TActualInput, Exclude<keyof TActualInput, keyof TOutput>> & TOutput
  >;
}
