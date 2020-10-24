import { Form } from "../form";

export type FormGroup = {
  readonly name: string;
  readonly forms: ReadonlyArray<Form>;
};
