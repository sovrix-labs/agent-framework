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

You are creating a technical implementation plan in the feature-specific folder at `.specify/specs/{feature-id}-{feature-name}/plan.md`.

This plan bridges the **what** (spec) to the **how** (tasks). It must be specific enough that the tasks generated from it can be immediately implemented.

## Execution Steps

1. **Identify the feature folder**:
   - Look for the most recent feature folder in `.specify/specs/`
   - Pattern: `.specify/specs/{ID}-{name}/`
   - Example: `.specify/specs/001-user-authentication/`
   - All documents (spec.md, plan.md, tasks.md, testing-plan.md) belong in this folder

2. **Load required files**:
   - **REQUIRED**: `.specify/memory/constitution.md` — principles and tech constraints
   - **REQUIRED**: `.specify/specs/{feature-id}-{feature-name}/spec.md` — what needs to be built
   - **OPTIONAL**: `.specify/memory/reference-architecture.md` — if it exists, extend it rather than creating from scratch
   - Respect all constraints and principles from the constitution

3. **Determine tech stack** — from user input + constitution tech stack section:
   - Primary language and runtime
   - Framework(s)
   - Data storage (database, file system, in-memory)
   - Key libraries/dependencies
   - Testing framework
   - Build/packaging tools

4. **Design the architecture** at a component level:
   - List major components/modules
   - Describe how they interact
   - Identify any external integrations

5. **Plan the file structure** — list files/directories that will be created or modified

