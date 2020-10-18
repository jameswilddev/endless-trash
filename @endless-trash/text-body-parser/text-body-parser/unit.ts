import { EventHandler } from "@endless-trash/event-handler";
import { textBodyParser } from "..";

type TestInput = {
  readonly testInjectedKey: `Test Injected Value`;
  readonly body: null | string | Buffer;
};

type TestSuccessful = { readonly testSuccessfulKey: `Test Successful Value` };
type SuccessfulEventHandler = EventHandler<
  {
    readonly testInjectedKey: `Test Injected Value`;
    readonly body: string;
  },
  TestSuccessful
>;
type TestFailure = { readonly testFailureKey: `Test Failure Value` };
type FailureEventHandler = EventHandler<TestInput, TestSuccessful>;

fdescribe(`textBodyParser`, () => {
  describe(`on construction`, () => {
    let onSuccessful: SuccessfulEventHandler;
    let onFailure: FailureEventHandler;

    beforeAll(() => {
      onSuccessful = jasmine.createSpy(`onSuccessful`);
      onFailure = jasmine.createSpy(`onFailure`);

      textBodyParser(onSuccessful, onFailure);
    });

    it(`does not execute the successful event handler`, () => {
      expect(onSuccessful).not.toHaveBeenCalled();
    });

    it(`does not execute the failure event handler`, () => {
      expect(onFailure).not.toHaveBeenCalled();
    });
  });

  describe(`on execution`, () => {
    describe(`when the body is null`, () => {
      let onSuccessful: SuccessfulEventHandler;
      let onFailure: FailureEventHandler;
      let result: TestSuccessful | TestFailure;

      beforeAll(async () => {
        onSuccessful = jasmine
          .createSpy(`onSuccessful`)
          .and.returnValue({ testSuccessfulKey: `Test Successful Value` });
        onFailure = jasmine.createSpy(`onFailure`);

        const input: TestInput = {
          body: null,
          testInjectedKey: `Test Injected Value`,
        };

        result = await textBodyParser(onSuccessful, onFailure)(input);
      });

      it(`executes the successful event handler once`, () => {
        expect(onSuccessful).toHaveBeenCalledTimes(1);
      });

      it(`executes the successful event handler with the expected input`, () => {
        expect(onSuccessful).toHaveBeenCalledWith({
          body: ``,
          testInjectedKey: `Test Injected Value`,
        });
      });

      it(`returns the result of the successful event handler`, () => {
        expect(result).toEqual({ testSuccessfulKey: `Test Successful Value` });
      });

      it(`does not execute the failure event handler`, () => {
        expect(onFailure).not.toHaveBeenCalled();
      });
    });

    describe(`when the body is a string`, () => {
      let onSuccessful: SuccessfulEventHandler;
      let onFailure: FailureEventHandler;
      let result: TestSuccessful | TestFailure;

      beforeAll(async () => {
        onSuccessful = jasmine
          .createSpy(`onSuccessful`)
          .and.returnValue({ testSuccessfulKey: `Test Successful Value` });
        onFailure = jasmine.createSpy(`onFailure`);

        const input: TestInput = {
          body: `Test Body; あ, 𩸽, §.`,
          testInjectedKey: `Test Injected Value`,
        };

        result = await textBodyParser(onSuccessful, onFailure)(input);
      });

      it(`executes the successful event handler once`, () => {
        expect(onSuccessful).toHaveBeenCalledTimes(1);
      });

      it(`executes the successful event handler with the expected input`, () => {
        expect(onSuccessful).toHaveBeenCalledWith({
          body: `Test Body; あ, 𩸽, §.`,
          testInjectedKey: `Test Injected Value`,
        });
      });

      it(`returns the result of the successful event handler`, () => {
        expect(result).toEqual({ testSuccessfulKey: `Test Successful Value` });
      });

      it(`does not execute the failure event handler`, () => {
        expect(onFailure).not.toHaveBeenCalled();
      });
    });

    describe(`when the body is an empty buffer`, () => {
      let onSuccessful: SuccessfulEventHandler;
      let onFailure: FailureEventHandler;
      let result: TestSuccessful | TestFailure;

      beforeAll(async () => {
        onSuccessful = jasmine
          .createSpy(`onSuccessful`)
          .and.returnValue({ testSuccessfulKey: `Test Successful Value` });
        onFailure = jasmine.createSpy(`onFailure`);

        const input: TestInput = {
          body: Buffer.from(Uint8Array.from([])),
          testInjectedKey: `Test Injected Value`,
        };

        result = await textBodyParser(onSuccessful, onFailure)(input);
      });

      it(`executes the successful event handler once`, () => {
        expect(onSuccessful).toHaveBeenCalledTimes(1);
      });

      it(`executes the successful event handler with the expected input`, () => {
        expect(onSuccessful).toHaveBeenCalledWith({
          body: ``,
          testInjectedKey: `Test Injected Value`,
        });
      });

      it(`returns the result of the successful event handler`, () => {
        expect(result).toEqual({ testSuccessfulKey: `Test Successful Value` });
      });

      it(`does not execute the failure event handler`, () => {
        expect(onFailure).not.toHaveBeenCalled();
      });
    });

    describe(`when the body is a buffer containing valid UTF-8`, () => {
      let onSuccessful: SuccessfulEventHandler;
      let onFailure: FailureEventHandler;
      let result: TestSuccessful | TestFailure;

      beforeAll(async () => {
        onSuccessful = jasmine
          .createSpy(`onSuccessful`)
          .and.returnValue({ testSuccessfulKey: `Test Successful Value` });
        onFailure = jasmine.createSpy(`onFailure`);

        const input: TestInput = {
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
              0x3b,
              0x20,
              0xe3,
              0x81,
              0x82,
              0x2c,
              0x20,
              0xf0,
              0xa9,
              0xb8,
              0xbd,
              0x2c,
              0x20,
              0xc2,
              0xa7,
              0x2e,
            ])
          ),
          testInjectedKey: `Test Injected Value`,
        };

        result = await textBodyParser(onSuccessful, onFailure)(input);
      });

      it(`executes the successful event handler once`, () => {
        expect(onSuccessful).toHaveBeenCalledTimes(1);
      });

      it(`executes the successful event handler with the expected input`, () => {
        expect(onSuccessful).toHaveBeenCalledWith({
          body: `Test Body; あ, 𩸽, §.`,
          testInjectedKey: `Test Injected Value`,
        });
      });

      it(`returns the result of the successful event handler`, () => {
        expect(result).toEqual({ testSuccessfulKey: `Test Successful Value` });
      });

      it(`does not execute the failure event handler`, () => {
        expect(onFailure).not.toHaveBeenCalled();
      });
    });

    describe(`when the body is a buffer containing invalid UTF-8`, () => {
      let onSuccessful: SuccessfulEventHandler;
      let onFailure: FailureEventHandler;
      let result: TestSuccessful | TestFailure;

      beforeAll(async () => {
        onSuccessful = jasmine.createSpy(`onSuccessful`);
        onFailure = jasmine
          .createSpy(`onFailure`)
          .and.returnValue({ testFailureKey: `Test Failure Value` });

        const input: TestInput = {
          body: Buffer.from(
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
          testInjectedKey: `Test Injected Value`,
        };

        result = await textBodyParser(onSuccessful, onFailure)(input);
      });

      it(`does not execute the successful event handler`, () => {
        expect(onSuccessful).not.toHaveBeenCalled();
      });

      it(`executes the failure event handler once`, () => {
        expect(onFailure).toHaveBeenCalledTimes(1);
      });

      it(`executes the failure event handler with the expected input`, () => {
        expect(onFailure).toHaveBeenCalledWith({
          body: Buffer.from(
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
          testInjectedKey: `Test Injected Value`,
        });
      });

      it(`returns the result of the failure event handler`, () => {
        expect(result).toEqual({ testFailureKey: `Test Failure Value` });
      });
    });
  });
});
