export interface EventHandler<TInput, TOutput> {
  (input: TInput): Promise<TOutput>;
}
