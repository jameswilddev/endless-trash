import * as awsSdk from "aws-sdk";
import { generateCreateTableInput } from ".";
import { DynamodbKeyValueStoreConfiguration } from "../../dynamodb-key-value-store-configuration";

describe(`generateCreateTableInput`, () => {
  function scenario(
    description: string,
    dynamodbKeyValueStoreConfiguration: DynamodbKeyValueStoreConfiguration,
    expected: awsSdk.DynamoDB.CreateTableInput
  ): void {
    describe(description, () => {
      let actual: awsSdk.DynamoDB.CreateTableInput;

      beforeAll(() => {
        actual = generateCreateTableInput(dynamodbKeyValueStoreConfiguration);
      });

      it(`generates the expected create table input`, () => {
        expect(actual).toEqual(expected);
      });
    });
  }

  scenario(
    `billing pay per request encryption disabled`,
    {
      tableName: `Test Table Name`,
      keyAttributeName: `Test Key Attribute Name`,
      valueAttributeName: `Test Value Attribute Name`,
      versionAttributeName: `Test Version Attribute Name`,
      billing: {
        type: `payPerRequest`,
      },
      encryption: {
        type: `none`,
      },
      tags: {
        testTagAKey: `testTagAValue`,
        testTagBKey: `testTagBValue`,
        testTagCKey: `testTagCValue`,
      },
      clientConfiguration: {},
    },
    {
      AttributeDefinitions: [
        {
          AttributeName: `Test Key Attribute Name`,
          AttributeType: `S`,
        },
      ],
      TableName: `Test Table Name`,
      KeySchema: [
        {
          KeyType: `HASH`,
          AttributeName: `Test Key Attribute Name`,
        },
      ],
      BillingMode: `PAY_PER_REQUEST`,
      Tags: [
        {
          Key: `testTagAKey`,
          Value: `testTagAValue`,
        },
        {
          Key: `testTagBKey`,
          Value: `testTagBValue`,
        },
        {
          Key: `testTagCKey`,
          Value: `testTagCValue`,
        },
      ],
    }
  );

  scenario(
    `billing pay per request encryption enabled`,
    {
      tableName: `Test Table Name`,
      keyAttributeName: `Test Key Attribute Name`,
      valueAttributeName: `Test Value Attribute Name`,
      versionAttributeName: `Test Version Attribute Name`,
      billing: {
        type: `payPerRequest`,
      },
      encryption: {
        type: `kms`,
        masterKeyId: `Test Master Key Id`,
      },
      tags: {
        testTagAKey: `testTagAValue`,
        testTagBKey: `testTagBValue`,
        testTagCKey: `testTagCValue`,
      },
      clientConfiguration: {},
    },
    {
      AttributeDefinitions: [
        {
          AttributeName: `Test Key Attribute Name`,
          AttributeType: `S`,
        },
      ],
      TableName: `Test Table Name`,
      KeySchema: [
        {
          KeyType: `HASH`,
          AttributeName: `Test Key Attribute Name`,
        },
      ],
      BillingMode: `PAY_PER_REQUEST`,
      SSESpecification: {
        Enabled: true,
        SSEType: `KMS`,
        KMSMasterKeyId: `Test Master Key Id`,
      },
      Tags: [
        {
          Key: `testTagAKey`,
          Value: `testTagAValue`,
        },
        {
          Key: `testTagBKey`,
          Value: `testTagBValue`,
        },
        {
          Key: `testTagCKey`,
          Value: `testTagCValue`,
        },
      ],
    }
  );

  scenario(
    `billing provisioned encryption disabled`,
    {
      tableName: `Test Table Name`,
      keyAttributeName: `Test Key Attribute Name`,
      valueAttributeName: `Test Value Attribute Name`,
      versionAttributeName: `Test Version Attribute Name`,
      billing: {
        type: `provisioned`,
        readCapacityUnits: 3,
        writeCapacityUnits: 7,
      },
      encryption: {
        type: `none`,
      },
      tags: {
        testTagAKey: `testTagAValue`,
        testTagBKey: `testTagBValue`,
        testTagCKey: `testTagCValue`,
      },
      clientConfiguration: {},
    },
    {
      AttributeDefinitions: [
        {
          AttributeName: `Test Key Attribute Name`,
          AttributeType: `S`,
        },
      ],
      TableName: `Test Table Name`,
      KeySchema: [
        {
          KeyType: `HASH`,
          AttributeName: `Test Key Attribute Name`,
        },
      ],
      BillingMode: `PROVISIONED`,
      ProvisionedThroughput: {
        ReadCapacityUnits: 3,
        WriteCapacityUnits: 7,
      },
      Tags: [
        {
          Key: `testTagAKey`,
          Value: `testTagAValue`,
        },
        {
          Key: `testTagBKey`,
          Value: `testTagBValue`,
        },
        {
          Key: `testTagCKey`,
          Value: `testTagCValue`,
        },
      ],
    }
  );

  scenario(
    `billing provisioned encryption enabled`,
    {
      tableName: `Test Table Name`,
      keyAttributeName: `Test Key Attribute Name`,
      valueAttributeName: `Test Value Attribute Name`,
      versionAttributeName: `Test Version Attribute Name`,
      billing: {
        type: `provisioned`,
        readCapacityUnits: 3,
        writeCapacityUnits: 7,
      },
      encryption: {
        type: `kms`,
        masterKeyId: `Test Master Key Id`,
      },
      tags: {
        testTagAKey: `testTagAValue`,
        testTagBKey: `testTagBValue`,
        testTagCKey: `testTagCValue`,
      },
      clientConfiguration: {},
    },
    {
      AttributeDefinitions: [
        {
          AttributeName: `Test Key Attribute Name`,
          AttributeType: `S`,
        },
      ],
      TableName: `Test Table Name`,
      KeySchema: [
        {
          KeyType: `HASH`,
          AttributeName: `Test Key Attribute Name`,
        },
      ],
      BillingMode: `PROVISIONED`,
      ProvisionedThroughput: {
        ReadCapacityUnits: 3,
        WriteCapacityUnits: 7,
      },
      SSESpecification: {
        Enabled: true,
        SSEType: `KMS`,
        KMSMasterKeyId: `Test Master Key Id`,
      },
      Tags: [
        {
          Key: `testTagAKey`,
          Value: `testTagAValue`,
        },
        {
          Key: `testTagBKey`,
          Value: `testTagBValue`,
        },
        {
          Key: `testTagCKey`,
          Value: `testTagCValue`,
        },
      ],
    }
  );
});
