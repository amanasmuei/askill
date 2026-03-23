import pc from "picocolors";
import { getSkillContent } from "../lib/skills.js";

export async function show(name: string): Promise<void> {
  const content = getSkillContent(name);

  if (!content) {
    console.log(pc.red(`Skill "${name}" is not installed.`));
    process.exit(1);
  }

  console.log(content);
}
