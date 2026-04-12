---
description: Rigorously address code review feedback — implement fixes for each review issue with verification. Delegates to spec-kit superpowers-bridge methodology.
argument-hint: Optional - paste review comments or reference the critique to respond to
---

<!-- Methodology: superpowers-bridge (https://github.com/RbBtSn0w/spec-kit-extensions/tree/main/superpowers-bridge) -->

## User Input

```text
$ARGUMENTS
```

## Delegation

> Execute `/speckit.superb.respond $ARGUMENTS`

Apply the **conventions** below to the output.

## Conventions

- Address every issue — do not skip LOW severity items without stating why.
- Each fix must be independently verifiable.
- Do not introduce new issues while fixing old ones.
- If a fix requires architectural changes beyond scope, flag it and propose a follow-up task.

## Handoff

After all issues addressed: suggest `/acli.critique` for a re-review, or `/acli.finish` if already approved.
