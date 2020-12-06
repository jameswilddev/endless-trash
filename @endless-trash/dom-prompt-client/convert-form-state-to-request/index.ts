import { Request, RequestField } from "@endless-trash/prompt";
import { convertFieldStateToRequestField } from "../convert-field-state-to-request-field";
import { FormState } from "../form-state";
import { PromptState } from "../prompt-state";

export function convertFormStateToRequest(
  promptState: PromptState,
  formState: FormState
): Request {
  const fields: { [name: string]: RequestField } = {};

  for (const key in formState.fields) {
    const value = convertFieldStateToRequestField(formState.fields[key]);

    if (value !== undefined) {
      fields[key] = value;
    }
  }

  return {
    metadata: promptState.metadata,
    command: {
      type: `formSubmission`,
      formName: formState.form.name,
      fields,
    },
  };
}
