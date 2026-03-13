---
description: Create a new custom skill — scaffold a {name}.skill.md file in .github/skills/ with the correct frontmatter, when-to-use, workflow steps, and outputs.
argument-hint: Describe what your skill should do, e.g. "a skill for generating API contracts from a spec"
---

## User Input

```text
$ARGUMENTS
```

Consider the user input above before proceeding (if not empty).

## Your Task

You are creating a new custom skill for VS Code GitHub Copilot agents.

The skill will be placed at `.github/skills/{name}.skill.md` and auto-discovered by VS Code so any agent can reference it by name.

## Steps

1. **Gather details** — ask the user (or infer from their input):
   - **Name**: lowercase, hyphen-separated, e.g. `api-contract-generator`
   - **Description**: one sentence describing what the skill does
   - **Display name**: title-cased, e.g. `API Contract Generator Skill`
   - **When to use**: 2–3 triggering scenarios
   - **Inputs**: what the skill reads or requires before running
   - **Outputs**: what the skill produces
   - Limit clarifications to **3 questions maximum**

2. **Check** `.agent-framework.json` for `skillsDir` (default: `.github/skills/`). Ensure the directory exists.

3. **Write** the skill file at `{skillsDir}/{name}.skill.md`:

   ```markdown
   ---
   name: {name}
   description: {description}
   ---

   # {Display Name} Skill

   ## When to Use
   - {triggering scenario 1}
   - {triggering scenario 2}
   - {triggering scenario 3}

   ## Inputs
   - {input 1}
   - {input 2}

   ## Workflow

   1. **Step 1** — {description}

   2. **Step 2** — {description}

   3. **Step 3** — {description}

   ## Quality Rules
   - {rule 1}
   - {rule 2}

   ## Outputs
   - {output 1}
   - {output 2}

   ## Next Steps
   {what to do after this skill completes}
   ```

4. **Confirm** creation with the file path and remind the user that agents reference this skill by its `name` field (`{name}`).
