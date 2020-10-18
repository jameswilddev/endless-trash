import { EventHandler } from "@endless-trash/event-handler";
import { BodySerializerInput } from "./body-serializer-input";
import { BodySerializerOutput } from "./body-serializer-output";

export { BodySerializerInput } from "./body-serializer-input";
export { BodySerializerOutput } from "./body-serializer-output";

export interface BodySerializer<T> {
  <TInput extends BodySerializerInput<T>>(): EventHandler<
    TInput,
    Pick<TInput, Exclude<keyof TInput, keyof BodySerializerOutput>> &
      BodySerializerOutput
  >;
}
