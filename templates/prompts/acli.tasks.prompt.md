---
description: Break down the implementation plan into a concrete, ordered, executable task list with dependencies and acceptance criteria. Delegates to spec-kit methodology.
argument-hint: Optional - specify task focus or scope constraints
---

<!-- Methodology: spec-kit Spec-Driven Development (https://github.com/github/spec-kit) -->

## User Input

```text
$ARGUMENTS
```

Use any user input to adjust scope, priority, or sequencing.

## Delegation

> Execute `/speckit.tasks $ARGUMENTS`

Apply the **conventions** below to the output.

## Conventions

- Use formal, precise language. No emojis.
- Task descriptions must be unambiguous — a developer should need zero clarification.
- Acceptance criteria must be binary pass/fail.

## Beads Integration

If `bd` CLI is available, create a bead for each P0 task: `bd create "TASK-XXX: <description>" -p 1`.

## Handoff

Output a brief summary:
- Total tasks per phase
- Estimated complexity
- Prerequisites the user should set up manually
- Suggested next step: `/acli.implement`
