import { promises } from "fs";
import { join } from "path";
import { generateReadme } from "./generate-readme";

export async function writeReadme(
  name: ReadonlyArray<string>,
  description: string,
  dependencies: undefined | { readonly [name: string]: string },
  peerDependencies: undefined | { readonly [name: string]: string }
): Promise<void> {
  console.log(`${name.join(`/`)} - Writing readme...`);
  await promises.writeFile(
    join(...[...name, `readme.md`]),
    await generateReadme(name, description, dependencies, peerDependencies)
  );
}
