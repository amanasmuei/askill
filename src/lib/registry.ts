export interface RegistryEntry {
  name: string;
  description: string;
  tags: string[];
  file: string;
}

export const registry: RegistryEntry[] = [
  {
    name: "testing",
    description:
      "TDD, test design, property-based testing, mutation testing",
    tags: ["testing", "tdd", "quality"],
    file: "testing.md",
  },
  {
    name: "api-design",
    description:
      "REST conventions, error handling, pagination, versioning",
    tags: ["api", "rest", "design"],
    file: "api-design.md",
  },
  {
    name: "security",
    description:
      "OWASP top 10, input validation, auth patterns, secrets management",
    tags: ["security", "auth", "owasp"],
    file: "security.md",
  },
  {
    name: "performance",
    description:
      "Profiling, caching strategies, lazy loading, database optimization",
    tags: ["performance", "caching", "optimization"],
    file: "performance.md",
  },
  {
    name: "code-review",
    description:
      "What to look for, how to give actionable feedback, severity levels",
    tags: ["code-review", "feedback", "quality"],
    file: "code-review.md",
  },
  {
    name: "documentation",
    description:
      "JSDoc, README patterns, architecture decision records",
    tags: ["docs", "jsdoc", "adr"],
    file: "documentation.md",
  },
  {
    name: "git-workflow",
    description:
      "Branching strategies, commit messages, PR best practices",
    tags: ["git", "workflow", "branching"],
    file: "git-workflow.md",
  },
  {
    name: "debugging",
    description:
      "Systematic debugging, rubber duck, binary search, logging strategies",
    tags: ["debugging", "logging", "troubleshooting"],
    file: "debugging.md",
  },
  {
    name: "refactoring",
    description:
      "Code smells, extract method, single responsibility, SOLID",
    tags: ["refactoring", "solid", "clean-code"],
    file: "refactoring.md",
  },
  {
    name: "database",
    description:
      "Schema design, indexing, migrations, query optimization",
    tags: ["database", "sql", "schema", "indexing"],
    file: "database.md",
  },
  {
    name: "typescript",
    description:
      "Type safety patterns, generics, utility types, strict mode",
    tags: ["typescript", "types", "generics"],
    file: "typescript.md",
  },
  {
    name: "accessibility",
    description:
      "WCAG guidelines, semantic HTML, ARIA, keyboard navigation",
    tags: ["a11y", "wcag", "aria", "accessibility"],
    file: "accessibility.md",
  },
];

export function findRegistryEntry(name: string): RegistryEntry | undefined {
  return registry.find((e) => e.name === name);
}

export function searchRegistry(query: string): RegistryEntry[] {
  const q = query.toLowerCase();
  return registry.filter(
    (e) =>
      e.name.toLowerCase().includes(q) ||
      e.description.toLowerCase().includes(q) ||
      e.tags.some((t) => t.toLowerCase().includes(q)),
  );
}
