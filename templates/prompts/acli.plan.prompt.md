---
description: Create a technical implementation plan — architecture, tech stack, file structure, and supporting documents. Delegates to spec-kit methodology.
argument-hint: Optional - specify your preferred tech stack or architecture constraints
---

<!-- Methodology: spec-kit Spec-Driven Development (https://github.com/github/spec-kit) -->

## User Input

```text
$ARGUMENTS
```

Use the user input to refine or constrain the technical approach.

## Delegation

> Execute `/speckit.plan $ARGUMENTS`

Apply the **conventions** below to the output. Then proceed to the **Value-Add Documents** section to generate the additional documents that spec-kit does not produce.

## Value-Add Documents

After the plan is created by delegation, generate these additional documents:

### Reference Architecture

Write to `.specify/memory/reference-architecture.md` (or extend if it exists). This is the canonical architecture reference for ALL agents and future features:
- Architecture style and rationale
- System context (C4-style)
- Component map by layer
- Data flow description
- Integration points (system, protocol, auth, direction)
- Architecture Decision Records (ADRs)
- Non-functional architecture (scalability, availability, performance, security, observability)

### Quality Standards

Write to `.specify/memory/quality-standards.md`. Derive from the actual tech stack — generic checklists have no value:
- Linting and formatting tools with commands
- Code style conventions for the chosen language
- Testing framework, coverage targets, run commands
- Framework-specific rules (do/don't for each major framework)
- Error handling patterns
- Security baseline (input validation, auth, secrets, dependency audit)
- Performance targets
- Pre-commit gate (linter, tests, type check, security scan commands)

### Testing Plan

Write to `.specify/specs/{feature}/testing-plan.md`. Derive from spec user stories and quality standards:
- Coverage targets (unit, integration, E2E)
- Test suites: tables mapping test files to source files
- User story coverage matrix
- Test data requirements
- Manual testing steps for human verification
- Test run commands from quality standards

## Conventions

- Use formal, precise language. No emojis.
- Architecture decisions must include rationale and rejected alternatives.
- Quality standards must reference specific tools and commands, not generic advice.

## Beads Integration

If `bd` CLI is available, record this phase: `bd create "plan: <feature-name>"`.

## Handoff

Output a brief summary:
- Tech stack chosen and rationale
- Key architectural decisions
- Documents created: plan.md, reference-architecture.md, quality-standards.md, testing-plan.md
- Suggested next step: `/acli.tasks`
