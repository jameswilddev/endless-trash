import { Json } from "@endless-trash/immutable-json-type";
import { filterEditableField } from "../../filter-editable-field";
import { Form } from "../../form";
import { requestFieldIsValid } from "./request-field-is-valid";

export function requestFormIsValid(form: Form, request: Json): boolean {
  if (form.submitButtonLabel === null) {
    return false;
  } else if (request === null) {
    return false;
  } else if (typeof request !== `object`) {
    return false;
  } else if (Array.isArray(request)) {
    return false;
  } else if (request.formName !== form.name) {
    return false;
  } else if (request.fields === null) {
    return false;
  } else if (typeof request.fields !== `object`) {
    return false;
  } else if (Array.isArray(request.fields)) {
    return false;
  } else if (Object.keys(request).length > 2) {
    return false;
  } else {
    const remainingKeys = Object.keys(request.fields);

    for (const field of form.fields) {
      const editableField = filterEditableField(field);

      if (editableField === null) {
        continue;
      } else {
        const index = remainingKeys.indexOf(field.name);

        if (index === -1) {
          return false;
        } else if (
          !requestFieldIsValid(editableField, request.fields[field.name])
        ) {
          return false;
        } else {
          remainingKeys.splice(index, 1);
          continue;
        }
      }
    }

    return remainingKeys.length === 0;
  }
}
