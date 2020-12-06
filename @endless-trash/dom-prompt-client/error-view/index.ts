import { h, text, VDOM } from "hyperapp-cjs";
import { ErrorState } from "../error-state";
import { State } from "../state";

export function errorView(errorState: ErrorState): VDOM<State> {
  return h(`div`, { class: `error` }, [
    h(
      `p`,
      {},
      text(`A communication error has occurred:\n\n${errorState.error}`)
    ),
    h(
      `button`,
      {
        type: `button`,
        onclick(state) {
          location.reload();
          return state;
        },
      },
      text(`Reload`)
    ),
  ]);
}
