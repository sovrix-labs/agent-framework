# Task List: {{FEATURE_NAME}}

**Feature ID**: {{FEATURE_ID}}
**Based on**: specs/{{FEATURE_ID}}/spec.md and specs/{{FEATURE_ID}}/plan.md
**Created**: {{DATE}}
**Status**: {{STATUS}}

---

## Legend

- `[ ]` = To do
- `[x]` = Completed
- `[P]` = Parallelizable (can run concurrently with other [P] tasks)
- `[T###]` = Unique task ID
- `[US#]` = User story reference (from spec.md)
- File paths in `backticks` indicate implementation location

---

## Phase P0: Foundation / MVP (Must Have)

**User Story**: US1 - [User Story Title]  
**Goal**: [Brief description of what this phase achieves]

- [ ] **[T001]** [P] [US1] [Task description] - `path/to/file.ext`
  - **Purpose**: [Why this task is needed]
  - **Dependencies**: None (or specific task IDs: T###)
  - **Tests**: [Required test files or test types]
  - **Est**: [Time estimate]

- [ ] **[T002]** [US1] [Task description] - `path/to/file.ext`
  - **Purpose**: [Why this task is needed]
  - **Dependencies**: T001
  - **Tests**: [Required test files or test types]
  - **Est**: [Time estimate]

- [ ] **[T003]** [P] [US1] [Task description] - `path/to/file.ext`
  - **Purpose**: [Why this task is needed]
  - **Dependencies**: None
  - **Tests**: [Required  test files or test types]
  - **Est**: [Time estimate]

---

## Phase P1: Core Features (Important - Should Have)

**User Story**: US2 - [User Story Title]  
**Goal**: [Brief description of what this phase achieves]

- [ ] **[T010]** [P] [US2] [Task description] - `path/to/file.ext`
  - **Purpose**: [Why this task is needed]
  - **Dependencies**: T001, T002 (P0 must be complete)
  - **Tests**: [Required test files or test types]
  - **Est**: [Time estimate]

- [ ] **[T011]** [US2] [Task description] - `path/to/file.ext`
  - **Purpose**: [Why this task is needed]
  - **Dependencies**: T010
  - **Tests**: [Required test files or test types]
  - **Est**: [Time estimate]

---

## Phase P2: Enhanced Features (Nice to Have - Could Have)

**User Story**: US3 - [User Story Title]  
**Goal**: [Brief description of what this phase achieves]

- [ ] **[T020]** [P] [US3] [Task description] - `path/to/file.ext`
  - **Purpose**: [Why this task is needed]
  - **Dependencies**: T010, T011 (P1 must be complete)
  - **Tests**: [Required test files or test types]
  - **Est**: [Time estimate]

- [ ] **[T021]** [US3] [Task description] - `path/to/file.ext`
  - **Purpose**: [Why this task is needed]
  - **Dependencies**: T020
  - **Tests**: [Required test files or test types]
  - **Est**: [Time estimate]

---

## Phase P3: Future Enhancements (Won't Have This Release)

**User Story**: US4 - [User Story Title]  
**Goal**: [Brief description of what this phase achieves]

- [ ] **[T030]** [US4] [Task description] - `path/to/file.ext`
  - **Purpose**: [Why this task is needed]
  - **Dependencies**: T020, T021 (P2 must be complete)
  - **Tests**: [Required test files or test types]
  - **Est**: [Time estimate]

---

## Test Gates ✅

**CRITICAL**: Each task must pass 100% of tests before marking complete.

### Unit Tests
- **Command**: `npm test` or `pytest tests/unit/`
- **Target Coverage**: 90%+
- **Run After**: Every task completion

### Integration Tests
- **Command**: `npm run test:integration` or `pytest tests/integration/`
- **Run After**: Each user story phase completion

### E2E Tests
- **Command**: `npm run test:e2e` or `pytest tests/e2e/`
- **Run After**: Feature complete

### No Regressions
- **All existing tests must continue to pass**
- **New tests must not break existing functionality**

---

## Implementation Workflow

1. **Select Next Task**
   - Choose first uncompleted task with no pending dependencies
   - Tasks marked `[P]` can run in parallel

2. **Before Starting**
   - Read spec.md to understand requirements
   - Read plan.md for technical approach
   - Review relevant checklists in `checklists/`

3. **During Implementation**
   - Follow the file path and purpose specified
   - Write tests first (TDD) or alongside code
   - Keep changes focused on the specific task

4. **After Implementation**
   - Run unit tests: All must pass ✅
   - Run relevant integration tests: All must pass ✅
   - Run full test suite: No regressions ✅
   - Mark task as `[x]` complete

5. **Phase Completion**
   - All tasks in phase marked `[x]`
   - Integration tests pass 100%
   - Ready to start next phase

---

## Dependency Graph

```
P0 Foundation:
T001 [P] ─┐
T002     ├─→ P1 can start
T003 [P] ─┘

P1 Core Features:
T010 ─┐
T011  ├─→ P2 can start
T012 ─┘

P2 Enhanced:
T020 ─┐
T021  ├─→ P3 can start
T022 ─┘

P3 Future:
T030
T031
```

---

## Progress Tracking

### Overall Status
- **Total Tasks**: [Number]
- **Completed**: [Number] ([Percentage]%)
- **In Progress**: [Number]
- **Remaining**: [Number]

### Phase Status
- **P0**: [X/Y tasks] ([Percentage]%) ← **MVP Priority**
- **P1**: [X/Y tasks] ([Percentage]%)
- **P2**: [X/Y tasks] ([Percentage]%)
- **P3**: [X/Y tasks] ([Percentage]%)

### Estimated Time Remaining
- **P0**: [Time]
- **P1**: [Time]
- **P2**: [Time]
- **Total**: [Time]

---

## Notes

### Implementation Notes
- [Important note about implementation]
- [Gotcha or consideration]

### Blockers
- [ ] [Blocker description] - Owner: [Name], ETA: [Date]

### Lessons Learned
- [Lesson learned during implementation]
- [Updated approach or decision]

---

## Validation Checklist

Before marking feature complete:

- [ ] All P0 tasks completed and tested
- [ ] All P1 tasks completed and tested (if in scope)
- [ ] All success criteria from spec.md are met
- [ ] All checklists completed (security, accessibility, etc.)
- [ ] Integration tests pass 100%
- [ ] E2E tests pass 100%
- [ ] No regressions (all existing tests pass)
- [ ] Code reviewed and approved
- [ ] Documentation updated
- [ ] Ready for deployment

---

**Notes:**
- This task list is generated from spec.md and plan.md
- Keep this file updated as tasks complete
- Use `/speckit.analyze` to validate consistency with spec and plan
- Dependencies ensure proper implementation order
- Test gates are mandatory - no shortcuts!

*Last updated: {{DATE}}*
