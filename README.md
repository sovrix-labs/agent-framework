# Agent Framework

[![npm version](https://img.shields.io/npm/v/agent-framework-cli.svg?style=flat-square)](https://www.npmjs.com/package/agent-framework-cli)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg?style=flat-square)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg?style=flat-square)](https://www.typescriptlang.org/)
[![VS Code](https://img.shields.io/badge/VS%20Code-Compatible-007ACC.svg?style=flat-square&logo=visual-studio-code)](https://code.visualstudio.com/)
[![GitHub Copilot](https://img.shields.io/badge/GitHub%20Copilot-Ready-000000.svg?style=flat-square&logo=github)](https://github.com/features/copilot)

Multi-agent orchestration framework for GitHub Copilot — specification-driven development lifecycle with automated quality gates and human-in-the-loop governance.

---

## 🚀 Get Started in 3 Steps

```bash
npm install -g agent-framework-cli   # 1. Install
acli setup                            # 2. Set up dependencies
acli init                             # 3. Initialize in your project
```

Then open GitHub Copilot Chat and run:

```
/acli.run Build a user authentication system with OAuth support
```

That's it. The orchestrator takes over — coordinating agents through specs, planning, implementation, review, and testing.

---

## 💡 Why Agent Framework?

AI coding assistants are powerful but chaotic. Without structure, they produce inconsistent code, skip tests, ignore architecture decisions, and lose context between sessions.

Agent Framework fixes this by giving your AI a **development process**:

| Problem | How Agent Framework Solves It |
|---------|-------------------------------|
| Vague prompts lead to inconsistent output | Features start as **technology-agnostic specs** with acceptance criteria |
| AI ignores existing architecture | A **project constitution** and **reference architecture** guide every decision |
| No quality enforcement | **Security, accessibility, and performance checklists** are generated before coding begins |
| Context lost between sessions | **Persistent memory** — decisions, architecture, and task state survive across conversations |
| AI runs unsupervised | **Human gates** — mandatory approval points before implementation and after completion |

---

## 🤖 Agents

5 specialized agents collaborate through structured handoffs:

| Agent | Role | Key Capabilities |
|-------|------|-------------------|
| `orchestrator` | 🎯 Lifecycle manager | Detects project state, routes work, enforces phase gates |
| `architect` | 📐 Specs & design | Requirements gathering, tech-agnostic specs, architecture plans, ADRs |
| `security` | 🔒 Security analysis | OWASP checklists, auth/data flow review, threat modeling |
| `development` | ⚙️ Implementation | TDD, code generation, refactoring, handover management |
| `qa` | ✅ Quality & testing | Code review, test generation, coverage analysis, standards enforcement |

---

## 📋 Commands

### Essential commands — what you'll use daily

| Command | What It Does |
|---------|--------------|
| `/acli.run <feature>` | Run the full lifecycle: spec → plan → implement → test → ship |
| `/acli.implement` | Implement tasks with iterative review loop |
| `/acli.onboard` | Adopt the framework in an existing codebase |

### Specification & planning

| Command | What It Does |
|---------|--------------|
| `/acli.constitution` | Define project principles, constraints, and boundaries |
| `/acli.specify <feature>` | Write a technology-agnostic feature specification |
| `/acli.clarify` | Resolve ambiguities with targeted questions |
| `/acli.plan` | Create technical plan with architecture decision records |
| `/acli.checklist` | Generate security, accessibility, and performance gates |
| `/acli.tasks` | Produce a prioritized, dependency-ordered task list |
| `/acli.analyze` | Validate consistency across all artifacts |

### Review & delivery

| Command | What It Does |
|---------|--------------|
| `/acli.critique` | Spec-aligned code review |
| `/acli.respond` | Address review feedback systematically |
| `/acli.debug <bug>` | Structured root-cause analysis |
| `/acli.finish` | Branch prep, cleanup, and merge readiness |

### Scaffolding

| Command | What It Does |
|---------|--------------|
| `/acli.create.agent` | Create a custom agent with YAML frontmatter |
| `/acli.create.skill` | Create a reusable skill definition |

---

## 🔄 How the Lifecycle Works

When you run `/acli.run`, the orchestrator takes your feature through 10 phases:

```
  📝 Specify ──▶ ❓ Clarify ──▶ 📐 Plan ──▶ ✅ Checklist ──▶ 📋 Tasks
                                                                   │
                                                          🚦 HUMAN GATE
                                                                   │
  🏁 Finish ◀── 🧪 Verify ◀── ⚙️ Implement ◀── 🔍 Review ◀── 📊 Analyze
                     │                                             │
                🚦 HUMAN GATE                                 🚦 HUMAN GATE
```

**Three human gates** keep you in control:

| Gate | When | You Decide |
|------|------|------------|
| After **Tasks** (Phase 5) | Before any code is written | Are the tasks correct and complete? |
| After **Analyze** (Phase 6) | Before implementation | Are all artifacts consistent? |
| After **Verify** (Phase 10) | Before merge | Does everything pass? Ready to ship? |

---

## 🏗️ Onboard an Existing Project

Already have a codebase? Skip the setup — just run:

```
/acli.onboard
```

This scans your project, discovers the tech stack, infers architecture patterns, and generates a tailored constitution and quality standards so agents understand your project from day one.

---

## 📁 Workspace Structure

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

Every agent loads the project constitution, reference architecture, and quality standards before acting — ensuring consistent, architecture-aware decisions regardless of which model or session you're in.

---

## 🛠️ CLI Commands

| Command | Description |
|---------|-------------|
| `acli setup [--check]` | Check and install all dependencies |
| `acli init [--force]` | Initialize the framework in a project |
| `acli install <agent>` | Install a specific agent |
| `acli remove <agent>` | Remove an installed agent |
| `acli list agents\|skills` | List available agents or skills |
| `acli update [agent]` | Update agents, prompts, and skills |
| `acli config` | View or edit configuration |

---

## 📦 Requirements

- **Node.js** >= 18.0.0
- **VS Code** with GitHub Copilot Chat
- **Python** 3.8+ (for spec-kit)

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for development setup and guidelines.

## License

MIT
