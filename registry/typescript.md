---
name: typescript
description: "Type safety patterns, generics, utility types, strict mode"
author: aman-ecosystem
version: 1.0.0
tags: [typescript, types, generics]
---

# TypeScript

## Approach
- Use strict mode always — `"strict": true` in tsconfig
- Let TypeScript infer types when it can — don't over-annotate
- Types are documentation — make them descriptive and accurate
- Prefer compile-time errors over runtime errors

## Type Safety Patterns
- Use discriminated unions over optional fields for state machines
- Prefer `unknown` over `any` — it forces you to narrow
- Use `as const` for literal types and readonly tuples
- Template literal types for string patterns: `` `${Method}_${Resource}` ``
- Use branded types for IDs: `type UserId = string & { __brand: 'UserId' }`

## Generics
- Use generics when a function works with multiple types: `function first<T>(arr: T[]): T`
- Add constraints: `<T extends { id: string }>` when you need specific properties
- Default type parameters: `<T = string>` for sensible defaults
- Don't over-genericize — if it's always a string, type it as string

## Utility Types
- `Partial<T>` — all properties optional (great for update payloads)
- `Required<T>` — all properties required
- `Pick<T, K>` — select specific properties
- `Omit<T, K>` — exclude specific properties
- `Record<K, V>` — dictionary/map type
- `Extract/Exclude` — filter union types
- `ReturnType<F>` — extract function return type
- `Awaited<T>` — unwrap Promise types

## Patterns
- Use `satisfies` to validate types without widening: `config satisfies Config`
- Use `const` assertions for narrowing: `const dirs = ['up', 'down'] as const`
- Exhaustive switch with `never`: ensures all union cases handled
- Use mapped types for transforming interfaces systematically
- Use `infer` in conditional types for extracting nested types

## Anti-patterns to avoid
- Don't use `any` — use `unknown` and narrow with type guards
- Don't use `!` (non-null assertion) without justification
- Don't use `@ts-ignore` — use `@ts-expect-error` with explanation
- Don't create God types — split into focused interfaces
- Don't fight the type system — if types are painful, the API design may be wrong
- Don't export types you don't need to — keep the public API surface small
