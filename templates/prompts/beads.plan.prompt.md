---
description: Create a detailed technical implementation plan — tech stack, architecture decisions, file structure, and data models — based on the feature specification.
argument-hint: Optional - specify your preferred tech stack or architecture constraints
---

## User Input

```text
$ARGUMENTS
```

Use the user input to refine or constrain the technical approach (tech stack preferences, architecture choices, etc.).

## Your Task

You are creating a technical implementation plan at `.specify/specs/plan.md`.

This plan bridges the **what** (spec) to the **how** (tasks). It must be specific enough that the tasks generated from it can be immediately implemented.

## Execution Steps

1. **Load required files**:
   - **REQUIRED**: `.specify/memory/constitution.md` — principles and tech constraints
   - **REQUIRED**: `.specify/specs/spec.md` — what needs to be built
   - Respect all constraints and principles from the constitution

2. **Determine tech stack** — from user input + constitution tech stack section:
   - Primary language and runtime
   - Framework(s)
   - Data storage (database, file system, in-memory)
   - Key libraries/dependencies
   - Testing framework
   - Build/packaging tools

3. **Design the architecture** at a component level:
   - List major components/modules
   - Describe how they interact
   - Identify any external integrations

4. **Plan the file structure** — list files/directories that will be created or modified

5. **Write the plan** at `.specify/specs/plan.md`:

   ```markdown
   # Technical Implementation Plan: <Feature Name>

   **Created**: YYYY-MM-DD
   **Spec**: spec.md

   ## Tech Stack
   - **Language**: <language + version>
   - **Framework**: <framework>
   - **Database / Storage**: <storage solution>
   - **Testing**: <test framework>
   - **Build tools**: <tools>
   - **Key dependencies**: <list with versions>

   ## Architecture Overview
   <Brief description of the overall design>

   ### Components
   | Component | Responsibility | File(s) |
   |-----------|---------------|---------|
   | <name>    | <what it does> | <paths> |

   ## File Structure
   ```
   <project root>/
   ├── src/
   │   ├── <module>/
   │   │   ├── <file>.ts
   ...
   ```

   ## Data Model
   <Describe entities and relationships — use plain English or a simple schema>

   ## API / Interface Contracts
   <List key interfaces, function signatures, or API endpoints>

   ## Dependencies to Install
   ```bash
   <install command>
   ```

   ## Non-Functional Requirements
   - Performance: <targets>
   - Security: <specific mitigations based on OWASP Top 10>
   - Error handling: <approach>

   ## Constitution Compliance Checklist
   - [ ] Aligns with all core principles
   - [ ] Security requirements addressed
   - [ ] Testing standards will be met
   ```

6. **Output a brief summary**:
   - Tech stack chosen and why
   - Key architectural decisions
   - Suggested next step: `/beads.tasks`
