import { promises } from "fs";
import { processPackage } from "./process-package";
import { writeRootReadme } from "./write-root-readme";

export async function processAll(): Promise<void> {
  await Promise.all([
    processPackage([`endless-trash`]),
    ...(await promises.readdir(`@endless-trash`)).map((name) =>
      processPackage([`@endless-trash`, name])
    ),
  ]);

  await writeRootReadme();
}
