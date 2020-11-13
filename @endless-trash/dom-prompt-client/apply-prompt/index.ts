import { Prompt } from "@endless-trash/prompt";
import { applyFormGroups } from "../apply-form-groups";
import { PromptState } from "../prompt-state";

export function applyPrompt(
  promptState: PromptState,
  prompt: Prompt
): PromptState {
  return {
    formGroups: applyFormGroups(promptState.formGroups, prompt.formGroups),
    send: null,
  };
}
