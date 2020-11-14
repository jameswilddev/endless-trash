import { Form } from "@endless-trash/prompt";
import { FieldsState } from "../fields-state";

export type FormState = {
  readonly form: Form;
  readonly fields: FieldsState;
};
