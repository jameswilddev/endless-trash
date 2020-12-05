import { ChannelSend } from "../channel-send";

export interface Channel<TRequest, TResponse> {
  <TExecutedRequest extends TRequest, TExecutedResponse extends TResponse>(
    onResponse: (
      response: TExecutedResponse,
      send: ChannelSend<TExecutedRequest>
    ) => Promise<void>,
    onError: (error: unknown) => void
  ): Promise<ChannelSend<TExecutedRequest>>;
}
