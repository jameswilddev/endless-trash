import { State } from "../state";

export function applyAwaitingResponse(state: State): State {
  switch (state.type) {
    case `error`:
    case `message`:
      return state;

    case `prompt`:
      switch (state.mode) {
        case `interactive`:
        case `awaitingResponse`:
          return state;

        case `beingSent`:
          return {
            ...state,
            mode: `awaitingResponse`,
          };
      }
  }
}
