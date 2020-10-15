import { ClientConfiguration } from "aws-sdk/clients/s3";

export type S3FileStoreConfiguration = {
  readonly bucketName: string;
  readonly clientConfiguration: ClientConfiguration;
};
