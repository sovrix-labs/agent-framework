---
description: Define what you want to build — feature requirements, user stories, and acceptance criteria. Technology-agnostic. Delegates to spec-kit methodology.
argument-hint: Describe the feature you want to build
---

<!-- Methodology: spec-kit Spec-Driven Development (https://github.com/github/spec-kit) -->

## User Input

```text
$ARGUMENTS
```

You MUST use the user input as the primary source for the feature description.

## Delegation

> Execute `/speckit.specify $ARGUMENTS`

Apply the **conventions** below to the output.

## Conventions

- Use formal, precise language. No emojis.
- Acceptance criteria must be binary pass/fail — no subjective language.

## Beads Integration

If `bd` CLI is available, create a bead for this feature: `bd create "specify: <feature-name>" -p 1`.

## Handoff

Output a brief summary:
- Feature ID and folder location
- Git branch created (if applicable)
- Number of user stories and acceptance criteria
- Suggested next step: `/acli.plan <tech stack preferences if any>`
