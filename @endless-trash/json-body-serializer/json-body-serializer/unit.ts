import { jsonBodySerializer } from "..";

type TestInput = {
  readonly body: {
    readonly testBodyA: {
      readonly testBodyB: {
        readonly testBodyC: readonly [true, false, null, 4.32, "Test String"];
      };
    };
  };
  readonly testInjectedKey: `Test Injected Value`;
};

const testInput: TestInput = {
  body: {
    testBodyA: {
      testBodyB: {
        testBodyC: [true, false, null, 4.32, `Test String`],
      },
    },
  },
  testInjectedKey: `Test Injected Value`,
};

type TestOutput = {
  readonly body: null | string | Buffer;
  readonly testInjectedKey: `Test Injected Value`;
};

describe(`jsonBodySerializer`, () => {
  describe(`when space is not defined`, () => {
    let output: TestOutput;

    beforeAll(async () => {
      output = await jsonBodySerializer()(testInput);
    });

    it(`serializes the body to JSON`, () => {
      expect(output).toEqual({
        body: `{"testBodyA":{"testBodyB":{"testBodyC":[true,false,null,4.32,"Test String"]}}}`,
        testInjectedKey: `Test Injected Value`,
      });
    });
  });

  describe(`when space is NaN`, () => {
    let error: Error;

    beforeAll(() => {
      try {
        jsonBodySerializer(Number.NaN);
      } catch (e) {
        error = e;
      }
    });

    it(`throws the expected error`, () => {
      expect(error).toEqual(new Error(`The "space" argument must be finite.`));
    });
  });

  describe(`when space is positive infinity`, () => {
    let error: Error;

    beforeAll(() => {
      try {
        jsonBodySerializer(Number.POSITIVE_INFINITY);
      } catch (e) {
        error = e;
      }
    });

    it(`throws the expected error`, () => {
      expect(error).toEqual(new Error(`The "space" argument must be finite.`));
    });
  });

  describe(`when space is negative infinity`, () => {
    let error: Error;

    beforeAll(() => {
      try {
        jsonBodySerializer(Number.NEGATIVE_INFINITY);
      } catch (e) {
        error = e;
      }
    });

    it(`throws the expected error`, () => {
      expect(error).toEqual(new Error(`The "space" argument must be finite.`));
    });
  });

  describe(`when space is not an integer`, () => {
    let error: Error;

    beforeAll(() => {
      try {
        jsonBodySerializer(4.1);
      } catch (e) {
        error = e;
      }
    });

    it(`throws the expected error`, () => {
      expect(error).toEqual(
        new Error(`The "space" argument must be an integer.`)
      );
    });
  });

  describe(`when space is negative zero`, () => {
    let error: Error;

    beforeAll(() => {
      try {
        jsonBodySerializer(-0);
      } catch (e) {
        error = e;
      }
    });

    it(`throws the expected error`, () => {
      expect(error).toEqual(
        new Error(`The "space" argument cannot be less than zero.`)
      );
    });
  });

  describe(`when space is less than zero`, () => {
    let error: Error;

    beforeAll(() => {
      try {
        jsonBodySerializer(-1);
      } catch (e) {
        error = e;
      }
    });

    it(`throws the expected error`, () => {
      expect(error).toEqual(
        new Error(`The "space" argument cannot be less than zero.`)
      );
    });
  });

  describe(`when space is greater than ten`, () => {
    let error: Error;

    beforeAll(() => {
      try {
        jsonBodySerializer(11);
      } catch (e) {
        error = e;
      }
    });

    it(`throws the expected error`, () => {
      expect(error).toEqual(
        new Error(`The "space" argument cannot be greater than ten.`)
      );
    });
  });

  describe(`when space is zero`, () => {
    let output: TestOutput;

    beforeAll(async () => {
      output = await jsonBodySerializer(0)(testInput);
    });

    it(`serializes the body to JSON`, () => {
      expect(output).toEqual({
        body: `{"testBodyA":{"testBodyB":{"testBodyC":[true,false,null,4.32,"Test String"]}}}`,
        testInjectedKey: `Test Injected Value`,
      });
    });
  });

  describe(`when space is ten`, () => {
    let output: TestOutput;

    beforeAll(async () => {
      output = await jsonBodySerializer(10)(testInput);
    });

    it(`serializes the body to JSON`, () => {
      expect(output).toEqual({
        body: `{
          "testBodyA": {
                    "testBodyB": {
                              "testBodyC": [
                                        true,
                                        false,
                                        null,
                                        4.32,
                                        "Test String"
                              ]
                    }
          }
}`,
        testInjectedKey: `Test Injected Value`,
      });
    });
  });

  describe(`when space between zero and ten`, () => {
    let output: TestOutput;

    beforeAll(async () => {
      output = await jsonBodySerializer(4)(testInput);
    });

    it(`serializes the body to JSON`, () => {
      expect(output).toEqual({
        body: `{
    "testBodyA": {
        "testBodyB": {
            "testBodyC": [
                true,
                false,
                null,
                4.32,
                "Test String"
            ]
        }
    }
}`,
        testInjectedKey: `Test Injected Value`,
      });
    });
  });
});
