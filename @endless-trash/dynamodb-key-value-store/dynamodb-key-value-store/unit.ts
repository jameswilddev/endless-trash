import { Credentials } from "aws-sdk";
import { DynamodbKeyValueStore } from ".";
import { DynamodbKeyValueStoreConfiguration } from "../dynamodb-key-value-store-configuration";

const dynamodbKeyValueStoreConfiguration: DynamodbKeyValueStoreConfiguration = {
  tableName: `TestTableName`,
  keyAttributeName: `TestKeyAttributeName`,
  valueAttributeName: `TestValueAttributeName`,
  versionAttributeName: `TestVersionAttributeName`,
  billing: { type: `payPerRequest` },
  encryption: { type: `none` },
  tags: {},
  clientConfiguration: {
    credentials: new Credentials(
      `Test Access Key Id`,
      `Test Secret Access Key`
    ),
    endpoint: `http://localhost:61000`,
    region: `local`,
    maxRetries: 0,
  },
};

describe(`DynamodbKeyValueStore`, () => {
  describe(`insert`, () => {
    describe(`when the server is not reachable`, () => {
      let error: undefined | Error;

      beforeAll(async () => {
        const dynamodbKeyValueStore = new DynamodbKeyValueStore(
          dynamodbKeyValueStoreConfiguration
        );

        try {
          await dynamodbKeyValueStore.insert(`Test Key`, `Test Value`);
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

  describe(`update`, () => {
    describe(`when the server is not reachable`, () => {
      let error: undefined | Error;

      beforeAll(async () => {
        const dynamodbKeyValueStore = new DynamodbKeyValueStore(
          dynamodbKeyValueStoreConfiguration
        );

        try {
          await dynamodbKeyValueStore.update(`Test Key`, `Test Value`, 0);
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
