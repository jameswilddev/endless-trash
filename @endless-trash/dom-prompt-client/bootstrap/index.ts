import { Channel, ChannelSend } from "@endless-trash/channel";
import { JsonObject } from "@endless-trash/immutable-json-type";
import { Prompt, Request } from "@endless-trash/prompt";
import { Dispatch } from "hyperapp-cjs";
import { applyError } from "../apply-error";
import { applyMessage } from "../apply-message";
import { applyResponse } from "../apply-response";
import { State } from "../state";

export async function bootstrap(
  channel: Channel<Request, Prompt>,
  metadata: JsonObject,
  dispatch: Dispatch<State>
): Promise<void> {
  dispatch(applyMessage, `Connecting...`);

  let channelSend: ChannelSend<Request>;

  try {
    channelSend = await channel(
      async (response, send) => {
        dispatch(applyResponse, { response, channelSend: send });
      },
      (error) => {
        dispatch(applyError, error);
      }
    );
  } catch (e) {
    dispatch(applyError, e);
    return;
  }

  dispatch(applyMessage, `Sending initial request...`);

  try {
    await channelSend({
      metadata,
      command: { type: `refresh` },
    });
  } catch (e) {
    dispatch(applyError, e);
    return;
  }

  dispatch(applyMessage, `Awaiting initial response...`);
}
