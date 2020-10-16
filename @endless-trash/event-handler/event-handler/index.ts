export interface EventHandler<TInput, TOutput> {
  execute(input: TInput): Promise<TOutput>;
}
