import { Json } from "@endless-trash/immutable-json-type";
import { Prompt } from "../../prompt";
import { formSubmissionIsValid } from "./form-submission-is-valid";
import { refreshIsValid } from "./refresh-is-valid";

export function commandIsValid(prompt: Prompt, command: Json): boolean {
  if (command === null) {
    return false;
  } else if (typeof command !== `object`) {
    return false;
  } else if (Array.isArray(command)) {
    return false;
  } else if (!Object.prototype.hasOwnProperty.call(command, `type`)) {
    return false;
  } else {
    switch (command.type) {
      case `formSubmission`:
        return formSubmissionIsValid(prompt, command);

      case `refresh`:
        return refreshIsValid(command);

      default:
        return false;
    }
  }
}
