---
name: speckit-analyze
description: Perform a non-destructive cross-artifact consistency and quality analysis across spec.md, plan.md, and tasks.md — identifying gaps, ambiguities, duplications, and constitution violations before implementation.
---

# Spec Kit Analyze Skill

## When to Use
- `spec.md`, `plan.md`, and `tasks.md` all exist and need a consistency check before implementation.
- Must run after a complete `tasks.md` exists (after `/acli.beads.tasks`).

## Inputs
- `specs/<feature>/spec.md`, `plan.md`, `tasks.md` (all required)
- `.specify/memory/constitution.md`
- User-specified focus areas (optional)

## Operating Constraints
- **STRICTLY READ-ONLY** — do NOT modify any files.
- Constitution conflicts are always **CRITICAL** and require changes to spec/plan/tasks, not to the constitution.

## Workflow

1. **Initialize**: Run `.specify/scripts/bash/check-prerequisites.sh --json --require-tasks --include-tasks`. Parse `FEATURE_DIR`. Abort if any required file is missing.

2. **Load artifacts** (minimal context):
   - spec.md: Overview, Functional Requirements, NFRs, User Stories, Edge Cases
   - plan.md: Architecture, stack, phases, constraints
   - tasks.md: Task IDs, descriptions, phase grouping, `[P]` markers, file paths
   - constitution.md: Principle names and MUST/SHOULD statements

3. **Detect issues** across 6 categories:

   | Category | What to look for |
   |---|---|
   | **Duplication** | Near-duplicate requirements |
   | **Ambiguity** | Vague adjectives (fast, scalable) without measurable criteria; unresolved TODOs |
   | **Underspecification** | Requirements without measurable outcomes; tasks referencing undefined files |
   | **Constitution Violations** | Any requirement/plan element conflicting with a MUST principle |
   | **Coverage Gaps** | Requirements with zero tasks; tasks with no mapped requirement; NFRs not in tasks |
   | **Inconsistency** | Terminology drift; entities in plan absent from spec; conflicting requirements |

4. **Assign severity**:
   - **CRITICAL**: Constitution violation, missing core artifact, zero-coverage baseline requirement
   - **HIGH**: Duplicate/conflicting requirement, ambiguous security/performance attribute
   - **MEDIUM**: Terminology drift, missing NFR task coverage, underspecified edge case
   - **LOW**: Wording improvements, minor redundancy

5. **Output a Markdown analysis report** (no file writes):
   ```
   | ID | Category | Severity | Location | Summary | Recommendation |
   ```
   Include: Coverage Summary Table, Constitution Alignment Issues, Unmapped Tasks, Metrics (total requirements, tasks, coverage %, issue counts).

6. **Next actions**: If CRITICAL issues → resolve before implementing. Otherwise provide improvement suggestions.

7. **Offer remediation**: Ask "Would you like me to suggest concrete edits for the top N issues?" — do NOT apply automatically.

## Quality Rules
- Limit findings table to 50 rows; summarize overflow.
- Zero issues = emit a success report with coverage statistics.
- Never hallucinate missing sections — report them accurately.

## Outputs
- Read-only analysis report in the chat response (no file writes)

## Next Steps
Resolve CRITICAL issues in the relevant artifacts, then run `/acli.beads.implement`.
