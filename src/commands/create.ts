import * as p from "@clack/prompts";
import pc from "picocolors";
import { installSkill, isInstalled } from "../lib/skills.js";

export async function create(initialName?: string): Promise<void> {
  p.intro(pc.cyan("Create a new skill"));

  const values = await p.group(
    {
      name: () =>
        p.text({
          message: "Skill name?",
          placeholder: "e.g., laravel-expert",
          initialValue: initialName,
          validate: (v) => {
            if (!v.trim()) return "Name is required";
            if (!/^[a-z0-9-]+$/.test(v.trim()))
              return "Use lowercase letters, numbers, and hyphens only";
            if (isInstalled(v.trim()))
              return `Skill "${v.trim()}" already exists`;
          },
        }),
      description: () =>
        p.text({
          message: "Description?",
          placeholder: "e.g., Laravel best practices and patterns",
          validate: (v) => {
            if (!v.trim()) return "Description is required";
          },
        }),
      tags: () =>
        p.text({
          message: "Tags? (comma-separated)",
          placeholder: "e.g., php, laravel, backend",
        }),
      approach: () =>
        p.text({
          message: "Core approach/philosophy?",
          placeholder: "e.g., Convention over configuration, use Eloquent ORM...",
          validate: (v) => {
            if (!v.trim()) return "Approach is required";
          },
        }),
      patterns: () =>
        p.text({
          message: "Key patterns or techniques? (separate with semicolons)",
          placeholder: "e.g., Use form requests for validation; Prefer query scopes...",
        }),
      antiPatterns: () =>
        p.text({
          message: "Anti-patterns to avoid? (separate with semicolons)",
          placeholder: "e.g., Don't use raw SQL when Eloquent works; Avoid fat controllers...",
        }),
    },
    {
      onCancel: () => {
        p.cancel("Cancelled.");
        process.exit(0);
      },
    },
  );

  const name = (values.name as string).trim();
  const description = (values.description as string).trim();
  const tagsRaw = ((values.tags as string) ?? "").trim();
  const approach = (values.approach as string).trim();
  const patternsRaw = ((values.patterns as string) ?? "").trim();
  const antiPatternsRaw = ((values.antiPatterns as string) ?? "").trim();

  const tags = tagsRaw
    ? tagsRaw.split(",").map((t) => t.trim()).filter(Boolean)
    : [];

  const patterns = patternsRaw
    ? patternsRaw.split(";").map((p) => p.trim()).filter(Boolean)
    : [];

  const antiPatterns = antiPatternsRaw
    ? antiPatternsRaw.split(";").map((p) => p.trim()).filter(Boolean)
    : [];

  // Build skill markdown
  let content = `---\nname: ${name}\ndescription: "${description}"\nauthor: custom\nversion: 1.0.0\ntags: [${tags.join(", ")}]\n---\n\n`;
  content += `# ${name.charAt(0).toUpperCase() + name.slice(1).replace(/-/g, " ")}\n\n`;
  content += `## Approach\n- ${approach}\n\n`;

  if (patterns.length > 0) {
    content += `## Patterns\n`;
    for (const pat of patterns) {
      content += `- ${pat}\n`;
    }
    content += "\n";
  }

  if (antiPatterns.length > 0) {
    content += `## Anti-patterns to avoid\n`;
    for (const ap of antiPatterns) {
      content += `- ${ap}\n`;
    }
    content += "\n";
  }

  installSkill(name, content, "custom");

  p.outro(pc.green(`Created and installed skill: ${pc.bold(name)}`));
}
