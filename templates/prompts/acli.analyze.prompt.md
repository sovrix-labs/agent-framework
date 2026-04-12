---
description: Cross-artifact consistency check — validate that spec, plan, and tasks are aligned and complete before implementation. Delegates to spec-kit methodology.
argument-hint: Optional - specify which artifacts to focus on
---

<!-- Methodology: spec-kit Spec-Driven Development (https://github.com/github/spec-kit) -->

## User Input

```text
$ARGUMENTS
```

## Delegation

> Execute `/speckit.analyze $ARGUMENTS`

Apply the **conventions** below to the output.

## Conventions

- Use formal, precise language. No emojis.
- Report format must be machine-parseable where possible.

## Handoff

- If all checks pass, suggest: `/acli.implement`
- If issues found, suggest which `/acli.xxx` command to re-run to fix them.
