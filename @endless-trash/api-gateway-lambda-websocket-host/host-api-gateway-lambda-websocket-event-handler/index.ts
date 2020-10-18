import { ApiGatewayManagementApi } from "aws-sdk";
import { APIGatewayProxyHandler } from "aws-lambda";
import { EventHandler } from "@endless-trash/event-handler";
import {
  WebsocketHostInput,
  WebsocketHostOutput,
} from "@endless-trash/websocket-host";
import { convertEventToInput } from "./convert-event-to-input";
import { sendMessage } from "./send-message";

export function hostApiGatewayLambdaWebsocketEventHandler<T>(
  apiGatewayManagementApiClientConfiguration: ApiGatewayManagementApi.ClientConfiguration,
  inject: T,
  eventHandler: EventHandler<
    Pick<T, Exclude<keyof T, keyof WebsocketHostInput>> & WebsocketHostInput,
    WebsocketHostOutput
  >
): APIGatewayProxyHandler {
  return async (event) => {
    const input = convertEventToInput(inject, event);

    const output = await eventHandler.execute(input);

    await Promise.all(
      output.messages.map(async (message) => {
        await sendMessage(apiGatewayManagementApiClientConfiguration, message);
      })
    );

    return {
      statusCode: 204,
      body: ``,
      isBase64Encoded: false,
    };
  };
}
