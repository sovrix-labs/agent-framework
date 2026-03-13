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

You are generating an executable task list at `.specify/specs/tasks.md`.

Tasks must be granular enough for an AI agent to complete in a single focused session, with clear acceptance criteria and no ambiguity.

## Execution Steps

1. **Load required files**:
   - **REQUIRED**: `.specify/specs/plan.md` — technical plan
   - **REQUIRED**: `.specify/specs/spec.md` — feature requirements
   - **REQUIRED**: `.specify/memory/constitution.md` — principles

2. **Identify task phases** in dependency order:
   - **Setup**: Project scaffolding, dependencies, config files
   - **Data / Models**: Define data structures, database schemas, types
   - **Core**: Main business logic, services
   - **Tests**: Unit tests, integration tests (TDD — tests first where applicable)
   - **Integration**: Wire components together, connect to external services
   - **Polish**: Error handling, logging, documentation, final validation

3. **Write tasks** at `.specify/specs/tasks.md`:

   ```markdown
   # Implementation Tasks: <Feature Name>

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

4. **Task quality rules** — each task MUST:
   - Be completable in a single focused session (< 200 lines of new code as a guide)
   - Have testable acceptance criteria
   - List the exact files affected
   - Be dependency-ordered (prerequisites come first)

5. **TDD ordering**: If the constitution requires TDD, place test tasks BEFORE or ALONGSIDE their implementation counterparts.

6. **Output a brief summary**:
   - Total tasks per phase
   - Estimated complexity
   - Any prerequisites the user should set up manually
   - Suggested next step: `/beads.implement`
