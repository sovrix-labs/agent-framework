import chalk from 'chalk';
import inquirer from 'inquirer';
import * as path from 'path';
import * as fs from 'fs-extra';

interface ConfigOptions {
  set?: string;
  get?: string;
  list?: boolean;
}

export async function configCommand(options: ConfigOptions): Promise<void> {
  const projectRoot = process.cwd();
  const configPath = path.join(projectRoot, '.agent-framework.json');

  if (!(await fs.pathExists(configPath))) {
    console.error(chalk.red('Agent framework not initialized. Run "acli init" first.'));
    process.exit(1);
  }

  const config = await fs.readJson(configPath);

  if (options.set) {
    await setConfig(configPath, config, options.set);
  } else if (options.get) {
    await getConfig(config, options.get);
  } else if (options.list) {
    await listConfig(config);
  } else {
    // Interactive config
    await interactiveConfig(configPath, config);
  }
}

async function setConfig(configPath: string, config: any, setValue: string): Promise<void> {
  const [key, ...valueParts] = setValue.split('=');
  const value = valueParts.join('=');

  if (!key || !value) {
    console.error(chalk.red('Invalid format. Use: --set key=value'));
    process.exit(1);
  }

  // Handle nested keys (e.g., customSettings.github.token)
  const keys = key.split('.');
  let current = config;

  for (let i = 0; i < keys.length - 1; i++) {
    if (!current[keys[i]]) {
      current[keys[i]] = {};
    }
    current = current[keys[i]];
  }

  current[keys[keys.length - 1]] = value;

  await fs.writeJson(configPath, config, { spaces: 2 });
  console.log(chalk.green(`✓ Set ${key} = ${value}`));
}

async function getConfig(config: any, getKey: string): Promise<void> {
  const keys = getKey.split('.');
  let value = config;

  for (const key of keys) {
    if (value && typeof value === 'object' && key in value) {
      value = value[key];
    } else {
      console.error(chalk.red(`Configuration key "${getKey}" not found.`));
      process.exit(1);
    }
  }

  console.log(chalk.cyan(getKey + ':'), typeof value === 'object' ? JSON.stringify(value, null, 2) : value);
}

async function listConfig(config: any): Promise<void> {
  console.log(chalk.bold.cyan('\n⚙️  Configuration\n'));
  console.log(chalk.gray('─'.repeat(50)));
  
  printConfig(config, '');
  
  console.log(chalk.gray('─'.repeat(50) + '\n'));
}

function printConfig(obj: any, prefix: string): void {
  for (const [key, value] of Object.entries(obj)) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    
    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      console.log(chalk.yellow(`${fullKey}:`));
      printConfig(value, fullKey);
    } else {
      const displayValue = Array.isArray(value) ? `[${value.join(', ')}]` : value;
      console.log(`  ${chalk.cyan(fullKey)}: ${displayValue}`);
    }
  }
}

async function interactiveConfig(configPath: string, config: any): Promise<void> {
  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'agentsDir',
      message: 'Agents directory:',
      default: config.agentsDir
    },
    {
      type: 'input',
      name: 'skillsDir',
      message: 'Skills directory:',
      default: config.skillsDir
    },
    {
      type: 'input',
      name: 'defaultAgents',
      message: 'Default agents (comma-separated):',
      default: config.defaultAgents?.join(',') || '',
      filter: (input: string) => input ? input.split(',').map(s => s.trim()) : []
    }
  ]);

  config.agentsDir = answers.agentsDir;
  config.skillsDir = answers.skillsDir;
  config.defaultAgents = answers.defaultAgents;

  await fs.writeJson(configPath, config, { spaces: 2 });
  console.log(chalk.green('\n✓ Configuration updated successfully!'));
}
