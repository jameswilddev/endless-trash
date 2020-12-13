import isEqual = require("lodash/isEqual");
import union = require("lodash/union");
import { Json } from "@endless-trash/immutable-json-type";
import { Prompt } from "@endless-trash/prompt";
import {
  WebsocketHostUnserializedOutput,
  WebsocketHostUnserializedOutputMessage,
} from "@endless-trash/websocket-host-body-serializer";
import { InstancedPromptApplication } from "../../instanced-prompt-application";

export async function generateResponse<TState extends Json, TVersion>(
  instancedPromptApplication: InstancedPromptApplication<TState, TVersion>,
  sessionId: string,
  previousState: TState,
  nextState: TState
): Promise<WebsocketHostUnserializedOutput<Prompt>> {
  const previousSessionIds = await instancedPromptApplication.listSessionIds(
    previousState
  );

  const nextSessionIds = await instancedPromptApplication.listSessionIds(
    nextState
  );

  const sessionIds = union(previousSessionIds, nextSessionIds).filter(
    (discoveredSessionId) => discoveredSessionId !== sessionId
  );

  const messages: WebsocketHostUnserializedOutputMessage<Prompt>[] = [
    {
      body: await instancedPromptApplication.renderPrompt(nextState, sessionId),
      sessionId,
    },
  ];

  await Promise.all(
    sessionIds.map(async (sessionId) => {
      const previousPrompt = await instancedPromptApplication.renderPrompt(
        previousState,
        sessionId
      );

      const nextPrompt = await instancedPromptApplication.renderPrompt(
        nextState,
        sessionId
      );

      if (!isEqual(previousPrompt, nextPrompt)) {
        messages.push({
          body: nextPrompt,
          sessionId,
        });
      }
    })
  );

  return { messages };
}
