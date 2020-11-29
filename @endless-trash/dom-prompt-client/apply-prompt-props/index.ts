import { ChannelSend } from "@endless-trash/channel";
import { Prompt, Request } from "@endless-trash/prompt";

export type ApplyPromptProps = {
  readonly prompt: Prompt;
  readonly channelSend: ChannelSend<Request>;
};
