import { tmpdir } from "os";
import { join } from "path";
import { promises } from "fs";
import { promisify } from "util";
import rimraf = require("rimraf");
import { v4 } from "uuid";
import { Credentials } from "aws-sdk";
import S3rver = require("s3rver");
import { testFileStore } from "@endless-trash/file-store";
import { S3FileStore } from ".";
import { S3FileStoreConfiguration } from "./s3-file-store-configuration";
import { initializeS3FileStore } from "./initialize-s3-file-store";

let bucketCounter = 0;

describe(`S3FileStore`, () => {
  let directory: string;
  let s3rver: S3rver;

  beforeAll(async () => {
    directory = join(tmpdir(), v4());

    await promises.mkdir(directory, { recursive: true });

    s3rver = new S3rver({
      port: 61002,
      directory,
      silent: true,
    });

    await new Promise((resolve) => s3rver.run(resolve));
  });

  afterAll(async () => {
    await new Promise((resolve) => s3rver.close(resolve));

    await promisify(rimraf)(directory);
  }, 30000);

  testFileStore(
    ``,
    async () => {
      const s3FileStoreConfiguration: S3FileStoreConfiguration = {
        bucketName: `test-bucket-name-${bucketCounter++}`,
        clientConfiguration: {
          credentials: new Credentials(`S3RVER`, `S3RVER`),
          endpoint: `http://localhost:61002`,
          region: `local`,
          s3ForcePathStyle: true,
        },
      };

      await initializeS3FileStore(s3FileStoreConfiguration);

      return s3FileStoreConfiguration;
    },
    async (s3FileStoreConfiguration) => {
      return new S3FileStore(s3FileStoreConfiguration);
    },
    async () => {
      // Nothing to clean up.
    },
    false
  );

  describe(`listPaths`, () => {
    describe(`when multiple fetches are necessary to fetch all names`, () => {
      let expected: ReadonlyArray<string>;
      let actual: ReadonlyArray<string>;

      beforeAll(async () => {
        const s3FileStoreConfiguration: S3FileStoreConfiguration = {
          bucketName: `test-bucket-name-for-list-paths-with-multiple-fetches`,
          clientConfiguration: {
            credentials: new Credentials(`S3RVER`, `S3RVER`),
            endpoint: `http://localhost:61002`,
            region: `local`,
            s3ForcePathStyle: true,
          },
        };

        await initializeS3FileStore(s3FileStoreConfiguration);

        const s3FileStore = new S3FileStore(s3FileStoreConfiguration);

        const paths: string[] = [];

        for (let i = 0; i < 5000; i++) {
          paths.push(`Test Path ${i.toString().padStart(4, `0`)}`);
        }

        expected = paths;

        const remaining = [...paths];

        while (remaining.length > 0) {
          await Promise.all(
            remaining
              .splice(0, 100)
              .map((path) => s3FileStore.save(path, Buffer.from([])))
          );
        }

        actual = await s3FileStore.listPaths(``);
      }, 300000);

      it(`returns all names`, () => {
        expect(actual).toEqual(expected);
      });
    });
  });
});
