---
description: Create a new custom agent — interactively scaffold a .agent.md file in .github/agents/ with the correct VS Code frontmatter, purpose, and instructions.
argument-hint: Describe what your agent should do, e.g. "an agent that helps write database migrations"
---

## User Input

```text
$ARGUMENTS
```

Consider the user input above before proceeding (if not empty).

## Your Task

You are creating a new custom agent for VS Code GitHub Copilot Chat.

The agent will be placed at `.github/agents/{name}.agent.md`.

## Steps

1. **Gather details** — ask the user (or infer from their input):
   - **Name**: lowercase, hyphen-separated, e.g. `db-migration` (used as `@db-migration` in chat)
   - **Description**: one sentence describing the agent's purpose
   - **Display name**: title-cased version, e.g. `DB Migration Agent`
   - **Handoffs** (optional): other agent names this agent should hand off to
   - **Argument hint**: brief usage hint shown in Copilot Chat
   - Limit clarifications to **3 questions maximum**

2. **Check** `.agent-framework.json` for `agentsDir` (default: `.github/agents/`). Ensure the directory exists.

3. **Write** the agent file at `{agentsDir}/{name}.agent.md`:

   ```markdown
   ---
   name: {name}
   description: {description}
   target: vscode
   argument-hint: {argument-hint}
   handoffs:
     - {handoff-agent}
   user-invocable: true
   ---

   # {Display Name} Agent

   ## Purpose
   {description}

   ## Instructions

   When invoked with @{name}, this agent should:
   1. Understand the user's request
   2. Analyse the context
   3. Provide helpful assistance following project conventions

   ## Workflow

   ### 1. Analysis
   - Read and understand the current context
   - Identify requirements and constraints

   ### 2. Execution
   - Take necessary actions
   - Use appropriate tools
   - Verify results

   ### 3. Completion
   - Summarise what was done
   - Suggest next steps if applicable

   ## Best Practices
   - Always validate inputs
   - Provide clear explanations
   - Handle errors gracefully
   - Follow project conventions from `.specify/memory/constitution.md` if present
   ```

4. **Confirm** creation with the file path and how to invoke it (`@{name}` in Copilot Chat).
