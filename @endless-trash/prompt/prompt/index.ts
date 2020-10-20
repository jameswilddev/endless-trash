import { Form } from "../form";

export type Prompt = {
  readonly hasBackButton: boolean;
  readonly forms: ReadonlyArray<Form>;
};
