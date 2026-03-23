---
name: database
description: "Schema design, indexing, migrations, query optimization"
author: aman-ecosystem
version: 1.0.0
tags: [database, sql, schema, indexing]
---

# Database

## Approach
- Design schema around access patterns, not just data relationships
- Normalize for data integrity, denormalize for read performance
- Every table gets a primary key, created_at, and updated_at
- Use migrations for all schema changes — never modify production manually

## Schema Design
- Use UUIDs or ULIDs for public-facing IDs, auto-increment for internal
- Add NOT NULL constraints by default — make nullable the exception
- Use enums or check constraints for fields with known valid values
- Foreign keys enforce referential integrity — use them
- Soft delete (deleted_at) for data you might need to recover

## Indexing
- Index columns used in WHERE, JOIN, and ORDER BY clauses
- Composite indexes: put high-selectivity columns first
- Partial indexes for filtered queries: `WHERE status = 'active'`
- Covering indexes include all columns a query needs — avoids table lookup
- Too many indexes slow writes — index what queries actually need

## Migrations
- One migration per change — don't combine unrelated changes
- Make migrations reversible (up and down)
- Never modify a migration that's been applied to production
- Use zero-downtime patterns: add column -> backfill -> add constraint
- Test migrations on a copy of production data

## Query Optimization
- Use EXPLAIN ANALYZE to understand query plans
- Avoid SELECT * — select only needed columns
- Use JOINs instead of subqueries for correlated queries
- Batch inserts/updates for bulk operations
- Use connection pooling to manage database connections
- Add LIMIT to all queries that could return unbounded results

## Anti-patterns to avoid
- Don't use EAV (Entity-Attribute-Value) without a very good reason
- Don't store JSON blobs you need to query inside — use proper columns
- Don't skip foreign keys "for performance" — you'll get orphaned data
- Don't run migrations without a backup
- Don't write queries in loops — use batch operations
- Don't ignore slow query logs
