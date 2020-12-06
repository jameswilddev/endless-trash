import { JsonObject } from "@endless-trash/immutable-json-type";
import { Prompt } from "../../../prompt";
import { FormSubmissionCommand } from "../../../request/command";
import { requestFormIsValid } from "./request-form-is-valid";

export function formSubmissionIsValid(
  prompt: Prompt,
  command: JsonObject
): boolean {
  if (!Object.prototype.hasOwnProperty.call(command, `formName`)) {
    return false;
  } else if (!Object.prototype.hasOwnProperty.call(command, `fields`)) {
    return false;
  } else if (Object.keys(command).length !== 3) {
    return false;
  } else if (command.fields === null) {
    return false;
  } else if (typeof command.fields !== `object`) {
    return false;
  } else if (Array.isArray(command.fields)) {
    return false;
  } else {
    for (const formGroup of prompt.formGroups) {
      for (const form of formGroup.forms) {
        if (requestFormIsValid(form, command as FormSubmissionCommand)) {
          return true;
        } else {
          continue;
        }
      }
    }

    return false;
  }
}
