import { RequestField } from "@endless-trash/prompt";
import { TextFieldState } from "../field-state/text-field-state";
import { PromptState } from "../prompt-state";
import { RawFieldValue } from "../raw-field-value";

export function updateField(
  promptState: PromptState,
  formGroupName: string,
  formName: string,
  fieldName: string,
  parsed: undefined | RequestField,
  raw: RawFieldValue
): PromptState {
  return {
    ...promptState,
    formGroups: {
      ...promptState.formGroups,
      [formGroupName]: {
        ...promptState.formGroups[formGroupName],
        forms: {
          ...promptState.formGroups[formGroupName].forms,
          [formName]: {
            ...promptState.formGroups[formGroupName].forms[formName],
            fields: {
              ...promptState.formGroups[formGroupName].forms[formName].fields,
              [fieldName]: {
                ...(promptState.formGroups[formGroupName].forms[formName]
                  .fields[fieldName] as TextFieldState),
                parsed,
                raw,
              },
            },
          },
        },
      },
    },
  };
}
