---
description: Onboard an existing project into the BEADS+ workflow — automatically reverse-engineer the constitution, reference architecture, and quality standards from the codebase.
argument-hint: Optional - path to project root, or leave blank to use the current workspace
---

## User Input

```text
$ARGUMENTS
```

If provided, use the argument as the project root path. Otherwise operate on the current workspace.

## Your Task

You are performing a **project onboarding** — analysing an existing codebase and producing three foundational documents that all agents will follow for every future piece of work on this project:

1. `.specify/memory/constitution.md` — project principles, constraints, and standards
2. `.specify/memory/reference-architecture.md` — canonical architecture reference
3. `.specify/memory/quality-standards.md` — language/framework-specific quality rules

> **If any of these files already exist**, read them first and update rather than overwrite, preserving any decisions the team has already recorded.

## Execution Steps

### Step 1 — Explore Project Structure

Systematically read the project to understand what it is:

1. **Root files**: `package.json` / `pyproject.toml` / `go.mod` / `Gemfile` / `pom.xml` / `Cargo.toml` — identify language, framework, key dependencies, scripts
2. **README / docs**: Understand the project's stated purpose, goals, and setup
3. **Folder structure**: Map top-level directories and infer architectural layers (e.g., `src/`, `app/`, `lib/`, `services/`, `api/`, `frontend/`, `backend/`)
4. **Config files**: `.eslintrc`, `tsconfig.json`, `jest.config`, `.prettierrc`, `Dockerfile`, `docker-compose.yml`, CI configs (`.github/workflows/`, `.gitlab-ci.yml`) — infer quality standards already in use
5. **Source code sample**: Read a representative sample of files across different layers to understand patterns, naming conventions, error handling, and testing approach
6. **Test files**: Find test examples — identify framework, coverage tooling, test patterns
7. **CI/CD pipeline**: Understand what gates are enforced on every commit/PR

### Step 2 — Identify Tech Stack

From the exploration, extract:
- Primary language(s) and versions
- Web / application framework(s)
- Database / storage technology
- Key libraries (auth, validation, ORM, HTTP client, etc.)
- Build and bundling tools
- Testing framework and coverage tool
- Deployment target (serverless / container / VM / static / etc.)

### Step 3 — Create `.specify/memory/constitution.md`

```markdown
# Project Constitution

**Project**: <name from package.json / README>
**Onboarded**: YYYY-MM-DD
**Source**: Reverse-engineered from existing codebase

## What This Project Is
<1–3 sentence description of the project's purpose and users>

## Core Principles
<Extract 4–8 principles that the codebase already demonstrates — or that the team clearly intends.
Examples: "API-first", "Mobile-first", "12-factor app", "Offline-capable", "Monorepo">

1. **<Principle>**: <what it means for this project>

## Technology Constraints
- **Language**: <language + version pinned in config>
- **Framework**: <framework + version>
- **Database**: <technology>
- **Infrastructure**: <cloud provider / runtime / container approach>
- **Must keep**: <anything that must not change — legacy systems, licensing, etc.>
- **Must avoid**: <technologies explicitly avoided — inferred from config/docs>

## Quality Standards
- **Minimum test coverage**: <from coverage config, or "not yet configured">
- **Linting**: <tool + config path>
- **Code style**: <formatter + config>
- **Performance targets**: <from README / config if any>
- **Security baseline**: <OWASP? dependency scanning? secrets detection?>

## Development Workflow
- **Branching**: <main + feature branches / gitflow / trunk-based — inferred from branch names / PR templates>
- **CI/CD**: <what pipeline exists>
- **Code review**: <PR required? auto-merge? — from GitHub/GitLab config>
- **Release process**: <inferred from tags / CHANGELOG / release config>

## Specification Workflow
All new features on this project follow the BEADS+ workflow:
`/acli.beads.constitution` → `/acli.beads.specify` → `/acli.beads.plan` → `/acli.beads.tasks` → `/acli.beads.analyze` → `/acli.beads.implement`

## Open Questions
<List anything that was ambiguous or missing during onboarding — to be resolved with the team>
```

### Step 4 — Create `.specify/memory/reference-architecture.md`

