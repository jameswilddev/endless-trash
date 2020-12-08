import { AtLeastPartiallyValidRequest } from "../at-least-partially-valid-request";
import { Prompt } from "../prompt";
import { Request } from "../request";
import { commandIsValid } from "./command-is-valid";

export function requestIsValid(
  prompt: Prompt,
  atLeastPartiallyValidRequest: AtLeastPartiallyValidRequest
): null | Request {
  if (!commandIsValid(prompt, atLeastPartiallyValidRequest.command)) {
    return null;
  } else {
    return atLeastPartiallyValidRequest as Request;
  }
}
