import { ApiGatewayManagementApi } from "aws-sdk";
import { WebsocketHostOutputMessage } from "@endless-trash/websocket-host";

export function convertMessageToRequest(
  message: WebsocketHostOutputMessage
): ApiGatewayManagementApi.PostToConnectionRequest {
  return {
    ConnectionId: message.sessionId,
    Data: message.body || ``,
  };
}
