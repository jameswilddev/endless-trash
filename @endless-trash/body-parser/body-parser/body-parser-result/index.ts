import { SuccessfulBodyParserResult } from "./successful-body-parser-result";
import { UnsuccessfulBodyParserResult } from "./unsuccessful-body-parser-result";

export { SuccessfulBodyParserResult } from "./successful-body-parser-result";
export { UnsuccessfulBodyParserResult } from "./unsuccessful-body-parser-result";

export type BodyParserResult<TParsed> =
  | SuccessfulBodyParserResult<TParsed>
  | UnsuccessfulBodyParserResult;
