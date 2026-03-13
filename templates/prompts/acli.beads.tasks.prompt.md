---
description: Break down the implementation plan into a concrete, ordered, executable task list with clear dependencies and acceptance criteria per task.
argument-hint: Optional - specify task focus or scope constraints
---

## User Input

```text
$ARGUMENTS
```

Use any user input to adjust scope, priority, or sequencing of tasks.

## Your Task

You are generating an executable task list in the feature-specific folder.

Tasks must be granular enough for an AI agent to complete in a single focused session, with clear acceptance criteria and no ambiguity.

## Execution Steps

1. **Identify the feature folder**:
   - Look for the most recent feature folder in `.specify/specs/` matching pattern `###-feature-name/` (e.g., `001-user-auth/`, `002-api-integration/`)
   - If user specified a feature, use that folder
   - All documents will be read from and written to this folder

2. **Load required files**:
   - **REQUIRED**: `.specify/specs/{feature-id}-{feature-name}/plan.md` — technical plan
   - **REQUIRED**: `.specify/specs/{feature-id}-{feature-name}/spec.md` — feature requirements
   - **REQUIRED**: `.specify/memory/constitution.md` — principles

3. **Identify task phases** in dependency order:
   - **Setup**: Project scaffolding, dependencies, config files
   - **Data / Models**: Define data structures, database schemas, types
   - **Core**: Main business logic, services
   - **Tests**: Unit tests, integration tests (TDD — tests first where applicable)
   - **Integration**: Wire components together, connect to external services
   - **Polish**: Error handling, logging, documentation, final validation

4. **Write tasks** to `.specify/specs/{feature-id}-{feature-name}/tasks.md`:

   ```markdown
   # Implementation Tasks: <Feature Name>

   **Feature**: {feature-id} — {feature-name}
   **Generated**: YYYY-MM-DD
   **Plan**: plan.md
   **Total tasks**: <N>

   ## Phase 1: Setup
   - [ ] **TASK-001**: <Task description>
     - **Files**: `<file paths to create/modify>`
     - **Acceptance**: <specific done criteria>
     - **Notes**: <any caveats>

   - [ ] **TASK-002**: <Task description>
     - **Files**: `<paths>`
     - **Acceptance**: <criteria>

   ## Phase 2: Data / Models
   - [ ] **TASK-003**: ...

   ## Phase 3: Core Implementation
   - [ ] **TASK-004**: ...

   ## Phase 4: Tests
   - [ ] **TASK-005**: Write unit tests for <component>
     - **Files**: `<test file paths>`
     - **Acceptance**: All tests pass, coverage ≥ <N>%

   ## Phase 5: Integration
   - [ ] **TASK-006**: ...

   ## Phase 6: Polish
   - [ ] **TASK-007**: ...

   ---
   ## Progress
   - Completed: 0 / <total>
   - Last updated: YYYY-MM-DD
   ```

5. **Task quality rules** — each task MUST:
   - Be completable in a single focused session (< 200 lines of new code as a guide)
   - Have testable acceptance criteria
   - List the exact files affected
   - Be dependency-ordered (prerequisites come first)

6. **TDD ordering**: If the constitution requires TDD, place test tasks BEFORE or ALONGSIDE their implementation counterparts.

7. **Output a brief summary**:
   - Total tasks per phase
   - Estimated complexity
   - Any prerequisites the user should set up manually
   - Suggested next step: `/acli.beads.implement`
