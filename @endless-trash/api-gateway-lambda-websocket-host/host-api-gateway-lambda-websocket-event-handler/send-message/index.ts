import { ApiGatewayManagementApi } from "aws-sdk";
import { WebsocketHostOutputMessage } from "@endless-trash/websocket-host";
import { convertMessageToRequest } from "./convert-message-to-request";

export async function sendMessage(
  apiGatewayManagementApiClientConfiguration: ApiGatewayManagementApi.ClientConfiguration,
  message: WebsocketHostOutputMessage
): Promise<void> {
  const apiGatewayManagementApi = new ApiGatewayManagementApi(
    apiGatewayManagementApiClientConfiguration
  );

  const request = convertMessageToRequest(message);

  try {
    await apiGatewayManagementApi.postToConnection(request).promise();
  } catch (e) {
    if (e.statusCode !== 410) {
      throw e;
    }
  }
}
