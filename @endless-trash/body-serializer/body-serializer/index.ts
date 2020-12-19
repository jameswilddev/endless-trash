import { SerializedBody } from "./serialized-body";

export { SerializedBody } from "./serialized-body";

export interface BodySerializer<TUnserializedLimit> {
  <TUnserialized extends TUnserializedLimit>(
    unserialized: TUnserialized
  ): Promise<SerializedBody>;
}
