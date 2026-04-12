---
description: Execute the implementation plan task-by-task with human review checkpoints. Delegates to spec-kit methodology, adds iterative Dev-Quality-Test loop.
argument-hint: Optional - specify a task ID to start from, e.g. "start from TASK-005"
---

<!-- Methodology: spec-kit Spec-Driven Development (https://github.com/github/spec-kit) -->
<!-- Value-Add: Iterative human-in-the-loop Dev → Quality → Test cycle per task -->

## User Input

```text
$ARGUMENTS
```

## Delegation

> Execute `/speckit.implement $ARGUMENTS`

Let spec-kit handle pre-execution checks (scripts, checklists, extension hooks, project setup verification). When spec-kit begins executing tasks, apply the **Implementation Loop** below instead of batch execution. After all tasks complete, let spec-kit run its post-implementation hooks, then apply the **Completion** section.

## Implementation Loop

For each task, execute this cycle. Do NOT batch tasks. One task at a time.

### Step A - Dev

1. Read the task details (files, acceptance criteria, dependencies).
2. Implement the code changes following plan.md and constitution.md.
3. Apply OWASP Top 10 security principles where relevant.
4. Mark files and changes made.

### Step B - Quality

Review the code just written:
- Constitution compliance (principles, naming, patterns).
- Logic correctness — no overengineering.
- Code smells, dead code, duplication.
- Security: injection, auth, secrets, input validation.

Fix issues inline. Report: `Quality: PASS` or `Quality: FIXED {N} issues`.

### Step C - Test

1. Write or run tests specified in the task.
2. If constitution requires TDD and tests do not exist, create them.
3. Verify acceptance criteria from spec.md are met.
4. If tests FAIL, fix and retry (max 3 attempts before escalating to user).

### Step D - Human Checkpoint (STOP)

After Steps A-C, ALWAYS stop and present:

```
TASK-XXX Complete - Review Required

What was done:
  - {summary}
  - Files: {list}

Quality: {PASS / FIXED N issues}
Tests: {PASS / FAIL / skipped}
Constitution compliance: {any deviations}

Next: TASK-XYZ - {description}
Remaining: {N} tasks

Options:
  "continue" - Accept and move to next task
  "retry"    - Redo with feedback
  "adjust"   - Keep changes, adjust approach
  "stop"     - Save progress and halt
```

WAIT for the human response.

- **continue** (or "yes", "next", "go"): Mark task `[X]` in tasks.md, proceed.
- **retry** + feedback: Revert changes, redo from Step A with feedback applied.
- **adjust** + feedback: Keep changes, apply feedback to next task.
- **stop** (or "halt", "pause"): Write partial handover (see below), confirm saved.

## Completion

When all tasks are marked `[X]`:

1. **Final validation**: all acceptance criteria met, all tasks complete, no TODO or placeholder comments remain.
2. **Write handover** at `.specify/memory/handover.md` (date, status, what was built, files changed, known issues, next steps).
3. **Present final summary**: tasks completed, files created/modified, handover location.

## If Stopped Early

Write a partial handover at `.specify/memory/handover.md` with status PAUSED, completed tasks, next task to resume, and any context the next session needs. Confirm: "Progress saved. Resume with `/acli.implement`."

## Conventions

- Use formal, precise language. No emojis.
- All checkpoint output uses plain text separators, not emoji decorations.
- Constitution compliance must be reported at every checkpoint.
- OWASP Top 10 security review is mandatory for tasks touching auth, input handling, or data storage.

## Beads Integration

If `bd` CLI is available:
- At start: `bd create "implement: <feature-name>"` to track the implementation session.
- After each task: update bead progress.
- On completion or stop: `bd close` to record the session.

## Handoff

- After completion, suggest `/acli.analyze` for a final cross-artifact consistency check.
- If issues surfaced during implementation that invalidate the spec or plan, suggest re-running `/acli.specify` or `/acli.plan`.
