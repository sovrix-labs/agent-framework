# Agent Framework CLI

A powerful CLI tool for building, managing, and deploying AI agents and skills for VS Code + GitHub Copilot with **BEADS+** specification-driven development workflow.

## Features

- 🤖 **7 Pre-built Agents**: Production-ready agents for every phase of development
- 💬 **BEADS+ Slash Commands**: Spec-driven `/beads.*` chat commands — no CLI required
- 🔄 **Human-in-the-Loop Iteration**: Dev → Quality → Test loop with review checkpoints
- 🛠️ **Custom Agent Builder**: Create your own specialized agents
- 📦 **Skill System**: Modular skill packages for reusable functionality
- 🔌 **VS Code + Copilot Integration**: Agents installed in `.github/agents/` for instant use
- 🧠 **Memory & Handover System**: Agents pass context and learn from mistakes

## Installation

```bash
npm install -g agent-framework-cli
```

## Quick Start

### 1. Initialize the framework

```bash
acli init
```

This creates:
- `.github/agents/` — agent directory
- `.github/skills/` — skills directory  
- `.github/prompts/` — BEADS+ slash command prompts
- `.specify/memory/` and `.specify/specs/` — workflow artifact directories

### 2. Install all agents

```bash
acli install orchestrator
```

Installs all 7 pre-built agents **and** the BEADS+ slash commands at once.

### 3. Use BEADS+ slash commands in Copilot Chat

Open GitHub Copilot Chat and use these commands in order:

```
/beads.constitution   Create project principles and tech rules
/beads.specify        Define what you want to build (user stories)
/beads.plan           Technical architecture and file structure
/beads.tasks          Executable, ordered task list
/beads.analyze        Consistency check before implementing
/beads.implement      Iterative Dev→Quality→Test with human review
```

### 4. Use agents in Copilot Chat

```
@requirements gather requirements for a user authentication system
@architecture design the system based on these requirements
@development implement the auth module
@quality review the implementation
@testing generate test cases
@security check for OWASP Top 10 vulnerabilities
@orchestrator coordinate the full workflow
```

### 5. Create custom agents or skills

Use slash commands in Copilot Chat:

```
/acli.create.agent   Scaffold a new .agent.md file interactively
/acli.create.skill   Scaffold a new .skill.md file interactively
```

## BEADS+ Workflow

**BEADS+** = Better Engineering through Adaptive Development with Specifications

