---
name: debugging
description: "Systematic debugging, rubber duck, binary search, logging strategies"
author: aman-ecosystem
version: 1.0.0
tags: [debugging, logging, troubleshooting]
---

# Debugging

## Approach
- Reproduce first, debug second — if you can't reproduce it, you can't fix it
- Read the error message. Read it again. Actually read it this time.
- Form a hypothesis, test it, iterate — don't change random things
- Isolate the problem — reduce to the smallest reproducing case

## Systematic Process
1. **Reproduce**: create a reliable reproduction case
2. **Isolate**: narrow down where the bug lives (binary search)
3. **Understand**: read the code around the bug, understand the flow
4. **Fix**: make the minimal change that fixes the root cause
5. **Verify**: confirm the fix works and doesn't break anything else
6. **Prevent**: add a test that would have caught this bug

## Binary Search Debugging
- Works for "it used to work" bugs: `git bisect` to find the breaking commit
- Works for "where in the pipeline": add logging at the midpoint, narrow down
- Halves the search space each time — efficient for large codebases

## Rubber Duck Debugging
- Explain the problem out loud, step by step
- If you can't explain what the code should do, that's the bug
- Write the explanation as a comment — it might help the next person

## Logging Strategy
- Use structured logging (JSON) — easier to search and filter
- Log levels: ERROR (broken), WARN (degraded), INFO (events), DEBUG (details)
- Include context: request ID, user ID, timestamp, function name
- Log at boundaries: incoming requests, outgoing calls, state transitions
- Don't log sensitive data: passwords, tokens, PII

## Debugger Tips
- Set breakpoints at the boundary of working/broken code
- Use conditional breakpoints for specific cases
- Watch expressions for complex state
- Step over library code, step into your code

## Anti-patterns to avoid
- Don't change code randomly hoping it fixes the bug
- Don't ignore warnings — they often predict the error
- Don't debug in production without proper tooling
- Don't remove error handling to "simplify" — you'll mask the real issue
- Don't leave debug logging in production code
