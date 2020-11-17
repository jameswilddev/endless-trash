import { h, text, VDOM } from "hyperapp-cjs";
import { MessageState } from "../message-state";
import { State } from "../state";

export function messageView(messageState: MessageState): VDOM<State> {
  return h(`p`, { class: `message` }, text(messageState.content));
}
