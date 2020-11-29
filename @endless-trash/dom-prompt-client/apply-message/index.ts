import { ActionTransform } from "hyperapp-cjs";
import { State } from "../state";

export const applyMessage: ActionTransform<State, string> = (state, props) => {
  state;

  return {
    type: `message`,
    content: props as string,
  };
};
