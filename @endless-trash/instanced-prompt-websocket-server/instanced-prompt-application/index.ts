import { EventHandler } from "@endless-trash/event-handler";
import { Json } from "@endless-trash/immutable-json-type";
import { KeyValueStore } from "@endless-trash/key-value-store";
import {
  AtLeastPartiallyValidRequest,
  FormSubmissionCommand,
  Prompt,
} from "@endless-trash/prompt";
import {
  WebsocketHostInput,
  WebsocketHostParsedInput,
} from "@endless-trash/websocket-host";
import { WebsocketHostUnserializedOutput } from "@endless-trash/websocket-host-body-serializer";

export interface InstancedPromptApplication<TState extends Json, TVersion> {
  readonly stateKeyValueStore: KeyValueStore<TState, TVersion>;

  renderPrompt(state: TState, sessionId: string): Promise<Prompt>;

  applyFormSubmissionCommand(
    previousState: TState,
    sessionId: string,
    formSubmissionCommand: FormSubmissionCommand
  ): Promise<TState>;

  performSideEffects(
    previousState: TState,
    nextState: TState,
    instanceId: string,
    sessionId: string,
    formSubmissionCommand: FormSubmissionCommand
  ): Promise<void>;

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
