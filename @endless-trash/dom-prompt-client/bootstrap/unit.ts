import { bootstrap } from ".";
import { applyError } from "../apply-error";
import { applyMessage } from "../apply-message";
import { applyResponse } from "../apply-response";

describe(`bootstrap`, () => {
  describe(`on calling`, () => {
    let channel: jasmine.Spy;
    let dispatch: jasmine.Spy;

    beforeAll(async () => {
      channel = jasmine.createSpy(`channel`).and.returnValue(
        new Promise(() => {
          // Never resolved.
        })
      );

      dispatch = jasmine.createSpy(`dispatch`);

      bootstrap(channel, { formName: `Test Form Name`, fields: {} }, dispatch);

      await new Promise<void>((resolve) => {
        setTimeout(resolve, 2000);
      });
    });

    it(`dispatches once`, () => {
      expect(dispatch).toHaveBeenCalledTimes(1);
    });

    it(`dispatches a message indicating that a connection is in progress`, () => {
      expect(dispatch).toHaveBeenCalledWith(applyMessage, `Connecting...`);
    });

    it(`opens a new connection to the channel`, () => {
      expect(channel).toHaveBeenCalledTimes(1);
    });
  });

  describe(`on failing to open the channel`, () => {
    let channel: jasmine.Spy;
    let dispatch: jasmine.Spy;

    beforeAll(async () => {
      channel = jasmine
        .createSpy(`channel`)
        .and.rejectWith(new Error(`Test Error`));

      dispatch = jasmine.createSpy(`dispatch`);

      bootstrap(channel, { formName: `Test Form Name`, fields: {} }, dispatch);

      await new Promise<void>((resolve) => {
        setTimeout(resolve, 2000);
      });
    });

    it(`dispatches once more`, () => {
      expect(dispatch).toHaveBeenCalledTimes(2);
    });

    it(`dispatches the error`, () => {
      expect(dispatch).toHaveBeenCalledWith(
        applyError,
        new Error(`Test Error`)
      );
    });

    it(`does not open a new connection to the channel`, () => {
      expect(channel).toHaveBeenCalledTimes(1);
    });
  });

  describe(`on successfully opening the channel`, () => {
    let channel: jasmine.Spy;
    let dispatch: jasmine.Spy;
    let channelSend: jasmine.Spy;

    beforeAll(async () => {
      channelSend = jasmine.createSpy(`channelSend`).and.returnValue(
        new Promise<void>(() => {
          // Never resolved.
        })
      );

      channel = jasmine.createSpy(`channel`).and.resolveTo(channelSend);

      dispatch = jasmine.createSpy(`dispatch`);

      bootstrap(channel, { formName: `Test Form Name`, fields: {} }, dispatch);

      await new Promise<void>((resolve) => {
        setTimeout(resolve, 2000);
      });
    });

    it(`dispatches once more`, () => {
      expect(dispatch).toHaveBeenCalledTimes(2);
    });

    it(`dispatches an updated message`, () => {
      expect(dispatch).toHaveBeenCalledWith(
        applyMessage,
        `Sending initial request...`
      );
    });

    it(`does not open a new connection to the channel`, () => {
      expect(channel).toHaveBeenCalledTimes(1);
    });

    it(`sends one message`, () => {
      expect(channelSend).toHaveBeenCalledTimes(1);
    });

    it(`sends the initial request`, () => {
      expect(channelSend).toHaveBeenCalledWith({
        formName: `Test Form Name`,
        fields: {},
      });
    });
  });

  describe(`on failing to send the initial request`, () => {
    let channel: jasmine.Spy;
    let dispatch: jasmine.Spy;
    let channelSend: jasmine.Spy;

    beforeAll(async () => {
      channelSend = jasmine
        .createSpy(`channelSend`)
        .and.rejectWith(new Error(`Test Error`));

      channel = jasmine.createSpy(`channel`).and.resolveTo(channelSend);

      dispatch = jasmine.createSpy(`dispatch`);

      bootstrap(channel, { formName: `Test Form Name`, fields: {} }, dispatch);

      await new Promise<void>((resolve) => {
        setTimeout(resolve, 2000);
      });
    });

    it(`dispatches once more`, () => {
      expect(dispatch).toHaveBeenCalledTimes(3);
    });

    it(`dispatches an updated message`, () => {
      expect(dispatch).toHaveBeenCalledWith(
        applyError,
        new Error(`Test Error`)
      );
    });

    it(`does not open a new connection to the channel`, () => {
      expect(channel).toHaveBeenCalledTimes(1);
    });

    it(`does not send another message`, () => {
      expect(channelSend).toHaveBeenCalledTimes(1);
    });
  });

  describe(`on successfully sending the initial request`, () => {
    let channel: jasmine.Spy;
    let dispatch: jasmine.Spy;
    let channelSend: jasmine.Spy;

    beforeAll(async () => {
      channelSend = jasmine.createSpy(`channelSend`).and.resolveTo();

      channel = jasmine.createSpy(`channel`).and.resolveTo(channelSend);

      dispatch = jasmine.createSpy(`dispatch`);

      bootstrap(channel, { formName: `Test Form Name`, fields: {} }, dispatch);

      await new Promise<void>((resolve) => {
        setTimeout(resolve, 2000);
      });
    });

    it(`dispatches once more`, () => {
      expect(dispatch).toHaveBeenCalledTimes(3);
    });

    it(`dispatches an updated message`, () => {
      expect(dispatch).toHaveBeenCalledWith(
        applyMessage,
        `Awaiting initial response...`
      );
    });

    it(`does not open a new connection to the channel`, () => {
      expect(channel).toHaveBeenCalledTimes(1);
    });

    it(`does not send another message`, () => {
      expect(channelSend).toHaveBeenCalledTimes(1);
    });
  });

  describe(`on receiving a message from the channel`, () => {
    let channel: jasmine.Spy;
    let dispatch: jasmine.Spy;
    let channelSend: jasmine.Spy;

    beforeAll(async () => {
      channelSend = jasmine.createSpy(`channelSend`).and.resolveTo();

      channel = jasmine.createSpy(`channel`).and.resolveTo(channelSend);

      dispatch = jasmine.createSpy(`dispatch`);

      bootstrap(channel, { formName: `Test Form Name`, fields: {} }, dispatch);

      await new Promise<void>((resolve) => {
        setTimeout(resolve, 2000);
      });

      channel.calls.argsFor(0)[0](`Test Response`, channelSend);

      await new Promise<void>((resolve) => {
        setTimeout(resolve, 2000);
      });
    });

    it(`dispatches once more`, () => {
      expect(dispatch).toHaveBeenCalledTimes(4);
    });

    it(`dispatches the response`, () => {
      expect(dispatch).toHaveBeenCalledWith(applyResponse, {
        response: `Test Response`,
        channelSend,
      });
    });

    it(`does not open a new connection to the channel`, () => {
      expect(channel).toHaveBeenCalledTimes(1);
    });

    it(`does not send another message`, () => {
      expect(channelSend).toHaveBeenCalledTimes(1);
    });
  });

  describe(`on receiving an error from the channel`, () => {
    let channel: jasmine.Spy;
    let dispatch: jasmine.Spy;
    let channelSend: jasmine.Spy;

    beforeAll(async () => {
      channelSend = jasmine.createSpy(`channelSend`).and.resolveTo();

      channel = jasmine.createSpy(`channel`).and.resolveTo(channelSend);

      dispatch = jasmine.createSpy(`dispatch`);

      bootstrap(channel, { formName: `Test Form Name`, fields: {} }, dispatch);

      await new Promise<void>((resolve) => {
        setTimeout(resolve, 2000);
      });

      channel.calls.argsFor(0)[1](new Error(`Test Error`));

      await new Promise<void>((resolve) => {
        setTimeout(resolve, 2000);
      });
    });

    it(`dispatches once more`, () => {
      expect(dispatch).toHaveBeenCalledTimes(4);
    });

    it(`dispatches the response`, () => {
      expect(dispatch).toHaveBeenCalledWith(
        applyError,
        new Error(`Test Error`)
      );
    });

    it(`does not open a new connection to the channel`, () => {
      expect(channel).toHaveBeenCalledTimes(1);
    });

    it(`does not send another message`, () => {
      expect(channelSend).toHaveBeenCalledTimes(1);
    });
  });
});
