---
description: Define what you want to build — feature requirements, user stories, and acceptance criteria. Technology-agnostic. Focus on the WHAT not the HOW.
argument-hint: Describe the feature you want to build
---

## User Input

```text
$ARGUMENTS
```

You **MUST** use the user input as the primary source for the feature description.

## Your Task

You are creating a feature specification in a dedicated feature folder at `.specify/specs/{feature-id}-{feature-name}/spec.md`.

This is a **technology-agnostic** description of what needs to be built. It must be detailed enough that a developer (or AI agent) can implement it without further clarification.

## Execution Steps

1. **Load the constitution** from `.specify/memory/constitution.md`
   - Understand the project's principles, tech constraints, and definition of done
   - All requirements must align with the constitution

2. **Parse the user input** — extract:
   - The feature being requested
   - Any constraints or preferences mentioned
   - Any out-of-scope items mentioned

3. **Ask for clarification** if the user input is ambiguous or incomplete (max 3 targeted questions). Then proceed once answered or if input is clear enough.

4. **Generate feature ID and folder**:
   - Check `.specify/specs/` for existing feature folders
   - Generate next sequential ID (e.g., `001`, `002`, `003`)
   - Create feature slug from feature name (lowercase, hyphenated)
   - Create folder: `.specify/specs/{ID}-{slug}/`
   - Example: `.specify/specs/001-user-authentication/`

5. **Create git branch**:
   - Branch name: `feature/{ID}-{slug}`
   - Example: `feature/001-user-authentication`
   - Run: `git checkout -b feature/{ID}-{slug}`
   - If git is not available or fails, continue anyway (CI/CD compatibility)

6. **Write the specification** at `.specify/specs/{ID}-{slug}/spec.md`:

   ```markdown
   # Feature Specification: <Feature Name>

   **Created**: YYYY-MM-DD
   **Status**: Draft
   **Priority**: <P0 / P1 / P2 / P3>

   ## Overview
   <One paragraph describing what this feature does and why it is needed.>

   ## Goals
   - <Goal 1>
   - <Goal 2>

   ## Non-Goals (Out of Scope)
   - <What this feature explicitly does NOT do>

   ## User Stories

   ### Story 1: <Name>
   **As a** <user type>
   **I want to** <action>
   **So that** <benefit>

   **Acceptance Criteria**:
   - [ ] <Testable criterion 1>
   - [ ] <Testable criterion 2>

   <!-- Repeat for each story -->

   ## Constraints
   - <Any hard constraints from the constitution or user>

   ## Open Questions
   - <Any unresolved ambiguities — mark as TODO if deferring>
   ```

7. **Verify** every acceptance criterion is:
   - Specific and measurable
   - Testable (could be written as an automated test)
   - Free of implementation details

8. **Output a brief summary**:
   - Feature ID and folder location
   - Git branch created
   - Number of user stories created
   - Key acceptance criteria count
   - Suggested next step: `/acli.beads.plan <tech stack preferences if any>`
