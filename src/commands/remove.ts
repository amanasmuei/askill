import pc from "picocolors";
import { removeSkill } from "../lib/skills.js";

export async function remove(name: string): Promise<void> {
  const removed = removeSkill(name);

  if (!removed) {
    console.log(pc.red(`Skill "${name}" is not installed.`));
    process.exit(1);
  }

  console.log(pc.green(`Removed skill: ${pc.bold(name)}`));
}
