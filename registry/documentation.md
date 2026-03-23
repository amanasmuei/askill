---
name: documentation
description: "JSDoc, README patterns, architecture decision records"
author: aman-ecosystem
version: 1.0.0
tags: [docs, jsdoc, adr]
---

# Documentation

## Approach
- Document the why, not the what — code shows what, docs explain why
- Keep docs close to code — they're more likely to stay updated
- Write for the reader who doesn't have your context
- Treat docs like code: review, refactor, delete when stale

## README Pattern
- **What**: one sentence describing what it does
- **Why**: when would someone use this?
- **Quick start**: copy-paste install + first usage in under 60 seconds
- **API/Usage**: key functions with examples
- **Contributing**: how to set up dev environment and submit changes

## Code Comments
- Comment on why, not what: `// Retry 3x because the payment API is flaky` not `// retry 3 times`
- Use TODO/FIXME/HACK with context: `// TODO(aman): migrate to v2 API by Q3`
- Delete commented-out code — git has history
- JSDoc for public APIs, especially function signatures with non-obvious params

## JSDoc Essentials
- `@param {type} name - description` for each parameter
- `@returns {type} description` for return values
- `@throws {ErrorType}` for expected exceptions
- `@example` with runnable code snippet
- Skip JSDoc for self-documenting functions: `function getUserById(id: string)`

## Architecture Decision Records (ADRs)
- Title: "ADR-001: Use PostgreSQL for primary storage"
- Status: proposed / accepted / deprecated / superseded
- Context: what problem are we solving?
- Decision: what did we choose?
- Consequences: what are the trade-offs?
- Store in `docs/adr/` directory, one file per decision

## Anti-patterns to avoid
- Don't write docs you won't maintain — stale docs are worse than no docs
- Don't document obvious code: `// increment counter` above `counter++`
- Don't put setup instructions only in Slack — put them in the README
- Don't use docs as a crutch for bad naming — rename the thing instead
- Don't write walls of text — use lists, examples, and headers
