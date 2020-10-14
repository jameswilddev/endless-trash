import { Credentials } from "aws-sdk";
import { launch } from "local-dynamo";
import { testKeyValueStore } from "@endless-trash/key-value-store";
import {
  initializeDynamodbKeyValueStore,
  DynamodbKeyValueStore,
  DynamodbKeyValueStoreConfiguration,
} from ".";

let portCounter = 61000;

testKeyValueStore(
  `DynamodbKeyValueStore`,
  async () => {
    const port = portCounter;
    portCounter++;

    const localDynamoProcess = launch({
      port,
    });

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
        endpoint: `http://localhost:${port}`,
        region: `local`,
      },
    };

    await initializeDynamodbKeyValueStore(dynamodbKeyValueStoreConfiguration);

    return {
      localDynamoProcess,
      dynamodbKeyValueStoreConfiguration,
    };
  },
  async (preparedScenario) => {
    return new DynamodbKeyValueStore(
      preparedScenario.dynamodbKeyValueStoreConfiguration
    );
  },
  async (preparedScenario) => {
    preparedScenario.localDynamoProcess.kill();
    await new Promise((resolve) =>
      preparedScenario.localDynamoProcess.on(`exit`, resolve)
    );
  },
  (version) => version,
  false
);
