import { promises } from "fs";
import { processPackage } from "./process-package";

export async function processAll(): Promise<void> {
  await processPackage([`endless-trash`]);

  console.log(`Publishing namespaced packages...`);
  for (const name of await promises.readdir(`@endless-trash`)) {
    await processPackage([`@endless-trash`, name]);
  }
}
