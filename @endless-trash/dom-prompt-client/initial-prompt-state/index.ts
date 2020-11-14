import { Prompt } from "@endless-trash/prompt";
import { initialFormGroupsState } from "../initial-form-groups-state";
import { PromptState } from "../prompt-state";

export function initialPromptState(prompt: Prompt): PromptState {
  return {
    type: `prompt`,
    prompt,
    formGroups: initialFormGroupsState(prompt.formGroups),
    send: null,
  };
}
