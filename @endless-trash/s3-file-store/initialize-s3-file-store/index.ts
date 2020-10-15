import { S3 } from "aws-sdk";
import { S3FileStoreConfiguration } from "../s3-file-store-configuration";

export async function initializeS3FileStore(
  s3FileStoreConfiguration: S3FileStoreConfiguration
): Promise<void> {
  await new S3(s3FileStoreConfiguration.clientConfiguration)
    .createBucket({
      Bucket: s3FileStoreConfiguration.bucketName,
    })
    .promise();
}
