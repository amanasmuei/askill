import { readFileSync, writeFileSync, readdirSync, unlinkSync, existsSync } from "node:fs";
import { join, basename } from "node:path";
import { paths, ensureDirs } from "./paths.js";

export interface InstalledSkill {
  name: string;
  source: "registry" | "custom" | "imported";
  installedAt: string;
  path: string;
}

export interface SkillFrontmatter {
  name: string;
  description: string;
  author?: string;
  version?: string;
  tags?: string[];
}

export function parseFrontmatter(content: string): {
  frontmatter: SkillFrontmatter | null;
  body: string;
} {
  const match = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return { frontmatter: null, body: content };

  const raw = match[1];
  const body = match[2];
  const fm: Record<string, unknown> = {};

  for (const line of raw.split("\n")) {
    const colonIdx = line.indexOf(":");
    if (colonIdx === -1) continue;
    const key = line.slice(0, colonIdx).trim();
    let value: unknown = line.slice(colonIdx + 1).trim();

    // Handle quoted strings
    if (typeof value === "string" && value.startsWith('"') && value.endsWith('"')) {
      value = value.slice(1, -1);
    }

    // Handle arrays like [a, b, c]
    if (typeof value === "string" && value.startsWith("[") && value.endsWith("]")) {
      value = value
        .slice(1, -1)
        .split(",")
        .map((s) => s.trim());
    }

    fm[key] = value;
  }

  if (!fm.name || !fm.description) return { frontmatter: null, body: content };

  return {
    frontmatter: fm as unknown as SkillFrontmatter,
    body,
  };
}

export function loadInstalledSkills(): InstalledSkill[] {
  ensureDirs();
  const files = readdirSync(paths.installed).filter((f) => f.endsWith(".md"));
  const skills: InstalledSkill[] = [];

  for (const file of files) {
    const filePath = join(paths.installed, file);
    const content = readFileSync(filePath, "utf-8");
    const { frontmatter } = parseFrontmatter(content);
    const name = frontmatter?.name ?? basename(file, ".md");

    // Determine source from frontmatter author or default
    let source: InstalledSkill["source"] = "custom";
    if (frontmatter?.author === "aman-ecosystem") {
      source = "registry";
    }

    skills.push({
      name,
      source,
      installedAt: filePath,
      path: filePath,
    });
  }

  return skills;
}

export function installSkill(
  name: string,
  content: string,
  source: InstalledSkill["source"],
): void {
  ensureDirs();
  const filePath = join(paths.installed, `${name}.md`);
  writeFileSync(filePath, content, "utf-8");
  generateSkillsMd();
}

export function removeSkill(name: string): boolean {
  const filePath = join(paths.installed, `${name}.md`);
  if (!existsSync(filePath)) return false;
  unlinkSync(filePath);
  generateSkillsMd();
  return true;
}

export function getSkillContent(name: string): string | null {
  const filePath = join(paths.installed, `${name}.md`);
  if (!existsSync(filePath)) return null;
  return readFileSync(filePath, "utf-8");
}

export function isInstalled(name: string): boolean {
  return existsSync(join(paths.installed, `${name}.md`));
}

export function generateSkillsMd(): string {
  ensureDirs();
  const skills = loadInstalledSkills();

  if (skills.length === 0) {
    const content = "# My AI Skills\n\nNo skills installed yet. Run `askill add <name>` to get started.\n";
    writeFileSync(paths.skillsMd, content, "utf-8");
    return content;
  }

  const sections: string[] = ["# My AI Skills\n"];

  for (const skill of skills) {
    const content = readFileSync(skill.path, "utf-8");
    const { frontmatter, body } = parseFrontmatter(content);
    const description = frontmatter?.description ?? "";

    sections.push(`## ${skill.name}`);
    if (description) sections.push(description);
    sections.push(body.trim());
    sections.push("\n---\n");
  }

  const output = sections.join("\n");
  writeFileSync(paths.skillsMd, output, "utf-8");
  return output;
}
