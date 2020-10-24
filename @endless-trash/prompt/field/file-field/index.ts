export type FileField = {
  readonly name: string;
  readonly type: `file`;
  readonly label: string;
  readonly url: null | string;
  readonly required: boolean;
  readonly maximumBytes: null | number;
};