Inspired by [spec-kit](https://github.com/github/spec-kit), the BEADS+ workflow uses chat slash commands for structured, specification-driven development:

```
/beads.constitution → /beads.specify → /beads.plan → /beads.tasks → /beads.analyze → /beads.implement
       ↓                    ↓                ↓              ↓               ↓                  ↓
  Principles           User stories      Architecture    Task list      Validation       Dev→QA→Test
```

### BEADS+ Slash Commands

| Command | Purpose |
|---|---|
| `/beads.constitution` | Create or update project governing principles, tech constraints, and non-negotiable rules |
| `/beads.specify` | Define what to build — user stories, acceptance criteria (technology-agnostic) |
| `/beads.plan` | Technical implementation plan — tech stack, architecture, file structure |
| `/beads.tasks` | Break the plan into ordered, executable tasks with acceptance criteria per task |
| `/beads.analyze` | Cross-artifact consistency check: spec ↔ plan ↔ tasks alignment |
| `/beads.implement` | Execute tasks with **Dev → Quality → Test** loop and human review checkpoints |
| `/acli.create.agent` | Scaffold a new custom `.agent.md` file interactively in `.github/agents/` |
| `/acli.create.skill` | Scaffold a new custom `.skill.md` file interactively in `.github/skills/` |

### `/beads.implement` — Human-in-the-Loop

For each task, the agent runs three steps then **stops for your review**:

1. **Dev** — implements the code following the plan and constitution
2. **Quality** — self-reviews for code quality, security (OWASP Top 10), and constitution compliance
3. **Test** — writes/runs tests, auto-retries on failure (max 3 attempts)
4. **⛔ Checkpoint** — presents a summary and waits for your response:

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ TASK-001 Complete — Human Review Required

📋 What was done: ...
🔍 Quality: PASS
🧪 Tests: 3 passing

Options:
  ▶  "continue"  — Accept and move to the next task
  🔄  "retry"    — Redo with your feedback
  ✏️  "adjust"   — Adjust approach for next task
  ⛔  "stop"     — Save progress and halt
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

Progress is always saved to `.specify/memory/handover.md` so you can resume with `/beads.implement` any time.

## Pre-built Agents

All agents install as `{name}.agent.md` directly in `.github/agents/` with `target: vscode` for full VS Code attribute support.

| Agent | Purpose | Skills |
|---|---|---|
| `@requirements` | BEADS+ spec gathering, user stories, constitution | `speckit-constitution`, `speckit-specify` |
| `@architecture` | System design, ADRs, component decisions | `speckit-plan` |
| `@security` | OWASP Top 10, vulnerability scanning | — |
| `@development` | Code implementation and refactoring | `speckit-implement` |
| `@testing` | Test generation and coverage | — |
| `@quality` | Code review and maintainability | `speckit-checklist`, `speckit-analyze` |
| `@orchestrator` | Multi-agent coordination, BEADS+ workflow | `speckit-tasks`, `speckit-analyze`, `speckit-checklist` |

## Agent Memory & Handover System

Agents maintain continuity across sessions using a file-based memory system under `.specify/memory/`:

- **Handover documents** — structured context passed between agents (files changed, decisions, issues, action items)
- **Learning system** — agents save quality issues and test failures and reload relevant learnings before new tasks
- Stored as both JSON (machine-readable) and Markdown (human-readable)

## CLI Reference

```bash
acli init                    # Initialize framework in current project
acli install <name>          # Install a pre-built agent
acli install orchestrator    # Install all 7 agents + BEADS+ prompts + skills
acli list agents             # List installed agents
acli list skills             # List installed skills
acli remove <name>           # Remove an agent
acli update [name]           # Update agents to latest version
acli config                  # Configure framework settings
```

## Project Structure After Init

```
your-project/
├── .github/
│   ├── agents/
│   │   ├── orchestrator.agent.md
│   │   ├── requirements.agent.md
│   │   ├── architecture.agent.md
│   │   ├── security.agent.md
│   │   ├── development.agent.md
│   │   ├── testing.agent.md
│   │   └── quality.agent.md
│   ├── skills/
│   │   ├── speckit-constitution.skill.md
│   │   ├── speckit-specify.skill.md
│   │   ├── speckit-plan.skill.md
│   │   ├── speckit-tasks.skill.md
│   │   ├── speckit-analyze.skill.md
│   │   ├── speckit-checklist.skill.md
│   │   └── speckit-implement.skill.md
│   └── prompts/
│       ├── beads.constitution.prompt.md
│       ├── beads.specify.prompt.md
│       ├── beads.plan.prompt.md
│       ├── beads.tasks.prompt.md
│       ├── beads.analyze.prompt.md
│       └── beads.implement.prompt.md
└── .specify/
    ├── memory/
    │   ├── constitution.md
    │   └── handover.md
    └── specs/
        ├── spec.md
        ├── plan.md
        └── tasks.md
```

## VS Code Agent Compatibility

All agents use `target: vscode` in their YAML frontmatter, which enables the full VS Code attribute set:
- `agents` — agents the orchestrator can invoke
- `argument-hint` — usage hint shown in Copilot Chat
- `handoffs` — agents to hand off to after completing
- `user-invocable: true` — invocable directly by the user

For GitHub Copilot Extensions, set `platform: 'github-copilot'` in your agent config to use `infer`, `mcp-servers`, `tools`, `github` attributes instead.

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for development guidelines.

## License

MIT — see [LICENSE](./LICENSE)
