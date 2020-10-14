import { DynamoDB } from "aws-sdk";
import { DynamodbKeyValueStoreConfiguration } from "../dynamodb-key-value-store-configuration";
import { generateCreateTableInput } from "./generate-create-table-input";

export async function initializeDynamodbKeyValueStore(
  dynamodbKeyValueStoreConfiguration: DynamodbKeyValueStoreConfiguration
): Promise<void> {
  await new DynamoDB(dynamodbKeyValueStoreConfiguration.clientConfiguration)
    .createTable(generateCreateTableInput(dynamodbKeyValueStoreConfiguration))
    .promise();
}
