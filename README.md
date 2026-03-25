<div align="center">

<br>

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://img.shields.io/badge/askill-skill_layer-white?style=for-the-badge&labelColor=0d1117&color=58a6ff">
  <img alt="askill" src="https://img.shields.io/badge/askill-skill_layer-black?style=for-the-badge&labelColor=f6f8fa&color=24292f">
</picture>

### The portable skill layer for AI companions.

Teach your AI deep domain expertise — testing, security, API design, and more. Skills are capabilities, not steps.

<br>

[![npm](https://img.shields.io/npm/v/@aman_asmuei/askill?style=flat-square&color=cb3837)](https://www.npmjs.com/package/@aman_asmuei/askill)
[![CI](https://img.shields.io/github/actions/workflow/status/amanasmuei/askill/ci.yml?style=flat-square&label=tests)](https://github.com/amanasmuei/askill/actions)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](LICENSE)
[![aman](https://img.shields.io/badge/part_of-aman_ecosystem-ff6b35.svg?style=flat-square)](https://github.com/amanasmuei/aman)

[Quick Start](#quick-start) · [Built-in Skills](#built-in-registry) · [Commands](#commands) · [Create Your Own](#creating-custom-skills) · [Ecosystem](#the-ecosystem)

</div>

---

## The Problem

Your AI knows a little about everything but masters nothing. You need it to think like a senior engineer when reviewing security, or like a DBA when optimizing queries — but it applies generic advice instead of deep expertise.

## The Solution

**askill** gives your AI senior-level expertise in specific domains. Unlike workflows (step-by-step processes), skills are **capabilities** — deep knowledge the AI applies contextually.

```bash
npx @aman_asmuei/askill add testing
```

> **Think of it as giving your AI a senior developer's quick reference card for any topic.**

---

## Quick Start

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

---

## Built-in Registry

askill ships with 12 curated skills:

| Skill | What it covers |
|:------|:---------------|
| `testing` | TDD, test design, property-based testing, mutation testing |
| `api-design` | REST conventions, error handling, pagination, versioning |
| `security` | OWASP top 10, input validation, auth patterns, secrets management |
| `performance` | Profiling, caching strategies, lazy loading, database optimization |
| `code-review` | What to look for, actionable feedback, severity levels |
| `documentation` | JSDoc, README patterns, architecture decision records |
| `git-workflow` | Branching strategies, commit messages, PR best practices |
| `debugging` | Systematic debugging, rubber duck, binary search, logging |
| `refactoring` | Code smells, extract method, single responsibility, SOLID |
| `database` | Schema design, indexing, migrations, query optimization |
| `typescript` | Type safety patterns, generics, utility types, strict mode |
| `accessibility` | WCAG guidelines, semantic HTML, ARIA, keyboard navigation |

---

## Commands

| Command | What it does |
|:--------|:-------------|
| `askill` | List installed skills |
| `askill add <name>` | Install from built-in registry |
| `askill create [name]` | Create a custom skill interactively |
| `askill import <path>` | Import from any markdown file |
| `askill remove <name>` | Remove a skill |
| `askill search <query>` | Search the registry |
| `askill list` | List installed skills with descriptions |
| `askill show <name>` | Show a skill's full content |
| `askill doctor` | Health check |

---

## How It Works

```
1. Skills stored in ~/.askill/installed/ as individual markdown files
2. askill generates a combined ~/.askill/skills.md manifest
3. Your AI platform loads skills.md into context
4. The AI applies skill knowledge contextually during conversations
```

### Skill File Format

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

---

## Creating Custom Skills

```bash
askill create
```

Walks you through:

1. **Name** — what to call the skill
2. **Description** — one-line summary
3. **Tags** — for discoverability
4. **Approach** — core philosophy and principles
5. **Patterns** — key techniques to follow
6. **Anti-patterns** — common mistakes to prevent

The result is a properly formatted skill file, installed and ready to use.

---

## Importing Skills

Have markdown notes you want to turn into a skill?

```bash
askill import ~/docs/react-patterns.md
```

If the file has frontmatter, it's used directly. Otherwise, you'll be asked for a name and description.

---

## Integration

### With acore

Skills are auto-loaded into your AI platform's system prompt alongside `core.md`, `kit.md`, and other ecosystem files.

### With aman-plugin

The [aman-plugin](https://github.com/amanasmuei/aman-plugin) handles this automatically for Claude Code.

---

## The Ecosystem

```
aman
├── acore      → identity    → who your AI IS
├── amem       → memory      → what your AI KNOWS
├── akit       → tools       → what your AI CAN DO
├── aflow      → workflows   → HOW your AI works
├── arules     → guardrails  → what your AI WON'T do
├── askill     → skills      → what your AI MASTERS  ← YOU ARE HERE
├── aeval      → evaluation  → how GOOD your AI is
└── achannel   → channels    → WHERE your AI lives
```

| Layer | Package | What it does |
|:------|:--------|:-------------|
| Identity | [acore](https://github.com/amanasmuei/acore) | Personality, values, relationship memory |
| Memory | [amem](https://github.com/amanasmuei/amem) | Automated knowledge storage (MCP) |
| Tools | [akit](https://github.com/amanasmuei/akit) | 15 portable AI tools (MCP + manual fallback) |
| Workflows | [aflow](https://github.com/amanasmuei/aflow) | Reusable AI workflows |
| Guardrails | [arules](https://github.com/amanasmuei/arules) | Safety boundaries and permissions |
| Skills | **askill** | Domain expertise |
| Evaluation | [aeval](https://github.com/amanasmuei/aeval) | Relationship tracking |
| **Unified** | **[aman](https://github.com/amanasmuei/aman)** | **One command to set up everything** |

Each works independently. `aman` is the front door.

---

## Contributing

Contributions welcome! Add skills to the registry, improve the parser, or suggest features.

## License

[MIT](LICENSE)

---

<div align="center">

**Teach once. Apply always. Expert AI.**

</div>
