import { homedir } from "node:os";
import { join } from "node:path";
import { mkdirSync } from "node:fs";

const ASKILL_DIR = join(homedir(), ".askill");
const INSTALLED_DIR = join(ASKILL_DIR, "installed");

export const paths = {
  root: ASKILL_DIR,
  installed: INSTALLED_DIR,
  skillsMd: join(ASKILL_DIR, "skills.md"),
  config: join(ASKILL_DIR, "config.json"),
} as const;

export function ensureDirs(): void {
  mkdirSync(paths.installed, { recursive: true });
}
