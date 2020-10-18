import { EventHandler } from "@endless-trash/event-handler";

type EventHandlerComposer<TInput, TOutput> = {
  <TNewOutput>(
    eventHandler: EventHandler<TOutput, TNewOutput>
  ): EventHandlerComposer<TInput, TNewOutput>;

  (): EventHandler<TInput, TOutput>;
};

function compose<TInput, TLink, TOutput>(
  a: EventHandler<TInput, TLink>,
  b: EventHandler<TLink, TOutput>
): EventHandlerComposer<TInput, TOutput> {
  const composed = async (input: TInput) => {
    const intermediate = await a(input);
    return await b(intermediate);
  };

  function output<TNewOutput>(
    eventHandler: EventHandler<TOutput, TNewOutput>
  ): EventHandlerComposer<TInput, TNewOutput>;

  function output(): EventHandler<TInput, TOutput>;

  function output<TNewOutput>(
    eventHandler?: EventHandler<TOutput, TNewOutput>
  ): EventHandlerComposer<TInput, TNewOutput> | EventHandler<TInput, TOutput> {
    if (eventHandler) {
      return compose(composed, eventHandler);
    } else {
      return composed;
    }
  }

  return output;
}

export function composeEventHandlers<TInput, TOutput>(
  first: EventHandler<TInput, TOutput>
): EventHandlerComposer<TInput, TOutput> {
  function output<TNewOutput>(
    eventHandler: EventHandler<TOutput, TNewOutput>
  ): EventHandlerComposer<TInput, TNewOutput>;

  function output(): EventHandler<TInput, TOutput>;

  function output<TNewOutput>(
    eventHandler?: EventHandler<TOutput, TNewOutput>
  ): EventHandlerComposer<TInput, TNewOutput> | EventHandler<TInput, TOutput> {
    if (eventHandler) {
      return compose(first, eventHandler);
    } else {
      return first;
    }
  }

  return output;
}
