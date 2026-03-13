---
description: Execute the implementation plan task-by-task using a Dev → Quality → Test iterative loop with human review checkpoints between each task.
argument-hint: Optional - specify a task ID to start from, e.g. "start from TASK-005"
---

## User Input

```text
$ARGUMENTS
```

Use any user input to focus on specific tasks (e.g. "start from TASK-005") or override behaviour.

## Your Task

You are executing the implementation using a structured **Dev → Quality → Test** loop with **human review checkpoints** between tasks.

This is an active, iterative process. Do NOT implement everything at once. Complete one task, review with the human, then continue.

## Pre-Flight Checks

1. **Load required files**:
   - **REQUIRED**: `.specify/specs/tasks.md` — the task list
   - **REQUIRED**: `.specify/specs/plan.md` — architecture and file structure
   - **REQUIRED**: `.specify/specs/spec.md` — acceptance criteria
   - **REQUIRED**: `.specify/memory/constitution.md` — principles and standards
   - **IF EXISTS**: `.specify/memory/handover.md` — context from previous session

2. **Determine starting point**:
   - Find the first uncompleted task (`- [ ]`) in tasks.md
   - If user input specifies a task ID, start there
   - Show the user which task you're about to start

3. **Confirm with the user before starting**:
   ```
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   🚀 Ready to start BEADS+ implementation
   
   Next task: TASK-XXX — <description>
   Total remaining: <N> tasks
   
   Type "go" to start, or specify a task to begin from.
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   ```
   **WAIT for user confirmation before proceeding.**

## Implementation Loop

For each task, follow this loop:

---

### Step A — Implement (Dev Phase)

1. Read the task details (files, acceptance criteria, notes)
2. Implement the code changes following the plan and constitution
3. Apply the constitution's code quality standards
4. Apply OWASP Top 10 security principles to any relevant code
5. Report what was done:
   ```
   ✅ Dev complete: TASK-XXX
   Files changed: <list>
   ```

### Step B — Quality Review (Quality Phase)

Review the code you just wrote:
- Does it follow the principles in the constitution?
- Is the logic correct and not overcomplicated?
- Are there any code smells, dead code, or duplication?
- Does it follow naming conventions from the plan?
- Are all security concerns addressed (injection, auth, secrets, input validation)?

If issues are found, fix them inline. Report:
```
🔍 Quality check: PASS / FIXED <N issues>
Issues fixed: <brief list if any>
```

### Step C — Test Phase

1. If test files are specified in the task, **write or run them**
2. Verify the implementation meets the acceptance criteria
3. If the constitution requires TDD and tests don't exist yet, create them
4. Report test status:
   ```
   🧪 Tests: PASS / FAIL
   Coverage: <% if measurable>
   ```
   
   If tests **FAIL**:
   - Fix the implementation (loop back to Step A for this same task)
   - Maximum 3 fix attempts before escalating to the user

### Step D — Human Checkpoint ⛔ STOP HERE

After completing Steps A, B, and C for a task, **ALWAYS stop and present a review to the human**:

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ TASK-XXX Complete — Human Review Required

📋 What was done:
  - <summary of implementation>
  - <files created/modified>

🔍 Quality: <PASS / issues found and fixed>
🧪 Tests: <PASS / skipped / N passing>

⚠️  Constitution compliance: <any deviations noted>

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Next task: TASK-XYZ — <description>
Remaining: <N> tasks

Options:
  ▶  "continue"  — Accept this task and move to the next
  🔄  "retry"    — Redo this task with your feedback
  ✏️  "adjust"   — Provide feedback to adjust the approach before continuing
  ⛔  "stop"     — Halt and save progress
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

**WAIT for the human's response before proceeding.**

Handle responses:
- **"continue"** (or just Enter / "yes" / "next"): Mark task as `[X]` in tasks.md, proceed to next task
- **"retry"** + feedback: Undo the changes, apply the feedback, redo the task from Step A
- **"adjust"** + feedback: Keep what was done but adjust the approach for THIS or NEXT task
- **"stop"** (or "halt" / "pause"): Save a handover note (see below) and stop

---

## After All Tasks Complete

When all tasks are marked `[X]`:

1. **Run final validation**:
   - All acceptance criteria from spec.md are met
   - All tasks in tasks.md are marked complete
   - No TODO or placeholder comments remain in code

2. **Write a handover note** at `.specify/memory/handover.md`:
   ```markdown
   # Implementation Handover
   **Date**: YYYY-MM-DD
   **Status**: COMPLETE
   
   ## What was built
   <Summary>
   
   ## Files created/modified
   <List>
   
   ## Known issues / tech debt
   <List or "None">
   
   ## Next steps suggested
   <List>
   ```

3. **Present final summary** to the user:
   ```
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   🎉 Implementation Complete!
   
   Tasks completed: <N> / <N>
   Files created: <N>
   Files modified: <N>
   
   Handover saved: .specify/memory/handover.md
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   ```

## If Stopped Early

If the user types "stop" at any checkpoint, write a partial handover at `.specify/memory/handover.md`:
```markdown
# Implementation Handover (In Progress)
**Date**: YYYY-MM-DD
**Status**: PAUSED at TASK-XXX

## Completed tasks
<list of [X] tasks>

## Next task to resume
TASK-XXX — <description>

## Context / notes
<anything the next session needs to know>
```
Then confirm: "Progress saved. Resume any time with `/beads.implement`."
