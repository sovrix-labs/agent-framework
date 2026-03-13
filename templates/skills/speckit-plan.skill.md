---
name: speckit-plan
description: Execute the technical implementation planning workflow — produce a plan.md with tech stack, architecture, data model, API contracts, and research artifacts based on the feature specification.
---

# Spec Kit Plan Skill

## When to Use
- The feature spec (`specs/<feature>/spec.md`) is ready and a technical implementation plan is needed.

## Inputs
- `specs/<feature>/spec.md`
- `.specify/memory/constitution.md`
- `.specify/` templates
- User-provided tech stack preferences or constraints (if any)

## Workflow

1. **Setup**: Run `.specify/scripts/bash/setup-plan.sh --json` from repo root. Parse JSON for `FEATURE_SPEC`, `IMPL_PLAN`, `SPECS_DIR`, `BRANCH`. Use absolute paths throughout.

2. **Load context**: Read `FEATURE_SPEC` and `.specify/memory/constitution.md`. Load the plan template (already copied to `IMPL_PLAN`).

3. **Phase 0 — Research & Outline**:
   - Extract unknowns from the spec (technology choices, integration patterns, unclear decisions).
   - For each unknown, research best practices and consolidate in `research.md`:
     - Decision, Rationale, Alternatives considered.
   - All `[NEEDS CLARIFICATION]` items must be resolved before proceeding.

4. **Phase 1 — Design & Contracts**:
   - Extract entities from spec → `data-model.md` (fields, relationships, validation rules, state transitions).
   - Generate API contracts from functional requirements → `contracts/` (OpenAPI/GraphQL schemas).
   - Generate `quickstart.md` with integration test scenarios.
   - Run `.specify/scripts/bash/update-agent-context.sh copilot` to update the agent context file.

5. **Fill `plan.md`** using the template structure:
   - Tech stack and key libraries (aligned with constitution)
   - Constitution compliance check (fail if violations are unjustified)
   - Architecture decisions and component structure
   - File/directory layout
   - Data model summary and API overview
   - Dependencies and constraints

6. **Validate**: ERROR on constitution gate failures or unresolved clarifications. Re-evaluate constitution check after design.

7. **Report**: Branch, `plan.md` path, and list of generated artifacts.

## Quality Rules
- Constitution compliance is mandatory; gate failures block the plan.
- All technical decisions must reference constitution constraints.
- Use absolute paths in all script invocations.

## Outputs
- `specs/<feature>/plan.md`
- `specs/<feature>/research.md`
- `specs/<feature>/data-model.md`
- `specs/<feature>/contracts/` (API schemas)
- `specs/<feature>/quickstart.md`

## Next Steps
Run `/beads.tasks` to generate the executable task list, or `/beads.analyze` to validate consistency first.
