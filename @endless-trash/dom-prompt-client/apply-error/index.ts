import { ActionTransform } from "hyperapp-cjs";
import { State } from "../state";

export const applyError: ActionTransform<State, Error> = (state, props) => {
  state;

  return {
    type: `error`,
    error: props as Error,
  };
};
