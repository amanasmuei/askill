---
name: performance
description: "Profiling, caching strategies, lazy loading, database optimization"
author: aman-ecosystem
version: 1.0.0
tags: [performance, caching, optimization]
---

# Performance

## Approach
- Measure first, optimize second — never guess at bottlenecks
- Optimize the critical path, ignore the rest until it matters
- Set performance budgets and monitor them in CI
- Prefer algorithmic improvements over micro-optimizations

## Profiling
- Use flame graphs to identify hot paths
- Profile in production-like environments, not just dev
- Measure p50, p95, p99 latency — averages lie
- Use APM tools (DataDog, New Relic) for production monitoring
- Always benchmark before and after changes

## Caching Strategies
- Cache at the right level: CDN > reverse proxy > app > database
- Cache-aside: app checks cache, falls back to DB, writes to cache
- Write-through: write to cache and DB simultaneously
- TTL-based expiry for simplicity, event-based invalidation for correctness
- Cache key design: include all parameters that affect the result

## Database Optimization
- Add indexes for columns in WHERE, JOIN, ORDER BY clauses
- Use EXPLAIN/ANALYZE to understand query plans
- Avoid N+1 queries — use eager loading or batch fetching
- Denormalize for read-heavy workloads, normalize for write-heavy
- Use connection pooling

## Frontend Performance
- Lazy load below-the-fold content and non-critical JS
- Code-split by route, load only what's needed
- Optimize images: correct format (WebP/AVIF), responsive sizes, lazy loading
- Minimize layout shifts (CLS) — set explicit dimensions on media
- Use `loading="lazy"` and `fetchpriority="high"` appropriately

## Anti-patterns to avoid
- Don't optimize without measuring — you'll optimize the wrong thing
- Don't cache everything — stale data causes bugs
- Don't add indexes blindly — they slow down writes
- Don't load entire datasets when you need a subset
- Don't ignore memory leaks — they compound over time
