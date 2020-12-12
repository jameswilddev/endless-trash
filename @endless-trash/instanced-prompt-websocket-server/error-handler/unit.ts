import { Prompt } from "@endless-trash/prompt";
import { WebsocketHostUnserializedOutput } from "@endless-trash/websocket-host-body-serializer";
import { errorHandler } from "..";

describe(`errorHandler`, () => {
  let output: WebsocketHostUnserializedOutput<Prompt>;

  beforeAll(async () => {
    output = await errorHandler({
      formGroups: [{ name: `Test Form Group Name`, forms: [] }],
    })({
      body: `Test Body`,
      sessionId: `Test Session Id`,
    });
  });

  it(`returns the given prompt as a message`, () => {
    expect(output).toEqual({
      messages: [
        {
          body: {
            formGroups: [{ name: `Test Form Group Name`, forms: [] }],
          },
          sessionId: `Test Session Id`,
        },
      ],
    });
  });
});
