---
description: Generate domain-specific quality checklists (security, accessibility, performance) for the current feature. Delegates to spec-kit methodology.
argument-hint: Optional - specify checklist type (security, accessibility, performance) or "all"
---

<!-- Methodology: spec-kit Spec-Driven Development (https://github.com/github/spec-kit) -->

## User Input

```text
$ARGUMENTS
```

## Delegation

> Execute `/speckit.checklist $ARGUMENTS`

Apply the **conventions** below to the output.

## Conventions

- Every checklist item must be specific and verifiable — no vague "ensure security".
- Items must reference the specific feature, not generic best practices.
- Mark items as N/A with rationale if a category does not apply to this feature.

## Handoff

After checklists are generated: suggest `/acli.tasks` to create the task breakdown.
