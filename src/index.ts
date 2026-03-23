declare const __VERSION__: string;

import { Command } from "commander";
import { add } from "./commands/add.js";
import { create } from "./commands/create.js";
import { importSkill } from "./commands/import-skill.js";
import { remove } from "./commands/remove.js";
import { search } from "./commands/search.js";
import { list } from "./commands/list.js";
import { show } from "./commands/show.js";
import { doctor } from "./commands/doctor.js";

const program = new Command();

program
  .name("askill")
  .description("The portable skill layer for AI companions")
  .version(__VERSION__);

program
  .command("add <name>")
  .description("Install a skill from the built-in registry")
  .action(add);

program
  .command("create [name]")
  .description("Create a custom skill interactively")
  .action(create);

program
  .command("import <path>")
  .description("Import a skill from any markdown file")
  .action(importSkill);

program
  .command("remove <name>")
  .description("Remove an installed skill")
  .action(remove);

program
  .command("search <query>")
  .description("Search the built-in registry")
  .action(search);

program
  .command("list")
  .description("List installed skills with descriptions")
  .action(list);

program
  .command("show <name>")
  .description("Show a skill's full content")
  .action(show);

program
  .command("doctor")
  .description("Run a health check")
  .action(doctor);

// Default action: list installed skills
program.action(list);

program.parse();
