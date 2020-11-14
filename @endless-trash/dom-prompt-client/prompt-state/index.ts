import { Prompt } from "@endless-trash/prompt";
import { FormGroupState } from "../form-group-state";
import { SendState } from "../send-state";

export type PromptState = {
  readonly prompt: Prompt;
  readonly formGroups: {
    readonly [name: string]: FormGroupState;
  };
  readonly send: SendState;
};
