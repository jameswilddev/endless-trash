import { Server } from "http";
import express = require("express");
import { createHttpTerminator } from "http-terminator";
import { ApiGatewayManagementApi, Credentials } from "aws-sdk";
import { APIGatewayProxyResult } from "aws-lambda";
import { hostApiGatewayLambdaWebsocketEventHandler } from "..";

describe(`hostApiGatewayLambdaWebsocketEventHandler`, () => {
  describe(`on construction`, () => {
    let server: Server;
    let request: jasmine.Spy;
    let eventHandler: jasmine.Spy;

    beforeAll(async () => {
      const clientConfiguration: ApiGatewayManagementApi.ClientConfiguration = {
        credentials: new Credentials(
          `Test Access Key Id`,
          `Test Secret Access Key`
        ),
        endpoint: `http://localhost:61006`,
        region: `local`,
        maxRetries: 0,
      };

      const inject = {
        testInjectedKey: `Test Injected Value`,
      };

      eventHandler = jasmine.createSpy(`eventHandler`);

      const expressInstance = express();

      request = jasmine.createSpy(`request`);
      expressInstance.use(request);

      await new Promise<void>((resolve) => {
        server = expressInstance.listen(61006, resolve);
      });

      hostApiGatewayLambdaWebsocketEventHandler(
        clientConfiguration,
        inject,
        eventHandler
      );
    });

    afterAll(async () => {
      await createHttpTerminator({ server }).terminate();
    });

    it(`does not invoke the event handler`, () => {
      expect(eventHandler).not.toHaveBeenCalled();
    });

    it(`does not communicate with the API Gateway Management API`, () => {
      expect(request).not.toHaveBeenCalled();
    });
  });

  describe(`on execution`, () => {
    let eventHandler: jasmine.Spy;
    let server: Server;
    let correctRequestA: jasmine.Spy;
    let correctRequestB: jasmine.Spy;
    let correctRequestC: jasmine.Spy;
    let incorrectRequest: jasmine.Spy;
    let result: APIGatewayProxyResult;
    let callback: jasmine.Spy;
    let contextDone: jasmine.Spy;
    let contextFail: jasmine.Spy;
    let contextSucceed: jasmine.Spy;
    let contextGetRemainingTimeInMillis: jasmine.Spy;

    beforeAll(async () => {
      const clientConfiguration: ApiGatewayManagementApi.ClientConfiguration = {
        credentials: new Credentials(
          `Test Access Key Id`,
          `Test Secret Access Key`
        ),
        endpoint: `http://localhost:61007`,
        region: `local`,
      };

      const inject = {
        testInjectedKey: `Test Injected Value`,
      };

      eventHandler = jasmine.createSpy(`eventHandler`).and.resolveTo({
        messages: [
          {
            sessionId: `Test Message A SessionId`,
            body: Buffer.from(
              Uint8Array.from([73, 40, 100, 61, 122, 190, 190, 147, 174])
            ),
          },
          {
            sessionId: `Test Message B SessionId`,
            body: null,
          },
          {
            sessionId: `Test Message C SessionId`,
            body: `Test Message C Body`,
          },
        ],
      });

      const expressInstance = express();

      expressInstance.use(express.raw({ type: `*/*` }));

      correctRequestA = jasmine
        .createSpy(`correctRequestA`)
        .and.callFake((req, res) => {
          req;
          res.status(204).end();
        });

      expressInstance.post(
        `/@connections/Test%20Message%20A%20SessionId`,
        correctRequestA
      );

      correctRequestB = jasmine
        .createSpy(`correctRequestB`)
        .and.callFake((req, res) => {
          req;
          res.status(204).end();
        });

      expressInstance.post(
        `/@connections/Test%20Message%20B%20SessionId`,
        correctRequestB
      );

      correctRequestC = jasmine
        .createSpy(`correctRequestC`)
        .and.callFake((req, res) => {
          req;
          res.status(204).end();
        });

      expressInstance.post(
        `/@connections/Test%20Message%20C%20SessionId`,
        correctRequestC
      );

      incorrectRequest = jasmine.createSpy(`incorrectRequest`);
      expressInstance.use(incorrectRequest);

      await new Promise<void>((resolve) => {
        server = expressInstance.listen(61007, resolve);
      });

      const handler = hostApiGatewayLambdaWebsocketEventHandler(
        clientConfiguration,
        inject,
        eventHandler
      );

      callback = jasmine.createSpy(`callback`);

      contextDone = jasmine.createSpy(`contextDone`);
      contextFail = jasmine.createSpy(`contextFail`);
      contextSucceed = jasmine.createSpy(`contextSucceed`);
      contextGetRemainingTimeInMillis = jasmine.createSpy(
        `contextGetRemainingTimeInMillis`
      );

      const resultValue = await handler(
        {
          headers: {},
          multiValueHeaders: {},
          httpMethod: ``,
          path: ``,
          pathParameters: {},
          queryStringParameters: {},
          multiValueQueryStringParameters: null,
          stageVariables: {},
          resource: ``,
          requestContext: {
            accountId: ``,
            authorizer: undefined,
            protocol: ``,
            httpMethod: ``,
            path: ``,
            resourceId: ``,
            resourcePath: ``,
            routeKey: `Test Route Key`,
            messageId: `Test Message Id`,
            eventType: `Test Event Type`,
            extendedRequestId: `Test Extended Request Id`,
            requestTime: "12/Feb/1993:21:47:29 +0000",
            messageDirection: `Test Message Direction`,
            stage: `Test Stage Name`,
            connectedAt: 94385034985,
            requestTimeEpoch: 87583947593,
            identity: {
              cognitoIdentityPoolId: null,
              cognitoIdentityId: null,
              principalOrgId: null,
              cognitoAuthenticationType: null,
              userArn: null,
              userAgent: null,
              accountId: null,
              caller: null,
              sourceIp: `Test Source Ip`,
              accessKey: null,
              cognitoAuthenticationProvider: null,
              user: null,
              apiKey: null,
              apiKeyId: null,
            },
            requestId: `Test Request Id`,
            domainName: `Test Domain Name`,
            connectionId: `Test Connection Id`,
            apiId: `Test Api Id`,
          },
          body: `5NpW6uhB5hQXKw==`,
          isBase64Encoded: true,
        },
        {
          callbackWaitsForEmptyEventLoop: true,
          functionName: `Test Function Name`,
          functionVersion: `Test Function Version`,
          invokedFunctionArn: `Test Invoked Function Arn`,
          memoryLimitInMB: `Test Memory Limit In Mb`,
          awsRequestId: `Test Aws Request Id`,
          logGroupName: `Test Log Group Name`,
          logStreamName: `Test Log Stream Name`,
          done: contextDone,
          fail: contextFail,
          succeed: contextSucceed,
          getRemainingTimeInMillis: contextGetRemainingTimeInMillis,
        },
        callback
      );

      if (resultValue) {
        result = resultValue;
      } else {
        fail(`Expected the handler to return a value, but it did not.`);
      }
    });

    afterAll(async () => {
      await createHttpTerminator({ server }).terminate();
    });

    it(`invokes the event handler once`, () => {
      expect(eventHandler).toHaveBeenCalledTimes(1);
    });

    it(`invokes the event handler with an input converted from the event`, () => {
      expect(eventHandler).toHaveBeenCalledWith({
        testInjectedKey: `Test Injected Value`,
        sessionId: `Test Connection Id`,
        body: Buffer.from(
          Uint8Array.from([228, 218, 86, 234, 232, 65, 230, 20, 23, 43])
        ),
      });
    });

    it(`sends the expected messages to the API Gateway Management API`, () => {
      expect(correctRequestA).toHaveBeenCalledWith(
        jasmine.objectContaining({
          body: Buffer.from(
            Uint8Array.from([73, 40, 100, 61, 122, 190, 190, 147, 174])
          ),
        }),
        jasmine.anything(),
        jasmine.anything()
      );

      expect(correctRequestB).toHaveBeenCalledWith(
        jasmine.objectContaining({
          body: Buffer.from(Uint8Array.from([])),
        }),
        jasmine.anything(),
        jasmine.anything()
      );

      expect(correctRequestC).toHaveBeenCalledWith(
        jasmine.objectContaining({
          body: Buffer.from(
            Uint8Array.from([
              0x54,
              0x65,
              0x73,
              0x74,
              0x20,
              0x4d,
              0x65,
              0x73,
              0x73,
              0x61,
              0x67,
              0x65,
              0x20,
              0x43,
              0x20,
              0x42,
              0x6f,
              0x64,
              0x79,
            ])
          ),
        }),
        jasmine.anything(),
        jasmine.anything()
      );
    });

    it(`does not send further messages to the API Gateway Management API`, () => {
      expect(correctRequestA).toHaveBeenCalledTimes(1);
      expect(correctRequestB).toHaveBeenCalledTimes(1);
      expect(correctRequestC).toHaveBeenCalledTimes(1);
      expect(incorrectRequest).not.toHaveBeenCalled();
    });

    it(`returns the expected response`, () => {
      expect(result).toEqual({
        statusCode: 204,
        body: ``,
        isBase64Encoded: false,
      });
    });

    it(`does not interact with the context's methods`, () => {
      expect(contextDone).not.toHaveBeenCalled();
      expect(contextFail).not.toHaveBeenCalled();
      expect(contextSucceed).not.toHaveBeenCalled();
      expect(contextGetRemainingTimeInMillis).not.toHaveBeenCalled();
    });

    it(`does not execute the callback`, () => {
      expect(callback).not.toHaveBeenCalled();
    });
  });
});
