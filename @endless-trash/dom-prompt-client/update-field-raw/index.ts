import { PromptState } from "../prompt-state";
import { RawFieldValue } from "../raw-field-value";

export function updateFieldRaw(
  promptState: PromptState,
  formGroupName: string,
  formName: string,
  fieldName: string,
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
                ...promptState.formGroups[formGroupName].forms[formName].fields[
                  fieldName
                ],
                raw,
              },
            },
          },
        },
      },
    },
  };
}
