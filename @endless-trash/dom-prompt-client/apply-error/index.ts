import { ActionTransform } from "hyperapp-cjs";
import { applyMessage } from "../apply-message";
import { State } from "../state";

export const applyError: ActionTransform<State, Error> = (state, props) => {
  state;

  return [
    applyMessage,
    `A communication error has occurred:\n\n${props}\n\nPlease refresh to reconnect.`,
  ];
};
