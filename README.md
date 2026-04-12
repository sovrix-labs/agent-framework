# Agent Framework

[![npm version](https://img.shields.io/npm/v/agent-framework-cli.svg?style=flat-square)](https://www.npmjs.com/package/agent-framework-cli)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg?style=flat-square)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg?style=flat-square)](https://www.typescriptlang.org/)
[![VS Code](https://img.shields.io/badge/VS%20Code-Compatible-007ACC.svg?style=flat-square&logo=visual-studio-code)](https://code.visualstudio.com/)
[![GitHub Copilot](https://img.shields.io/badge/GitHub%20Copilot-Ready-000000.svg?style=flat-square&logo=github)](https://github.com/features/copilot)

A multi-agent development framework for VS Code that turns GitHub Copilot into a coordinated engineering team. Define specifications, plan architecture, implement features, and enforce quality -- all through structured agent workflows with human-in-the-loop control.

## Why Agent Framework?

AI coding assistants are powerful but chaotic. Without structure, they produce inconsistent code, skip tests, ignore architecture decisions, and lose context between sessions.

Agent Framework solves this by giving your AI a **development process**:

- **Specifications before code** -- features start as technology-agnostic specs with acceptance criteria, not vague prompts
- **Architecture-aware implementation** -- a project constitution and reference architecture guide every decision
- **Quality gates at every phase** -- security, accessibility, and performance checklists are generated before coding begins
- **Persistent memory across sessions** -- decisions, architecture, and task state survive between conversations
- **Human gates where it matters** -- mandatory approval points before implementation starts and after completion

## What You Get

**5 specialized agents** that collaborate through structured handoffs:

| Agent | What It Does |
|-------|-------------|
| `orchestrator` | Runs the full development lifecycle -- detects project state and routes work automatically |
| `architect` | Gathers requirements, writes specs, resolves ambiguities, designs architecture, produces technical plans |
| `security` | Generates security checklists, runs OWASP analysis, reviews auth and data flows |
| `development` | Implements tasks following architecture patterns, handles TDD, manages handovers |
| `qa` | Reviews code quality, generates tests, analyzes coverage, enforces project standards |

**14 workflow commands** you can run individually or let the orchestrator chain automatically:

```
/acli.run <feature>         -- full lifecycle: spec -> plan -> implement -> test -> ship
/acli.constitution          -- define project principles and constraints
/acli.specify <feature>     -- write a technology-agnostic feature spec
/acli.clarify               -- resolve ambiguities with targeted questions
/acli.plan                  -- create technical plan with ADRs
/acli.checklist             -- generate security, accessibility, and performance checklists
/acli.tasks                 -- produce dependency-ordered task list
/acli.analyze               -- validate consistency across all artifacts
/acli.implement             -- implement with iterative review loop
/acli.debug <bug>           -- structured root-cause analysis
/acli.critique              -- spec-aligned code review
/acli.respond               -- address review feedback systematically
/acli.finish                -- branch prep, cleanup, and merge readiness
/acli.onboard               -- adopt the framework in an existing codebase
```

## Quick Start

```bash
# Install
npm install -g agent-framework-cli

# Set up dependencies
acli setup

# Initialize in your project
acli init
```

### Run the full lifecycle

Open GitHub Copilot Chat:

```
/acli.run Build a user authentication system with OAuth support
```

The orchestrator automatically coordinates all 5 agents through 10 phases:

1. **Specify** -- constitution and feature specification
2. **Clarify** -- targeted questions to resolve ambiguities
3. **Plan** -- architecture, ADRs, and implementation plan
4. **Checklist** -- security, accessibility, performance gates
5. **Tasks** -- prioritized, dependency-ordered task list
6. **Analyze** -- cross-artifact consistency validation
7. **Review** -- cross-model plan review
8. **Implement** -- code, review, test loop (max 5 iterations per task)
9. **Verify** -- full test suite and acceptance criteria
10. **Finish** -- branch completion and merge prep

Human gates at phases 5, 6, and 10 keep you in control of what gets built.

### The iterative development loop

Phase 8 is where the real work happens. For each task, three agents cycle until quality and tests pass:

1. **Task selection** -- the orchestrator picks the next task from `tasks.md` by priority (P0 first) and dependency order
2. **Implementation** -- `@development` writes code and tests following the plan, then updates the handover document
3. **Code review** -- `@qa` validates against spec acceptance criteria, checks architecture conformance, flags issues with severity ratings
4. **Test execution** -- `@qa` runs the relevant test suite and reports pass/fail
5. **Decision** -- if critique is approved and tests pass, the task is done. Otherwise, feedback goes back to `@development` via `/acli.respond`. After 5 failed iterations, the orchestrator escalates to you

Up to 3 independent tasks (different files, no shared dependencies) can run in parallel.

After all tasks pass, Phase 9 runs the full test suite and Phase 10 runs story-level integration tests to verify end-to-end user flows.

### Onboard an existing project

Already have a codebase? Run:

```
/acli.onboard
```

This scans your project, discovers the tech stack, infers architecture patterns, and generates a tailored constitution and quality standards so agents understand your project from day one.

## How It Works

Agent Framework creates a structured workspace alongside your code:

```
.github/
  agents/          -- agent definitions (.agent.md)
  skills/          -- reusable skills (.skill.md)
  prompts/         -- workflow commands (.prompt.md)
.specify/
  memory/          -- constitution, architecture, quality standards
  specs/           -- feature specs, plans, checklists, tasks
.beads/            -- persistent task tracking across sessions
```

Every agent loads the project constitution, reference architecture, and quality standards before acting. This ensures consistent, architecture-aware decisions regardless of which model or session you're in.

## CLI Commands

```bash
acli setup [--check]        Check and install all dependencies
acli init [--force]         Initialize the framework in a project
acli install <agent>        Install a specific agent
acli remove <agent>         Remove an installed agent
acli list agents|skills     List available agents or skills
acli update [agent]         Update agents, prompts, and skills
acli config                 View or edit configuration
```

## Creating Custom Agents

```
/acli.create.agent
```

Build project-specific agents with custom instructions, handoffs, and tool access -- configured via YAML frontmatter for VS Code Copilot.

## Requirements

- Node.js >= 18.0.0
- VS Code with GitHub Copilot Chat
- Python 3.8+ (for spec-kit)

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for development setup and guidelines.

## License

MIT
