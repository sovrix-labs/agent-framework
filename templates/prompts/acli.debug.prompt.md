---
description: Systematic root-cause debugging — structured investigation, hypothesis testing, and fix verification. Delegates to spec-kit superpowers-bridge methodology.
argument-hint: Describe the bug or paste the error message
---

<!-- Methodology: superpowers-bridge (https://github.com/RbBtSn0w/spec-kit-extensions/tree/main/superpowers-bridge) -->

## User Input

```text
$ARGUMENTS
```

## Delegation

> Execute `/speckit.superb.debug $ARGUMENTS`

Apply the **conventions** below to the output.

## Conventions

- Never apply a fix without understanding the root cause first.
- Prefer minimal fixes over refactors — fix the bug, not the architecture.
- All fixes must have associated test coverage.

## Beads Integration

If `bd` CLI is available, create a bead for the debugging session: `bd create "debug: <symptom summary>"`. Close it after the fix is verified.

## Handoff

Output:
- Root cause (one sentence)
- Fix applied (file + description)
- Tests added or updated
- Prevention recommendation
