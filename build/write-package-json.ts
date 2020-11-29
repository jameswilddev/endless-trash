import { promises } from "fs";
import { join } from "path";

export async function writePackageJson(
  name: ReadonlyArray<string>,
  originalPackageJson: {
    readonly description: string;
    readonly version: string;
    readonly dependencies?: { readonly [name: string]: string };
    readonly devDependencies?: { readonly [name: string]: string };
    readonly peerDependencies?: { readonly [name: string]: string };
    readonly bin?: { readonly [name: string]: string };
    readonly scripts?: { readonly [name: string]: string };
  }
): Promise<void> {
  console.log(`${name.join(`/`)} - Writing package.json...`);
  const newPackageJsonPath = join(...[...name, `package.json`]);

  let hasTypes = true;
  try {
    await promises.stat(join(...[...name, `index.ts`]));
  } catch (e) {
    if (e.code === `ENOENT`) {
      hasTypes = false;
    } else {
      throw e;
    }
  }

  const processDependencyList = (
    list: undefined | { readonly [name: string]: string }
  ): undefined | { readonly [name: string]: string } => {
    return list !== undefined && Object.keys(list).length > 0
      ? list
      : undefined;
  };

  const newPackageJson = {
    name: `${name.join(`/`)}`,
    description: originalPackageJson.description,
    version: originalPackageJson.version,
    engines: {
      node: `>=10.19.0`,
    },
    engineStrict: true,
    publishConfig: {
      access: `public`,
    },
    private: false,
    files: [`**/*.js`, `**/*.d.ts`, `!**/unit.*`],
    repository: {
      type: `git`,
      url: `https://github.com/jameswilddev/endless-trash`,
    },
    license: `MIT`,
    dependencies: processDependencyList(originalPackageJson.dependencies),
    devDependencies: processDependencyList(originalPackageJson.devDependencies),
    peerDependencies: processDependencyList(
      originalPackageJson.peerDependencies
    ),
    bin: originalPackageJson.bin,
    scripts: originalPackageJson.scripts,
    types: hasTypes ? `index.d.ts` : undefined,
    sideEffects: false,
  };

  const newPackageJsonText = `${JSON.stringify(newPackageJson, null, 2)}\n`;
  await promises.writeFile(newPackageJsonPath, newPackageJsonText);
}
