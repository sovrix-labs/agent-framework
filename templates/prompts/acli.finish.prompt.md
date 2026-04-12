---
description: Complete the current branch — final verification, cleanup, commit message, and merge strategy. Delegates to spec-kit superpowers-bridge methodology.
argument-hint: Optional - specify merge strategy (squash, merge, rebase) or target branch
---

<!-- Methodology: superpowers-bridge (https://github.com/RbBtSn0w/spec-kit-extensions/tree/main/superpowers-bridge) -->

## User Input

```text
$ARGUMENTS
```

## Delegation

> Execute `/speckit.superb.finish $ARGUMENTS`

Apply the **conventions** below to the output.

## Conventions

- Never auto-merge or auto-push — present the strategy and let the user execute.
- Commit messages must be meaningful — no "fix", "wip", "update".
- All dates in ISO 8601 format.

## Beads Integration

If `bd` CLI is available, close all active beads for this feature: `bd close <id>`. Record the completion in beads before finalizing.

## Handoff

Output:
- Pre-completion checklist result (all pass / blockers found)
- Suggested commit message(s)
- Recommended merge strategy and target branch
- Command to execute (for user to run manually)
