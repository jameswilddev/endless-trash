import { Json } from "@endless-trash/immutable-json-type";
import { BodySerializer } from "@endless-trash/body-serializer";

export function jsonBodySerializer(space?: number): BodySerializer<Json> {
  if (space !== undefined) {
    if (!Number.isFinite(space)) {
      throw new Error(`The "space" argument must be finite.`);
    }

    if (!Number.isInteger(space)) {
      throw new Error(`The "space" argument must be an integer.`);
    }

    if (space < 0 || Object.is(space, -0)) {
      throw new Error(`The "space" argument cannot be less than zero.`);
    }

    if (space > 10) {
      throw new Error(`The "space" argument cannot be greater than ten.`);
    }
  }

  return async (unserialized) => {
    return JSON.stringify(unserialized, null, space);
  };
}
