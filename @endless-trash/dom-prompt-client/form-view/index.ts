import { h, text, VDOM } from "hyperapp-cjs";
import { formStateInvalid } from "../form-state-invalid";
import { PromptState } from "../prompt-state";
import { State } from "../state";
import { fieldView } from "../field-view";

export function formView(
  promptState: PromptState,
  formGroupName: string,
  formName: string
): VDOM<State> {
  const formGroupState = promptState.formGroups[formGroupName];
  const formState = formGroupState.forms[formName];

  const invalid = formStateInvalid(formState);

  const children: VDOM<State>[] = [
    h(
      `div`,
      {
        class: `fields`,
      },
      formState.form.fields.map((field) =>
        fieldView(promptState, formGroupName, formName, field.name)
      )
    ),
  ];

  if (formState.form.submitButtonLabel !== null) {
    children.push(
      h(
        `button`,
        {
          type: `submit`,
          class: `submit-button`,
          disabled: invalid || promptState.sendState !== null,
        },
        text(formState.form.submitButtonLabel)
      )
    );
  }

  return h(
    `form`,
    {
      id: formState.id,
      class: [
        invalid ? `invalid` : `valid`,
        `form`,
        formState.form.submitButtonLabel === null
          ? `without-submit-button`
          : `with-submit-button`,
      ],
    },
    children
  );
}
