import chalk from 'chalk';
import ora from 'ora';
import * as path from 'path';
import * as fs from 'fs-extra';
import { getPrebuiltAgents } from '../agents';
import { AgentManager } from '../core/AgentManager';

interface InstallOptions {
  force?: boolean;
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
