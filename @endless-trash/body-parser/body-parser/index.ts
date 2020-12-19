import { UnparsedBody } from "./unparsed-body";
import { BodyParserResult } from "./body-parser-result";

export { UnparsedBody } from "./unparsed-body";

export {
  SuccessfulBodyParserResult,
  UnsuccessfulBodyParserResult,
  BodyParserResult,
} from "./body-parser-result";

export interface BodyParser<TParsed> {
  (body: UnparsedBody): Promise<BodyParserResult<TParsed>>;
}
