import { EventHandler } from "@endless-trash/event-handler";
import { composeEventHandlers } from "..";

type TestInput = { readonly testInputKey: `Test Input Value` };
const testInput: TestInput = { testInputKey: `Test Input Value` };

type TestIntermediateA = {
  readonly testIntermediateAKey: `Test Intermediate A Value`;
};
const testIntermediateA: TestIntermediateA = {
  testIntermediateAKey: `Test Intermediate A Value`,
};

type TestIntermediateB = {
  readonly testIntermediateBKey: `Test Intermediate B Value`;
};
const testIntermediateB: TestIntermediateB = {
  testIntermediateBKey: `Test Intermediate B Value`,
};

type TestIntermediateC = {
  readonly testIntermediateCKey: `Test Intermediate C Value`;
};
const testIntermediateC: TestIntermediateC = {
  testIntermediateCKey: `Test Intermediate C Value`,
};

type TestOutput = { readonly testOutputKey: `Test Output Value` };
const testOutput: TestOutput = { testOutputKey: `Test Output Value` };

describe(`composeEventHandlers`, () => {
  describe(`given one event handler`, () => {
    describe(`on construction`, () => {
      let eventHandlerA: EventHandler<TestInput, TestOutput>;

      beforeAll(() => {
        eventHandlerA = jasmine.createSpy(`eventHandlerA`);

        composeEventHandlers(eventHandlerA)();
      });

      it(`does not execute the first event handler`, () => {
        expect(eventHandlerA).not.toHaveBeenCalled();
      });
    });

    describe(`on execution`, () => {
      let eventHandlerA: EventHandler<TestInput, TestOutput>;
      let result: TestOutput;

      beforeAll(async () => {
        eventHandlerA = jasmine
          .createSpy(`eventHandlerA`)
          .and.returnValue(testOutput);

        result = await composeEventHandlers(eventHandlerA)()(testInput);
      });

      it(`executes the first event handler once`, () => {
        expect(eventHandlerA).toHaveBeenCalledTimes(1);
      });

      it(`executes the first event handler with the input`, () => {
        expect(eventHandlerA).toHaveBeenCalledWith(testInput);
      });

      it(`returns the output`, () => {
        expect(result).toEqual(testOutput);
      });
    });
  });

  describe(`given two event handlers`, () => {
    describe(`on construction`, () => {
      let eventHandlerA: EventHandler<TestInput, TestIntermediateA>;
      let eventHandlerB: EventHandler<TestIntermediateA, TestOutput>;

      beforeAll(() => {
        eventHandlerA = jasmine.createSpy(`eventHandlerA`);
        eventHandlerB = jasmine.createSpy(`eventHandlerB`);

        composeEventHandlers(eventHandlerA)(eventHandlerB)();
      });

      it(`does not execute the first event handler`, () => {
        expect(eventHandlerA).not.toHaveBeenCalled();
      });

      it(`does not execute the second event handler`, () => {
        expect(eventHandlerB).not.toHaveBeenCalled();
      });
    });

    describe(`on execution`, () => {
      let eventHandlerA: EventHandler<TestInput, TestIntermediateA>;
      let eventHandlerB: EventHandler<TestIntermediateA, TestOutput>;
      let result: TestOutput;

      beforeAll(async () => {
        eventHandlerA = jasmine
          .createSpy(`eventHandlerA`)
          .and.returnValue(testIntermediateA);

        eventHandlerB = jasmine
          .createSpy(`eventHandlerB`)
          .and.returnValue(testOutput);

        result = await composeEventHandlers(eventHandlerA)(eventHandlerB)()(
          testInput
        );
      });

      it(`executes the first event handler once`, () => {
        expect(eventHandlerA).toHaveBeenCalledTimes(1);
      });

      it(`executes the first event handler with the input`, () => {
        expect(eventHandlerA).toHaveBeenCalledWith(testInput);
      });

      it(`executes the second event handler once`, () => {
        expect(eventHandlerB).toHaveBeenCalledTimes(1);
      });

      it(`executes the second event handler with the first intermediate value`, () => {
        expect(eventHandlerB).toHaveBeenCalledWith(testIntermediateA);
      });

      it(`returns the output`, () => {
        expect(result).toEqual(testOutput);
      });
    });
  });

  describe(`given three event handlers`, () => {
    describe(`on construction`, () => {
      let eventHandlerA: EventHandler<TestInput, TestIntermediateA>;
      let eventHandlerB: EventHandler<TestIntermediateA, TestIntermediateB>;
      let eventHandlerC: EventHandler<TestIntermediateB, TestOutput>;

      beforeAll(() => {
        eventHandlerA = jasmine.createSpy(`eventHandlerA`);
        eventHandlerB = jasmine.createSpy(`eventHandlerB`);
        eventHandlerC = jasmine.createSpy(`eventHandlerC`);

        composeEventHandlers(eventHandlerA)(eventHandlerB)(eventHandlerC)();
      });

      it(`does not execute the first event handler`, () => {
        expect(eventHandlerA).not.toHaveBeenCalled();
      });

      it(`does not execute the second event handler`, () => {
        expect(eventHandlerB).not.toHaveBeenCalled();
      });

      it(`does not execute the third event handler`, () => {
        expect(eventHandlerC).not.toHaveBeenCalled();
      });
    });

    describe(`on execution`, () => {
      let eventHandlerA: EventHandler<TestInput, TestIntermediateA>;
      let eventHandlerB: EventHandler<TestIntermediateA, TestIntermediateB>;
      let eventHandlerC: EventHandler<TestIntermediateB, TestOutput>;
      let result: TestOutput;

      beforeAll(async () => {
        eventHandlerA = jasmine
          .createSpy(`eventHandlerA`)
          .and.returnValue(testIntermediateA);

        eventHandlerB = jasmine
          .createSpy(`eventHandlerB`)
          .and.returnValue(testIntermediateB);

        eventHandlerC = jasmine
          .createSpy(`eventHandlerC`)
          .and.returnValue(testOutput);

        result = await composeEventHandlers(eventHandlerA)(eventHandlerB)(
          eventHandlerC
        )()(testInput);
      });

      it(`executes the first event handler once`, () => {
        expect(eventHandlerA).toHaveBeenCalledTimes(1);
      });

      it(`executes the first event handler with the input`, () => {
        expect(eventHandlerA).toHaveBeenCalledWith(testInput);
      });

      it(`executes the second event handler once`, () => {
        expect(eventHandlerB).toHaveBeenCalledTimes(1);
      });

      it(`executes the second event handler with the first intermediate value`, () => {
        expect(eventHandlerB).toHaveBeenCalledWith(testIntermediateA);
      });

      it(`executes the third event handler once`, () => {
        expect(eventHandlerC).toHaveBeenCalledTimes(1);
      });

      it(`executes the third event handler with the second intermediate value`, () => {
        expect(eventHandlerC).toHaveBeenCalledWith(testIntermediateB);
      });

      it(`returns the output`, () => {
        expect(result).toEqual(testOutput);
      });
    });
  });

  describe(`given four event handlers`, () => {
    describe(`on construction`, () => {
      let eventHandlerA: EventHandler<TestInput, TestIntermediateA>;
      let eventHandlerB: EventHandler<TestIntermediateA, TestIntermediateB>;
      let eventHandlerC: EventHandler<TestIntermediateB, TestIntermediateC>;
      let eventHandlerD: EventHandler<TestIntermediateC, TestOutput>;

      beforeAll(() => {
        eventHandlerA = jasmine.createSpy(`eventHandlerA`);
        eventHandlerB = jasmine.createSpy(`eventHandlerB`);
        eventHandlerC = jasmine.createSpy(`eventHandlerC`);
        eventHandlerD = jasmine.createSpy(`eventHandlerD`);

        composeEventHandlers(eventHandlerA)(eventHandlerB)(eventHandlerC)(
          eventHandlerD
        )();
      });

      it(`does not execute the first event handler`, () => {
        expect(eventHandlerA).not.toHaveBeenCalled();
      });

      it(`does not execute the second event handler`, () => {
        expect(eventHandlerB).not.toHaveBeenCalled();
      });

      it(`does not execute the third event handler`, () => {
        expect(eventHandlerC).not.toHaveBeenCalled();
      });

      it(`does not execute the fourth event handler`, () => {
        expect(eventHandlerD).not.toHaveBeenCalled();
      });
    });

    describe(`on execution`, () => {
      let eventHandlerA: EventHandler<TestInput, TestIntermediateA>;
      let eventHandlerB: EventHandler<TestIntermediateA, TestIntermediateB>;
      let eventHandlerC: EventHandler<TestIntermediateB, TestIntermediateC>;
      let eventHandlerD: EventHandler<TestIntermediateC, TestOutput>;
      let result: TestOutput;

      beforeAll(async () => {
        eventHandlerA = jasmine
          .createSpy(`eventHandlerA`)
          .and.returnValue(testIntermediateA);

        eventHandlerB = jasmine
          .createSpy(`eventHandlerB`)
          .and.returnValue(testIntermediateB);

        eventHandlerC = jasmine
          .createSpy(`eventHandlerC`)
          .and.returnValue(testIntermediateC);

        eventHandlerD = jasmine
          .createSpy(`eventHandlerD`)
          .and.returnValue(testOutput);

        result = await composeEventHandlers(eventHandlerA)(eventHandlerB)(
          eventHandlerC
        )(eventHandlerD)()(testInput);
      });

      it(`executes the first event handler once`, () => {
        expect(eventHandlerA).toHaveBeenCalledTimes(1);
      });

      it(`executes the first event handler with the input`, () => {
        expect(eventHandlerA).toHaveBeenCalledWith(testInput);
      });

      it(`executes the second event handler once`, () => {
        expect(eventHandlerB).toHaveBeenCalledTimes(1);
      });

      it(`executes the second event handler with the first intermediate value`, () => {
        expect(eventHandlerB).toHaveBeenCalledWith(testIntermediateA);
      });

      it(`executes the third event handler once`, () => {
        expect(eventHandlerC).toHaveBeenCalledTimes(1);
      });

      it(`executes the third event handler with the second intermediate value`, () => {
        expect(eventHandlerC).toHaveBeenCalledWith(testIntermediateB);
      });

      it(`executes the fourth event handler once`, () => {
        expect(eventHandlerD).toHaveBeenCalledTimes(1);
      });

      it(`executes the fourth event handler with the third intermediate value`, () => {
        expect(eventHandlerD).toHaveBeenCalledWith(testIntermediateC);
      });

      it(`returns the output`, () => {
        expect(result).toEqual(testOutput);
      });
    });
  });
});
