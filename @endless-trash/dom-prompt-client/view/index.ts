import { VDOM } from "hyperapp-cjs";
import { errorView } from "../error-view";
import { messageView } from "../message-view";
import { promptView } from "../prompt-view";
import { State } from "../state";

export function view(state: State): VDOM<State> {
  switch (state.type) {
    case `error`:
      return errorView(state);

    case `message`:
      return messageView(state);

    case `prompt`:
      return promptView(state);
  }
}
