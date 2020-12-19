import { BodySerializer, SerializedBody } from "@endless-trash/body-serializer";
import { EventHandler } from "@endless-trash/event-handler";
import { bodySerializerEventHandler } from "..";

describe(`bodySerializerEventHandler`, () => {
  type TestInput = `Test Input`;
  type TestUnserializedBody = `Test Unserialized Body`;

  let wrapped: jasmine.Spy;
  let bodySerializer: jasmine.Spy;
  let output: {
    readonly testOutputKey: `Test Output Value`;
    readonly body: SerializedBody;
  };

  beforeAll(async () => {
    wrapped = jasmine.createSpy(`wrapped`).and.resolveTo({
      testOutputKey: `Test Output Value`,
      body: `Test Unserialized Body`,
    });

    bodySerializer = jasmine
      .createSpy(`bodySerializer`)
      .and.resolveTo(`Test Serialized Body`);

    const eventHandler = bodySerializerEventHandler(
      wrapped as EventHandler<
        TestInput,
        {
          readonly testOutputKey: `Test Output Value`;
          readonly body: TestUnserializedBody;
        }
      >,
      bodySerializer as BodySerializer<TestUnserializedBody>
    );

    output = await eventHandler(`Test Input`);
  });

  it(`executes the wrapped event handler once`, () => {
    expect(wrapped).toHaveBeenCalledTimes(1);
  });

  it(`executes the wrapped event handler with the event`, () => {
    expect(wrapped).toHaveBeenCalledWith(`Test Input`);
  });

  it(`executes the body serializer once`, () => {
    expect(bodySerializer).toHaveBeenCalledTimes(1);
  });

  it(`executes the body serializer with the body returned by the wrapped event handler`, () => {
    expect(bodySerializer).toHaveBeenCalledWith(`Test Unserialized Body`);
  });

  it(`returns the output of the wrapped event handler, with the body serialized`, () => {
    expect(output).toEqual({
      testOutputKey: `Test Output Value`,
      body: `Test Serialized Body`,
    });
  });
});
