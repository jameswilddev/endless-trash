import { Request, RequestField } from "@endless-trash/prompt";
import { convertFieldStateToRequestField } from "../convert-field-state-to-request-field";
import { FormState } from "../form-state";

export function convertFormStateToRequest(formState: FormState): Request {
  const fields: { [name: string]: RequestField } = {};

  for (const key in formState.fields) {
    const value = convertFieldStateToRequestField(formState.fields[key]);

    if (value !== undefined) {
      fields[key] = value;
    }
  }

  return {
    formName: formState.form.name,
    fields,
  };
}
