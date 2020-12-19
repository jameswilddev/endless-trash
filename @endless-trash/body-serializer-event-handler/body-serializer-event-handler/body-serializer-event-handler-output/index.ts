import { SerializedBody } from "@endless-trash/body-serializer";

export type BodySerializerEventHandlerOutput = {
  readonly body: SerializedBody;
};
