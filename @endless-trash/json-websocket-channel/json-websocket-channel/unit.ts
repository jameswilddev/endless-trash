import WebSocket = require("ws");
import { ChannelSend } from "@endless-trash/channel";
import { jsonWebsocketChannel } from "..";

type TestRequest = { readonly testRequestKey: `Test Request Value` };
type TestResponse = { readonly testResponseKey: `Test Response Value` };

describe(`jsonWebsocketChannel`, () => {
  describe(`on providing settings`, () => {
    beforeAll(() => {
      jsonWebsocketChannel(`ws://localhost:61008`);
    });

    it(`does nothing`, () => {
      // Nothing to assert.
    });
  });

  describe(`on starting with an invalid address`, () => {
    let onResponse: jasmine.Spy;
    let onError: jasmine.Spy;
    let error: Error;

    beforeAll(async () => {
      const channel = jsonWebsocketChannel(`ws://localhost:61009`);

      onResponse = jasmine.createSpy(`onResponse`);
      onError = jasmine.createSpy(`onError`);

      try {
        await channel<TestRequest, TestResponse>(onResponse, onError);
      } catch (e) {
        error = e;
      }
    });

    it(`does not execute the onResponse callback`, () => {
      expect(onResponse).not.toHaveBeenCalled();
    });

    it(`does not execute the onError callback`, () => {
      expect(onError).not.toHaveBeenCalled();
    });

    it(`throws the expected error`, () => {
      expect(error).toEqual(new Error(`connect ECONNREFUSED 127.0.0.1:61009`));
    });
  });

  describe(`on starting with a valid address`, () => {
    let webSocketServer: WebSocket.Server;
    let onResponse: jasmine.Spy;
    let onError: jasmine.Spy;
    let onConnection: jasmine.Spy;
    let onMessage: jasmine.Spy;
    let onClose: jasmine.Spy;
    let onServerError: jasmine.Spy;

    beforeAll(async () => {
      const channel = jsonWebsocketChannel(`ws://localhost:61010`);

      onResponse = jasmine.createSpy(`onResponse`);
      onError = jasmine.createSpy(`onError`);
      onConnection = jasmine.createSpy(`onConnection`);
      onMessage = jasmine.createSpy(`onMessage`);
      onClose = jasmine.createSpy(`onClose`);
      onServerError = jasmine.createSpy(`onServerError`);

      await new Promise((resolve) => {
        webSocketServer = new WebSocket.Server({ port: 61010 }, resolve);
      });

      webSocketServer.on(`error`, onServerError).on(`connection`, (socket) => {
        onConnection();

        socket.on(`message`, onMessage);
        socket.on(`close`, onClose);
        socket.on(`error`, onServerError);
      });

      await channel<TestRequest, TestResponse>(onResponse, onError);

      await new Promise((resolve) => {
        setTimeout(resolve, 2000);
      });
    });

    afterAll(async () => {
      await new Promise((resolve, reject) => {
        webSocketServer.close((err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
      });
    });

    it(`does not execute the onResponse callback`, () => {
      expect(onResponse).not.toHaveBeenCalled();
    });

    it(`does not execute the onError callback`, () => {
      expect(onError).not.toHaveBeenCalled();
    });

    it(`connects to the server once`, () => {
      expect(onConnection).toHaveBeenCalledTimes(1);
    });

    it(`does not send any messages to the server`, () => {
      expect(onMessage).not.toHaveBeenCalled();
    });

    it(`does not close the connection`, () => {
      expect(onClose).not.toHaveBeenCalled();
    });

    it(`does not cause any errors on the server`, () => {
      expect(onServerError).not.toHaveBeenCalled();
    });
  });

  describe(`on sending a message`, () => {
    describe(`successfully`, () => {
      let webSocketServer: WebSocket.Server;
      let onResponse: jasmine.Spy;
      let onError: jasmine.Spy;
      let onConnection: jasmine.Spy;
      let onMessage: jasmine.Spy;
      let onClose: jasmine.Spy;
      let onServerError: jasmine.Spy;

      beforeAll(async () => {
        const channel = jsonWebsocketChannel(`ws://localhost:61011`);

        onResponse = jasmine.createSpy(`onResponse`);
        onError = jasmine.createSpy(`onError`);
        onConnection = jasmine.createSpy(`onConnection`);
        onMessage = jasmine.createSpy(`onMessage`);
        onClose = jasmine.createSpy(`onClose`);
        onServerError = jasmine.createSpy(`onServerError`);

        await new Promise((resolve) => {
          webSocketServer = new WebSocket.Server({ port: 61011 }, resolve);
        });

        webSocketServer
          .on(`error`, onServerError)
          .on(`connection`, (socket) => {
            onConnection();

            socket.on(`message`, onMessage);
            socket.on(`close`, onClose);
            socket.on(`error`, onServerError);
          });

        const send = await channel<TestRequest, TestResponse>(
          onResponse,
          onError
        );

        await send({ testRequestKey: `Test Request Value` });

        await new Promise((resolve) => {
          setTimeout(resolve, 2000);
        });
      });

      afterAll(async () => {
        await new Promise((resolve, reject) => {
          webSocketServer.close((err) => {
            if (err) {
              reject(err);
            } else {
              resolve();
            }
          });
        });
      });

      it(`does not execute the onResponse callback`, () => {
        expect(onResponse).not.toHaveBeenCalled();
      });

      it(`does not execute the onError callback`, () => {
        expect(onError).not.toHaveBeenCalled();
      });

      it(`connects to the server once`, () => {
        expect(onConnection).toHaveBeenCalledTimes(1);
      });

      it(`sends one message to the server`, () => {
        expect(onMessage).toHaveBeenCalledTimes(1);
      });

      it(`sends the given message to the server`, () => {
        expect(JSON.parse(onMessage.calls.argsFor(0)[0])).toEqual({
          testRequestKey: `Test Request Value`,
        });
      });

      it(`does not close the connection`, () => {
        expect(onClose).not.toHaveBeenCalled();
      });

      it(`does not cause any errors on the server`, () => {
        expect(onServerError).not.toHaveBeenCalled();
      });
    });

    describe(`after the server has closed down`, () => {
      let onResponse: jasmine.Spy;
      let onError: jasmine.Spy;
      let onConnection: jasmine.Spy;
      let onMessage: jasmine.Spy;
      let onClose: jasmine.Spy;
      let onServerError: jasmine.Spy;
      let error: Error;

      beforeAll(async () => {
        const channel = jsonWebsocketChannel(`ws://localhost:61011`);

        onResponse = jasmine.createSpy(`onResponse`);
        onError = jasmine.createSpy(`onError`);
        onConnection = jasmine.createSpy(`onConnection`);
        onMessage = jasmine.createSpy(`onMessage`);
        onClose = jasmine.createSpy(`onClose`);
        onServerError = jasmine.createSpy(`onServerError`);

        const webSocketServer: WebSocket.Server = await new Promise(
          (resolve) => {
            const local = new WebSocket.Server({ port: 61011 }, () => {
              resolve(local);
            });
          }
        );

        webSocketServer
          .on(`error`, onServerError)
          .on(`connection`, (socket) => {
            onConnection();

            socket.on(`message`, onMessage);
            socket.on(`close`, onClose);
            socket.on(`error`, onServerError);
          });

        const send = await channel<TestRequest, TestResponse>(
          onResponse,
          onError
        );

        await new Promise((resolve, reject) => {
          webSocketServer.close((err) => {
            if (err) {
              reject(err);
            } else {
              resolve();
            }
          });
        });

        await new Promise((resolve) => {
          setTimeout(resolve, 2000);
        });

        try {
          await send({ testRequestKey: `Test Request Value` });
        } catch (e) {
          error = e;
        }

        await new Promise((resolve) => {
          setTimeout(resolve, 2000);
        });
      });

      it(`does not execute the onResponse callback`, () => {
        expect(onResponse).not.toHaveBeenCalled();
      });

      it(`does not execute the onError callback`, () => {
        expect(onError).not.toHaveBeenCalled();
      });

      it(`connects to the server once`, () => {
        expect(onConnection).toHaveBeenCalledTimes(1);
      });

      it(`does not send any messages to the server`, () => {
        expect(onMessage).not.toHaveBeenCalled();
      });

      it(`closes the connection`, () => {
        expect(onClose).toHaveBeenCalledTimes(1);
      });

      it(`does not cause any errors on the server`, () => {
        expect(onServerError).not.toHaveBeenCalled();
      });

      it(`throws the expected error`, () => {
        expect(error).toEqual(
          new Error(`WebSocket is not open: readyState 3 (CLOSED)`)
        );
      });
    });
  });

  describe(`on receiving an empty message`, () => {
    let webSocketServer: WebSocket.Server;
    let onResponse: jasmine.Spy;
    let onError: jasmine.Spy;
    let onConnection: jasmine.Spy;
    let onMessage: jasmine.Spy;
    let onClose: jasmine.Spy;
    let onServerError: jasmine.Spy;

    beforeAll(async () => {
      const channel = jsonWebsocketChannel(`ws://localhost:61012`);

      onResponse = jasmine.createSpy(`onResponse`);
      onError = jasmine.createSpy(`onError`);
      onConnection = jasmine.createSpy(`onConnection`);
      onMessage = jasmine.createSpy(`onMessage`);
      onClose = jasmine.createSpy(`onClose`);
      onServerError = jasmine.createSpy(`onServerError`);

      await new Promise((resolve) => {
        webSocketServer = new WebSocket.Server({ port: 61012 }, resolve);
      });

      webSocketServer.on(`error`, onServerError).on(`connection`, (socket) => {
        onConnection();

        socket.on(`message`, onMessage);
        socket.on(`close`, onClose);
        socket.on(`error`, onServerError);

        socket.send(null);
      });

      await channel<TestRequest, TestResponse>(onResponse, onError);

      await new Promise((resolve) => {
        setTimeout(resolve, 2000);
      });
    });

    afterAll(async () => {
      await new Promise((resolve, reject) => {
        webSocketServer.close((err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
      });
    });

    it(`does not execute the onResponse callback`, () => {
      expect(onResponse).not.toHaveBeenCalled();
    });

    it(`executes the onError callback once`, () => {
      expect(onError).toHaveBeenCalledTimes(1);
    });

    it(`executes the onError with the expected error`, () => {
      expect(onError).toHaveBeenCalledWith(
        new Error(`Non-text message received.`)
      );
    });

    it(`connects to the server once`, () => {
      expect(onConnection).toHaveBeenCalledTimes(1);
    });

    it(`does not send any messages to the server`, () => {
      expect(onMessage).not.toHaveBeenCalled();
    });

    it(`does not close the connection`, () => {
      expect(onClose).not.toHaveBeenCalled();
    });

    it(`does not cause any errors on the server`, () => {
      expect(onServerError).not.toHaveBeenCalled();
    });
  });

  describe(`on receiving a string message which is not valid JSON`, () => {
    let webSocketServer: WebSocket.Server;
    let onResponse: jasmine.Spy;
    let onError: jasmine.Spy;
    let onConnection: jasmine.Spy;
    let onMessage: jasmine.Spy;
    let onClose: jasmine.Spy;
    let onServerError: jasmine.Spy;

    beforeAll(async () => {
      const channel = jsonWebsocketChannel(`ws://localhost:61013`);

      onResponse = jasmine.createSpy(`onResponse`);
      onError = jasmine.createSpy(`onError`);
      onConnection = jasmine.createSpy(`onConnection`);
      onMessage = jasmine.createSpy(`onMessage`);
      onClose = jasmine.createSpy(`onClose`);
      onServerError = jasmine.createSpy(`onServerError`);

      await new Promise((resolve) => {
        webSocketServer = new WebSocket.Server({ port: 61013 }, resolve);
      });

      webSocketServer.on(`error`, onServerError).on(`connection`, (socket) => {
        onConnection();

        socket.on(`message`, onMessage);
        socket.on(`close`, onClose);
        socket.on(`error`, onServerError);

        socket.send(`Test Non-JSON`);
      });

      await channel<TestRequest, TestResponse>(onResponse, onError);

      await new Promise((resolve) => {
        setTimeout(resolve, 2000);
      });
    });

    afterAll(async () => {
      await new Promise((resolve, reject) => {
        webSocketServer.close((err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
      });
    });

    it(`does not execute the onResponse callback`, () => {
      expect(onResponse).not.toHaveBeenCalled();
    });

    it(`executes the onError callback once`, () => {
      expect(onError).toHaveBeenCalledTimes(1);
    });

    it(`executes the onError with the expected error`, () => {
      expect(onError).toHaveBeenCalledWith(
        new Error(`Unexpected token T in JSON at position 0`)
      );
    });

    it(`connects to the server once`, () => {
      expect(onConnection).toHaveBeenCalledTimes(1);
    });

    it(`does not send any messages to the server`, () => {
      expect(onMessage).not.toHaveBeenCalled();
    });

    it(`does not close the connection`, () => {
      expect(onClose).not.toHaveBeenCalled();
    });

    it(`does not cause any errors on the server`, () => {
      expect(onServerError).not.toHaveBeenCalled();
    });
  });

  describe(`on receiving a string message which is valid JSON`, () => {
    describe(`when onMessage resolves`, () => {
      let webSocketServer: WebSocket.Server;
      let onResponse: jasmine.Spy;
      let onError: jasmine.Spy;
      let onConnection: jasmine.Spy;
      let onMessage: jasmine.Spy;
      let onClose: jasmine.Spy;
      let onServerError: jasmine.Spy;
      let send: ChannelSend<TestRequest>;

      beforeAll(async () => {
        const channel = jsonWebsocketChannel(`ws://localhost:61014`);

        onResponse = jasmine.createSpy(`onResponse`).and.resolveTo();
        onError = jasmine.createSpy(`onError`);
        onConnection = jasmine.createSpy(`onConnection`);
        onMessage = jasmine.createSpy(`onMessage`);
        onClose = jasmine.createSpy(`onClose`);
        onServerError = jasmine.createSpy(`onServerError`);

        await new Promise((resolve) => {
          webSocketServer = new WebSocket.Server({ port: 61014 }, resolve);
        });

        webSocketServer
          .on(`error`, onServerError)
          .on(`connection`, (socket) => {
            onConnection();

            socket.on(`message`, onMessage);
            socket.on(`close`, onClose);
            socket.on(`error`, onServerError);

            socket.send(`{"testResponseKey":"Test Response Value"}`);
          });

        send = await channel<TestRequest, TestResponse>(onResponse, onError);

        await new Promise((resolve) => {
          setTimeout(resolve, 2000);
        });
      });

      afterAll(async () => {
        await new Promise((resolve, reject) => {
          webSocketServer.close((err) => {
            if (err) {
              reject(err);
            } else {
              resolve();
            }
          });
        });
      });

      it(`does not execute the onResponse callback`, () => {
        expect(onResponse).toHaveBeenCalledTimes(1);
      });

      it(`executes the onResponse callback with the response and send callback`, () => {
        expect(onResponse).toHaveBeenCalledWith(
          {
            testResponseKey: "Test Response Value",
          },
          send
        );
      });

      it(`does not execute the onError callback`, () => {
        expect(onError).not.toHaveBeenCalled();
      });

      it(`connects to the server once`, () => {
        expect(onConnection).toHaveBeenCalledTimes(1);
      });

      it(`does not send any messages to the server`, () => {
        expect(onMessage).not.toHaveBeenCalled();
      });

      it(`does not close the connection`, () => {
        expect(onClose).not.toHaveBeenCalled();
      });

      it(`does not cause any errors on the server`, () => {
        expect(onServerError).not.toHaveBeenCalled();
      });
    });

    describe(`when onMessage rejects`, () => {
      let webSocketServer: WebSocket.Server;
      let onResponse: jasmine.Spy;
      let onError: jasmine.Spy;
      let onConnection: jasmine.Spy;
      let onMessage: jasmine.Spy;
      let onClose: jasmine.Spy;
      let onServerError: jasmine.Spy;
      let send: ChannelSend<TestRequest>;

      beforeAll(async () => {
        const channel = jsonWebsocketChannel(`ws://localhost:61015`);

        onResponse = jasmine
          .createSpy(`onResponse`)
          .and.rejectWith(new Error(`Test Error`));
        onError = jasmine.createSpy(`onError`);
        onConnection = jasmine.createSpy(`onConnection`);
        onMessage = jasmine.createSpy(`onMessage`);
        onClose = jasmine.createSpy(`onClose`);
        onServerError = jasmine.createSpy(`onServerError`);

        await new Promise((resolve) => {
          webSocketServer = new WebSocket.Server({ port: 61015 }, resolve);
        });

        webSocketServer
          .on(`error`, onServerError)
          .on(`connection`, (socket) => {
            onConnection();

            socket.on(`message`, onMessage);
            socket.on(`close`, onClose);
            socket.on(`error`, onServerError);

            socket.send(`{"testResponseKey":"Test Response Value"}`);
          });

        send = await channel<TestRequest, TestResponse>(onResponse, onError);

        await new Promise((resolve) => {
          setTimeout(resolve, 2000);
        });
      });

      afterAll(async () => {
        await new Promise((resolve, reject) => {
          webSocketServer.close((err) => {
            if (err) {
              reject(err);
            } else {
              resolve();
            }
          });
        });
      });

      it(`does not execute the onResponse callback`, () => {
        expect(onResponse).toHaveBeenCalledTimes(1);
      });

      it(`executes the onResponse callback with the response and send callback`, () => {
        expect(onResponse).toHaveBeenCalledWith(
          {
            testResponseKey: "Test Response Value",
          },
          send
        );
      });

      it(`executes the onError callback once`, () => {
        expect(onError).toHaveBeenCalledTimes(1);
      });

      it(`executes the onError callback with the rejection`, () => {
        expect(onError).toHaveBeenCalledWith(new Error(`Test Error`));
      });

      it(`connects to the server once`, () => {
        expect(onConnection).toHaveBeenCalledTimes(1);
      });

      it(`does not send any messages to the server`, () => {
        expect(onMessage).not.toHaveBeenCalled();
      });

      it(`does not close the connection`, () => {
        expect(onClose).not.toHaveBeenCalled();
      });

      it(`does not cause any errors on the server`, () => {
        expect(onServerError).not.toHaveBeenCalled();
      });
    });
  });

  describe(`on receiving a binary message`, () => {
    let webSocketServer: WebSocket.Server;
    let onResponse: jasmine.Spy;
    let onError: jasmine.Spy;
    let onConnection: jasmine.Spy;
    let onMessage: jasmine.Spy;
    let onClose: jasmine.Spy;
    let onServerError: jasmine.Spy;

    beforeAll(async () => {
      const channel = jsonWebsocketChannel(`ws://localhost:61016`);

      onResponse = jasmine.createSpy(`onResponse`);
      onError = jasmine.createSpy(`onError`);
      onConnection = jasmine.createSpy(`onConnection`);
      onMessage = jasmine.createSpy(`onMessage`);
      onClose = jasmine.createSpy(`onClose`);
      onServerError = jasmine.createSpy(`onServerError`);

      await new Promise((resolve) => {
        webSocketServer = new WebSocket.Server({ port: 61016 }, resolve);
      });

      webSocketServer.on(`error`, onServerError).on(`connection`, (socket) => {
        onConnection();

        socket.on(`message`, onMessage);
        socket.on(`close`, onClose);
        socket.on(`error`, onServerError);

        socket.send(
          Buffer.from(Uint8Array.from([243, 155, 206, 47, 160, 171, 38, 188]))
        );
      });

      await channel<TestRequest, TestResponse>(onResponse, onError);

      await new Promise((resolve) => {
        setTimeout(resolve, 2000);
      });
    });

    afterAll(async () => {
      await new Promise((resolve, reject) => {
        webSocketServer.close((err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
      });
    });

    it(`does not execute the onResponse callback`, () => {
      expect(onResponse).not.toHaveBeenCalled();
    });

    it(`executes the onError callback once`, () => {
      expect(onError).toHaveBeenCalledTimes(1);
    });

    it(`executes the onError with the expected error`, () => {
      expect(onError).toHaveBeenCalledWith(
        new Error(`Non-text message received.`)
      );
    });

    it(`connects to the server once`, () => {
      expect(onConnection).toHaveBeenCalledTimes(1);
    });

    it(`does not send any messages to the server`, () => {
      expect(onMessage).not.toHaveBeenCalled();
    });

    it(`does not close the connection`, () => {
      expect(onClose).not.toHaveBeenCalled();
    });

    it(`does not cause any errors on the server`, () => {
      expect(onServerError).not.toHaveBeenCalled();
    });
  });

  describe(`on receiving a malformed string message`, () => {
    let webSocketServer: WebSocket.Server;
    let onResponse: jasmine.Spy;
    let onError: jasmine.Spy;
    let onConnection: jasmine.Spy;
    let onMessage: jasmine.Spy;
    let onClose: jasmine.Spy;
    let onServerError: jasmine.Spy;

    beforeAll(async () => {
      const channel = jsonWebsocketChannel(`ws://localhost:61016`);

      onResponse = jasmine.createSpy(`onResponse`);
      onError = jasmine.createSpy(`onError`);
      onConnection = jasmine.createSpy(`onConnection`);
      onMessage = jasmine.createSpy(`onMessage`);
      onClose = jasmine.createSpy(`onClose`);
      onServerError = jasmine.createSpy(`onServerError`);

      await new Promise((resolve) => {
        webSocketServer = new WebSocket.Server({ port: 61016 }, resolve);
      });

      webSocketServer.on(`error`, onServerError).on(`connection`, (socket) => {
        onConnection();

        socket.on(`message`, onMessage);
        socket.on(`close`, onClose);
        socket.on(`error`, onServerError);

        socket.send(
          Buffer.from(
            Uint8Array.from([
              0x48,
              0x65,
              0x6c,
              0x6c,
              0x6f,
              0x20,
              0xff,
              0x20,
              0x77,
              0x6f,
              0x72,
              0x6c,
              0x64,
            ])
          ),
          { binary: false }
        );
      });

      await channel<TestRequest, TestResponse>(onResponse, onError);

      await new Promise((resolve) => {
        setTimeout(resolve, 2000);
      });
    });

    afterAll(async () => {
      await new Promise((resolve, reject) => {
        webSocketServer.close((err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
      });
    });

    it(`does not execute the onResponse callback`, () => {
      expect(onResponse).not.toHaveBeenCalled();
    });

    it(`executes the onError callback once`, () => {
      expect(onError).toHaveBeenCalledTimes(1);
    });

    it(`executes the onError with the expected error`, () => {
      expect(onError).toHaveBeenCalledWith(
        new Error(`Invalid WebSocket frame: invalid UTF-8 sequence`)
      );
    });

    it(`connects to the server once`, () => {
      expect(onConnection).toHaveBeenCalledTimes(1);
    });

    it(`does not send any messages to the server`, () => {
      expect(onMessage).not.toHaveBeenCalled();
    });

    it(`closes the connection once`, () => {
      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it(`does not cause any errors on the server`, () => {
      expect(onServerError).not.toHaveBeenCalled();
    });
  });
});
