---
name: refactoring
description: "Code smells, extract method, single responsibility, SOLID"
author: aman-ecosystem
version: 1.0.0
tags: [refactoring, solid, clean-code]
---

# Refactoring

## Approach
- Refactor in small, safe steps — each step should pass all tests
- Have tests before refactoring — if you don't, write them first
- Refactor separately from feature work — don't mix in the same commit
- Rename is the most powerful refactoring — good names prevent confusion

## Code Smells
- **Long method**: if it doesn't fit on one screen, it does too much
- **Large class**: if it has more than ~7 public methods, it has too many responsibilities
- **Primitive obsession**: using strings/numbers where a domain type would be clearer
- **Feature envy**: a method that uses another class's data more than its own
- **Shotgun surgery**: one change requires editing many files
- **Duplicate code**: same logic in two or more places

## Key Refactoring Moves
- **Extract method**: pull a block into a named function
- **Extract class**: split a large class by responsibility
- **Rename**: make names reveal intent
- **Inline**: remove unnecessary indirection
- **Move**: put code where it belongs
- **Replace conditional with polymorphism**: when a switch/if grows

## SOLID Principles
- **S**ingle Responsibility: one reason to change per class/module
- **O**pen-Closed: extend behavior without modifying existing code
- **L**iskov Substitution: subtypes must be usable wherever the base type is expected
- **I**nterface Segregation: many small interfaces over one large one
- **D**ependency Inversion: depend on abstractions, not concrete implementations

## When to Refactor
- Before adding a feature — clean the area you're about to work in
- After getting tests green — refactor is the third step of TDD
- When you read code and it takes too long to understand
- When you find a bug caused by confusing structure

## Anti-patterns to avoid
- Don't refactor without tests — you're just moving bugs around
- Don't gold-plate — refactor what's in the way, not everything
- Don't refactor and change behavior simultaneously
- Don't add abstractions for one use case — wait for the pattern
- Don't refactor code that works and nobody touches
