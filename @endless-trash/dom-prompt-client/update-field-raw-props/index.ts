import { RawFieldValue } from "../raw-field-value";

export type UpdateFieldRawProps = {
  readonly formGroupName: string;
  readonly formName: string;
  readonly fieldName: string;
  readonly raw: RawFieldValue;
};
