import { ActionTransform } from "hyperapp-cjs";
import { State } from "../state";

export const applyError: ActionTransform<State, unknown> = (state, props) => {
  state;

  return {
    type: `error`,
    error: `${props || `(no further details are available)`}`,
  };
};
