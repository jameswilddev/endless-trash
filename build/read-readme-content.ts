import { promises } from "fs";
import { join } from "path";

export async function readReadmeContent(
  name: ReadonlyArray<string>
): Promise<string> {
  const readmeContentPath = join(...[...name, `readme-content.md`]);
  const readmeContent = await promises.readFile(readmeContentPath, `utf8`);
  const trimmed = readmeContent.trim();

  if (trimmed === ``) {
    return readmeContent;
  }

  return `

${trimmed}`;
}
