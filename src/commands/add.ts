import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import pc from "picocolors";
import { findRegistryEntry } from "../lib/registry.js";
import { installSkill, isInstalled } from "../lib/skills.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

function getRegistryDir(): string {
  // In dist/: dist/commands/add.js → need to go up to package root
  // registry/ is at package root
  return join(__dirname, "..", "..", "registry");
}

export async function add(name: string): Promise<void> {
  const entry = findRegistryEntry(name);

  if (!entry) {
    console.log(pc.red(`Skill "${name}" not found in registry.`));
    console.log(pc.dim("Run `askill search <query>` to find available skills."));
    process.exit(1);
  }

  if (isInstalled(name)) {
    console.log(pc.yellow(`Skill "${name}" is already installed.`));
    return;
  }

  const registryDir = getRegistryDir();
  const filePath = join(registryDir, entry.file);

  let content: string;
  try {
    content = readFileSync(filePath, "utf-8");
  } catch {
    console.log(pc.red(`Could not read registry file: ${entry.file}`));
    process.exit(1);
  }

  installSkill(name, content, "registry");
  console.log(pc.green(`Installed skill: ${pc.bold(name)}`));
  console.log(pc.dim(entry.description));
}
