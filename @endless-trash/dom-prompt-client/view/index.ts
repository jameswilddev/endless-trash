import { VDOM } from "hyperapp-cjs";
import { messageView } from "../message-view";
import { promptView } from "../prompt-view";
import { State } from "../state";

export function view(state: State): VDOM<State> {
  switch (state.type) {
    case `message`:
      return messageView(state);

    case `prompt`:
      return promptView(state);
  }
}
