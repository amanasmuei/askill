# askill

The portable skill layer for AI companions -- teach your AI new capabilities.

```
npm i -g @aman_asmuei/askill
```

## The aman ecosystem

| Layer | Package | What it does |
|-------|---------|-------------|
| 1 | [acore](https://github.com/amanasmuei/acore) | Identity -- who the AI is |
| 2 | [amem](https://github.com/amanasmuei/amem) | Memory -- what the AI remembers |
| 3 | [atool](https://github.com/amanasmuei/atool) | Tools -- what the AI can do |
| 4 | [akit](https://github.com/amanasmuei/akit) | Toolkit -- curated tool collections |
| 5 | [aflow](https://github.com/amanasmuei/aflow) | Workflows -- multi-step processes |
| 6 | [arule](https://github.com/amanasmuei/arule) | Rules -- behavioral constraints |
| **7** | **askill** | **Skills -- deep domain expertise** |

## What's a skill?

A skill is a markdown file that teaches your AI deep knowledge about a specific domain. Unlike workflows (step-by-step processes), skills are **capabilities** -- deep expertise the AI applies contextually.

Think of it as giving your AI a senior developer's quick reference card for any topic.

## Quick start

```bash
# See what's available
askill search testing

# Install a skill
askill add testing

# List your skills
askill list

# Create your own
askill create

# Import from any markdown file
askill import ~/notes/laravel-tips.md
```

## Built-in registry

askill ships with 12 curated skills:

| Skill | What it covers |
|-------|---------------|
| `testing` | TDD, test design, property-based testing, mutation testing |
| `api-design` | REST conventions, error handling, pagination, versioning |
| `security` | OWASP top 10, input validation, auth patterns, secrets management |
| `performance` | Profiling, caching strategies, lazy loading, database optimization |
| `code-review` | What to look for, how to give actionable feedback, severity levels |
| `documentation` | JSDoc, README patterns, architecture decision records |
| `git-workflow` | Branching strategies, commit messages, PR best practices |
| `debugging` | Systematic debugging, rubber duck, binary search, logging strategies |
| `refactoring` | Code smells, extract method, single responsibility, SOLID |
| `database` | Schema design, indexing, migrations, query optimization |
| `typescript` | Type safety patterns, generics, utility types, strict mode |
| `accessibility` | WCAG guidelines, semantic HTML, ARIA, keyboard navigation |

## Commands

```
askill                    # List installed skills
askill add <name>         # Install from built-in registry
askill create [name]      # Create a custom skill interactively
askill import <path>      # Import from any markdown file
askill remove <name>      # Remove a skill
askill search <query>     # Search the registry
askill list               # List installed skills with descriptions
askill show <name>        # Show a skill's full content
askill doctor             # Health check
```

## Skill file format

Each skill is a markdown file with YAML frontmatter:

```markdown
---
name: my-skill
description: "What this skill covers"
author: your-name
version: 1.0.0
tags: [tag1, tag2]
---

# My Skill

## Approach
- Core philosophy and principles

## Patterns
- Key techniques and patterns to follow

## Anti-patterns to avoid
- Common mistakes to prevent
```

## How it works

1. Skills are stored in `~/.askill/installed/` as individual markdown files
2. `askill` generates a combined `~/.askill/skills.md` manifest
3. Your AI platform loads `skills.md` into context (via acore injection or aman-plugin)
4. The AI applies skill knowledge contextually during conversations

## Creating custom skills

```bash
askill create
```

This walks you through:
1. Naming your skill
2. Writing a description
3. Adding tags
4. Defining the approach/philosophy
5. Listing key patterns
6. Listing anti-patterns to avoid

The result is a properly formatted skill file, installed and ready to use.

## Importing skills

Have markdown notes you want to turn into a skill?

```bash
askill import ~/docs/react-patterns.md
```

If the file has frontmatter, it's used directly. Otherwise, you'll be asked for a name and description.

## Integration with acore

Add `~/.askill/skills.md` to your AI platform's system prompt injection, alongside `core.md`. The aman-plugin handles this automatically if you're using the full ecosystem.

## License

MIT
