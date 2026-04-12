---
description: Clarify ambiguities in the current specification — ask targeted questions, resolve unknowns, and update the spec. Delegates to spec-kit methodology.
argument-hint: Optional - specify which spec to clarify or list specific questions
---

<!-- Methodology: spec-kit Spec-Driven Development (https://github.com/github/spec-kit) -->

## User Input

```text
$ARGUMENTS
```

## Delegation

> Execute `/speckit.clarify $ARGUMENTS`

Apply the **conventions** below to the output.

## Conventions

- Never invent answers — always wait for stakeholder input.
- Questions must be answerable by a product owner, not a developer.
- Keep the spec technology-agnostic (no implementation details).

## Handoff

After clarification: suggest `/acli.plan` to begin technical planning.
