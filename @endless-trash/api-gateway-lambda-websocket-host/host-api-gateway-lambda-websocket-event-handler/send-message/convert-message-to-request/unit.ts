import { ApiGatewayManagementApi } from "aws-sdk";
import { convertMessageToRequest } from ".";

describe(`convertMessageToRequest`, () => {
  describe(`when body is null`, () => {
    let result: ApiGatewayManagementApi.PostToConnectionRequest;

    beforeAll(() => {
      result = convertMessageToRequest({
        sessionId: `Test Session Id`,
        body: null,
      });
    });

    it(`returns the expected request`, () => {
      expect(result).toEqual({
        ConnectionId: `Test Session Id`,
        Data: ``,
      });
    });
  });

  describe(`when body is a string`, () => {
    let result: ApiGatewayManagementApi.PostToConnectionRequest;

    beforeAll(() => {
      result = convertMessageToRequest({
        sessionId: `Test Session Id`,
        body: `Test Body`,
      });
    });

    it(`returns the expected request`, () => {
      expect(result).toEqual({
        ConnectionId: `Test Session Id`,
        Data: `Test Body`,
      });
    });
  });

  describe(`when body is a buffer`, () => {
    let result: ApiGatewayManagementApi.PostToConnectionRequest;

    beforeAll(() => {
      result = convertMessageToRequest({
        sessionId: `Test Session Id`,
        body: Buffer.from(
          Uint8Array.from([228, 218, 86, 234, 232, 65, 230, 20, 23, 43])
        ),
      });
    });

    it(`returns the expected request`, () => {
      expect(result).toEqual({
        ConnectionId: `Test Session Id`,
        Data: Buffer.from(
          Uint8Array.from([228, 218, 86, 234, 232, 65, 230, 20, 23, 43])
        ),
      });
    });
  });
});
