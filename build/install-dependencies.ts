import { join } from "path";
import { runCommandLine } from "./run-command-line";

export async function installDependencies(
  name: ReadonlyArray<string>
): Promise<void> {
  console.log(`${name.join(`/`)} - Installing dependencies...`);
  const command = process.env.ENDLESS_TRASH_CI ? `ci` : `install`;
  console.log(
    `${name.join(`/`)} - ${await runCommandLine(
      `npm ${command}`,
      join(...name)
    )}`
  );
}
