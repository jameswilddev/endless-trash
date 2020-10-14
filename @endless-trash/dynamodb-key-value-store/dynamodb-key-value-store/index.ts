import { DynamoDB } from "aws-sdk";
import { Json } from "@endless-trash/immutable-json-type";
import {
  KeyValueStore,
  KeyValueStoreGetResult,
  KeyValueStoreInsertResult,
  KeyValueStoreUpdateResult,
} from "@endless-trash/key-value-store";
import { DynamodbKeyValueStoreConfiguration } from "../dynamodb-key-value-store-configuration";

const doesNotExist: { readonly type: `doesNotExist` } = {
  type: `doesNotExist`,
};

const alreadyExists: KeyValueStoreInsertResult<number> = {
  type: `alreadyExists`,
};

const doesNotExistOrVersionDoesNotMatch: KeyValueStoreUpdateResult<number> = {
  type: `doesNotExistOrVersionDoesNotMatch`,
};

export class DynamodbKeyValueStore<TKey extends string, TValue extends Json>
  implements KeyValueStore<TKey, TValue, number> {
  constructor(
    private readonly dynamodbKeyValueStoreConfiguration: DynamodbKeyValueStoreConfiguration
  ) {}

  async get(key: TKey): Promise<KeyValueStoreGetResult<TValue, number>> {
    const result = await new DynamoDB(
      this.dynamodbKeyValueStoreConfiguration.clientConfiguration
    )
      .getItem({
        TableName: this.dynamodbKeyValueStoreConfiguration.tableName,
        Key: {
          [this.dynamodbKeyValueStoreConfiguration.keyAttributeName]: {
            S: key,
          },
        },
        AttributesToGet: [
          this.dynamodbKeyValueStoreConfiguration.valueAttributeName,
          this.dynamodbKeyValueStoreConfiguration.versionAttributeName,
        ],
      })
      .promise();

    if (result.Item) {
      return {
        type: `successful`,
        value: JSON.parse(
          result.Item[
            this.dynamodbKeyValueStoreConfiguration.valueAttributeName
          ].S as string
        ),
        version: parseInt(
          result.Item[
            this.dynamodbKeyValueStoreConfiguration.versionAttributeName
          ].N as string
        ),
      };
    } else {
      return doesNotExist;
    }
  }

  async insert(
    key: TKey,
    value: TValue
  ): Promise<KeyValueStoreInsertResult<number>> {
    try {
      await new DynamoDB(
        this.dynamodbKeyValueStoreConfiguration.clientConfiguration
      )
        .putItem({
          TableName: this.dynamodbKeyValueStoreConfiguration.tableName,
          Item: {
            [this.dynamodbKeyValueStoreConfiguration.keyAttributeName]: {
              S: key,
            },
            [this.dynamodbKeyValueStoreConfiguration.valueAttributeName]: {
              S: JSON.stringify(value),
            },
            [this.dynamodbKeyValueStoreConfiguration.versionAttributeName]: {
              N: `0`,
            },
          },
          ConditionExpression: `attribute_not_exists(#key)`,
          ExpressionAttributeNames: {
            "#key": this.dynamodbKeyValueStoreConfiguration.keyAttributeName,
          },
        })
        .promise();

      return { type: `successful`, version: 0 };
    } catch (e) {
      if (e.code === `ConditionalCheckFailedException`) {
        return alreadyExists;
      } else {
        throw e;
      }
    }
  }

  async update(
    key: TKey,
    value: TValue,
    expectedVersion: number
  ): Promise<KeyValueStoreUpdateResult<number>> {
    try {
      await new DynamoDB(
        this.dynamodbKeyValueStoreConfiguration.clientConfiguration
      )
        .putItem({
          TableName: this.dynamodbKeyValueStoreConfiguration.tableName,
          Item: {
            [this.dynamodbKeyValueStoreConfiguration.keyAttributeName]: {
              S: key,
            },
            [this.dynamodbKeyValueStoreConfiguration.valueAttributeName]: {
              S: JSON.stringify(value),
            },
            [this.dynamodbKeyValueStoreConfiguration.versionAttributeName]: {
              N: String(expectedVersion + 1),
            },
          },
          ConditionExpression: `#version = :version`,
          ExpressionAttributeNames: {
            "#version": this.dynamodbKeyValueStoreConfiguration
              .versionAttributeName,
          },
          ExpressionAttributeValues: {
            ":version": {
              N: String(expectedVersion),
            },
          },
        })
        .promise();

      return { type: `successful`, version: expectedVersion + 1 };
    } catch (e) {
      if (e.code === `ConditionalCheckFailedException`) {
        return doesNotExistOrVersionDoesNotMatch;
      } else {
        throw e;
      }
    }
  }
}
