---
name: speckit-specify
description: Create or update a technology-agnostic feature specification from a natural language description, producing user stories with acceptance criteria and a requirements quality checklist.
---

# Spec Kit Specify Skill

## When to Use
- User wants to define what to build for a new or updated feature.
- Turn a natural language description into a structured, testable specification.

## Inputs
- Feature description from the user (the argument is the input — do not ask them to repeat it).
- Repo context with `.specify/` scripts and templates.

## Workflow

1. **Generate a short feature name** (2–4 words, action-noun format, e.g. `user-auth`, `analytics-dashboard`).

2. **Find next feature number**: Check remote branches, local branches, and `specs/` directories for existing numbers with this short name. Use N+1.

3. **Create the feature branch and spec file** by running:
   ```bash
   .specify/scripts/bash/create-new-feature.sh --json --number <N> --short-name "<short-name>" "<description>"
   ```
   The JSON output provides `BRANCH_NAME` and `SPEC_FILE` paths. Run this only once.

4. **Load** `.specify/templates/spec-template.md` to understand required sections.

5. **Write the specification** to `SPEC_FILE` — replace placeholders, preserve headings:
   - **Project context** and feature overview
   - **Functional requirements** — each must be testable and technology-agnostic
   - **User scenarios** — primary flows and acceptance criteria
   - **Success criteria** — measurable, technology-agnostic outcomes (e.g., "checkout completes in under 3 minutes")
   - **Key entities** (if data is involved)
   - **Assumptions** — document reasonable defaults used
   - Maximum **3 `[NEEDS CLARIFICATION: ...]`** markers for truly critical ambiguities

6. **Spec quality validation** — create `specs/<feature>/checklists/requirements.md` and check:
   - No implementation details (no languages, frameworks, APIs)
   - All requirements testable and unambiguous
   - Success criteria are technology-agnostic and measurable
   - All mandatory sections completed
   - If items fail: update spec and re-validate (max 3 iterations)

7. If `[NEEDS CLARIFICATION]` markers remain, present up to 3 questions to the user using a formatted table (Option A/B/C + implications). Wait for responses before completing.

8. **Report**: branch name, spec file path, checklist results, readiness for next phase.

## Quality Rules
- Focus on **WHAT** users need and **WHY** — never HOW.
- Written for non-technical stakeholders.
- No framework, library, or tool names in the spec.
- Good: "Users can complete checkout in under 3 minutes". Bad: "API response under 200ms".

## Outputs
- `specs/<feature>/spec.md`
- `specs/<feature>/checklists/requirements.md`
- New feature branch

## Next Steps
Run `/beads.plan` to create the technical implementation plan.
