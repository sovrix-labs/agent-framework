---
name: speckit-implement
description: Execute the implementation plan by processing tasks.md phase-by-phase with checklist validation, ignore-file setup, dependency-aware execution, and progress tracking.
---

# Spec Kit Implement Skill

## When to Use
- The plan and tasks are complete (`plan.md` + `tasks.md` exist) and implementation is ready to begin.

## Inputs
- `specs/<feature>/tasks.md` (required) — ordered task list
- `specs/<feature>/plan.md` (required) — tech stack and architecture
- Optional: `data-model.md`, `contracts/`, `research.md`, `quickstart.md`

## Workflow

1. **Setup**: Run `.specify/scripts/bash/check-prerequisites.sh --json --require-tasks --include-tasks` from repo root. Parse `FEATURE_DIR` and `AVAILABLE_DOCS`.

2. **Check checklists** (if `FEATURE_DIR/checklists/` exists):
   - Count total / completed / incomplete items in each checklist file.
   - Display a status table: `| Checklist | Total | Completed | Incomplete | Status |`
   - If any checklist is incomplete: **STOP** and ask the user to confirm before continuing.
   - If all pass: proceed automatically.

3. **Load implementation context**: Read `tasks.md`, `plan.md`, and all available optional artifacts.

4. **Project setup verification** — create or verify ignore files based on detected tech:
   - Git repo detected → `.gitignore`
   - Dockerfile present → `.dockerignore`
   - `.eslintrc*` present → `.eslintignore`
   - `package.json` present → `.npmignore`
   - Terraform files → `.terraformignore`
   - If file exists: append only missing critical patterns. If missing: create with full pattern set.

5. **Parse `tasks.md`**: Extract phases, task IDs, descriptions, file paths, `[P]` parallel markers, and dependencies.

6. **Execute phase-by-phase**:
   - Complete each phase fully before moving to the next.
   - Sequential tasks: execute in order.
   - Parallel tasks `[P]`: can run together (no shared file writes, no incomplete dependencies).
   - Follow task order: Setup → Foundational → User Stories (P1, P2, P3…) → Polish.
   - TDD when test tasks precede implementation tasks.
   - After each completed task: mark it `[X]` in `tasks.md`.

7. **Error handling**:
   - Non-parallel task failure → halt and report with debug context.
   - Parallel task failure → continue other parallel tasks, report failed ones.
   - Suggest next steps when blocked.

8. **Completion validation**:
   - All required tasks completed.
   - Implemented features match the original specification.
   - Tests pass and coverage meets requirements.
   - Implementation follows the technical plan.
   - Report final status with summary of completed work.

## Quality Rules
- Always mark completed tasks as `[X]` in `tasks.md` immediately.
- Never skip checklist validation — it gates implementation quality.
- Respect `[P]` markers: parallel tasks must not share file writes.
- If `tasks.md` is incomplete, suggest running `/beads.tasks` first.

## Outputs
- Implementation changes across the codebase
- Updated `specs/<feature>/tasks.md` (completed tasks marked `[X]`)
- Created/updated ignore files (`.gitignore`, `.dockerignore`, etc.)

## Next Steps
After implementation, run `@quality` or `@testing` agents to review and validate.
