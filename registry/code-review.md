---
name: code-review
description: "What to look for, how to give actionable feedback, severity levels"
author: aman-ecosystem
version: 1.0.0
tags: [code-review, feedback, quality]
---

# Code Review

## Approach
- Review for correctness, clarity, and maintainability — in that order
- Be kind, be specific, be constructive
- Ask questions instead of making demands: "What if...?" not "You should..."
- Approve with comments when nits are minor — don't block on style

## What to Check
- **Correctness**: Does it do what it claims? Edge cases handled?
- **Security**: SQL injection, XSS, auth bypasses, secrets exposure?
- **Performance**: N+1 queries, unnecessary re-renders, missing indexes?
- **Readability**: Could a new team member understand this in 5 minutes?
- **Tests**: Are key behaviors covered? Do tests actually assert something useful?
- **Error handling**: What happens when things fail? Are errors logged?

## Severity Levels
- **Blocker**: Must fix before merge — bugs, security issues, data loss
- **Major**: Should fix — performance problems, missing tests for critical paths
- **Minor**: Nice to fix — naming, style, minor refactoring opportunities
- **Nit**: Optional — personal preference, cosmetic, "if you're already touching this"

## Giving Feedback
- Prefix comments with severity: `[blocker]`, `[major]`, `[nit]`
- Provide alternatives, not just criticism: "Consider using X because..."
- Link to documentation or examples when suggesting patterns
- Acknowledge good code too — "Nice approach here"
- Batch related comments into one review, don't drip-feed

## Receiving Feedback
- Don't take it personally — the code is being reviewed, not you
- Ask for clarification if you disagree — "Can you elaborate on why?"
- If you push back, explain your reasoning

## Anti-patterns to avoid
- Don't bikeshed — focus on substance over style
- Don't rubber-stamp — "LGTM" without reading is worse than no review
- Don't rewrite in review — suggest, don't demand a full rewrite
- Don't review 1000+ line PRs line by line — ask for smaller PRs
- Don't leave reviews open for days — review within 24 hours
