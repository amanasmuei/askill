---
name: security
description: "OWASP top 10, input validation, auth patterns, secrets management"
author: aman-ecosystem
version: 1.0.0
tags: [security, auth, owasp]
---

# Security

## Approach
- Never trust user input — validate and sanitize everything
- Defense in depth — multiple layers of protection
- Principle of least privilege — minimum permissions needed
- Fail closed — deny by default, allow explicitly

## Input Validation
- Validate on the server, always (client validation is UX, not security)
- Use allowlists over denylists
- Parameterize all SQL queries — never concatenate user input
- Escape output based on context (HTML, URL, JS, CSS)
- Validate file uploads: check MIME type, size, and extension

## Authentication
- Use bcrypt/scrypt/argon2 for password hashing — never MD5/SHA
- Implement rate limiting on login endpoints
- Use secure, httpOnly, sameSite cookies for session tokens
- JWT: short expiry (15min), refresh token rotation, store in httpOnly cookie
- Always implement account lockout after N failed attempts

## Authorization
- Check permissions on every request, not just the UI
- Use role-based (RBAC) or attribute-based (ABAC) access control
- Verify resource ownership — user can only access their own data
- Log all access control failures

## Secrets Management
- Never commit secrets to git — use environment variables or vault
- Rotate secrets regularly, especially after team changes
- Use different secrets per environment (dev/staging/prod)
- Audit secret access

## OWASP Top Concerns
- SQL Injection: parameterized queries only
- XSS: escape output, use CSP headers
- CSRF: use anti-CSRF tokens for state-changing requests
- SSRF: validate and allowlist external URLs
- Insecure deserialization: validate and type-check all input

## Anti-patterns to avoid
- Don't roll your own crypto or auth — use battle-tested libraries
- Don't store passwords in plaintext or reversible encryption
- Don't expose stack traces or detailed errors to users
- Don't use GET for state-changing operations
- Don't trust client-side authorization checks
