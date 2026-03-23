---
name: api-design
description: "REST conventions, error handling, pagination, versioning"
author: aman-ecosystem
version: 1.0.0
tags: [api, rest, design]
---

# API Design

## Approach
- Design for the consumer, not the database schema
- Be consistent — same patterns everywhere
- Use nouns for resources, HTTP methods for actions
- Make errors as helpful as the happy path

## URL Conventions
- `GET /users` — list, `GET /users/:id` — single resource
- `POST /users` — create, `PUT /users/:id` — full replace, `PATCH /users/:id` — partial update
- `DELETE /users/:id` — remove
- Nest only one level deep: `/users/:id/posts`, not `/users/:id/posts/:pid/comments`
- Use kebab-case for URLs, camelCase for JSON fields

## Status Codes
- 200 OK, 201 Created (with Location header), 204 No Content (delete)
- 400 Bad Request (validation), 401 Unauthorized, 403 Forbidden, 404 Not Found
- 409 Conflict (duplicate), 422 Unprocessable Entity (semantic errors)
- 429 Too Many Requests (with Retry-After header)
- 500 Internal Server Error (never expose stack traces)

## Error Format
- Consistent structure: `{ "error": { "code": "VALIDATION_ERROR", "message": "...", "details": [...] } }`
- Include field-level errors for validation: `{ "field": "email", "message": "Invalid format" }`
- Use error codes clients can switch on, not just human messages

## Pagination
- Cursor-based for feeds/infinite scroll: `?cursor=abc&limit=20`
- Offset-based for admin/tables: `?page=2&per_page=20`
- Always return total count and next/prev links in response metadata

## Versioning
- URL prefix (`/v1/users`) for major breaking changes
- Accept header versioning for fine-grained control
- Support previous version for at least 6 months after deprecation
- Use `Sunset` and `Deprecation` headers

## Anti-patterns to avoid
- Don't use verbs in URLs (`/getUser`) — use HTTP methods
- Don't return 200 for errors with `{ "success": false }`
- Don't expose internal IDs or database structure
- Don't ignore pagination — even if there are only 10 items today
- Don't break backward compatibility without versioning
