import { Prompt, Request } from "@endless-trash/prompt";
import { ChannelSend } from "@endless-trash/channel";
import { FormGroupState } from "../form-group-state";
import { SendState } from "../send-state";

export type PromptState = {
  readonly type: `prompt`;
  readonly prompt: Prompt;
  readonly formGroups: {
    readonly [name: string]: FormGroupState;
  };
  readonly sendState: SendState;
  readonly channelSend: ChannelSend<Request>;
};
