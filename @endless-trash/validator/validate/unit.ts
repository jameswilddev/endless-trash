import { Json } from "@endless-trash/immutable-json-type";
import { EventHandler } from "@endless-trash/event-handler";
import { JSONSchema6 } from "json-schema";
import { validate } from "..";

const jsonSchema: JSONSchema6 = {
  type: `integer`,
  exclusiveMinimum: 4,
};

type TestInput = {
  readonly testInjectedKey: `Test Injected Value`;
  readonly body: Json;
};

type TestOutput = {
  readonly testInjectedKey: `Test Injected Value`;
  readonly body: number;
};

type TestSuccessful = {
  readonly testSuccessfulKey: `Test Successful Value`;
};

type TestFailure = {
  readonly testFailureKey: `Test Failure Value`;
};

describe(`validate`, () => {
  describe(`on construction`, () => {
    let onSuccessful: EventHandler<TestOutput, TestSuccessful>;
    let onFailure: EventHandler<TestInput, TestFailure>;

    beforeAll(() => {
      onSuccessful = jasmine.createSpy(`onSuccessful`);
      onFailure = jasmine.createSpy(`onFailure`);

      validate(jsonSchema, onSuccessful, onFailure);
    });

    it(`does not execute the successful event handler`, () => {
      expect(onSuccessful).not.toHaveBeenCalled();
    });

    it(`does not execute the failure event handler`, () => {
      expect(onFailure).not.toHaveBeenCalled();
    });
  });

  describe(`on execution`, () => {
    describe(`when the request is valid`, () => {
      let onSuccessful: EventHandler<TestOutput, TestSuccessful>;
      let onFailure: EventHandler<TestInput, TestFailure>;

      let result: TestSuccessful | TestFailure;

      beforeAll(async () => {
        onSuccessful = jasmine
          .createSpy(`onSuccessful`)
          .and.returnValue({ testSuccessfulKey: `Test Successful Value` });
        onFailure = jasmine.createSpy(`onFailure`);

        result = await validate(
          jsonSchema,
          onSuccessful,
          onFailure
        )({
          testInjectedKey: `Test Injected Value`,
          body: 5,
        });
      });

      it(`executes the successful event handler once`, () => {
        expect(onSuccessful).toHaveBeenCalledTimes(1);
      });

      it(`executes the successful event handler with the expected input`, () => {
        expect(onSuccessful).toHaveBeenCalledWith({
          testInjectedKey: `Test Injected Value`,
          body: 5,
        });
      });

      it(`returns the output of the successful event handler`, () => {
        expect(result).toEqual({ testSuccessfulKey: `Test Successful Value` });
      });

      it(`does not execute the failure event handler`, () => {
        expect(onFailure).not.toHaveBeenCalled();
      });
    });

    describe(`when the request is not valid`, () => {
      let onSuccessful: EventHandler<TestOutput, TestSuccessful>;
      let onFailure: EventHandler<TestInput, TestFailure>;

      let result: TestSuccessful | TestFailure;

      beforeAll(async () => {
        onSuccessful = jasmine.createSpy(`onSuccessful`);
        onFailure = jasmine
          .createSpy(`onFailure`)
          .and.returnValue({ testFailureKey: `Test Failure Value` });

        result = await validate(
          jsonSchema,
          onSuccessful,
          onFailure
        )({
          testInjectedKey: `Test Injected Value`,
          body: 4,
        });
      });

      it(`does not execute the successful event handler`, () => {
        expect(onSuccessful).not.toHaveBeenCalled();
      });

      it(`executes the failure event handler once`, () => {
        expect(onFailure).toHaveBeenCalledTimes(1);
      });

      it(`executes the failure event handler with the expected input`, () => {
        expect(onFailure).toHaveBeenCalledWith({
          testInjectedKey: `Test Injected Value`,
          body: 4,
        });
      });

      it(`returns the output of the failure event handler`, () => {
        expect(result).toEqual({ testFailureKey: `Test Failure Value` });
      });
    });
  });
});
