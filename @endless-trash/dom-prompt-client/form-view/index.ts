import { h, text, VDOM } from "hyperapp-cjs";
import { formStateInvalid } from "../form-state-invalid";
import { PromptState } from "../prompt-state";
import { State } from "../state";
import { fieldView } from "../field-view";
import { sendEffect } from "../send-effect";
import { convertFormStateToRequest } from "../convert-form-state-to-request";

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
          disabled: invalid || promptState.mode !== `interactive`,
        },
        text(formState.form.submitButtonLabel)
      )
    );
  }

  return h(
    `form`,
    {
      id: formState.id,
      key: formState.id,
      class: [
        invalid ? `invalid` : `valid`,
        `form`,
        formState.form.submitButtonLabel === null
          ? `without-submit-button`
          : `with-submit-button`,
      ],
      onsubmit:
        invalid ||
        promptState.mode !== "interactive" ||
        formState.form.submitButtonLabel === null
          ? undefined
          : (state, event) => {
              state;
              event = event as Event;

              event.preventDefault();

              return [
                { ...promptState, mode: `beingSent` },
                [
                  sendEffect,
                  {
                    channelSend: promptState.channelSend,
                    request: convertFormStateToRequest(formState),
                  },
                ],
              ];
            },
    },
    children
  );
}
