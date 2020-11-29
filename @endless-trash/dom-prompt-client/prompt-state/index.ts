import { Prompt, Request } from "@endless-trash/prompt";
import { ChannelSend } from "@endless-trash/channel";
import { FormGroupState } from "../form-group-state";
import { PromptMode } from "./prompt-mode";

export type PromptState = {
  readonly type: `prompt`;
  readonly prompt: Prompt;
  readonly formGroups: {
    readonly [name: string]: FormGroupState;
  };
  readonly mode: PromptMode;
  readonly channelSend: ChannelSend<Request>;
};
