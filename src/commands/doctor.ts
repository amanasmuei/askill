import { existsSync } from "node:fs";
import pc from "picocolors";
import { paths } from "../lib/paths.js";
import { loadInstalledSkills } from "../lib/skills.js";

export async function doctor(): Promise<void> {
  console.log(pc.bold("askill doctor\n"));

  let ok = true;

  // Check directories
  const dirExists = existsSync(paths.root);
  console.log(
    dirExists
      ? pc.green(`  ~/.askill/ directory exists`)
      : pc.red(`  ~/.askill/ directory missing`),
  );
  if (!dirExists) ok = false;

  const installedExists = existsSync(paths.installed);
  console.log(
    installedExists
      ? pc.green(`  ~/.askill/installed/ directory exists`)
      : pc.red(`  ~/.askill/installed/ directory missing`),
  );
  if (!installedExists) ok = false;

  // Check skills.md
  const skillsMdExists = existsSync(paths.skillsMd);
  console.log(
    skillsMdExists
      ? pc.green(`  skills.md exists`)
      : pc.yellow(`  skills.md not generated yet`),
  );

  // Count installed skills
  const skills = loadInstalledSkills();
  console.log(pc.dim(`  ${skills.length} skill(s) installed`));

  // Check for invalid skill files
  let invalid = 0;
  for (const skill of skills) {
    if (!existsSync(skill.path)) {
      console.log(pc.red(`  Missing file: ${skill.path}`));
      invalid++;
    }
  }

  console.log();
  if (ok && invalid === 0) {
    console.log(pc.green("All checks passed."));
  } else {
    console.log(pc.yellow("Some issues found. Run `askill add <name>` to install skills."));
  }
}
