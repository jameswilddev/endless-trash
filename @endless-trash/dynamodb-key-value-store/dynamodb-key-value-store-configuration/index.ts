import { ClientConfiguration } from "aws-sdk/clients/dynamodb";

export type DynamodbKeyValueStoreConfiguration = {
  readonly tableName: string;
  readonly keyAttributeName: string;
  readonly valueAttributeName: string;
  readonly versionAttributeName: string;
  readonly billing:
    | {
        readonly type: `payPerRequest`;
      }
    | {
        readonly type: `provisioned`;
        readonly readCapacityUnits: number;
        readonly writeCapacityUnits: number;
      };
  readonly encryption:
    | {
        readonly type: `none`;
      }
    | {
        readonly type: `kms`;
        readonly masterKeyId: string;
      };
  readonly tags: { readonly [key: string]: string };
  readonly clientConfiguration: ClientConfiguration;
};
