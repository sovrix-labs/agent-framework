import chalk from 'chalk';
import inquirer from 'inquirer';
import * as path from 'path';
import * as fs from 'fs-extra';
import ora from 'ora';

interface CreateOptions {
  name?: string;
  description?: string;
  template?: string;
}

export async function createCommand(type: string, options: CreateOptions): Promise<void> {
  if (type !== 'agent' && type !== 'skill') {
    console.error(chalk.red('Invalid type. Use "agent" or "skill"'));
    process.exit(1);
  }

  // Get project root and check if initialized
  const projectRoot = process.cwd();
  const configPath = path.join(projectRoot, '.agent-framework.json');

  if (!(await fs.pathExists(configPath))) {
    console.error(chalk.red('Agent framework not initialized. Run "acli init" first.'));
    process.exit(1);
  }

  // Read config
  const config = await fs.readJson(configPath);

  // Prompt for details if not provided
  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: `Enter ${type} name:`,
      default: options.name,
      when: !options.name,
      validate: (input) => {
        if (!input || input.trim() === '') {
          return `${type} name is required`;
        }
        // Check for valid identifier
        if (!/^[a-z][a-z0-9-]*$/.test(input)) {
          return 'Name must start with lowercase letter and contain only lowercase letters, numbers, and hyphens';
        }
        return true;
      }
    },
    {
      type: 'input',
      name: 'description',
      message: `Enter ${type} description:`,
      default: options.description,
      when: !options.description,
      validate: (input) => {
        if (!input || input.trim() === '') {
          return 'Description is required';
        }
        return true;
      }
    },
    {
      type: 'input',
      name: 'displayName',
      message: `Enter ${type} display name:`,
      default: (answers: any) => {
        const name = answers.name || options.name || '';
        return name.split('-').map((word: string) => 
          word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' ');
      }
    }
  ]);

  const name = options.name || answers.name;
  const description = options.description || answers.description;
  const displayName = answers.displayName;

  const spinner = ora(`Creating ${type}...`).start();

  try {
    if (type === 'agent') {
      await createAgent(projectRoot, config, name, displayName, description);
      spinner.succeed(`Agent "${name}" created successfully!`);
      console.log(chalk.cyan(`\nAgent location: ${path.join(config.agentsDir, name)}`));
      console.log(chalk.gray('Edit .agent.md to customize your agent\'s behavior.'));
    } else {
      await createSkill(projectRoot, config, name, displayName, description);
      spinner.succeed(`Skill "${name}" created successfully!`);
      console.log(chalk.cyan(`\nSkill location: ${path.join(config.skillsDir, name)}`));
      console.log(chalk.gray('Edit SKILL.md to customize your skill\'s instructions.'));
    }
  } catch (error) {
    spinner.fail(`Failed to create ${type}`);
    console.error(chalk.red((error as Error).message));
    process.exit(1);
  }
}

async function createAgent(
  projectRoot: string,
  config: any,
  name: string,
  displayName: string,
  description: string
): Promise<void> {
  const agentFilePath = path.join(projectRoot, config.agentsDir, `${name}.agent.md`);

  // Check if agent already exists
  if (await fs.pathExists(agentFilePath)) {
    throw new Error(`Agent "${name}" already exists`);
  }

  // Ensure agents directory exists
  await fs.ensureDir(path.join(projectRoot, config.agentsDir));

  // Create agent file
  const agentContent = `---
name: ${name}
description: ${description}
---

# ${displayName} Agent

## Purpose
${description}

## Instructions

When invoked with @${name}, this agent should:
1. Understand the user's request
2. Analyze the context
3. Provide helpful assistance
4. Follow best practices

## Workflow

### 1. Analysis Phase
- Read and understand the current context
- Identify requirements
- Plan the approach

### 2. Execution Phase
- Take necessary actions
- Use appropriate tools
- Verify results

### 3. Completion Phase
- Summarize what was done
- Provide next steps if applicable

## Best Practices
- Always validate inputs
- Provide clear explanations
- Handle errors gracefully
- Follow project conventions

## Examples

### Example 1: Basic Usage
\`\`\`
User: @${name} help me with...
Agent: I'll analyze your request and...
\`\`\`

## Notes
- Customize this file to match your specific needs
- Add more detailed instructions as needed
- Include domain-specific knowledge
`;

  await fs.writeFile(agentFilePath, agentContent, 'utf-8');
}

async function createSkill(
  projectRoot: string,
  config: any,
  name: string,
  displayName: string,
  description: string
): Promise<void> {
  const skillFilePath = path.join(projectRoot, config.skillsDir, `${name}.skill.md`);

  // Check if skill already exists
  if (await fs.pathExists(skillFilePath)) {
    throw new Error(`Skill "${name}" already exists`);
  }

  // Ensure skills directory exists
  await fs.ensureDir(path.join(projectRoot, config.skillsDir));

  // Create skill file
  const skillContent = `---
name: ${name}
description: ${description}
version: 1.0.0
tags:
  - custom
  - ${name}
---

# ${displayName} Skill

## Description
${description}

## When to Use This Skill
This skill should be invoked when:
- [Describe scenario 1]
- [Describe scenario 2]
- [Describe scenario 3]

## Instructions

### Prerequisites
Before using this skill:
1. [Prerequisite 1]
2. [Prerequisite 2]

### Steps
1. **Step 1**: [Description]
   - Detail 1
   - Detail 2

2. **Step 2**: [Description]
   - Detail 1
   - Detail 2

3. **Step 3**: [Description]
   - Detail 1
   - Detail 2

### Expected Output
After completing this skill:
- [Output 1]
- [Output 2]

## Examples

### Example 1
\`\`\`
[Example usage]
\`\`\`

### Example 2
\`\`\`
[Example usage]
\`\`\`

## Configuration
If this skill requires configuration, specify it here:
\`\`\`json
{
  "option1": "value1",
  "option2": "value2"
}
\`\`\`

## Related Skills
- [Related skill 1]
- [Related skill 2]

## Notes
- [Important note 1]
- [Important note 2]
`;

  await fs.writeFile(skillFilePath, skillContent, 'utf-8');
}
