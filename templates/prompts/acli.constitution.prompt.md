---
description: Create or update the project constitution — governing principles, tech preferences, and non-negotiable development rules. Delegates to spec-kit methodology.
argument-hint: Optional - describe your project or specific principles to include
---

<!-- Methodology: spec-kit Spec-Driven Development (https://github.com/github/spec-kit) -->

## User Input

```text
$ARGUMENTS
```

Consider the user input above before proceeding (if not empty).

## Delegation

> Execute `/speckit.constitution $ARGUMENTS`

Apply the **conventions** below to the output.

## Conventions

- Use formal, precise language throughout. No emojis, no casual phrasing.
- Principles must be declarative and testable.
- All dates in ISO 8601 format (YYYY-MM-DD).

## Beads Integration

If `bd` CLI is available, record this phase: `bd create "constitution: <project-name>"` at the start, `bd close` after the constitution is written.

## Handoff

Output a brief summary:
- What was created or changed
- Constitution version and bump rationale
- Suggested next step: `/acli.specify <describe what you want to build>`
