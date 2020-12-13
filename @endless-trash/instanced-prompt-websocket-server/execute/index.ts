import { EventHandler } from "@endless-trash/event-handler";
import { Json } from "@endless-trash/immutable-json-type";
import { Prompt, requestIsValid } from "@endless-trash/prompt";
import { AtLeastPartiallyValidRequest } from "@endless-trash/prompt/at-least-partially-valid-request";
import { WebsocketHostParsedInput } from "@endless-trash/websocket-host";
import { WebsocketHostUnserializedOutput } from "@endless-trash/websocket-host-body-serializer";
import { InstancedPromptApplication } from "../instanced-prompt-application";
import { ParsedToken } from "../parsed-token";
import { generateResponse } from "./generate-response";

export function execute<TState extends Json, TVersion>(
  instancedPromptApplication: InstancedPromptApplication<TState, TVersion>
): EventHandler<
  WebsocketHostParsedInput<AtLeastPartiallyValidRequest> & ParsedToken,
  WebsocketHostUnserializedOutput<Prompt>
> {
  return async (event) => {
    while (true) {
      const previousState = await instancedPromptApplication.stateKeyValueStore.get(
        event.instanceId
      );

      switch (previousState.type) {
        case `doesNotExist`:
          return await instancedPromptApplication.nonexistentInstanceEventHandler(
            event
          );

        case `successful`:
          const expectedPrompt = await instancedPromptApplication.renderPrompt(
            previousState.value,
            event.instanceId,
            event.userId,
            event.sessionId
          );

          const request = requestIsValid(expectedPrompt, event.body);

          if (request === null) {
            return {
              messages: [
                {
                  body: expectedPrompt,
                  sessionId: event.sessionId,
                },
              ],
            };
          } else {
            switch (request.command.type) {
              case `refresh`:
                return {
                  messages: [
                    {
                      body: expectedPrompt,
                      sessionId: event.sessionId,
                    },
                  ],
                };

              case `formSubmission`:
                const nextState = await instancedPromptApplication.applyFormSubmissionCommand(
                  previousState.value,
                  event.instanceId,
                  event.userId,
                  event.sessionId,
                  request.command
                );

                const updateResult = await instancedPromptApplication.stateKeyValueStore.update(
                  event.instanceId,
                  nextState,
                  previousState.version
                );

                switch (updateResult.type) {
                  case `doesNotExistOrVersionDoesNotMatch`:
                    continue;

                  case `successful`:
                    const output = await generateResponse(
                      instancedPromptApplication,
                      event.instanceId,
                      event.userId,
                      event.sessionId,
                      previousState.value,
                      nextState
                    );

                    await instancedPromptApplication.performSideEffects(
                      previousState.value,
                      nextState,
                      event.instanceId,
                      event.userId,
                      event.sessionId,
                      request.command
                    );

                    return output;
                }
            }
          }
      }
    }
  };
}
