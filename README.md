# Agent Framework CLI

[![npm version](https://img.shields.io/npm/v/agent-framework-cli.svg?style=flat-square)](https://www.npmjs.com/package/agent-framework-cli)
[![npm downloads](https://img.shields.io/npm/dm/agent-framework-cli.svg?style=flat-square)](https://www.npmjs.com/package/agent-framework-cli)
[![npm downloads total](https://img.shields.io/npm/dt/agent-framework-cli.svg?style=flat-square)](https://www.npmjs.com/package/agent-framework-cli)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg?style=flat-square)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg?style=flat-square)](https://www.typescriptlang.org/)
[![VS Code](https://img.shields.io/badge/VS%20Code-Compatible-007ACC.svg?style=flat-square&logo=visual-studio-code)](https://code.visualstudio.com/)
[![GitHub Copilot](https://img.shields.io/badge/GitHub%20Copilot-Ready-000000.svg?style=flat-square&logo=github)](https://github.com/features/copilot)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](CONTRIBUTING.md)
[![Changelog](https://img.shields.io/badge/changelog-v1.0.10-blue.svg?style=flat-square)](CHANGELOG.md)

A powerful CLI tool for building, managing, and deploying AI agents and skills for VS Code + GitHub Copilot with **BEADS+** specification-driven development workflow.

## Features

- 🤖 **7 Pre-built Agents**: Production-ready agents for every phase of development
- 💬 **BEADS+ Slash Commands**: Spec-driven `/acli.beads.*` chat commands — no CLI required
- 🔄 **Human-in-the-Loop Iteration**: Dev → Quality → Test loop with review checkpoints
- 🛠️ **Custom Agent Builder**: Create your own specialized agents
- 📦 **Skill System**: Modular skill packages for reusable functionality
- 🔌 **VS Code + Copilot Integration**: Agents installed in `.github/agents/` for instant use
- 🧠 **Advanced Memory System**: Intelligent learning from git history, auto-summarization, deduplication, and 13 pre-built learning templates
- 📚 **Context Continuity**: Handover documents preserve full context across agent transitions
- 🔍 **Smart Memory Pruning**: Automatic cleanup of ineffective and duplicate learnings

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
/acli.beads.constitution   Create project principles and tech rules
/acli.beads.specify        Define what you want to build (user stories)
/acli.beads.plan           Technical architecture and file structure
/acli.beads.tasks          Executable, ordered task list
/acli.beads.analyze        Consistency check before implementing
/acli.beads.implement      Iterative Dev→Quality→Test with human review
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
/acli.beads.constitution → /acli.beads.specify → /acli.beads.plan → /acli.beads.tasks → /acli.beads.analyze → /acli.beads.implement
       ↓                    ↓                ↓              ↓               ↓                  ↓
  Principles           User stories      Architecture    Task list      Validation       Dev→QA→Test
```

### BEADS+ Slash Commands

| Command | Purpose |
|---|---|
| `/acli.beads.constitution` | Create or update project governing principles, tech constraints, and non-negotiable rules |
| `/acli.beads.specify` | Define what to build — user stories, acceptance criteria (technology-agnostic) |
| `/acli.beads.plan` | Technical implementation plan — tech stack, architecture, file structure |
| `/acli.beads.tasks` | Break the plan into ordered, executable tasks with acceptance criteria per task |
| `/acli.beads.analyze` | Cross-artifact consistency check: spec ↔ plan ↔ tasks alignment |
| `/acli.beads.implement` | Execute tasks with **Dev → Quality → Test** loop and human review checkpoints |
| `/acli.create.agent` | Scaffold a new custom `.agent.md` file interactively in `.github/agents/` |
| `/acli.create.skill` | Scaffold a new custom `.skill.md` file interactively in `.github/skills/` |

### Feature-Specific Folder Organization

Each feature gets its own isolated folder with a sequential ID:

```
.specify/specs/
├── 001-user-auth/          # First feature
│   ├── spec.md
│   ├── plan.md
│   ├── tasks.md
│   └── testing-plan.md
├── 002-payment-system/     # Second feature
│   └── ...
└── 003-notifications/      # Third feature
    └── ...
```

**Benefits**:
- **Isolation** — Multiple features can be developed in parallel without conflicts
- **Git Branching** — Automatic `feature/{ID}-{slug}` branch creation on `/acli.beads.specify`
- **Traceability** — Sequential IDs make it easy to track feature order and history
- **Clean Navigation** — Each feature's documents are grouped together

**Workflow**:
1. Run `/acli.beads.specify` → Creates `.specify/specs/001-feature-name/` and git branch `feature/001-feature-name`
2. All subsequent commands (`/acli.beads.plan`, `/acli.beads.tasks`, etc.) automatically use this feature folder
3. Develop on the feature branch, merge when complete
4. Next feature automatically gets ID 002, and so on

### `/acli.beads.implement` — Human-in-the-Loop

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

Progress is always saved to `.specify/memory/handover.md` so you can resume with `/acli.beads.implement` any time.

## Pre-built Agents

All agents install as `{name}.agent.md` directly in `.github/agents/` with `target: vscode` for full VS Code attribute support.

| Agent | Purpose | 
|---|---|
| `@requirements` | BEADS+ spec gathering, user stories, constitution |
| `@architecture` | System design, ADRs, component decisions |
| `@security` | OWASP Top 10, vulnerability scanning |
| `@development` | Code implementation and refactoring |
| `@testing` | Test generation and coverage |
| `@quality` | Code review and maintainability |
| `@orchestrator` | Multi-agent coordination, BEADS+ workflow | 

## Agent Memory & Handover System

Agents maintain continuity across sessions using an advanced file-based memory system under `.specify/memory/`:

### Core Features
- **Handover Documents** — Structured context passed between agents (files changed, decisions, issues, action items)
- **Learning System** — Agents save quality issues and test failures; reload relevant learnings before new tasks
- **Dual Format Storage** — Both JSON (machine-readable) and Markdown (human-readable)

### Advanced Memory Features

#### 1. **Automatic Learning Extraction from Git**
Automatically capture learnings from your commit history:
```typescript
// Extracts learnings from fix/bug/security commits
const learnings = await memory.extractLearningsFromGit({
  commitRange: 'HEAD~20..HEAD',
  autoSave: true
});
```
Perfect for CI/CD integration — never lose valuable knowledge from hotfixes and bug fixes.

#### 2. **Memory Summarization**
Large handovers are automatically summarized to reduce context window usage:
```typescript
// Returns condensed version for old/large handovers
const handover = await memory.getHandoverWithSummary('T001', {
  maxTokens: 1500,  // Summarize if larger
  maxAgeDays: 7     // Summarize if older
});
```
Preserves critical information while keeping agent context lean and efficient.

#### 3. **Smart Memory Pruning**
Automatic cleanup keeps your memory system optimal:
```typescript
const result = await memory.pruneMemory({
  mergeSimilar: true,       // Merge duplicate learnings
  removeIneffective: true,  // Remove low success rate (<30%)
  archiveOld: true          // Archive learnings >1 year
});
```
Run weekly or monthly to maintain a clean, efficient knowledge base.

#### 4. **Learning Templates**
13 pre-built templates for consistent learning creation:
```typescript
// Security vulnerabilities
await memory.saveLearningFromTemplate('sql-injection', {
  QUERY_LOCATION: 'auth.ts:45'
}, 'quality');

// Performance issues
await memory.saveLearningFromTemplate('n-plus-one-query', {
  DATABASE_OPERATION: 'User.findAll() with posts'
}, 'development');
```

**Available Templates**: SQL injection, XSS, N+1 queries, memory leaks, flaky tests, code smells, architecture decisions, and more.

### Documentation
- **[MEMORY_SYSTEM.md](./MEMORY_SYSTEM.md)** — Complete memory system documentation
- **[MEMORY_FEATURES_QUICKREF.md](./MEMORY_FEATURES_QUICKREF.md)** — Quick reference guide
- **[examples/memory-features-usage.ts](./examples/memory-features-usage.ts)** — Working code examples

### Memory System API Usage

The memory system can be used programmatically in your agents or CI/CD:

```typescript
import { AgentMemory } from 'agent-framework-cli/dist/core/AgentMemory';
import { listTemplates } from 'agent-framework-cli/dist/core/LearningTemplates';

const memory = new AgentMemory(process.cwd());
await memory.initialize();

// Extract learnings from recent commits (great for CI/CD)
const gitLearnings = await memory.extractLearningsFromGit({
  commitRange: 'HEAD~20..HEAD',
  autoSave: true
});

// Get relevant learnings for current task
const learnings = await memory.getRelevantLearnings({
  category: 'security',
  tags: ['authentication', 'sql-injection']
});

// Create learning from template
await memory.saveLearningFromTemplate('sql-injection', {
  QUERY_LOCATION: 'src/auth/login.ts:45',
  'ORM/LIBRARY': 'TypeORM'
}, 'quality');

// Weekly maintenance (recommended)
await memory.pruneMemory({
  mergeSimilar: true,
  removeIneffective: true,
  dryRun: false
});
```

**Recommended Schedule**:
- **Daily**: Git extraction in CI/CD after merges
- **Weekly**: Memory pruning (merge + remove ineffective)
- **Monthly**: Full pruning including archival

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
│       ├── acli.beads.constitution.prompt.md
│       ├── acli.beads.specify.prompt.md
│       ├── acli.beads.plan.prompt.md
│       ├── acli.beads.tasks.prompt.md
│       ├── acli.beads.analyze.prompt.md
│       └── acli.beads.implement.prompt.md
└── .specify/
    ├── memory/
    │   ├── constitution.md
    │   ├── reference-architecture.md
    │   ├── quality-standards.md
    │   ├── handovers/
    │   │   ├── index.json
    │   │   ├── {handover-id}.json
    │   │   ├── {handover-id}.md
    │   │   └── {handover-id}.summary.json (auto-generated)
    │   └── learnings/
    │       ├── index.json
    │       ├── {learning-id}.json
    │       ├── {learning-id}.md
    │       └── archive/ (old learnings >1 year)
    └── specs/
        ├── 001-user-authentication/
        │   ├── spec.md
        │   ├── plan.md
        │   ├── tasks.md
        │   └── testing-plan.md
        └── 002-api-integration/
            ├── spec.md
            ├── plan.md
            ├── tasks.md
            └── testing-plan.md
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
