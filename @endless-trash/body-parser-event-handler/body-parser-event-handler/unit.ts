import { BodyParser } from "@endless-trash/body-parser";
import { EventHandler } from "@endless-trash/event-handler";
import { bodyParserEventHandler } from "..";

describe(`bodyParserEventHandler`, () => {
  type TestParsed = `Test Parsed`;
  type TestInput = {
    readonly body: `Test Unparsed Body`;
    readonly testInjectedKey: `Test Injected Value`;
  };
  type TestSuccessfulOutput = `Test Successful Output`;
  type TestUnsuccessfulOutput = `Test Unsuccessful Output`;
  type TestOutput = TestSuccessfulOutput | TestUnsuccessfulOutput;

  describe(`when successful`, () => {
    let bodyParser: jasmine.Spy;
    let onSuccessful: jasmine.Spy;
    let onUnsuccessful: jasmine.Spy;
    let output: TestOutput;

    beforeAll(async () => {
      bodyParser = jasmine.createSpy(`bodyParser`).and.resolveTo({
        type: `successful`,
        body: `Test Parsed Body`,
      });

      onSuccessful = jasmine
        .createSpy(`onSuccessful`)
        .and.resolveTo(`Test Successful Output`);

      onUnsuccessful = jasmine.createSpy(`onUnsuccessful`);

      const eventHandler = bodyParserEventHandler(
        bodyParser as BodyParser<TestParsed>,
        onSuccessful as EventHandler<
          {
            readonly body: TestParsed;
            readonly testInjectedKey: `Test Injected Value`;
          },
          TestSuccessfulOutput
        >,
        onUnsuccessful as EventHandler<TestInput, TestUnsuccessfulOutput>
      );

      output = await eventHandler({
        body: `Test Unparsed Body`,
        testInjectedKey: `Test Injected Value`,
      });
    });

    it(`executes the body parser once`, () => {
      expect(bodyParser).toHaveBeenCalledTimes(1);
    });

    it(`provides the body parser with the unparsed body`, () => {
      expect(bodyParser).toHaveBeenCalledWith(`Test Unparsed Body`);
    });

    it(`executes the successful event handler once`, () => {
      expect(onSuccessful).toHaveBeenCalledTimes(1);
    });

    it(`executes the successful event handler with the original event, including the parsed body`, () => {
      expect(onSuccessful).toHaveBeenCalledWith({
        body: `Test Parsed Body`,
        testInjectedKey: `Test Injected Value`,
      });
    });

    it(`does not execute the unsuccessful event handler`, () => {
      expect(onUnsuccessful).not.toHaveBeenCalled();
    });

    it(`returns the result of the successful event handler`, () => {
      expect(output).toEqual(`Test Successful Output`);
    });
  });

  describe(`when unsuccessful`, () => {
    let bodyParser: jasmine.Spy;
    let onSuccessful: jasmine.Spy;
    let onUnsuccessful: jasmine.Spy;
    let output: TestOutput;

    beforeAll(async () => {
      bodyParser = jasmine.createSpy(`bodyParser`).and.resolveTo({
        type: `unsuccessful`,
      });

      onSuccessful = jasmine.createSpy(`onSuccessful`);

      onUnsuccessful = jasmine
        .createSpy(`onUnsuccessful`)
        .and.resolveTo(`Test Unsuccessful Output`);

      const eventHandler = bodyParserEventHandler(
        bodyParser as BodyParser<TestParsed>,
        onSuccessful as EventHandler<
          {
            readonly body: TestParsed;
            readonly testInjectedKey: `Test Injected Value`;
          },
          TestSuccessfulOutput
        >,
        onUnsuccessful as EventHandler<TestInput, TestUnsuccessfulOutput>
      );

      output = await eventHandler({
        body: `Test Unparsed Body`,
        testInjectedKey: `Test Injected Value`,
      });
    });

    it(`executes the body parser once`, () => {
      expect(bodyParser).toHaveBeenCalledTimes(1);
    });

    it(`provides the body parser with the unparsed body`, () => {
      expect(bodyParser).toHaveBeenCalledWith(`Test Unparsed Body`);
    });

    it(`does not execute the successful event handler`, () => {
      expect(onSuccessful).not.toHaveBeenCalled();
    });

    it(`executes the unsuccessful event handler once`, () => {
      expect(onUnsuccessful).toHaveBeenCalledTimes(1);
    });

    it(`executes the unsuccessful event handler with the original event`, () => {
      expect(onUnsuccessful).toHaveBeenCalledWith({
        body: `Test Unparsed Body`,
        testInjectedKey: `Test Injected Value`,
      });
    });

    it(`returns the result of the unsuccessful event handler`, () => {
      expect(output).toEqual(`Test Unsuccessful Output`);
    });
  });
});
