import { Json } from "@endless-trash/immutable-json-type";
import {
  KeyValueStore,
  KeyValueStoreGetResult,
  KeyValueStoreInsertResult,
  KeyValueStoreUpdateResult,
} from "@endless-trash/key-value-store";
import { SqliteKeyValueStoreConfiguration } from "../sqlite-key-value-store-configuration";
import { generateInsertQuery } from "./generate-insert-query";
import { generateSelectQuery } from "./generate-select-query";
import { generateUpdateQuery } from "./generate-update-query";
import { executeGet } from "@endless-trash/sqlite-helpers";
import { executeRun } from "@endless-trash/sqlite-helpers";

const doesNotExist: { readonly type: `doesNotExist` } = {
  type: `doesNotExist`,
};

const alreadyExists: KeyValueStoreInsertResult<number> = {
  type: `alreadyExists`,
};

const doesNotExistOrVersionDoesNotMatch: KeyValueStoreUpdateResult<number> = {
  type: `doesNotExistOrVersionDoesNotMatch`,
};

export class SqliteKeyValueStore<TValue extends Json>
  implements KeyValueStore<TValue, number> {
  constructor(
    private readonly sqliteKeyValueStoreConfiguration: SqliteKeyValueStoreConfiguration
  ) {}

  private readonly insertQuery = generateInsertQuery(
    this.sqliteKeyValueStoreConfiguration
  );

  private readonly selectQuery = generateSelectQuery(
    this.sqliteKeyValueStoreConfiguration
  );

  private readonly updateQuery = generateUpdateQuery(
    this.sqliteKeyValueStoreConfiguration
  );

  async get(key: string): Promise<KeyValueStoreGetResult<TValue, number>> {
    const result = await executeGet<{
      readonly value: string;
      readonly version: number;
    }>(
      this.sqliteKeyValueStoreConfiguration.sqliteConfiguration,
      this.selectQuery,
      [key]
    );

    if (result === undefined) {
      return doesNotExist;
    } else {
      return {
        type: `successful`,
        value: JSON.parse(result.value),
        version: result.version,
      };
    }
  }

  async insert(
    key: string,
    value: TValue
  ): Promise<KeyValueStoreInsertResult<number>> {
    try {
      await executeRun(
        this.sqliteKeyValueStoreConfiguration.sqliteConfiguration,
        false,
        this.insertQuery,
        [key, JSON.stringify(value)]
      );
    } catch (e) {
      if (
        e.message.startsWith(`SQLITE_CONSTRAINT: UNIQUE constraint failed: `)
      ) {
        return alreadyExists;
      } else {
        throw e;
      }
    }

    return { type: `successful`, version: 0 };
  }

  async update(
    key: string,
    value: TValue,
    expectedVersion: number
  ): Promise<KeyValueStoreUpdateResult<number>> {
    const changes = await executeRun(
      this.sqliteKeyValueStoreConfiguration.sqliteConfiguration,
      false,
      this.updateQuery,
      [JSON.stringify(value), expectedVersion + 1, key, expectedVersion]
    );

    if (changes !== 1) {
      return doesNotExistOrVersionDoesNotMatch;
    } else {
      return { type: `successful`, version: expectedVersion + 1 };
    }
  }
}
