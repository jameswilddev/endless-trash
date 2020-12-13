import { Json } from "@endless-trash/immutable-json-type";
import { ParsedToken } from "../../parsed-token";

export function parseToken(token: Json): null | ParsedToken {
  if (typeof token === `string`) {
    const match = /^([a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12})-([a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12})$/.exec(
      token
    );

    if (match === null) {
      return null;
    } else {
      return {
        instanceId: match[1],
        userId: match[2],
      };
    }
  } else {
    return null;
  }
}
