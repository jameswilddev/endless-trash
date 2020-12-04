import { TextFieldState } from "../field-state/text-field-state";
import { State } from "../state";
import { UpdateFieldRawProps } from "../update-field-raw-props";

export function updateFieldRaw(
  state: State,
  props: UpdateFieldRawProps
): State {
  switch (state.type) {
    case `message`:
      return state;

    case `prompt`:
      return {
        ...state,
        formGroups: {
          ...state.formGroups,
          [props.formGroupName]: {
            ...state.formGroups[props.formGroupName],
            forms: {
              ...state.formGroups[props.formGroupName].forms,
              [props.formName]: {
                ...state.formGroups[props.formGroupName].forms[props.formName],
                fields: {
                  ...state.formGroups[props.formGroupName].forms[props.formName]
                    .fields,
                  [props.fieldName]: {
                    ...(state.formGroups[props.formGroupName].forms[
                      props.formName
                    ].fields[props.fieldName] as TextFieldState),
                    raw: props.raw,
                  },
                },
              },
            },
          },
        },
      };
  }
}
