# Speckit Onboard Skill

## Purpose

This skill provides guidance for the `/acli.onboard` command — reverse-engineering an existing project into the three foundational BEADS+ documents that govern all future development.

## When to Use

Use this skill when:
- Bringing an existing project under the BEADS+ workflow for the first time
- A project has no `.specify/memory/` documents yet
- The team wants to formalise undocumented conventions
- After a major tech stack migration that makes the existing documents stale

## Documents Produced

| File | Purpose |
|------|---------|
| `.specify/memory/constitution.md` | Project principles, tech constraints, workflow rules |
| `.specify/memory/reference-architecture.md` | Canonical architecture all agents must follow |
| `.specify/memory/quality-standards.md` | Language/framework-specific quality rules for @quality agent |

## Exploration Strategy

### What to Read First
1. **Dependency manifest** (`package.json`, `pyproject.toml`, `go.mod`, `Gemfile`, `Cargo.toml`, `pom.xml`) — tech stack, scripts, version constraints
2. **README** — stated purpose, setup, architecture notes
3. **CI configuration** (`.github/workflows/`, `.gitlab-ci.yml`, `Jenkinsfile`) — enforced quality gates
4. **Linting/formatting config** (`.eslintrc*`, `tsconfig.json`, `.prettierrc`, `pylintrc`, `.rubocop.yml`) — code standards
5. **Test configuration** (`jest.config*`, `pytest.ini`, `vitest.config*`) — coverage thresholds, test structure
6. **Source tree** (top-level dirs + 2–3 representative files per layer) — patterns, naming, error handling
7. **Test examples** — framework usage, naming conventions, what's being tested

### What to Infer
- Architecture style from folder structure and code organisation
- ADRs from patterns consistently applied across the codebase
- Tech debt from inconsistencies, TODO comments, anti-patterns
- Team conventions from naming, commit messages, PR templates

## Constitution Writing Rules

- **Principles**: extract from evidence — do not invent principles not demonstrated by the code
- **Tech constraints**: be specific — include versions found in config files
- **Open questions**: list anything ambiguous — the team must resolve these, not the agent

## Reference Architecture Writing Rules

- **Component map**: every significant directory should map to a component
- **ADRs**: record each significant architectural decision observed, with evidence
- **Do not prescribe**: describe what IS, not what SHOULD BE (that is the team's job)
- **Flag debt**: list observed technical debt without editorial judgement

## Quality Standards Writing Rules

- **Only extract** rules that are actually configured in the project — do not invent ideal standards
- **Mark gaps**: if a standard is absent (no coverage threshold, no linter), say "not yet configured" and recommend it
- **Be specific**: include actual commands from `scripts`, actual threshold values from config files
- **@quality integration**: the quality-standards.md must end with explicit `@quality Agent Instructions` so the quality agent knows to load it

## Integration With Agent Workflow

After onboarding, every agent in the framework automatically:
1. Loads `.specify/memory/constitution.md` before starting any task
2. Loads `.specify/memory/reference-architecture.md` before making any design or implementation decision
3. Flags any proposed change that conflicts with either document before proceeding

The `@quality` agent additionally:
1. Loads `.specify/memory/quality-standards.md` at the start of every review
2. Enforces every rule listed — no exceptions without explicit team override documented in the file

## Update vs Create

If `.specify/memory/` documents already exist:
- **Read them first**
- **Preserve** all existing decisions — do not remove ADRs, principles, or rules
- **Add** new information from the current codebase exploration
- **Update** timestamps and note what changed
- **Flag** any conflicts between existing documents and current codebase reality
