import * as path from 'path';
import * as fs from 'fs-extra';
import chalk from 'chalk';
import ora from 'ora';
import boxen from 'boxen';
import { AgentManager } from '../core/AgentManager';
import { installBeadsPrompts } from './install';

interface InitOptions {
  dir: string;
  agents?: string[];
}

export async function initCommand(options: InitOptions): Promise<void> {
  const spinner = ora('Initializing agent framework...').start();

  try {
    const projectRoot = path.resolve(options.dir);

    // Create .github directory
    const githubDir = path.join(projectRoot, '.github');
    await fs.ensureDir(githubDir);

    // Create agents directory in .github/agents
    const agentsDir = path.join(githubDir, 'agents');
    await fs.ensureDir(agentsDir);

    // Create skills directory in .github/skills
    const skillsDir = path.join(githubDir, 'skills');
    await fs.ensureDir(skillsDir);

    // Create .vscode directory for VS Code settings
    const vscodeDir = path.join(projectRoot, '.vscode');
    await fs.ensureDir(vscodeDir);

    // Create config file
    const configPath = path.join(projectRoot, '.agent-framework.json');
    if (!(await fs.pathExists(configPath))) {
      const config = {
        version: '1.0.0',
        agentsDir: '.github/agents',
        skillsDir: '.github/skills',
        defaultAgents: options.agents || [],
        customSettings: {}
      };
      await fs.writeJson(configPath, config, { spaces: 2 });
    }

    // Create VS Code extensions.json
    const extensionsPath = path.join(vscodeDir, 'extensions.json');
    if (!(await fs.pathExists(extensionsPath))) {
      const extensions = {
        recommendations: [
          'github.copilot',
          'github.copilot-chat'
        ]
      };
      await fs.writeJson(extensionsPath, extensions, { spaces: 2 });
    }

    // Create README in agents directory
    const agentsReadme = path.join(agentsDir, 'README.md');
    await fs.writeFile(agentsReadme, `# GitHub Copilot Agents\n\nThis directory contains AI agents for GitHub Copilot.\n\n## Installation\n\nInstall pre-built agents:\n- \`acli install requirements\` - Requirements gathering with BEADS+\n- \`acli install architecture\` - System design and patterns\n- \`acli install security\` - Security analysis\n- \`acli install development\` - Code implementation\n- \`acli install testing\` - Test generation\n- \`acli install quality\` - Code quality checks\n- \`acli install orchestrator\` - Multi-agent coordination\n\n## Create Custom Agents\n\n\`\`\`bash\nacli create agent\n\`\`\`\n\n## Usage\n\nIn VS Code Copilot Chat, use \`@agentname\` to invoke agents.\n\nExample:\n\`\`\`\n@requirements gather requirements for user authentication\n\`\`\`\n`, 'utf-8');

    // Create README in skills directory
    const skillsReadme = path.join(skillsDir, 'README.md');
    await fs.writeFile(skillsReadme, `# GitHub Copilot Skills\n\nThis directory contains reusable skills for GitHub Copilot agents.\n\n## Create Custom Skills\n\n\`\`\`bash\nacli create skill\n\`\`\`\n`, 'utf-8');

    // Install BEADS+ slash command prompts into .github/prompts/
    await installBeadsPrompts(projectRoot);

    // Scaffold .specify directory structure
    await fs.ensureDir(path.join(projectRoot, '.specify', 'memory'));
    await fs.ensureDir(path.join(projectRoot, '.specify', 'specs'));

    spinner.succeed('Agent framework initialized successfully!');

    // Install default agents if specified
    if (options.agents && options.agents.length > 0) {
      console.log(chalk.cyan('\nInstalling default agents...'));
      
      for (const agentName of options.agents) {
        const agentSpinner = ora(`Installing ${agentName}...`).start();
        try {
          // Dynamic import and install (will be implemented in install command)
          const { installAgent } = await import('./install');
          await installAgent(agentName, { force: false }, projectRoot);
          agentSpinner.succeed(`Installed ${agentName}`);
        } catch (error) {
          agentSpinner.fail(`Failed to install ${agentName}`);
          console.error(chalk.red((error as Error).message));
        }
      }
    }

    // Success message
    const message = boxen(
      chalk.green.bold('✓ Agent Framework Initialized!\n\n') +
      chalk.white('Next steps:\n') +
      chalk.cyan('  1. acli install orchestrator') + chalk.gray(' - Install all agents\n') +
      chalk.cyan('  2. /acli.beads.constitution') + chalk.gray(' - Create your project constitution (in Copilot Chat)\n') +
      chalk.cyan('  3. /acli.beads.specify') + chalk.gray(' - Define what you want to build\n') +
      chalk.cyan('  4. /acli.beads.implement') + chalk.gray(' - Start iterative development\n\n') +
      chalk.white('BEADS+ commands installed in: ') + chalk.blue('.github/prompts/\n') +
      chalk.white('Speckit skills installed in:  ') + chalk.blue('.github/skills/\n') +
      chalk.white('Documentation: ') + chalk.blue('https://github.com/ipranjal/agent-framework'),
      {
        padding: 1,
        margin: 1,
        borderStyle: 'round',
        borderColor: 'green'
      }
    );

    console.log(message);

  } catch (error) {
    spinner.fail('Failed to initialize agent framework');
    console.error(chalk.red((error as Error).message));
    process.exit(1);
  }
}
