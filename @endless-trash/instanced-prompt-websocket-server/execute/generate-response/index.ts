import isEqual = require("lodash/isEqual");
import { Json } from "@endless-trash/immutable-json-type";
import { Prompt } from "@endless-trash/prompt";
import {
  WebsocketHostUnserializedOutput,
  WebsocketHostUnserializedOutputMessage,
} from "@endless-trash/websocket-host-body-serializer";
import { InstancedPromptApplication } from "../../instanced-prompt-application";

export async function generateResponse<TState extends Json, TVersion>(
  instancedPromptApplication: InstancedPromptApplication<TState, TVersion>,
  instanceId: string,
  userId: string,
  sessionId: string,
  previousState: TState,
  nextState: TState
): Promise<WebsocketHostUnserializedOutput<Prompt>> {
  const messages: WebsocketHostUnserializedOutputMessage<Prompt>[] = [
    {
      body: await instancedPromptApplication.renderPrompt(
        nextState,
        instanceId,
        userId,
        sessionId
      ),
      sessionId,
    },
  ];

  const previousSessions = await instancedPromptApplication.listSessions(
    previousState
  );

  const nextSessions = await instancedPromptApplication.listSessions(nextState);

  for (const previousSession of previousSessions) {
    if (previousSession.sessionId !== sessionId) {
      const nextSession = nextSessions.find(
        (nextSession) => nextSession.sessionId === previousSession.sessionId
      );

      const previousPrompt = await instancedPromptApplication.renderPrompt(
        previousState,
        instanceId,
        previousSession.userId,
        previousSession.sessionId
      );

      const nextPrompt = await instancedPromptApplication.renderPrompt(
        nextState,
        instanceId,
        nextSession === undefined ? previousSession.userId : nextSession.userId,
        previousSession.sessionId
      );

      if (!isEqual(previousPrompt, nextPrompt)) {
        messages.push({
          body: nextPrompt,
          sessionId: previousSession.sessionId,
        });
      }
    }
  }

  for (const nextSession of nextSessions) {
    if (
      nextSession.sessionId !== sessionId &&
      !previousSessions.some(
        (previousSession) => previousSession.sessionId === nextSession.sessionId
      )
    ) {
      const previousPrompt = await instancedPromptApplication.renderPrompt(
        previousState,
        instanceId,
        nextSession.userId,
        nextSession.sessionId
      );

      const nextPrompt = await instancedPromptApplication.renderPrompt(
        nextState,
        instanceId,
        nextSession.userId,
        nextSession.sessionId
      );

      if (!isEqual(previousPrompt, nextPrompt)) {
        messages.push({
          body: nextPrompt,
          sessionId: nextSession.sessionId,
        });
      }
    }
  }

  return { messages };
}
