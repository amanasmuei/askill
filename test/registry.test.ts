import { describe, it, expect } from "vitest";
import { registry, findRegistryEntry, searchRegistry } from "../src/lib/registry.js";

describe("registry", () => {
  it("should contain 12 built-in skills", () => {
    expect(registry).toHaveLength(12);
  });

  it("should have required fields for every entry", () => {
    for (const entry of registry) {
      expect(entry.name).toBeTruthy();
      expect(entry.description).toBeTruthy();
      expect(entry.tags.length).toBeGreaterThan(0);
      expect(entry.file).toMatch(/\.md$/);
    }
  });

  it("should have unique names", () => {
    const names = registry.map((e) => e.name);
    expect(new Set(names).size).toBe(names.length);
  });

  it("should find an entry by exact name", () => {
    const entry = findRegistryEntry("testing");
    expect(entry).toBeDefined();
    expect(entry!.name).toBe("testing");
  });

  it("should return undefined for unknown names", () => {
    expect(findRegistryEntry("nonexistent")).toBeUndefined();
  });

  it("should search by name", () => {
    const results = searchRegistry("testing");
    expect(results.length).toBeGreaterThanOrEqual(1);
    expect(results[0].name).toBe("testing");
  });

  it("should search by tag", () => {
    const results = searchRegistry("tdd");
    expect(results.length).toBeGreaterThanOrEqual(1);
  });

  it("should search by description", () => {
    const results = searchRegistry("REST");
    expect(results.length).toBeGreaterThanOrEqual(1);
    expect(results.some((e) => e.name === "api-design")).toBe(true);
  });

  it("should return empty for no matches", () => {
    const results = searchRegistry("zzzznonexistent");
    expect(results).toHaveLength(0);
  });
});
