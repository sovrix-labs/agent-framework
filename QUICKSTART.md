# Quick Start Guide

## Installation

```bash
npm install -g agent-framework-cli
```

## Initialize Your Project

```bash
cd /path/to/your/project
acli init
```

This sets up everything automatically:
- `.github/agents/` -- 5 pre-built agent definitions
- `.github/skills/` -- framework skills
- `.github/prompts/` -- 16 slash command prompts
- `.specify/` -- spec-kit working directory
- `.beads/` -- beads task tracking
- `.agent-framework.json` -- configuration file

`acli init` automatically installs spec-kit, beads, and required plugins (brownfield, fleet, superpowers-bridge) if they are not already present. No manual setup required.

## Install Additional Agents

All 5 agents are installed automatically during `acli init`. To reinstall a specific agent:

```bash
acli install orchestrator
acli install architect
```

## Use in VS Code

Open GitHub Copilot Chat and start with one of these workflows:

### Full Lifecycle (recommended)

```
/acli.run Build a REST API for user management
```

This runs the complete 10-phase specification-driven workflow with human checkpoints.

### Onboard an Existing Project

```
/acli.onboard
```

Auto-discovers your tech stack, architecture, and conventions, then generates tailored constitution and quality standards.

### Individual Phases

```
/acli.constitution          -- set up project principles
/acli.specify <feature>     -- write the feature spec
/acli.clarify               -- resolve ambiguities
/acli.plan                  -- create technical plan
/acli.checklist             -- generate quality checklists
/acli.tasks                 -- create task list
/acli.analyze               -- validate consistency
/acli.implement             -- implement with review loop
```

### Utility Commands

```
/acli.debug <description>   -- structured debugging
/acli.critique              -- code review
/acli.respond               -- address review feedback
/acli.finish                -- prepare branch for merge
```

## Agent Interaction

Agents are available as `@agent` mentions in Copilot Chat:

```
@orchestrator start the full workflow for adding search functionality
@architect what are the edge cases for file upload?
@architect review this service layer design
@security check this auth implementation for OWASP issues
@development implement the next task from the task list
@qa run regression tests for the payment module
@qa review code quality standards compliance
```

## Configuration

View or edit settings:
```bash
acli config
```

Configuration is stored in `.agent-framework.json` at the project root.

## Updating

```bash
acli update                 # Update all agents, prompts, and skills
acli update orchestrator    # Update a specific agent
```

## Next Steps

- [README.md](README.md) -- full documentation
- [EXAMPLES.md](EXAMPLES.md) -- workflow examples
- [CONTRIBUTING.md](CONTRIBUTING.md) -- development guide
