import { sendEffect } from ".";
import { applyAwaitingResponse } from "../apply-awaiting-response";
import { applyError } from "../apply-error";

describe(`sendEffect`, () => {
  describe(`when the promise does not resolve or reject`, () => {
    let channelSend: jasmine.Spy;
    let dispatch: jasmine.Spy;

    beforeAll(() => {
      channelSend = jasmine.createSpy(`channelSend`).and.returnValue(
        new Promise<void>(() => {
          // Never resolved.
        })
      );

      dispatch = jasmine.createSpy(`dispatch`);

      sendEffect(dispatch, {
        channelSend,
        request: {
          metadata: { testMetadataKey: `Test Metadata Value` },
          command: {
            type: `formSubmission`,
            formName: `Test Form Name`,
            fields: {},
          },
        },
      });
    });

    it(`sends one message through the channel`, () => {
      expect(channelSend).toHaveBeenCalledTimes(1);
    });

    it(`sends the request through the channel`, () => {
      expect(channelSend).toHaveBeenCalledWith({
        metadata: { testMetadataKey: `Test Metadata Value` },
        command: {
          type: `formSubmission`,
          formName: `Test Form Name`,
          fields: {},
        },
      });
    });

    it(`does not dispatch`, () => {
      expect(dispatch).not.toHaveBeenCalled();
    });
  });

  describe(`when the promise resolves`, () => {
    let channelSend: jasmine.Spy;
    let dispatch: jasmine.Spy;

    beforeAll(() => {
      channelSend = jasmine.createSpy(`channelSend`).and.resolveTo();

      dispatch = jasmine.createSpy(`dispatch`);

      sendEffect(dispatch, {
        channelSend,
        request: {
          metadata: { testMetadataKey: `Test Metadata Value` },
          command: {
            type: `formSubmission`,
            formName: `Test Form Name`,
            fields: {},
          },
        },
      });
    });

    it(`does not send another message through the channel`, () => {
      expect(channelSend).toHaveBeenCalledTimes(1);
    });

    it(`dispatches once`, () => {
      expect(dispatch).toHaveBeenCalledTimes(1);
    });

    it(`dispatches a mode change`, () => {
      expect(dispatch).toHaveBeenCalledWith(applyAwaitingResponse);
    });
  });

  describe(`when the promise rejects`, () => {
    let channelSend: jasmine.Spy;
    let dispatch: jasmine.Spy;

    beforeAll(() => {
      channelSend = jasmine
        .createSpy(`channelSend`)
        .and.rejectWith(new Error(`Test Error`));

      dispatch = jasmine.createSpy(`dispatch`);

      sendEffect(dispatch, {
        channelSend,
        request: {
          metadata: { testMetadataKey: `Test Metadata Value` },
          command: {
            type: `formSubmission`,
            formName: `Test Form Name`,
            fields: {},
          },
        },
      });
    });

    it(`does not send another message through the channel`, () => {
      expect(channelSend).toHaveBeenCalledTimes(1);
    });

    it(`dispatches once`, () => {
      expect(dispatch).toHaveBeenCalledTimes(1);
    });

    it(`dispatches the error`, () => {
      expect(dispatch).toHaveBeenCalledWith(
        applyError,
        new Error(`Test Error`)
      );
    });
  });
});
