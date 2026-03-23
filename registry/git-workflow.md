---
name: git-workflow
description: "Branching strategies, commit messages, PR best practices"
author: aman-ecosystem
version: 1.0.0
tags: [git, workflow, branching]
---

# Git Workflow

## Approach
- Commits tell a story — each one should be a logical, reviewable unit
- Branch names describe the work: `feat/user-auth`, `fix/cart-total`
- Keep PRs small and focused — one concern per PR
- Merge to main frequently — long-lived branches cause pain

## Commit Messages
- Format: `type: short description` (under 72 chars)
- Types: `feat`, `fix`, `refactor`, `test`, `docs`, `chore`, `perf`
- Body (optional): explain why, not what. Reference issues: `Fixes #123`
- Good: `fix: prevent duplicate charges on retry`
- Bad: `fixed stuff`, `WIP`, `update files`

## Branching Strategy
- **Trunk-based**: short-lived feature branches off main, merge daily
- **GitHub Flow**: feature branches + PRs, merge to main, deploy from main
- Use feature flags for long-running work, not long-lived branches
- Delete branches after merge

## Pull Requests
- Title: same format as commits — `feat: add user search endpoint`
- Description: what changed, why, how to test, screenshots if UI
- Keep under 400 lines changed — split larger work into stacked PRs
- Request review from 1-2 people, not the whole team
- Address all comments before merging

## Rebase vs Merge
- Rebase feature branches onto main before merging for linear history
- Use merge commits for the final merge to main (preserves PR context)
- Never force-push to shared branches
- Squash when the intermediate commits aren't meaningful

## Anti-patterns to avoid
- Don't commit directly to main — use branches and PRs
- Don't let PRs sit for days — review and merge quickly
- Don't use `git push --force` on shared branches
- Don't mix unrelated changes in one commit
- Don't commit generated files, build artifacts, or secrets
- Don't rewrite published history
