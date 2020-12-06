import { Channel } from "@endless-trash/channel";
import { JsonObject } from "@endless-trash/immutable-json-type";
import { Prompt, Request } from "@endless-trash/prompt";
import { app, Dispatch } from "hyperapp-cjs";
import { bootstrap } from "../bootstrap";
import { State } from "../state";
import { view } from "../view";

export function domPromptClient(
  channel: Channel<Request, Prompt>,
  metadata: JsonObject,
  node: Node
): void {
  app<State>({
    init: [
      { type: `message`, content: `Initializing...`, metadata },
      [
        (dispatch: Dispatch<State>) => {
          bootstrap(channel, metadata, dispatch);
        },
        null,
      ],
    ],
    view,
    node,
  });
}
