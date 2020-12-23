import { EventHandler } from "@endless-trash/event-handler";
import { Json } from "@endless-trash/immutable-json-type";
import { KeyValueStore } from "@endless-trash/key-value-store";
import {
  AtLeastPartiallyValidRequest,
  FormSubmissionCommand,
  Prompt,
} from "@endless-trash/prompt";
import { WebsocketHostParsedInput } from "@endless-trash/websocket-host";
import { WebsocketHostUnserializedOutput } from "@endless-trash/websocket-host-body-serializer";
import { HasInvalidRequestEventHandler } from "../has-invalid-request-event-handler";
import { Session } from "../session";

export interface InstancedPromptApplication<TState extends Json, TVersion>
  extends HasInvalidRequestEventHandler {
  readonly stateKeyValueStore: KeyValueStore<TState, TVersion>;

  renderPrompt(
    state: TState,
    instanceId: string,
    userId: string,
    sessionId: string
  ): Promise<Prompt>;

  applyFormSubmissionCommand(
    previousState: TState,
    instanceId: string,
    userId: string,
    sessionId: string,
    formSubmissionCommand: FormSubmissionCommand
  ): Promise<TState>;

  performSideEffects(
    previousState: TState,
    nextState: TState,
    instanceId: string,
    userId: string,
    sessionId: string,
    formSubmissionCommand: FormSubmissionCommand
  ): Promise<void>;

  listSessions(state: TState): Promise<ReadonlyArray<Session>>;

  readonly nonexistentInstanceEventHandler: EventHandler<
    WebsocketHostParsedInput<AtLeastPartiallyValidRequest>,
    WebsocketHostUnserializedOutput<Prompt>
  >;
}
