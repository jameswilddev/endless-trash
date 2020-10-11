import { promises } from "fs";
import { join } from "path";

export async function copyLicense(name: ReadonlyArray<string>): Promise<void> {
  console.log(`${name.join(`/`)} - Copying license...`);
  await promises.copyFile(`license`, join(...[...name, `license`]));
}
