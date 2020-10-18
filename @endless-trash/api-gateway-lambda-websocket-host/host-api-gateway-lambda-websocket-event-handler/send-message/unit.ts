import { Server } from "http";
import express = require("express");
import { createHttpTerminator } from "http-terminator";
import { Credentials } from "aws-sdk";
import { sendMessage } from ".";

describe(`sendMessage`, () => {
  describe(`when the request succeeds`, () => {
    let server: Server;
    let correctRequest: jasmine.Spy;
    let incorrectRequest: jasmine.Spy;

    beforeAll(async () => {
      const expressInstance = express();

      expressInstance.use(express.raw({ type: `*/*` }));

      correctRequest = jasmine
        .createSpy(`correctRequest`)
        .and.callFake((req, res) => {
          req;
          res.status(204).end();
        });

      expressInstance.post(`/@connections/Test%20Session%20id`, correctRequest);

      incorrectRequest = jasmine.createSpy(`incorrectRequest`);
      expressInstance.use(incorrectRequest);

      await new Promise((resolve) => {
        server = expressInstance.listen(61003, resolve);
      });

      await sendMessage(
        {
          credentials: new Credentials(
            `Test Access Key Id`,
            `Test Secret Access Key`
          ),
          endpoint: `http://localhost:61003`,
          region: `local`,
          maxRetries: 0,
        },
        {
          sessionId: `Test Session Id`,
          body: Buffer.from(
            Uint8Array.from([
              0x54,
              0x65,
              0x73,
              0x74,
              0x20,
              0x42,
              0x6f,
              0x64,
              0x79,
            ])
          ),
        }
      );
    });

    afterAll(async () => {
      await createHttpTerminator({ server }).terminate();
    });

    it(`makes one correct request to the API Gateway Management API`, () => {
      expect(correctRequest).toHaveBeenCalledTimes(1);
    });

    it(`makes the expected correct request to the API Gateway Management API`, () => {
      expect(correctRequest).toHaveBeenCalledWith(
        jasmine.objectContaining({
          body: Buffer.from(
            Uint8Array.from([
              0x54,
              0x65,
              0x73,
              0x74,
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

    it(`does not make incorrect requests`, () => {
      expect(incorrectRequest).not.toHaveBeenCalled();
    });
  });

  describe(`when the request fails as the connection ID is now invalid`, () => {
    let server: Server;
    let correctRequest: jasmine.Spy;
    let incorrectRequest: jasmine.Spy;

    beforeAll(async () => {
      const expressInstance = express();

      expressInstance.use(express.raw({ type: `*/*` }));

      correctRequest = jasmine
        .createSpy(`correctRequest`)
        .and.callFake((req, res) => {
          req;
          res.status(410).end();
        });

      expressInstance.post(`/@connections/Test%20Session%20Id`, correctRequest);

      incorrectRequest = jasmine.createSpy(`incorrectRequest`);
      expressInstance.use(incorrectRequest);

      await new Promise((resolve) => {
        server = expressInstance.listen(61004, resolve);
      });

      await sendMessage(
        {
          credentials: new Credentials(
            `Test Access Key Id`,
            `Test Secret Access Key`
          ),
          endpoint: `http://localhost:61004`,
          region: `local`,
          maxRetries: 0,
        },
        {
          sessionId: `Test Session Id`,
          body: Buffer.from(
            Uint8Array.from([
              0x54,
              0x65,
              0x73,
              0x74,
              0x20,
              0x42,
              0x6f,
              0x64,
              0x79,
            ])
          ),
        }
      );
    });

    afterAll(async () => {
      await createHttpTerminator({ server }).terminate();
    });

    it(`makes one correct request to the API Gateway Management API`, () => {
      expect(correctRequest).toHaveBeenCalledTimes(1);
    });

    it(`makes the expected correct request to the API Gateway Management API`, () => {
      expect(correctRequest).toHaveBeenCalledWith(
        jasmine.objectContaining({
          body: Buffer.from(
            Uint8Array.from([
              0x54,
              0x65,
              0x73,
              0x74,
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

    it(`does not make incorrect requests`, () => {
      expect(incorrectRequest).not.toHaveBeenCalled();
    });
  });

  describe(`when the request fails as an unexpected status code is returned`, () => {
    let server: Server;
    let correctRequest: jasmine.Spy;
    let incorrectRequest: jasmine.Spy;
    let error: Error;

    beforeAll(async () => {
      const expressInstance = express();

      expressInstance.use(express.raw({ type: `*/*` }));

      correctRequest = jasmine
        .createSpy(`correctRequest`)
        .and.callFake((req, res) => {
          req;
          res.status(405).end();
        });

      expressInstance.post(`/@connections/Test%20Session%20id`, correctRequest);

      incorrectRequest = jasmine.createSpy(`incorrectRequest`);
      expressInstance.use(incorrectRequest);

      await new Promise((resolve) => {
        server = expressInstance.listen(61005, resolve);
      });

      try {
        await sendMessage(
          {
            credentials: new Credentials(
              `Test Access Key Id`,
              `Test Secret Access Key`
            ),
            endpoint: `http://localhost:61005`,
            region: `local`,
            maxRetries: 0,
          },
          {
            sessionId: `Test Session Id`,
            body: Buffer.from(
              Uint8Array.from([
                0x54,
                0x65,
                0x73,
                0x74,
                0x20,
                0x42,
                0x6f,
                0x64,
                0x79,
              ])
            ),
          }
        );
      } catch (e) {
        error = e;
      }
    });

    afterAll(async () => {
      await createHttpTerminator({ server }).terminate();
    });

    it(`makes one correct request to the API Gateway Management API`, () => {
      expect(correctRequest).toHaveBeenCalledTimes(1);
    });

    it(`makes the expected correct request to the API Gateway Management API`, () => {
      expect(correctRequest).toHaveBeenCalledWith(
        jasmine.objectContaining({
          body: Buffer.from(
            Uint8Array.from([
              0x54,
              0x65,
              0x73,
              0x74,
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

    it(`does not make incorrect requests`, () => {
      expect(incorrectRequest).not.toHaveBeenCalled();
    });

    it(`returns the expected error`, () => {
      expect(error).toEqual(new Error(`405`));
    });
  });

  describe(`when the request fails as an unexpected status code is returned`, () => {
    let error: Error;

    beforeAll(async () => {
      try {
        await sendMessage(
          {
            credentials: new Credentials(
              `Test Access Key Id`,
              `Test Secret Access Key`
            ),
            endpoint: `http://localhost:61000`,
            region: `local`,
            maxRetries: 0,
          },
          {
            sessionId: `Test Session Id`,
            body: Buffer.from(
              Uint8Array.from([
                0x54,
                0x65,
                0x73,
                0x74,
                0x20,
                0x42,
                0x6f,
                0x64,
                0x79,
              ])
            ),
          }
        );
      } catch (e) {
        error = e;
      }
    });

    it(`returns the expected error`, () => {
      expect(error).toEqual(new Error(`connect ECONNREFUSED 127.0.0.1:61000`));
    });
  });
});
