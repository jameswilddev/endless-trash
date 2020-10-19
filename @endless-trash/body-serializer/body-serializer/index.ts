import { PassthroughEventHandler } from "../../event-handler";
import { BodySerializerInput } from "./body-serializer-input";
import { BodySerializerOutput } from "./body-serializer-output";

export { BodySerializerInput } from "./body-serializer-input";
export { BodySerializerOutput } from "./body-serializer-output";

export type BodySerializer<TParsed> = PassthroughEventHandler<
  BodySerializerInput<TParsed>,
  BodySerializerOutput
>;
