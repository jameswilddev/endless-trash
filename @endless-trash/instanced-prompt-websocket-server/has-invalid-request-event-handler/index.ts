import { EventHandler } from "@endless-trash/event-handler";
import { Json } from "@endless-trash/immutable-json-type";
import { AtLeastPartiallyValidRequest, Prompt } from "@endless-trash/prompt";
import {
  WebsocketHostInput,
  WebsocketHostParsedInput,
} from "@endless-trash/websocket-host";
import { WebsocketHostUnserializedOutput } from "@endless-trash/websocket-host-body-serializer";

export interface HasInvalidRequestEventHandler {
  readonly invalidRequestEventHandler: EventHandler<
    | WebsocketHostInput
    | WebsocketHostParsedInput<Json>
    | WebsocketHostParsedInput<AtLeastPartiallyValidRequest>,
    WebsocketHostUnserializedOutput<Prompt>
  >;
}
