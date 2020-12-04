import { Effect } from "hyperapp-cjs";
import { applyAwaitingResponse } from "../apply-awaiting-response";
import { applyError } from "../apply-error";
import { SendEffectProps } from "../send-effect-props";
import { State } from "../state";

export const sendEffect: Effect<State, SendEffectProps> = (dispatch, props) => {
  props = props as SendEffectProps;

  props.channelSend(props.request).then(
    () => {
      dispatch(applyAwaitingResponse);
    },
    (error) => {
      dispatch(applyError, error);
    }
  );
};
