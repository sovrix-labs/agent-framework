#!/usr/bin/env node

import { Command } from 'commander';
import chalk from 'chalk';
import { initCommand } from './commands/init';
import { listCommand } from './commands/list';
import { installCommand } from './commands/install';
import { removeCommand } from './commands/remove';
import { updateCommand } from './commands/update';
import { configCommand } from './commands/config';

const program = new Command();

program
  .name('agent-cli')
  .description('CLI tool framework for building VS Code + Copilot agents and skills')
  .version('1.0.0');

// Initialize command
program
  .command('init')
  .description('Initialize agent framework in current project')
  .option('-d, --dir <directory>', 'Target directory', '.')
  .option('-a, --agents <agents...>', 'Pre-install specific agents')
  .action(initCommand);

// List command
program
  .command('list <type>')
  .description('List available agents or skills (type: agents|skills)')
  .option('-i, --installed', 'Show only installed items')
  .action(listCommand);

// Install command
program
  .command('install <name>')
  .description('Install a pre-built agent')
  .option('-f, --force', 'Force reinstall if already exists')
  .action(installCommand);

// Remove command
program
  .command('remove <name>')
  .description('Remove an agent from project')
  .option('-y, --yes', 'Skip confirmation')
  .action(removeCommand);

// Update command
program
  .command('update [name]')
  .description('Update an agent or all agents to latest version')
  .action(updateCommand);

// Config command
program
  .command('config')
  .description('Configure framework settings')
  .option('-s, --set <key=value>', 'Set a configuration value')
  .option('-g, --get <key>', 'Get a configuration value')
  .option('-l, --list', 'List all configuration')
  .action(configCommand);

// Parse arguments
program.parse(process.argv);

// Show help if no command provided
if (!process.argv.slice(2).length) {
  program.outputHelp();
}

export default program;
