export type VideoField = {
  readonly type: `video`;
  readonly sources: ReadonlyArray<{
    readonly mimeType: string;
    readonly url: string;
  }>;
  readonly name: string;
  readonly autoplay: boolean;
  readonly loop: boolean;
};
