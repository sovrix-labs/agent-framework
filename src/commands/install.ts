import chalk from 'chalk';
import ora from 'ora';
import * as path from 'path';
import * as fs from 'fs-extra';
import { getPrebuiltAgents } from '../agents';
import { AgentManager } from '../core/AgentManager';

interface InstallOptions {
  force?: boolean;
}

// Names of all BEADS+ prompt command files (without directory)
const BEADS_PROMPTS = [
  'acli.beads.constitution.prompt.md',
  'acli.beads.specify.prompt.md',
  'acli.beads.plan.prompt.md',
  'acli.beads.tasks.prompt.md',
  'acli.beads.implement.prompt.md',
  'acli.beads.analyze.prompt.md',
  'acli.onboard.prompt.md',
  'acli.create.agent.prompt.md',
  'acli.create.skill.prompt.md',
];

// Speckit skill files installed into .github/skills/
const SPECKIT_SKILLS = [
  'speckit-constitution.skill.md',
  'speckit-specify.skill.md',
  'speckit-plan.skill.md',
  'speckit-tasks.skill.md',
  'speckit-analyze.skill.md',
  'speckit-checklist.skill.md',
  'speckit-implement.skill.md',
  'speckit-onboard.skill.md',
];

/**
 * Install speckit skill files into .github/skills/
 * These are referenced by beads prompts and agents via the tools array.
 */
export async function installSpeckitSkills(projectRoot: string): Promise<void> {
  const destDir = path.join(projectRoot, '.github', 'skills');
  await fs.ensureDir(destDir);

  const skillsSourceDir = path.resolve(__dirname, '..', '..', 'templates', 'skills');

  for (const fileName of SPECKIT_SKILLS) {
    const src = path.join(skillsSourceDir, fileName);
    const dest = path.join(destDir, fileName);
    if (await fs.pathExists(src)) {
      await fs.copyFile(src, dest);
    }
  }
}

/**
 * Install BEADS+ slash command prompt files into .github/prompts/
 * These become available as /acli.beads.* chat commands in GitHub Copilot Chat.
 */
export async function installBeadsPrompts(projectRoot: string): Promise<void> {
  const destDir = path.join(projectRoot, '.github', 'prompts');
  await fs.ensureDir(destDir);

  // Resolve the prompts source directory (relative to this compiled file: dist/commands/ → templates/prompts/)
  const promptsSourceDir = path.resolve(__dirname, '..', '..', 'templates', 'prompts');

  for (const fileName of BEADS_PROMPTS) {
    const src = path.join(promptsSourceDir, fileName);
    const dest = path.join(destDir, fileName);
    if (await fs.pathExists(src)) {
      await fs.copyFile(src, dest);
    }
  }

  // Always install skills alongside prompts so tools references resolve
  await installSpeckitSkills(projectRoot);
}

export async function installCommand(name: string, options: InstallOptions): Promise<void> {
  const projectRoot = process.cwd();
  await installAgent(name, options, projectRoot);
}

export async function installAgent(name: string, options: InstallOptions, projectRoot: string): Promise<void> {
  const configPath = path.join(projectRoot, '.agent-framework.json');

  if (!(await fs.pathExists(configPath))) {
    console.error(chalk.red('Agent framework not initialized. Run "acli init" first.'));
    process.exit(1);
  }

  const config = await fs.readJson(configPath);
  const agentManager = new AgentManager(projectRoot, config.agentsDir);

  // Get pre-built agents
  const prebuiltAgents = getPrebuiltAgents();

  if (!prebuiltAgents[name]) {
    console.error(chalk.red(`Agent "${name}" not found.`));
    console.log(chalk.gray('\nAvailable agents:'));
    for (const agentName of Object.keys(prebuiltAgents)) {
      console.log(chalk.cyan(`  - ${agentName}`));
    }
    process.exit(1);
  }

  // If installing orchestrator, install all agents + BEADS+ prompts
  if (name === 'orchestrator') {
    const spinner = ora('Installing orchestrator, all agents and BEADS+ commands...').start();
    const allAgents = Object.keys(prebuiltAgents);
    const installed: string[] = [];
    
    try {
      for (const agentName of allAgents) {
        const agent = prebuiltAgents[agentName];
        await agentManager.installAgent(agent, options.force);
        installed.push(agentName);
      }

      // Install BEADS+ prompt files
      await installBeadsPrompts(projectRoot);
      
      spinner.succeed('All agents and BEADS+ commands installed successfully!');
      console.log(chalk.cyan('\nInstalled agents:'));
      for (const agentName of installed) {
        console.log(chalk.gray(`  ✓ ${agentName}`));
      }
      console.log(chalk.cyan('\nBEADS+ slash commands installed:'));
      for (const p of BEADS_PROMPTS) {
        console.log(chalk.gray(`  ✓ /${p.replace('.prompt.md', '')}`));
      }
      console.log(chalk.cyan('\nSpeckit skills installed:'));
      for (const s of SPECKIT_SKILLS) {
        console.log(chalk.gray(`  ✓ ${s.replace('.skill.md', '')}`));
      }
      console.log(chalk.cyan('\nIn Copilot Chat, use /acli.beads.constitution to start your workflow.'));
      console.log(chalk.gray(`Agents: ${config.agentsDir} | Prompts: .github/prompts/ | Skills: .github/skills/`));
    } catch (error) {
      spinner.fail('Failed to install agents');
      console.error(chalk.red((error as Error).message));
      process.exit(1);
    }
  } else {
    const spinner = ora(`Installing ${name} agent...`).start();

    try {
      const agent = prebuiltAgents[name];
      await agentManager.installAgent(agent, options.force);
      
      spinner.succeed(`Agent "${name}" installed successfully!`);
      console.log(chalk.gray(`Location: ${path.join(config.agentsDir, name)}`));
      console.log(chalk.cyan(`\nUse @${name} in VS Code Copilot Chat to invoke this agent.`));
    } catch (error) {
      spinner.fail(`Failed to install agent "${name}"`);
      console.error(chalk.red((error as Error).message));
      process.exit(1);
    }
  }
}
