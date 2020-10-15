import { promises } from "fs";
import { processPackage } from "./process-package";
import { writeRootReadme } from "./write-root-readme";

export async function processAll(): Promise<void> {
  await processPackage([`endless-trash`]);

  for (const name of await promises.readdir(`@endless-trash`)) {
    await processPackage([`@endless-trash`, name]);
  }

  await writeRootReadme();
}
