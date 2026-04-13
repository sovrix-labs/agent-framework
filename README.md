# Agent Framework

[![npm version](https://img.shields.io/npm/v/agent-framework-cli.svg?style=flat-square)](https://www.npmjs.com/package/agent-framework-cli)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg?style=flat-square)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg?style=flat-square)](https://www.typescriptlang.org/)
[![VS Code](https://img.shields.io/badge/VS%20Code-Compatible-007ACC.svg?style=flat-square&logo=visual-studio-code)](https://code.visualstudio.com/)
[![GitHub Copilot](https://img.shields.io/badge/GitHub%20Copilot-Ready-000000.svg?style=flat-square&logo=github)](https://github.com/features/copilot)

**Multi-agent orchestration framework for GitHub Copilot** — specification-driven development lifecycle with automated quality gates, persistent architectural memory, and human-in-the-loop governance.

> Agent Framework transforms GitHub Copilot from a standalone code assistant into a governed engineering workflow — enforcing specifications, architecture conformance, and quality standards across every feature from inception to delivery.

---

## Quick Start

```bash
npm install -g agent-framework-cli    # Install globally
acli setup                             # Verify and install dependencies
acli init                              # Initialize in your project
```

Open GitHub Copilot Chat and run your first lifecycle:

```
/acli.run Build a user authentication system with OAuth support
```

The orchestrator coordinates all agents through specification, planning, implementation, review, and verification — with human approval gates at critical decision points.

---

## The Problem

AI coding assistants generate code fast but without process discipline. In team environments, this leads to:

- **No specification rigor** — features built from vague prompts instead of structured requirements
- **Architecture drift** — each session makes decisions in isolation, diverging from established patterns
- **Missing quality enforcement** — tests skipped, security overlooked, accessibility ignored
- **Context loss** — decisions and rationale disappear between conversations
- **No governance** — AI-generated code ships without structured review or approval

## The Solution

Agent Framework addresses these gaps by wrapping GitHub Copilot in a **managed development lifecycle**:

| Challenge | How It's Solved |
|-----------|----------------|
| Unstructured requirements | Features begin as **technology-agnostic specifications** with acceptance criteria and priority rankings |
| Architecture drift | A **project constitution** and **reference architecture** are loaded before every agent action |
| No quality enforcement | **Security, accessibility, and performance checklists** are generated and validated before implementation |
| Context loss | **Persistent memory** via beads — decisions, architecture, and task state survive across sessions |
| No governance | **Three human gates** — mandatory approval before implementation, after analysis, and before merge |

---

## Agents

5 specialized agents collaborate through structured handoffs:

| Agent | Responsibility | Capabilities |
|-------|---------------|--------------|
| `orchestrator` | Lifecycle governance | Project state detection, phase routing, gate enforcement, parallel task coordination |
| `architect` | Specification & design | Requirements elicitation, tech-agnostic specs, architecture plans, ADRs, ambiguity resolution |
| `security` | Security assurance | OWASP checklists, authentication/data flow review, threat modeling, vulnerability analysis |
| `development` | Implementation | TDD, code generation, refactoring, plan-conformant implementation, handover management |
| `qa` | Quality & verification | Code review, test generation, coverage analysis, standards enforcement, acceptance validation |

Each agent loads the project constitution, reference architecture, and quality standards before acting — ensuring consistent, architecture-aware decisions regardless of which model or session is active.

---

## Commands

### Core workflow — daily usage

| Command | Purpose |
|---------|---------|
| `/acli.run <feature>` | Execute the full lifecycle: specify → plan → implement → verify → ship |
| `/acli.implement` | Begin implementation with iterative review loop |
| `/acli.onboard` | Onboard an existing codebase (brownfield adoption) |

### Specification & planning

| Command | Purpose |
|---------|---------|
| `/acli.constitution` | Define project principles, constraints, and architectural boundaries |
| `/acli.specify <feature>` | Author a technology-agnostic feature specification with acceptance criteria |
| `/acli.clarify` | Resolve specification ambiguities through targeted questions |
| `/acli.plan` | Generate technical implementation plan with architecture decision records |
| `/acli.checklist` | Produce security, accessibility, and performance quality gates |
| `/acli.tasks` | Create prioritized, dependency-ordered task breakdown |
| `/acli.analyze` | Validate cross-artifact consistency (spec ↔ plan ↔ tasks) |

### Review & delivery

| Command | Purpose |
|---------|---------|
| `/acli.critique` | Perform spec-aligned code review with severity ratings |
| `/acli.respond` | Address review feedback systematically |
| `/acli.debug <issue>` | Structured root-cause analysis |
| `/acli.finish` | Branch cleanup, verification, and merge readiness |

### Scaffolding

| Command | Purpose |
|---------|---------|
| `/acli.create.agent` | Scaffold a custom agent with YAML frontmatter configuration |
| `/acli.create.skill` | Scaffold a reusable skill definition |

---

## Development Lifecycle

Running `/acli.run` orchestrates your feature through a 10-phase governed lifecycle:

```
  Specify ──▶ Clarify ──▶ Plan ──▶ Checklist ──▶ Tasks
                                                    │
                                              HUMAN GATE
                                                    │
  Finish ◀── Verify ◀── Implement ◀── Review ◀── Analyze
                │                                   │
           HUMAN GATE                          HUMAN GATE
```

### Phase breakdown

| Phase | Activity | Output |
|-------|----------|--------|
| 1. Specify | Constitution + feature specification | `constitution.md`, `spec.md` |
| 2. Clarify | Ambiguity resolution | Refined specification |
| 3. Plan | Architecture + implementation planning | `plan.md`, ADRs |
| 4. Checklist | Quality gate generation | Security, a11y, performance checklists |
| 5. Tasks | Task decomposition | `tasks.md` (P0–P3, dependency-ordered) |
| | **🚦 Human Gate** | *Approve task breakdown before implementation* |
| 6. Analyze | Cross-artifact validation | Consistency report |
| | **🚦 Human Gate** | *Confirm all artifacts are aligned* |
| 7. Review | Cross-model plan review | Review findings |
| 8. Implement | Code + review + test loop | Working implementation |
| 9. Verify | Full test suite + acceptance criteria | Verification report |
| 10. Finish | Branch prep + merge readiness | Ready for merge |
| | **🚦 Human Gate** | *Final approval before merge* |

### Iterative implementation (Phase 8)

Implementation follows a tight feedback loop rather than a single-pass approach:

```
  ┌─────────────────────────────────────────────┐
  │                                             │
  ▼                                             │
Development                 Passes?             │
writes code + tests ──▶ QA review + test ──▶ ✅ DONE
                             │
                             │ ❌ Issues found
                             ▼
                      Feedback via /acli.respond
                             │
                             └──── back to Development
                              (max 5 iterations, then escalates)
```

1. **Task selection** — orchestrator picks the next task by priority (P0 first) and dependency order
2. **Implementation** — `@development` writes code and tests per the plan, creates handover document
3. **Review** — `@qa` validates against spec acceptance criteria, checks architecture conformance
4. **Test** — `@qa` executes the test suite and reports results
5. **Decision** — if review passes and tests are green, task completes. Otherwise, feedback loops back to `@development`

After 5 failed iterations, the orchestrator escalates to the developer for manual intervention. Up to 3 independent tasks (non-overlapping files) execute in parallel.

---

## Brownfield Adoption

For existing codebases, `/acli.onboard` performs a 4-phase analysis:

1. **Scan** — auto-discovers tech stack, architecture patterns, and project conventions
2. **Bootstrap** — generates tailored constitution, reference architecture, and quality standards
3. **Validate** — cross-references generated documents against actual code
4. **Summary** — produces adoption report with recommended next steps

---

## Workspace Structure

Agent Framework creates a governed workspace alongside your source code:

```
.github/
  agents/          -- agent definitions (.agent.md)
  skills/          -- reusable skills (.skill.md)
  prompts/         -- workflow commands (.prompt.md)
.specify/
  memory/          -- constitution, reference architecture, quality standards
  specs/           -- feature specifications, plans, checklists, task lists
.beads/            -- persistent task state and decision history
```

---

## CLI Reference

| Command | Description |
|---------|-------------|
| `acli setup [--check]` | Verify and install all dependencies (spec-kit, beads, plugins) |
| `acli init [--force]` | Initialize the framework in a project directory |
| `acli install <agent>` | Install a specific agent |
| `acli remove <agent>` | Remove an installed agent |
| `acli list agents\|skills` | List available agents or skills |
| `acli update [agent]` | Update agents, prompts, and skills to latest version |
| `acli config` | View or modify framework configuration |

---

## Requirements

| Dependency | Version | Purpose |
|------------|---------|---------|
| Node.js | >= 18.0.0 | Runtime |
| VS Code | Latest | IDE with GitHub Copilot Chat |
| Python | >= 3.8 | spec-kit specification engine |

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for development setup and contribution guidelines.

## License

MIT
