import { ActionTransform } from "hyperapp-cjs";
import { applyFormGroups } from "../apply-form-groups";
import { ApplyPromptProps } from "../apply-prompt-props";
import { initialFormGroupsState } from "../initial-form-groups-state";
import { State } from "../state";

export const applyPrompt: ActionTransform<State, ApplyPromptProps> = (
  state,
  props
) => {
  const providedProps = props as ApplyPromptProps;

  switch (state.type) {
    case `error`:
      return state;

    case `message`:
      return {
        type: `prompt`,
        prompt: providedProps.prompt,
        formGroups: initialFormGroupsState(providedProps.prompt.formGroups),
        mode: `interactive`,
        channelSend: providedProps.channelSend,
        metadata: state.metadata,
      };

    case `prompt`:
      return {
        type: `prompt`,
        prompt: providedProps.prompt,
        formGroups: applyFormGroups(
          state.formGroups,
          providedProps.prompt.formGroups
        ),
        mode: `interactive`,
        channelSend: providedProps.channelSend,
        metadata: state.metadata,
      };
  }
};
