import Ajv = require("ajv");
import { readFileSync } from "fs";
import { JSONSchema6 } from "json-schema";
import { Json } from "@endless-trash/immutable-json-type";
import { EventHandler } from "@endless-trash/event-handler";
import { ValidateInput } from "./validate-input";
import { ValidateOutput } from "./validate-output";

export { ValidateInput } from "./validate-input";
export { ValidateOutput } from "./validate-output";

const jsonSchemaDraft6 = JSON.parse(
  readFileSync(
    require.resolve(`ajv/lib/refs/json-schema-draft-06.json`),
    `utf8`
  )
);

type Output<TInput, TValidated extends Json> = Pick<
  TInput,
  Exclude<keyof TInput, keyof ValidateOutput<TValidated>>
> &
  ValidateOutput<TValidated>;

const ajv = new Ajv();
ajv.addMetaSchema(jsonSchemaDraft6);

export function validate<
  TInput extends ValidateInput,
  TValidated extends Json,
  TSuccessful,
  TFailure
>(
  jsonSchema: JSONSchema6,
  onSuccessful: EventHandler<Output<TInput, TValidated>, TSuccessful>,
  onFailure: EventHandler<TInput, TFailure>
): EventHandler<TInput, TSuccessful | TFailure> {
  const validate = ajv.compile(jsonSchema);

  return async (input: TInput) => {
    if (validate(input.body)) {
      return await onSuccessful({
        ...input,
        body: input.body as TValidated,
      });
    } else {
      return await onFailure(input);
    }
  };
}
