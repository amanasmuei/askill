---
name: accessibility
description: "WCAG guidelines, semantic HTML, ARIA, keyboard navigation"
author: aman-ecosystem
version: 1.0.0
tags: [a11y, wcag, aria, accessibility]
---

# Accessibility

## Approach
- Accessibility is not optional — it's a core quality attribute
- Use semantic HTML first, ARIA second — HTML does most of the work
- Test with keyboard, screen reader, and zoom — not just a checker tool
- Design for permanent, temporary, and situational disabilities

## Semantic HTML
- Use `<button>` for actions, `<a>` for navigation — never `<div onClick>`
- Use heading hierarchy: h1 -> h2 -> h3, don't skip levels
- Use `<nav>`, `<main>`, `<aside>`, `<footer>` for page landmarks
- Use `<ul>/<ol>` for lists, `<table>` for tabular data
- Use `<label>` with `for` attribute for every form input
- Use `<fieldset>` and `<legend>` to group related form fields

## ARIA (when HTML isn't enough)
- `aria-label` for elements without visible text
- `aria-describedby` for additional context (error messages, hints)
- `aria-live="polite"` for dynamic content updates (notifications, status)
- `aria-expanded` for collapsible sections and dropdowns
- `role="alert"` for important, time-sensitive messages
- First rule of ARIA: don't use ARIA if native HTML works

## Keyboard Navigation
- All interactive elements must be reachable via Tab
- Logical tab order — follows visual layout
- Escape closes modals/popups, focus returns to trigger
- Arrow keys for navigation within components (tabs, menus, sliders)
- Visible focus indicators — never `outline: none` without replacement
- Skip-to-content link as the first focusable element

## Color and Contrast
- Minimum 4.5:1 contrast ratio for normal text, 3:1 for large text
- Don't use color alone to convey information — add icons or text
- Test with color blindness simulators
- Support forced-colors/high-contrast modes

## Testing
- Tab through every page — can you reach and operate everything?
- Use screen reader (VoiceOver, NVDA) — does it make sense?
- Zoom to 200% — does layout still work?
- Run axe-core or Lighthouse in CI for automated checks
- Manual testing catches what automated tools miss

## Anti-patterns to avoid
- Don't use `<div>` or `<span>` for interactive elements
- Don't remove focus outlines without providing alternatives
- Don't autoplay media without user control
- Don't use placeholder text as the only label
- Don't trap keyboard focus (except in modals)
- Don't disable zoom: no `maximum-scale=1` on viewport meta