6. **Write the plan** at `.specify/specs/{feature-id}-{feature-name}/plan.md`:

   ```markdown
   # Technical Implementation Plan: <Feature Name>

   **Created**: YYYY-MM-DD
   **Feature ID**: {feature-id}
   **Spec**: `.specify/specs/{feature-id}-{feature-name}/spec.md`

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

7. **Create the Reference Architecture document** at `.specify/memory/reference-architecture.md`:

   This document serves as the canonical architecture reference for ALL agents and ALL future features on this project.

   ```markdown
   # Reference Architecture

   **Project**: <project name>
   **Created**: YYYY-MM-DD
   **Updated**: YYYY-MM-DD

   ## Architecture Style
   <e.g., Layered MVC, Clean Architecture, Microservices, Hexagonal — with rationale>

   ## System Context
   <C4-style description: what the system is, who uses it, what it integrates with>

   ## Component Map
   | Layer | Component | Responsibility | Key Files |
   |-------|-----------|---------------|-----------|
   | <layer> | <name> | <responsibility> | <paths> |

   ## Data Flow
   <Describe the primary data flows — request/response, events, batch jobs>

   ## Integration Points
   | System | Protocol | Auth Method | Direction |
   |--------|----------|-------------|-----------|

   ## Architecture Decision Records (ADRs)
   | # | Decision | Rationale | Alternatives Rejected |
   |---|----------|-----------|----------------------|
   | ADR-001 | <decision> | <why> | <what else was considered> |

   ## Non-Functional Architecture
   - **Scalability**: <horizontal/vertical — approach>
   - **Availability**: <uptime target — failover approach>
   - **Performance**: <latency targets — caching strategy>
   - **Security**: <auth model — encryption at rest/transit>
   - **Observability**: <logging — monitoring — tracing approach>

   ## Constraints & Assumptions
   <List hard technical constraints and assumptions that shaped architecture decisions>

   ## Compliance
   - [ ] Aligns with `.specify/memory/constitution.md`
   - [ ] All major components accounted for
   - [ ] ADRs recorded for every significant decision
   ```

8. **Create the Quality Standards document** at `.specify/memory/quality-standards.md`:

   Derive these standards from the actual tech stack chosen. Be specific — generic checklists have no value.

   ```markdown
   # Quality Standards

   **Project**: <project name>
   **Stack**: <language> / <framework>
   **Created**: YYYY-MM-DD

   ## Linting & Formatting
   - Tool: <eslint/pylint/rubocop/golangci-lint/etc.>
   - Config file: <path to config>
   - Rules that matter most for this stack: <list>
   - Auto-fix command: `<command>`
   - Check command: `<command>`

   ## Code Style
   - Naming: <conventions for this language — camelCase/snake_case/PascalCase etc.>
   - File organisation: <conventions>
   - Max file length: <lines>
   - Max function length: <lines>
   - Max cyclomatic complexity: <number>

   ## Testing Standards
   - Framework: <jest/pytest/rspec/go test/etc.>
   - Minimum coverage: <percentage>%
   - Test file location: <convention>
   - Test naming: <convention>
   - Required test types: <unit / integration / e2e>
   - Run command: `<command>`

   ## Framework-Specific Rules
   <For each major framework in use, list the critical do's and don'ts>
   ### <Framework Name>
   - ✅ Do: <rule>
   - ❌ Don't: <rule>

   ## Error Handling
   - Pattern: <try/catch / Result type / error boundaries / etc.>
   - Logging: <library and required log fields>
   - Never swallow errors silently
   - User-facing messages must not expose stack traces

   ## Security Baseline
   - Input validation: <library/approach>
   - Authentication: <library/pattern>
   - Secrets: never hardcode — use <env var approach>
   - Dependencies: audit with `<command>` before each release

   ## Performance Targets
   - API response time: <ms p95>
   - DB query time: <ms p95>
   - Frontend TTI: <seconds>
   - Bundle size: <KB gzipped>

   ## Pre-Commit Gate
   All of the following must pass before any code is committed or reviewed:
   - [ ] Linter: `<command>`
   - [ ] Tests: `<command>`
   - [ ] Type check: `<command>` (if applicable)
   - [ ] Security scan: `<command>`
   ```

   > **@quality agent** must load this document at the start of every review session and enforce every rule listed.

9. **Create the Testing Plan document** at `.specify/specs/###-feature-name/testing-plan.md`:

   This document is the single source of truth for the testing agent on this feature. Derive every section from the spec's user stories and the quality standards document.

   ```markdown
   # Testing Plan: <Feature Name>

   **Feature**: <feature-id> — <feature name>
   **Created**: YYYY-MM-DD
   **Stack**: <language> / <test framework>
   **Spec**: `.specify/specs/###-feature-name/spec.md`
   **Quality Standards**: `.specify/memory/quality-standards.md`

   ## Test Coverage Targets
   - Unit test coverage: <percentage from quality-standards.md>%
   - Integration test coverage: <percentage>%
   - E2E scenarios: <count>

   ## Test Suites

   ### Unit Tests
   | Suite | File Under Test | Test File | Priority | Key Scenarios |
   |-------|-----------------|-----------|----------|---------------|
   | <name> | `src/<path>` | `tests/<path>.test.<ext>` | P0/P1/P2/P3 | <list> |

   ### Integration Tests
   | Suite | Components Under Test | Test File | Priority | Key Scenarios |
   |-------|-----------------------|-----------|----------|---------------|

   ### End-to-End Tests
   | Scenario | User Story | Steps | Expected Outcome |
   |----------|-----------|-------|------------------|

   ## User Story Coverage
   | User Story | Unit Tests | Integration Tests | E2E Tests | Acceptance Criteria |
   |------------|-----------|-------------------|-----------|---------------------|
   | US1 (P0) | <test names> | <test names> | <scenario names> | Covered / Partial / Missing |

   ## Test Data Requirements
   - <fixture / factory / seed needed>
   - <external service mock or stub needed>

   ## Manual Testing Steps
   > These steps are for the human to verify the feature works end-to-end before marking any user story as done.

   ### Setup
   ```bash
   # Commands to get the app in a testable state
   <setup command>
   ```

   ### For each User Story (P0 first)
   #### US1: <story name>
   1. <step — what to navigate to or run>
   2. <step — input to provide>
   3. <step — action to perform>
   4. ✅ Expected: <what you should see/get>
   5. ❌ If you see: <failure symptom> → check <file or log>

   ### Regression Smoke Test
   After all tasks are complete, run these steps to confirm no regressions:
   1. <step>
   2. <step>

   ## Test Run Commands
   ```bash
   # Run all tests
   <command from quality-standards.md>

   # Run with coverage
   <command>

   # Run only this feature's tests
   <command with filter>
   ```

   ## Definition of Done (Testing)
   - [ ] All unit tests pass
   - [ ] All integration tests pass
   - [ ] All E2E scenarios pass
   - [ ] Coverage meets target from quality-standards.md
   - [ ] No regressions (full test suite passes)
   - [ ] Manual testing steps verified by human ✅
   ```

   > **@testing agent** must load this document before writing any tests for this feature. Follow the test suites table, coverage targets, and run commands exactly.

10. **Output a brief summary**:
   - Tech stack chosen and why
   - Key architectural decisions
   - Documents created: `plan.md`, `reference-architecture.md`, `quality-standards.md`, `testing-plan.md`
   - Feature folder: `.specify/specs/###-feature-name/`
   - Suggested next step: `/acli.beads.tasks`
