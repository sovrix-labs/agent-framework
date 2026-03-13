---
name: speckit-constitution
description: Create or update the project constitution — governing principles, tech constraints, and non-negotiable development rules that guide all subsequent BEADS+ workflow phases.
---

# Spec Kit Constitution Skill

## When to Use
- Initial project setup to establish foundational governance principles.
- When project rules, tech constraints, or quality standards need updating.

## Inputs
- User-provided principles, amendments, or project description.
- Existing `.specify/memory/constitution.md` (if present).
- Repo context: README, package.json, existing source files.

## Workflow

1. **Load or initialize** `.specify/memory/constitution.md`.
   - Identify placeholder tokens `[ALL_CAPS_IDENTIFIER]` to fill.
   - If no file exists, create `.specify/memory/` and start from the template structure below.

2. **Collect values** for each placeholder:
   - Use user input first; infer from repo context otherwise.
   - Increment `CONSTITUTION_VERSION` by semver rules (MAJOR=principle removal/redef, MINOR=new principle, PATCH=clarifications).
   - `RATIFICATION_DATE` = original adoption; `LAST_AMENDED_DATE` = today if changes made.

3. **Write the constitution** using this structure:

   ```markdown
   # Project Constitution
   <!-- Version: X.Y.Z | Ratified: YYYY-MM-DD | Last amended: YYYY-MM-DD -->

   ## Project Identity
   **Name**: <project name>
   **Purpose**: <one sentence>
   **Target environment**: <environment>

   ## Tech Stack
   - **Language(s)**: ...
   - **Framework(s)**: ...
   - **Forbidden dependencies**: ...

   ## Core Principles
   ### 1. <Principle Name>
   <MUST/MUST NOT rule>
   **Rationale**: <why>

   ## Governance
   - Amendment process, versioning policy, compliance review.
   ```

4. **Propagate consistency**: Verify `.specify/templates/` (spec, plan, tasks) and runtime agent files still align with updated principles. Note mismatches in the Sync Impact Report.

5. **Validate**: No unexplained bracket tokens, ISO dates, MUST/SHOULD language, sequential version bump.

6. **Write** updated file back to `.specify/memory/constitution.md`.

7. **Output**: Version change summary, files requiring follow-up, suggested commit message.

## Quality Rules
- All principles must be declarative, testable, and free of vague language.
- Use MUST / MUST NOT / SHOULD language, not "should" in lowercase.
- Every principle needs an explicit rationale.

## Outputs
- Updated `.specify/memory/constitution.md`
- Sync Impact Report (prepended as HTML comment)

## Next Steps
Run `/beads.specify` to capture feature requirements guided by the new constitution.
