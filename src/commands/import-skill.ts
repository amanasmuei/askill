import { readFileSync, existsSync } from "node:fs";
import { basename } from "node:path";
import * as p from "@clack/prompts";
import pc from "picocolors";
import { installSkill, isInstalled, parseFrontmatter } from "../lib/skills.js";

export async function importSkill(filePath: string): Promise<void> {
  if (!existsSync(filePath)) {
    console.log(pc.red(`File not found: ${filePath}`));
    process.exit(1);
  }

  const raw = readFileSync(filePath, "utf-8");
  const { frontmatter, body } = parseFrontmatter(raw);

  let name: string;
  let content: string;

  if (frontmatter) {
    name = frontmatter.name;
    content = raw;
    console.log(pc.dim(`Detected frontmatter: ${frontmatter.name}`));
  } else {
    // Ask for metadata
    p.intro(pc.cyan("Import skill"));

    const defaultName = basename(filePath, ".md")
      .toLowerCase()
      .replace(/[^a-z0-9-]/g, "-");

    const values = await p.group(
      {
        name: () =>
          p.text({
            message: "Skill name?",
            initialValue: defaultName,
            validate: (v) => {
              if (!v.trim()) return "Name is required";
              if (!/^[a-z0-9-]+$/.test(v.trim()))
                return "Use lowercase letters, numbers, and hyphens only";
            },
          }),
        description: () =>
          p.text({
            message: "Description?",
            validate: (v) => {
              if (!v.trim()) return "Description is required";
            },
          }),
      },
      {
        onCancel: () => {
          p.cancel("Cancelled.");
          process.exit(0);
        },
      },
    );

    name = (values.name as string).trim();
    const description = (values.description as string).trim();

    content = `---\nname: ${name}\ndescription: "${description}"\nauthor: imported\nversion: 1.0.0\ntags: []\n---\n\n${body}`;
  }

  if (isInstalled(name)) {
    console.log(pc.yellow(`Skill "${name}" is already installed. Remove it first with \`askill remove ${name}\`.`));
    process.exit(1);
  }

  installSkill(name, content, "imported");
  console.log(pc.green(`Imported skill: ${pc.bold(name)}`));
}
