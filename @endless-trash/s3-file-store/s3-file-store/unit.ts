import { Credentials } from "aws-sdk";
import { S3FileStore } from ".";
import { S3FileStoreConfiguration } from "../s3-file-store-configuration";

describe(`S3FileStore`, () => {
  describe(`getUrl`, () => {
    describe(`when the server is not reachable`, () => {
      let error: undefined | Error;

      beforeAll(async () => {
        const s3FileStoreConfiguration: S3FileStoreConfiguration = {
          bucketName: `test-bucket-name`,
          clientConfiguration: {
            credentials: new Credentials(`S3RVER`, `S3RVER`),
            endpoint: `http://localhost:61000`,
            region: `local`,
            s3ForcePathStyle: true,
            maxRetries: 0,
          },
        };

        const s3FileStore = new S3FileStore(s3FileStoreConfiguration);

        try {
          await s3FileStore.getUrl(`Test Path`);
        } catch (e) {
          error = e;
        }
      }, 30000);

      it(`throws the expected error`, () => {
        expect(error).toEqual(
          new Error(`connect ECONNREFUSED 127.0.0.1:61000`)
        );
      });
    });
  });
});
