---
description: Cross-artifact consistency check — validate that spec, plan, and tasks are aligned and complete before starting implementation.
argument-hint: Optional - specify which artifacts to focus on
---

## User Input

```text
$ARGUMENTS
```

## Your Task

You are validating consistency and completeness across all BEADS+ artifacts before implementation starts.

## Execution Steps

1. **Load all artifacts**:
   - `.specify/memory/constitution.md`
   - `.specify/specs/spec.md`
   - `.specify/specs/plan.md`
   - `.specify/specs/tasks.md`
   - Note which files are missing

2. **Run consistency checks**:

   **Spec vs Constitution**:
   - [ ] All requirements align with core principles
   - [ ] No requirements violate constitution constraints
   - [ ] Security requirements from constitution are addressed

   **Plan vs Spec**:
   - [ ] All user stories have corresponding technical components
   - [ ] All acceptance criteria are addressed in the plan
   - [ ] Tech stack respects constitution's tech constraints

   **Tasks vs Plan**:
   - [ ] Every component in the plan has at least one task
   - [ ] All files listed in the plan's file structure are covered by tasks
   - [ ] Task ordering respects dependencies
   - [ ] Test tasks exist for all core components

   **Tasks vs Definition of Done**:
   - [ ] Every task has testable acceptance criteria
   - [ ] Security tasks are present if OWASP compliance is required
   - [ ] No tasks have vague or unmeasurable criteria

3. **Produce an analysis report**:

   ```
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   BEADS+ Consistency Analysis Report
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   
   ✅ PASS  / ⚠️  WARNING  / ❌ FAIL
   
   Spec vs Constitution:   <status>
   Plan vs Spec:           <status>
   Tasks vs Plan:          <status>
   Tasks vs DoD:           <status>
   
   Issues found: <N>
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   ```

4. **For each issue found**, describe:
   - What is inconsistent or missing
   - Which file needs updating
   - Suggested fix

5. **If issues exist**, ask the user:
   - "Auto-fix minor issues?" (gaps in task coverage, missing acceptance criteria)
   - For major issues (spec-plan misalignment), describe and stop for human decision

6. **If all checks pass**:
   - Confirm ready to implement
   - Suggest: `/beads.implement`