```markdown
# Reference Architecture

**Project**: <name>
**Onboarded**: YYYY-MM-DD
**Updated**: YYYY-MM-DD

## Architecture Style
<Layered MVC / Clean Architecture / Hexagonal / Microservices / Serverless / Monolith — with rationale based on code evidence>

## System Context
<Who uses the system, what external systems it integrates with, how it's deployed>

## Component Map
| Layer | Component | Responsibility | Key Files / Dirs |
|-------|-----------|----------------|-----------------|
| <layer> | <name> | <what it does> | <paths> |

## Data Flow
<Describe the primary paths: HTTP request → handler → service → DB → response;
or event → queue → processor → storage, etc.>

## Directory Structure
```
<project root>/
├── <dir>/     — <purpose>
├── <dir>/     — <purpose>
...
```

## Integration Points
| System | Protocol | Auth Method | Direction |
|--------|----------|-------------|-----------|
| <name> | <REST/gRPC/event> | <API key/OAuth/JWT> | inbound/outbound |

## Key Patterns In Use
<List the patterns you observe: Repository, Service Layer, Factory, Observer, CQRS, etc. — with file examples>

## Architecture Decision Records (ADRs)
| # | Decision | Rationale | Evidence in Code |
|---|----------|-----------|-----------------|
| ADR-001 | <decision already made> | <why — inferred from code> | <file path> |

## Non-Functional Architecture
- **Scalability**: <what the current design allows>
- **Availability**: <any failover / retry observed>
- **Performance**: <caching, indexing, async patterns observed>
- **Security**: <auth model, HTTPS, secrets management observed>
- **Observability**: <logging library, monitoring, tracing in use>

## Known Technical Debt
<List architectural issues or anti-patterns observed — without judgement, just facts>

## Constraints
<Hard constraints that all future changes must respect>
```

### Step 5 — Create `.specify/memory/quality-standards.md`

Derive every rule from what is actually configured in the project. Do not invent standards not already present — flag as "not yet configured" if absent.

```markdown
# Quality Standards

**Project**: <name>
**Stack**: <language> / <framework>
**Onboarded**: YYYY-MM-DD

## Linting & Formatting
- Tool: <eslint/pylint/rubocop/golangci-lint/etc. — from config file>
- Config: <path to config file>
- Run: `<lint command from package.json scripts or CI>`
- Auto-fix: `<fix command>`
- Key rules enforced: <list the most important rules from the config>

## Code Style
- Naming conventions: <camelCase/snake_case/PascalCase — evidence in codebase>
- File naming: <convention>
- Max file length: <from config or observed norm>
- Max function length: <from config or observed norm>
- Max cyclomatic complexity: <from config or default>

## Testing Standards
- Framework: <jest/pytest/rspec/vitest/etc. — from config>
- Config file: <path>
- Coverage tool: <istanbul/coverage.py/etc.>
- Minimum coverage: <from config — threshold setting>
- Test file location: <__tests__/ / *.spec.ts / test/ — observed pattern>
- Test naming: <describe/it / def test_ / etc. — observed pattern>
- Required levels: <unit / integration / e2e — inferred from test dirs>
- Run all tests: `<command>`
- Run with coverage: `<command>`

## Framework-Specific Rules
### <Framework / Library>
- ✅ Do: <rule observed or standard for this framework>
- ❌ Don't: <anti-pattern observed in codebase or known for this framework>

## Error Handling
- Pattern in use: <try/catch / Result / error boundaries — observed>
- Logging library: <name and how it's used>
- Required: never swallow errors silently
- Required: user-facing messages must not expose stack traces or internal paths

## Security Baseline
- Input validation: <library/approach in use>
- Authentication: <library/pattern in use — JWT, sessions, OAuth>
- Secrets management: <env vars, .env, vault, parameter store — what's used>
- Dependency audit: `<npm audit / pip-audit / etc.>`
- Known security tooling: <snyk, dependabot, etc. — from CI config>

## Performance Targets
<From README / config / monitoring setup — or mark as "not yet defined">
- API response time: <target>
- DB query time: <target>
- Frontend TTI: <target>
- Bundle size: <target>

## Pre-Commit / CI Gate
All of the following must pass before code is merged (from CI config):
- [ ] `<lint command>`
- [ ] `<test command>`
- [ ] `<type-check command>` (if applicable)
- [ ] `<build command>`
- [ ] `<security scan command>` (if configured)

## @quality Agent Instructions
> When performing a code review on this project, load this document first.
> Every rule listed above is mandatory. Flag any violation — do not skip rules because they seem minor.
> If a rule is marked "not yet configured", recommend the team add it rather than ignoring it.
```

### Step 6 — Output Summary

Present a clear summary to the user:

```
✅ Project onboarded successfully!

## Documents Created
- `.specify/memory/constitution.md`    — project principles + constraints
- `.specify/memory/reference-architecture.md` — canonical architecture reference
- `.specify/memory/quality-standards.md` — language/framework quality rules

## Stack Detected
- Language:   <language + version>
- Framework:  <framework>
- Testing:    <test framework>
- Linting:    <lint tool>

## Key Findings
- Architecture style: <style>
- <N> components identified
- <N> ADRs recorded from existing decisions
- <N> quality rules extracted from config

## Open Questions
<Any ambiguities that need team input — e.g., "No test coverage threshold found in config — recommend setting one">

## Next Steps
All agents will now automatically load and follow these documents.
To start a new feature: `/acli.beads.specify <describe the feature>`
```
