---
description: Independent spec-aligned code review — verify implementation matches specification, flag deviations and quality issues. Delegates to spec-kit superpowers-bridge methodology.
argument-hint: Optional - specify file paths or PR to review, or leave blank to review recent changes
---

<!-- Methodology: superpowers-bridge (https://github.com/RbBtSn0w/spec-kit-extensions/tree/main/superpowers-bridge) -->

## User Input

```text
$ARGUMENTS
```

## Delegation

> Execute `/speckit.superb.critique $ARGUMENTS`

Apply the **conventions** below to the output.

## Conventions

- Be specific: cite file names and line numbers.
- Severity levels: CRITICAL (blocks merge), HIGH (must fix), MEDIUM (should fix), LOW (nice to have).
- Never approve code that violates the constitution or fails acceptance criteria.
- Do not suggest style changes unless they violate documented standards.

## Handoff

If issues found: suggest `/acli.respond` to address the review feedback.
If approved: suggest `/acli.finish` to complete the branch.
