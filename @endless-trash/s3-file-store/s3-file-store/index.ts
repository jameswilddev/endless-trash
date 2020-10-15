import { S3 } from "aws-sdk";
import { FileStoreGetUrlResult, FileStore } from "@endless-trash/file-store";
import { S3FileStoreConfiguration } from "../s3-file-store-configuration";

export class S3FileStore implements FileStore {
  constructor(
    private readonly s3FileStoreConfiguration: S3FileStoreConfiguration
  ) {}

  async delete(path: string): Promise<void> {
    await new S3(this.s3FileStoreConfiguration.clientConfiguration)
      .deleteObject({
        Bucket: this.s3FileStoreConfiguration.bucketName,
        Key: path,
      })
      .promise();
  }

  async getUrl(path: string): Promise<FileStoreGetUrlResult> {
    const s3 = new S3(this.s3FileStoreConfiguration.clientConfiguration);

    try {
      await s3
        .headObject({
          Bucket: this.s3FileStoreConfiguration.bucketName,
          Key: path,
        })
        .promise();
    } catch (e) {
      if (e.code === `NotFound`) {
        return { type: `doesNotExist` };
      } else {
        throw e;
      }
    }

    return {
      type: `successful`,
      url: await s3.getSignedUrlPromise(`getObject`, {
        Bucket: this.s3FileStoreConfiguration.bucketName,
        Key: path,
      }),
    };
  }

  async listPaths(prefix: string): Promise<ReadonlyArray<string>> {
    const s3 = new S3(this.s3FileStoreConfiguration.clientConfiguration);

    const parameters: S3.ListObjectsV2Request = {
      Bucket: this.s3FileStoreConfiguration.bucketName,
      Prefix: prefix,
    };

    let result = await s3.listObjectsV2(parameters).promise();

    const paths: string[] = [];

    while (true) {
      if (result.Contents) {
        for (const content of result.Contents) {
          if (content.Key !== undefined) {
            paths.push(content.Key);
          }
        }
      }

      if (result.IsTruncated) {
        parameters.ContinuationToken = result.NextContinuationToken;

        result = await s3.listObjectsV2(parameters).promise();
      } else {
        break;
      }
    }

    return paths;
  }

  async save(path: string, content: Buffer): Promise<void> {
    await new S3(this.s3FileStoreConfiguration.clientConfiguration)
      .putObject({
        Bucket: this.s3FileStoreConfiguration.bucketName,
        Key: path,
        Body: content,
      })
      .promise();
  }
}
