---
description: Execute the full specification-driven workflow end-to-end — 10-phase lifecycle with human gates, parallel execution, and cross-model review. Delegates to spec-kit fleet orchestrator methodology.
argument-hint: Describe the feature to build, or "resume" to continue from where you left off
---

<!-- Methodology: spec-kit-fleet (https://github.com/sharathsatish/spec-kit-fleet) -->
<!-- Value-Add: Unified lifecycle command replacing manual phase-by-phase orchestration -->

## User Input

```text
$ARGUMENTS
```

## Delegation

> Execute `/speckit.fleet.run $ARGUMENTS`

Apply the **conventions** below to the output.

## Mid-Workflow Resume

If user says "resume":
1. Scan `.specify/specs/` for the most recent feature folder.
2. Check which artifacts exist to determine the current phase.
3. Check for stale artifacts (e.g., spec modified after plan was created — plan is stale).
4. Report current state and resume from the detected phase.

## Conventions

- Always present human gates — never auto-proceed past a gate.
- Track iteration counts — escalate after 5 failed implement-verify loops.
- Log phase transitions for traceability.
- If CI is configured, run it after verification before presenting completion.

## Beads Integration

If `bd` CLI is available:
- At workflow start: `bd create "feature: <feature-name>" -p 0` to create a top-level bead.
- At each phase transition: update bead progress with the current phase name.
- On completion: `bd close` to finalize the feature bead.

## Handoff

After completion: suggest `/acli.finish` to prepare the branch for merge.
