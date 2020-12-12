import { EventHandler } from "@endless-trash/event-handler";
import { Json } from "@endless-trash/immutable-json-type";
import { KeyValueStore } from "@endless-trash/key-value-store";
import {
  AtLeastPartiallyValidRequest,
  Prompt,
  Request,
} from "@endless-trash/prompt";
import {
  WebsocketHostInput,
  WebsocketHostParsedInput,
} from "@endless-trash/websocket-host";
import { WebsocketHostUnserializedOutput } from "@endless-trash/websocket-host-body-serializer";

export interface InstancedPromptApplication<TState extends Json, TVersion> {
  readonly stateKeyValueStore: KeyValueStore<TState, TVersion>;

  renderPrompt(state: TState, sessionId: string): Promise<Prompt>;

  applyRequest(
    previousState: TState,
    sessionId: string,
    request: Request
  ): Promise<TState>;

  performSideEffects(previousState: TState, nextState: TState): Promise<void>;

  listSessionIds(state: TState): Promise<ReadonlyArray<string>>;

  readonly invalidRequestEventHandler: EventHandler<
    WebsocketHostInput,
    WebsocketHostUnserializedOutput<Prompt>
  >;

  readonly nonexistentInstanceEventHandler: EventHandler<
    WebsocketHostParsedInput<AtLeastPartiallyValidRequest>,
    WebsocketHostUnserializedOutput<Prompt>
  >;
}
