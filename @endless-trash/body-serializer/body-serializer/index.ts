import { EventHandler } from "@endless-trash/event-handler";
import { BodySerializerInput } from "./body-serializer-input";
import { BodySerializerOutput } from "./body-serializer-output";

export { BodySerializerInput } from "./body-serializer-input";
export { BodySerializerOutput } from "./body-serializer-output";

export interface BodySerializer<T> {
  <TInput, TOutput extends BodySerializerInput<T>>(
    eventHandler: EventHandler<TInput, TOutput>
  ): EventHandler<
    TInput,
    Pick<TOutput, Exclude<keyof TOutput, keyof BodySerializerOutput>> &
      BodySerializerOutput
  >;
}
