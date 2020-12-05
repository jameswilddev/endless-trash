import { ErrorState } from "../error-state";
import { MessageState } from "../message-state";
import { PromptState } from "../prompt-state";

export type State = ErrorState | MessageState | PromptState;
