import pc from "picocolors";
import { searchRegistry } from "../lib/registry.js";
import { isInstalled } from "../lib/skills.js";

export async function search(query: string): Promise<void> {
  const results = searchRegistry(query);

  if (results.length === 0) {
    console.log(pc.yellow(`No skills matching "${query}".`));
    return;
  }

  console.log(pc.bold(`Found ${results.length} skill(s):\n`));

  for (const entry of results) {
    const installed = isInstalled(entry.name);
    const badge = installed ? pc.green(" [installed]") : "";
    console.log(`  ${pc.cyan(pc.bold(entry.name))}${badge}`);
    console.log(`  ${pc.dim(entry.description)}`);
    console.log(`  ${pc.dim(`tags: ${entry.tags.join(", ")}`)}`);
    console.log();
  }
}
