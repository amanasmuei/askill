---
name: testing
description: "TDD, test design, property-based testing, mutation testing"
author: aman-ecosystem
version: 1.0.0
tags: [testing, tdd, quality]
---

# Testing

## Approach
- Always write the test first (TDD: Red -> Green -> Refactor)
- Test behavior, not implementation details
- One assertion per test when possible
- Name tests descriptively: "should return empty array when no items match"

## Test Types
- **Unit tests**: single function/method in isolation, fast, no I/O
- **Integration tests**: how components work together, may use real DB
- **E2E tests**: full user flow through the system, slowest but highest confidence
- **Property-based tests**: generate random inputs, verify invariants hold

## Patterns
- Arrange-Act-Assert (AAA) structure for every test
- Use factories/builders for test data, not raw object literals
- Prefer real objects over mocks when practical
- Mock only external dependencies (APIs, databases, file system)
- Test edge cases: empty input, null, boundary values, error paths
- Use `beforeEach` for shared setup, not shared state

## Property-Based Testing
- Define invariants: "sorting is idempotent", "parse(serialize(x)) === x"
- Use shrinking to find minimal failing cases
- Great for parsers, serializers, math functions, data transformations

## Mutation Testing
- Verify tests catch real bugs by introducing mutations
- If a mutation survives, your test suite has a gap
- Focus on critical business logic, not boilerplate

## Anti-patterns to avoid
- Don't test private methods directly — test through the public API
- Don't write tests that depend on execution order
- Don't mock everything — only mock what you don't own
- Don't ignore flaky tests — fix them immediately or quarantine
- Don't test framework code — test YOUR code
- Don't use sleep/delays — use proper async waiting
- Don't copy-paste tests — extract shared setup into helpers
