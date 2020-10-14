import * as awsSdk from "aws-sdk";
import { DynamodbKeyValueStoreConfiguration } from "../../dynamodb-key-value-store-configuration";

export function generateCreateTableInput(
  dynamodbKeyValueStoreConfiguration: DynamodbKeyValueStoreConfiguration
): awsSdk.DynamoDB.CreateTableInput {
  const output: awsSdk.DynamoDB.CreateTableInput = {
    AttributeDefinitions: [
      {
        AttributeName: dynamodbKeyValueStoreConfiguration.keyAttributeName,
        AttributeType: `S`,
      },
    ],
    TableName: dynamodbKeyValueStoreConfiguration.tableName,
    KeySchema: [
      {
        AttributeName: dynamodbKeyValueStoreConfiguration.keyAttributeName,
        KeyType: `HASH`,
      },
    ],
    BillingMode:
      dynamodbKeyValueStoreConfiguration.billing.type === `provisioned`
        ? `PROVISIONED`
        : `PAY_PER_REQUEST`,
    Tags: Object.entries(dynamodbKeyValueStoreConfiguration.tags)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([Key, Value]) => ({
        Key,
        Value,
      })),
  };

  if (dynamodbKeyValueStoreConfiguration.billing.type === `provisioned`) {
    output.ProvisionedThroughput = {
      ReadCapacityUnits:
        dynamodbKeyValueStoreConfiguration.billing.readCapacityUnits,
      WriteCapacityUnits:
        dynamodbKeyValueStoreConfiguration.billing.writeCapacityUnits,
    };
  }

  if (dynamodbKeyValueStoreConfiguration.encryption.type === `kms`) {
    output.SSESpecification = {
      Enabled: true,
      SSEType: `KMS`,
      KMSMasterKeyId: dynamodbKeyValueStoreConfiguration.encryption.masterKeyId,
    };
  }

  return output;
}
