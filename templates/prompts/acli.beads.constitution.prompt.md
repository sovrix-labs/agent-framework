---
description: Create or update the project constitution — governing principles, tech preferences, and non-negotiable development rules that guide all subsequent BEADS+ work.
argument-hint: Optional - describe your project or specific principles to include
---

## User Input

```text
$ARGUMENTS
```

Consider the user input above before proceeding (if not empty).

## Your Task

You are creating or updating the project constitution at `.specify/memory/constitution.md`.

This file is the **single source of truth** for how this project is built. Every agent in the BEADS+ workflow must respect it.

## Execution Steps

1. **Check for existing constitution**
   - Look for `.specify/memory/constitution.md`
   - If it exists, load it and identify what needs updating
   - If it does not exist, create `.specify/memory/` directory and start fresh

2. **Gather project context** — extract from the user input plus any existing `README.md`, `package.json`, or source files:
   - Project name and purpose
   - Primary programming language(s) and tech stack
   - Key principles (e.g. test coverage, security, performance targets)
   - What is explicitly forbidden or non-negotiable
   - Target environment (browser, mobile, server, CLI, etc.)

3. **Write the constitution** at `.specify/memory/constitution.md` using this structure:

   ```markdown
   # Project Constitution
   <!-- Version: 1.0.0 | Ratified: YYYY-MM-DD | Last amended: YYYY-MM-DD -->

   ## Project Identity
   **Name**: <project name>
   **Purpose**: <one sentence purpose>
   **Target environment**: <environment>

   ## Tech Stack
   - **Language(s)**: <languages>
   - **Framework(s)**: <frameworks>
   - **Key libraries**: <libraries>
   - **Forbidden dependencies**: <none / list>

   ## Core Principles

   ### 1. <Principle Name>
   <Non-negotiable rule. Use MUST/MUST NOT language.>
   **Rationale**: <why this matters>

   ### 2. <Principle Name>
   <Rule>
   **Rationale**: <why>

   <!-- Add as many principles as needed -->

   ## Testing Standards
   - Minimum coverage: <e.g. 80%>
   - Test framework: <e.g. jest, pytest>
   - TDD: <required / encouraged / optional>

   ## Code Quality Standards
   - Linter: <e.g. eslint, pylint>
   - Formatter: <e.g. prettier>
   - Max complexity per function: <e.g. 10>
   - All code MUST pass CI checks before merge

   ## Security Requirements
   - OWASP Top 10 compliance: REQUIRED
   - Secrets MUST NOT be committed to version control
   - All user input MUST be validated and sanitised

   ## Definition of Done
   A task is "done" when:
   - [ ] All acceptance criteria are met
   - [ ] Tests are written and passing
   - [ ] Code quality checks pass
   - [ ] Security review is clear
   - [ ] Documentation updated if behaviour changed
   ```

4. **Validate** — ensure no vague language remains ("should" → "MUST" or "SHOULD" with rationale).

5. **Output a brief summary** to the user:
   - What was created or changed
   - Key principles ratified
   - Suggested next step: `/acli.beads.specify <describe what you want to build>`
