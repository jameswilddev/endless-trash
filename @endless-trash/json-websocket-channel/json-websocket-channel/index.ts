import WebSocket = require("ws");
import { Json } from "@endless-trash/immutable-json-type";
import { Channel, ChannelSend } from "@endless-trash/channel";

export const jsonWebsocketChannel: (address: string) => Channel<Json, Json> = (
  address: string
) => {
  return async <TRequest extends Json, TResponse extends Json>(
    onResponse: (
      response: TResponse,
      send: ChannelSend<TRequest>
    ) => Promise<void>,
    onError: (error: Error) => void
  ): Promise<ChannelSend<TRequest>> => {
    const webSocket = new WebSocket(address);

    const send: ChannelSend<TRequest> = async (request: TRequest) => {
      await new Promise((resolve, reject) => {
        webSocket.send(JSON.stringify(request), (err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
      });
    };

    let starting = true;

    await new Promise((resolve, reject) => {
      webSocket
        .on(`error`, (error) => {
          if (starting) {
            reject(error);
            starting = false;
          } else {
            // todo coverage
            onError(error);
          }
        })
        .on(`open`, () => {
          resolve();
          starting = false;
        })
        .on(`message`, (data) => {
          if (typeof data === `string`) {
            let json: TResponse;

            try {
              json = JSON.parse(data);
            } catch (e) {
              onError(e);
              return;
            }

            onResponse(json, send).catch(onError);
          } else {
            onError(new Error(`Non-text message received.`));
          }
        });
    });

    return send;
  };
};
