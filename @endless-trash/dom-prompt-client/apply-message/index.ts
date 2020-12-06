import { ActionTransform } from "hyperapp-cjs";
import { State } from "../state";

export const applyMessage: ActionTransform<State, string> = (state, props) => {
  switch (state.type) {
    case `error`:
      return state;

    case `message`:
    case `prompt`:
      return {
        type: `message`,
        content: props as string,
        metadata: state.metadata,
      };
  }
};
