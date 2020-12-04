import { ChannelSend } from "@endless-trash/channel";
import { Request } from "@endless-trash/prompt";

export type SendEffectProps = {
  readonly request: Request;
  readonly channelSend: ChannelSend<Request>;
};
