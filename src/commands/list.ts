import pc from "picocolors";
import { loadInstalledSkills, parseFrontmatter } from "../lib/skills.js";
import { readFileSync } from "node:fs";

export async function list(): Promise<void> {
  const skills = loadInstalledSkills();

  if (skills.length === 0) {
    console.log(pc.dim("No skills installed."));
    console.log(pc.dim("Run `askill add <name>` to install from the registry."));
    return;
  }

  console.log(pc.bold(`${skills.length} skill(s) installed:\n`));

  for (const skill of skills) {
    const content = readFileSync(skill.path, "utf-8");
    const { frontmatter } = parseFrontmatter(content);
    const description = frontmatter?.description ?? "";
    const source = pc.dim(`[${skill.source}]`);

    console.log(`  ${pc.cyan(pc.bold(skill.name))} ${source}`);
    if (description) console.log(`  ${pc.dim(description)}`);
    console.log();
  }
}
