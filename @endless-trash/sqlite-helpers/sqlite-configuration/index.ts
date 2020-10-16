export type SqliteConfiguration = {
  readonly filename: string;
  readonly maximumAttempts: number;
  readonly minimumRetryDelayMilliseconds: number;
  readonly maximumRetryDelayMilliseconds: number;
};
