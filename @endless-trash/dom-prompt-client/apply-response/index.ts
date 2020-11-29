import { Prompt, Request } from "@endless-trash/prompt";
import { ChannelSend } from "@endless-trash/channel";
import { ActionDescriptor } from "hyperapp-cjs";
import { applyMessage } from "../apply-message";
import { applyPrompt } from "../apply-prompt";
import { ApplyPromptProps } from "../apply-prompt-props";
import { State } from "../state";

export function applyResponse(
  state: State,
  props: {
    readonly response: Prompt;
    readonly channelSend: ChannelSend<Request>;
  }
): ActionDescriptor<State, ApplyPromptProps> | ActionDescriptor<State, string> {
  state;

  if (props.response.formGroups) {
    return [
      applyPrompt,
      { prompt: props.response, channelSend: props.channelSend },
    ];
  } else {
    return [
      applyMessage,
      `An unexpected response was received:\n\n${JSON.stringify(
        props.response,
        null,
        2
      )}\n\nPlease refresh to reconnect.`,
    ];
  }
}
