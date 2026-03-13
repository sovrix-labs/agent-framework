---
name: speckit-tasks
description: Generate an actionable, dependency-ordered tasks.md for a feature based on the plan and spec, organized by user story phase with parallelization markers.
---

# Spec Kit Tasks Skill

## When to Use
- The implementation plan (`plan.md`) is ready and an executable task list is needed.

## Inputs
- `specs/<feature>/plan.md` (required) — tech stack, architecture, structure
- `specs/<feature>/spec.md` (required) — user stories with priorities
- Optional: `data-model.md`, `contracts/`, `research.md`, `quickstart.md`

## Workflow

1. **Setup**: Run `.specify/scripts/bash/check-prerequisites.sh --json` from repo root. Parse `FEATURE_DIR` and `AVAILABLE_DOCS`. Use absolute paths.

2. **Load design documents**: Read all available artifacts from `FEATURE_DIR`. Note: not all docs will exist — generate tasks based on what's available.

3. **Generate tasks** organized by user story:
   - Map each user story from spec.md to all components it needs (models, services, endpoints, tests).
   - Map data model entities and API contracts to their respective user stories.
   - Create a dependency graph: which stories block others.
   - Identify tasks that can run in parallel (different files, no incomplete dependencies).

4. **Generate `tasks.md`** using `.specify/templates/tasks-template.md`:

   **Phase structure**:
   - **Phase 1 (Setup)**: Project initialization, shared infrastructure
   - **Phase 2 (Foundational)**: Blocking prerequisites required by all stories
   - **Phase 3+ (User Stories)**: One phase per user story in priority order (P1, P2, P3…)
     - Within each: Tests (if TDD) → Models → Services → Endpoints → Integration
   - **Final Phase (Polish)**: Cross-cutting concerns, documentation

   **Task format** (REQUIRED for every task):
   ```
   - [ ] T001 Create project structure per implementation plan
   - [ ] T005 [P] Implement auth middleware in src/middleware/auth.py
   - [ ] T012 [P] [US1] Create User model in src/models/user.py
   ```
   - `[P]` = parallelizable (different files, no incomplete dependencies)
   - `[USn]` = required for user story phase tasks; absent for setup/foundational/polish
   - Every task needs: checkbox, sequential ID (T001…), description, exact file path

5. **Validate completeness**: Every user story has all needed tasks; each phase is independently testable; no orphaned tasks.

6. **Report**: Path to `tasks.md`, total task count, per-story task count, parallel opportunities, suggested MVP scope.

## Quality Rules
- Tasks MUST be organized by user story — enables independent implementation and testing.
- Test tasks are OPTIONAL — only include if TDD is requested.
- Every task must be specific enough for an LLM to execute without additional context.
- No task without a file path (except project-level setup tasks).

## Outputs
- `specs/<feature>/tasks.md`

## Next Steps
Run `/beads.analyze` to validate cross-artifact consistency, or `/beads.implement` to start coding.
