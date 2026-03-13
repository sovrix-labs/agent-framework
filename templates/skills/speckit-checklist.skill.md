---
name: speckit-checklist
description: Generate a custom requirements-quality checklist for a feature — validating completeness, clarity, consistency, and measurability of written requirements (not implementation behavior).
---

# Spec Kit Checklist Skill

## When to Use
- A requirements-quality gate is needed before planning or implementation.
- Validate that spec/plan/tasks are complete, clear, and testable — not that the code works.

## Core Concept: "Unit Tests for English"
Checklists validate the **quality of written requirements**, not implementation behavior.

- ❌ WRONG: "Verify button clicks correctly" (tests the system)
- ✅ CORRECT: "Are interaction state requirements (hover, focus, active) consistently defined?" (tests the spec)

## Inputs
- User's request describing checklist focus and scope (e.g., security, UX, API, performance).
- Available artifacts: `spec.md`, `plan.md`, `tasks.md` (for context).

## Workflow

1. **Setup**: Run `.specify/scripts/bash/check-prerequisites.sh --json` from repo root. Parse `FEATURE_DIR`.

2. **Clarify intent** (up to 3 targeted questions): Derive from user phrasing + spec signals.
   - Scope: include/exclude integration touchpoints?
   - Depth: lightweight sanity list or formal release gate?
   - Audience: author self-review or PR peer review?

3. **Load feature context** from `FEATURE_DIR` (minimal necessary portions).

4. **Generate checklist file** at `FEATURE_DIR/checklists/<domain>.md` (e.g., `ux.md`, `api.md`, `security.md`). Each run creates a NEW file. Number items sequentially from CHK001.

5. **Item structure** (REQUIRED pattern):
   ```
   - [ ] CHK001 Are [requirement type] defined for [scenario]? [Completeness, Spec §FR-1]
   - [ ] CHK002 Is "[vague term]" quantified with specific criteria? [Clarity, Spec §NFR-2]
   ```
   Every item MUST include a quality dimension tag: `[Completeness]`, `[Clarity]`, `[Consistency]`, `[Measurability]`, `[Coverage]`, `[Gap]`, `[Ambiguity]`, or spec reference `[Spec §X.Y]`.

6. **Category structure**:
   - Requirement Completeness
   - Requirement Clarity
   - Requirement Consistency
   - Acceptance Criteria Quality
   - Scenario Coverage (primary, alternate, exception, recovery)
   - Non-Functional Requirements (performance, security, accessibility)
   - Dependencies & Assumptions

7. **Content cap**: Soft cap 40 items; merge near-duplicates; group 5+ low-impact edge cases into one item.

8. **Report**: Full path to checklist, item count, focus areas, depth level.

## Prohibited Patterns
- ❌ Items starting with "Verify", "Test", "Confirm" + implementation behavior
- ❌ References to code execution or user actions clicking/navigating/rendering
- ❌ Test cases, test plans, or QA procedures

## Outputs
- `specs/<feature>/checklists/<domain>.md`

## Next Steps
Incomplete checklist items require spec/plan updates before running `/beads.implement`.
