import { ChildProcess } from "child_process";
import { Credentials } from "aws-sdk";
import { launch } from "local-dynamo";
import { testKeyValueStore } from "@endless-trash/key-value-store";
import {
  initializeDynamodbKeyValueStore,
  DynamodbKeyValueStore,
  DynamodbKeyValueStoreConfiguration,
} from ".";

let tableCounter = 0;

describe(`DynamodbKeyValueStore`, () => {
  let localDynamoProcess: ChildProcess;

  beforeAll(() => {
    localDynamoProcess = launch({
      port: 61001,
    });
  });

  afterAll(async () => {
    localDynamoProcess.kill();
    await new Promise((resolve) => localDynamoProcess.on(`exit`, resolve));
  });

  testKeyValueStore(
    ``,
    async () => {
      const dynamodbKeyValueStoreConfiguration: DynamodbKeyValueStoreConfiguration = {
        tableName: `TestTableName${tableCounter++}`,
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
          endpoint: `http://localhost:61001`,
          region: `local`,
        },
      };

      await initializeDynamodbKeyValueStore(dynamodbKeyValueStoreConfiguration);

      return {
        dynamodbKeyValueStoreConfiguration,
      };
    },
    async (preparedScenario) => {
      return new DynamodbKeyValueStore(
        preparedScenario.dynamodbKeyValueStoreConfiguration
      );
    },
    async () => {
      // Nothing to do.
    },
    (version) => version,
    false
  );
});
