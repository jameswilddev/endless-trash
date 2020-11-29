import { Channel } from "@endless-trash/channel";
import { Prompt, Request } from "@endless-trash/prompt";
import { app, Dispatch } from "hyperapp-cjs";
import { bootstrap } from "../bootstrap";
import { State } from "../state";
import { view } from "../view";

export function domPromptClient(
  channel: Channel<Request, Prompt>,
  initialRequest: Request,
  node: Node
): void {
  app<State>({
    init: [
      { type: `message`, content: `Initializing...` },
      [
        (dispatch: Dispatch<State>) => {
          bootstrap(channel, initialRequest, dispatch);
        },
        null,
      ],
    ],
    view,
    node,
  });
}
