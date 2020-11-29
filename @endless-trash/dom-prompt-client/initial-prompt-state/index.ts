import { ChannelSend } from "@endless-trash/channel";
import { Prompt, Request } from "@endless-trash/prompt";
import { initialFormGroupsState } from "../initial-form-groups-state";
import { PromptState } from "../prompt-state";

export function initialPromptState(
  prompt: Prompt,
  channelSend: ChannelSend<Request>
): PromptState {
  return {
    type: `prompt`,
    prompt,
    formGroups: initialFormGroupsState(prompt.formGroups),
    mode: `interactive`,
    channelSend,
  };
}
