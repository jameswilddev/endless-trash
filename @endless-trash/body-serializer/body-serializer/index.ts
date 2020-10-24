import { PassthroughEventHandler } from "@endless-trash/event-handler";
import { BodySerializerInput } from "./body-serializer-input";
import { BodySerializerOutput } from "./body-serializer-output";

export * from "./body-serializer-input";
export * from "./body-serializer-output";

export type BodySerializer<TParsed> = PassthroughEventHandler<
  BodySerializerInput<TParsed>,
  BodySerializerOutput
>;
