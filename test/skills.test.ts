import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { mkdirSync, rmSync, readFileSync, writeFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";
import {
  parseFrontmatter,
  installSkill,
  removeSkill,
  loadInstalledSkills,
  getSkillContent,
  isInstalled,
  generateSkillsMd,
} from "../src/lib/skills.js";
import * as pathsMod from "../src/lib/paths.js";

// Override paths for testing
const testDir = join(tmpdir(), "askill-test-" + Date.now());
const testInstalled = join(testDir, "installed");
const testSkillsMd = join(testDir, "skills.md");

beforeEach(() => {
  mkdirSync(testInstalled, { recursive: true });
  // Monkey-patch paths
  (pathsMod.paths as any).root = testDir;
  (pathsMod.paths as any).installed = testInstalled;
  (pathsMod.paths as any).skillsMd = testSkillsMd;
});

afterEach(() => {
  rmSync(testDir, { recursive: true, force: true });
});

describe("parseFrontmatter", () => {
  it("should parse valid frontmatter", () => {
    const content = `---\nname: testing\ndescription: "TDD and stuff"\nauthor: aman-ecosystem\nversion: 1.0.0\ntags: [testing, tdd]\n---\n\n# Testing\n\nContent here.`;
    const { frontmatter, body } = parseFrontmatter(content);
    expect(frontmatter).toBeDefined();
    expect(frontmatter!.name).toBe("testing");
    expect(frontmatter!.description).toBe("TDD and stuff");
    expect(body).toContain("# Testing");
  });

  it("should return null frontmatter for plain markdown", () => {
    const content = "# Just a heading\n\nSome text.";
    const { frontmatter, body } = parseFrontmatter(content);
    expect(frontmatter).toBeNull();
    expect(body).toBe(content);
  });
});

describe("skill management", () => {
  const sampleSkill = `---\nname: test-skill\ndescription: "A test skill"\nauthor: custom\nversion: 1.0.0\ntags: [test]\n---\n\n# Test Skill\n\nContent here.`;

  it("should install a skill", () => {
    installSkill("test-skill", sampleSkill, "custom");
    expect(existsSync(join(testInstalled, "test-skill.md"))).toBe(true);
  });

  it("should check if a skill is installed", () => {
    expect(isInstalled("test-skill")).toBe(false);
    installSkill("test-skill", sampleSkill, "custom");
    expect(isInstalled("test-skill")).toBe(true);
  });

  it("should get skill content", () => {
    installSkill("test-skill", sampleSkill, "custom");
    const content = getSkillContent("test-skill");
    expect(content).toBe(sampleSkill);
  });

  it("should return null for non-existent skill", () => {
    expect(getSkillContent("nonexistent")).toBeNull();
  });

  it("should remove a skill", () => {
    installSkill("test-skill", sampleSkill, "custom");
    expect(removeSkill("test-skill")).toBe(true);
    expect(isInstalled("test-skill")).toBe(false);
  });

  it("should return false when removing non-existent skill", () => {
    expect(removeSkill("nonexistent")).toBe(false);
  });

  it("should load installed skills", () => {
    installSkill("test-skill", sampleSkill, "custom");
    const skills = loadInstalledSkills();
    expect(skills).toHaveLength(1);
    expect(skills[0].name).toBe("test-skill");
  });

  it("should generate skills.md", () => {
    installSkill("test-skill", sampleSkill, "custom");
    const output = generateSkillsMd();
    expect(output).toContain("# My AI Skills");
    expect(output).toContain("## test-skill");
    expect(output).toContain("Content here.");
    expect(existsSync(testSkillsMd)).toBe(true);
  });

  it("should generate empty skills.md when no skills installed", () => {
    const output = generateSkillsMd();
    expect(output).toContain("No skills installed yet");
  });
});
