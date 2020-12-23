import { Json } from "@endless-trash/immutable-json-type";
import { EventHandler } from "@endless-trash/event-handler";
import { WebsocketHostInput } from "@endless-trash/websocket-host";
import { bodyParserEventHandler } from "@endless-trash/body-parser-event-handler";
import { jsonBodySerializer } from "@endless-trash/json-body-serializer";
import { InstancedPromptApplication } from "../instanced-prompt-application";
import { partParseRequest } from "../part-parse-request";
import { WebsocketHostOutput } from "@endless-trash/websocket-host/websocket-host-output";
import { parseMetadata } from "../parse-metadata";
import { execute } from "../execute";
import { jsonBodyParser } from "@endless-trash/json-body-parser";
import {
  websocketHostBodySerializer,
  WebsocketHostUnserializedOutput,
} from "@endless-trash/websocket-host-body-serializer";
import { Prompt } from "@endless-trash/prompt";

export function instancedPromptWebsocketServer<TState extends Json, TVersion>(
  instancedPromptApplication: InstancedPromptApplication<TState, TVersion>
): EventHandler<WebsocketHostInput, WebsocketHostOutput> {
  return websocketHostBodySerializer(
    jsonBodySerializer(),
    bodyParserEventHandler<
      WebsocketHostInput,
      Json,
      WebsocketHostUnserializedOutput<Prompt>,
      WebsocketHostUnserializedOutput<Prompt>
    >(
      jsonBodyParser,
      partParseRequest(
        parseMetadata(
          execute(instancedPromptApplication),
          instancedPromptApplication
        ),
        instancedPromptApplication
      ),
      // todo: can we eliminate this somehow?
      async (event) => {
        return await instancedPromptApplication.invalidRequestEventHandler(
          event
        );
      }
    )
  );
}
