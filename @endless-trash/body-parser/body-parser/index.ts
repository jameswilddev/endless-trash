import { UnparsedBody } from "./unparsed-body";
import { BodyParserResult } from "./body-parser-result";

export { UnparsedBody } from "./unparsed-body";

export {
  SuccessfulBodyParserResult,
  UnsuccessfulBodyParserResult,
  BodyParserResult,
} from "./body-parser-result";

export interface BodyParser<TParsedLimit> {
  <TParsed extends TParsedLimit>(body: UnparsedBody): Promise<
    BodyParserResult<TParsed>
  >;
}
