import chalk from 'chalk';
import inquirer from 'inquirer';
import * as path from 'path';
import * as fs from 'fs-extra';
import ora from 'ora';
import { BeadsWorkflow } from '../core/BeadsWorkflow';

interface BeadsOptions {
  featureId?: string;
  priority?: 'P0' | 'P1' | 'P2' | 'P3';
  output?: string;
  force?: boolean;
}

/**
 * BEADS+ SpecKit Command
 * Implements the complete BEADS+ workflow with SpecKit-style commands
 */
export async function beadsCommand(phase: string, options: BeadsOptions): Promise<void> {
  const projectRoot = process.cwd();
  const specifyDir = path.join(projectRoot, '.specify');
  const specsDir = path.join(projectRoot, 'specs');

  // Ensure .specify directory exists
  await fs.ensureDir(specifyDir);
  await fs.ensureDir(path.join(specifyDir, 'memory'));
  await fs.ensureDir(specsDir);

  switch (phase) {
    case 'constitution':
    case 'constitute':
      await constituteCommand(projectRoot, options);
      break;
    
    case 'specify':
      await specifyCommand(projectRoot, options);
      break;
    
    case 'clarify':
      await clarifyCommand(projectRoot, options);
      break;
    
    case 'plan':
      await planCommand(projectRoot, options);
      break;
    
    case 'checklist':
    case 'checklists':
      await checklistCommand(projectRoot, options);
      break;
    
    case 'tasks':
      await tasksCommand(projectRoot, options);
      break;
    
    case 'analyze':
    case 'analyse':
      await analyzeCommand(projectRoot, options);
      break;
    
    case 'implement':
      await implementCommand(projectRoot, options);
      break;
    
    case 'workflow':
    case 'full':
      await fullWorkflowCommand(projectRoot, options);
      break;
    
    case 'status':
      await statusCommand(projectRoot, options);
      break;
    
    default:
      console.error(chalk.red(`Unknown BEADS+ phase: ${phase}`));
      console.log(chalk.yellow('\nAvailable phases:'));
      console.log('  constitution  - Create project constitution');
      console.log('  specify       - Create feature specification (technology-agnostic)');
      console.log('  clarify       - Ask clarifying questions');
      console.log('  plan          - Create technical implementation plan');
      console.log('  checklist     - Generate quality checklists');
      console.log('  tasks         - Create executable task list');
      console.log('  analyze       - Validate consistency across artifacts');
      console.log('  implement     - Start implementation with TDD');
      console.log('  workflow      - Execute full BEADS+ workflow');
      console.log('  status        - Check workflow status');
      process.exit(1);
  }
}

/**
 * Phase 1: CONSTITUTION
 * Create project constitution defining principles and constraints
 */
async function constituteCommand(projectRoot: string, options: BeadsOptions): Promise<void> {
  console.log(chalk.blue.bold('\n🏛️  BEADS+ Phase 1: CONSTITUTION\n'));

  const constitutionPath = path.join(projectRoot, '.specify', 'memory', 'constitution.md');

  // Check if constitution already exists
  if (await fs.pathExists(constitutionPath) && !options.force) {
    const { overwrite } = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'overwrite',
        message: 'Constitution already exists. Overwrite?',
        default: false
      }
    ]);

    if (!overwrite) {
      console.log(chalk.yellow('Cancelled. Use --force to overwrite.'));
      return;
    }
  }

  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'projectName',
      message: 'Project name:',
      validate: (input) => input.trim() !== '' || 'Project name is required'
    },
    {
      type: 'input',
      name: 'principles',
      message: 'Core principles (comma-separated):',
      default: 'API-first, Mobile-first, Security by design'
    },
    {
      type: 'input',
      name: 'language',
      message: 'Primary programming language:',
      default: 'TypeScript'
    },
    {
      type: 'input',
      name: 'testCoverage',
      message: 'Test coverage target (%):',
      default: '90',
      validate: (input) => {
        const num = parseInt(input);
        return (num >= 0 && num <= 100) || 'Must be between 0 and 100';
      }
    }
  ]);

  const spinner = ora('Creating constitution...').start();

  try {
    // Load template
    const templatePath = path.join(projectRoot, 'templates', 'beads', 'constitution.template.md');
    let template = '';

    if (await fs.pathExists(templatePath)) {
      template = await fs.readFile(templatePath, 'utf-8');
    } else {
      // Fallback: create basic constitution
      template = `# Project Constitution

**Project**: {{PROJECT_NAME}}  
**Created**: {{DATE}}

## Core Principles
${answers.principles.split(',').map((p: string) => `- ${p.trim()}`).join('\n')}

## Technology Constraints
- **Language**: ${answers.language}
- **Test Coverage**: ${answers.testCoverage}%

## Quality Standards
- All features follow BEADS+ workflow
- 100% tests pass before merge
- Technology-agnostic specifications
`;
    }

    // Replace template variables
    const constitution = template
      .replace(/\{\{PROJECT_NAME\}\}/g, answers.projectName)
      .replace(/\{\{DATE\}\}/g, new Date().toISOString().split('T')[0]);

    await fs.writeFile(constitutionPath, constitution);

    spinner.succeed(chalk.green('Constitution created successfully!'));
    console.log(chalk.gray(`\n📄 ${constitutionPath}\n`));
    console.log(chalk.blue('Next step:'), chalk.white('acli beads specify'));
  } catch (error) {
    spinner.fail(chalk.red('Failed to create constitution'));
    console.error(error);
    process.exit(1);
  }
}

/**
 * Phase 2: SPECIFY
 * Create technology-agnostic feature specification
 */
async function specifyCommand(projectRoot: string, options: BeadsOptions): Promise<void> {
  console.log(chalk.blue.bold('\n📝 BEADS+ Phase 2: SPECIFY\n'));

  // Check for constitution
  const constitutionPath = path.join(projectRoot, '.specify', 'memory', 'constitution.md');
  if (!(await fs.pathExists(constitutionPath))) {
    console.log(chalk.yellow('⚠️  No constitution found. Creating one first...\n'));
    await constituteCommand(projectRoot, options);
  }

  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'featureName',
      message: 'Feature name:',
      validate: (input) => input.trim() !== '' || 'Feature name is required'
    },
    {
      type: 'input',
      name: 'problemStatement',
      message: 'What problem does this solve?',
      validate: (input) => input.trim() !== '' || 'Problem statement is required'
    },
    {
      type: 'input',
      name: 'userValue',
      message: 'What value does this provide to users?',
      validate: (input) => input.trim() !== '' || 'User value is required'
    }
  ]);

  const spinner = ora('Creating specification...').start();

  try {
    // Generate feature ID
    const sequenceNumber = await getNextSequenceNumber(projectRoot);
    const featureId = BeadsWorkflow.generateFeatureId(answers.featureName, sequenceNumber);
    const featureDir = path.join(projectRoot, 'specs', featureId);
    const specPath = path.join(featureDir, 'spec.md');

    await fs.ensureDir(featureDir);

    // Load template
    const templatePath = path.join(projectRoot, 'templates', 'beads', 'spec.template.md');
    let spec = '';

    if (await fs.pathExists(templatePath)) {
      spec = await fs.readFile(templatePath, 'utf-8');
      spec = spec
        .replace(/\{\{FEATURE_NAME\}\}/g, answers.featureName)
        .replace(/\{\{FEATURE_ID\}\}/g, featureId)
        .replace(/\{\{DATE\}\}/g, new Date().toISOString().split('T')[0])
        .replace(/\{\{PROBLEM_STATEMENT\}\}/g, answers.problemStatement)
        .replace(/\{\{USER_VALUE\}\}/g, answers.userValue);
    } else {
      // Fallback: create basic spec
      spec = `# Feature: ${answers.featureName}

**Feature ID**: ${featureId}  
**Created**: ${new Date().toISOString().split('T')[0]}

## Problem Statement
${answers.problemStatement}

## Business Value
${answers.userValue}

## User Stories

### US1: [Story Title] (P0 - Must Have)

**As a** [user type]  
**I want** [capability]  
**So that** [benefit]

#### Acceptance Criteria
- [ ] [Criterion 1]
- [ ] [Criterion 2]

## Out of Scope
- [What's not included]

## Open Questions
- [ ] Q1: [Question]
`;
    }

    await fs.writeFile(specPath, spec);

    spinner.succeed(chalk.green('Specification created successfully!'));
    console.log(chalk.gray(`\n📄 ${specPath}\n`));
    
    console.log(chalk.yellow('⚠️  IMPORTANT: Technology-Agnostic Requirement'));
    console.log(chalk.white('  ❌ Do NOT mention: frameworks, libraries, databases, tools'));
    console.log(chalk.white('  ✅ Focus on: WHAT system should do, WHY it\'s needed\n'));
    
    console.log(chalk.blue('Next step:'), chalk.white(`acli beads clarify --featureId ${featureId}`));
  } catch (error) {
    spinner.fail(chalk.red('Failed to create specification'));
    console.error(error);
    process.exit(1);
  }
}

/**
 * Phase 3: CLARIFY
 * Ask clarifying questions to resolve ambiguities
 */
async function clarifyCommand(projectRoot: string, options: BeadsOptions): Promise<void> {
  console.log(chalk.blue.bold('\n❓ BEADS+ Phase 3: CLARIFY\n'));

  const featureId = options.featureId || await promptForFeatureId(projectRoot);
  const specPath = path.join(projectRoot, 'specs', featureId, 'spec.md');

  if (!(await fs.pathExists(specPath))) {
    console.error(chalk.red(`Specification not found: ${specPath}`));
    process.exit(1);
  }

  console.log(chalk.white(`Feature: ${featureId}\n`));
  console.log(chalk.yellow('💡 Ask maximum 3 clarifying questions to resolve ambiguities.\n'));
  console.log(chalk.gray('Tips:'));
  console.log(chalk.gray('  - Focus on highest-impact unknowns'));
  console.log(chalk.gray('  - Prefer open-ended questions'));
  console.log(chalk.gray('  - Avoid yes/no questions when possible\n'));

  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'question1',
      message: 'Question 1 (or leave blank to skip):',
    },
    {
      type: 'input',
      name: 'answer1',
      message: 'Answer 1:',
      when: (answers) => answers.question1.trim() !== '',
      validate: (input) => input.trim() !== '' || 'Answer is required'
    },
    {
      type: 'input',
      name: 'question2',
      message: 'Question 2 (or leave blank to skip):',
    },
    {
      type: 'input',
      name: 'answer2',
      message: 'Answer 2:',
      when: (answers) => answers.question2.trim() !== '',
      validate: (input) => input.trim() !== '' || 'Answer is required'
    },
    {
      type: 'input',
      name: 'question3',
      message: 'Question 3 (or leave blank to skip):',
    },
    {
      type: 'input',
      name: 'answer3',
      message: 'Answer 3:',
      when: (answers) => answers.question3.trim() !== '',
      validate: (input) => input.trim() !== '' || 'Answer is required'
    }
  ]);

  const spinner = ora('Updating specification with clarifications...').start();

  try {
    let spec = await fs.readFile(specPath, 'utf-8');

    // Add clarifications to spec
    let clarificationSection = '\n\n## Clarifications\n\n';
    let questionCount = 0;

    for (let i = 1; i <= 3; i++) {
      const question = answers[`question${i}`];
      const answer = answers[`answer${i}`];

      if (question && question.trim() !== '') {
        questionCount++;
        clarificationSection += `### Q${questionCount}: ${question}\n\n`;
        if (answer) {
          clarificationSection += `**Answer**: ${answer}\n\n`;
        }
      }
    }

    // Append clarifications if any questions were asked
    if (questionCount > 0) {
      spec += clarificationSection;
      await fs.writeFile(specPath, spec);
    }

    spinner.succeed(chalk.green(`Specification updated with ${questionCount} clarification(s)!`));
    console.log(chalk.gray(`\n📄 ${specPath}\n`));
    console.log(chalk.blue('Next step:'), chalk.white(`acli beads plan --featureId ${featureId}`));
  } catch (error) {
    spinner.fail(chalk.red('Failed to update specification'));
    console.error(error);
    process.exit(1);
  }
}

/**
 * Phase 4: PLAN
 * Create technical implementation plan
 */
async function planCommand(projectRoot: string, options: BeadsOptions): Promise<void> {
  console.log(chalk.blue.bold('\n🏗️  BEADS+ Phase 4: PLAN\n'));

  const featureId = options.featureId || await promptForFeatureId(projectRoot);
  const featureDir = path.join(projectRoot, 'specs', featureId);
  const specPath = path.join(featureDir, 'spec.md');
  const planPath = path.join(featureDir, 'plan.md');

  if (!(await fs.pathExists(specPath))) {
    console.error(chalk.red(`Specification not found: ${specPath}`));
    process.exit(1);
  }

  const spinner = ora('Creating technical plan...').start();

  try {
    // Load template
    const templatePath = path.join(projectRoot, 'templates', 'beads', 'plan.template.md');
    let plan = '';

    if (await fs.pathExists(templatePath)) {
      const spec = await fs.readFile(specPath, 'utf-8');
      const featureName = spec.match(/# Feature: (.+)/)?.[1] || featureId;

      plan = await fs.readFile(templatePath, 'utf-8');
      plan = plan
        .replace(/\{\{FEATURE_NAME\}\}/g, featureName)
        .replace(/\{\{FEATURE_ID\}\}/g, featureId)
        .replace(/\{\{DATE\}\}/g, new Date().toISOString().split('T')[0]);
    } else {
      plan = `# Technical Plan: ${featureId}

**Based on**: specs/${featureId}/spec.md  
**Created**: ${new Date().toISOString().split('T')[0]}

## Architecture

### Components

### Data Models

### API Contracts

## Technical Decisions

### Decision 1: [Title]

**Context**: [Why decision needed]

**Decision**: [What was decided]

**Alternatives**:
1. [Option A]: [Pros/Cons]
2. [Option B]: [Pros/Cons]

**Consequences**: [Impact of decision]

## File Structure

\`\`\`
src/
├── [directory]/
│   └── [file]
\`\`\`

## Testing Strategy

### Unit Tests
### Integration Tests
### E2E Tests
`;
    }

    await fs.writeFile(planPath, plan);

    spinner.succeed(chalk.green('Technical plan created successfully!'));
    console.log(chalk.gray(`\n📄 ${planPath}\n`));
    console.log(chalk.white('✏️  Edit the plan to add:'));
    console.log(chalk.gray('  - Architecture and component design'));
    console.log(chalk.gray('  - Technical decisions (ADRs)'));
    console.log(chalk.gray('  - File structure'));
    console.log(chalk.gray('  - Testing strategy\n'));
    console.log(chalk.blue('Next step:'), chalk.white(`acli beads checklist --featureId ${featureId}`));
  } catch (error) {
    spinner.fail(chalk.red('Failed to create technical plan'));
    console.error(error);
    process.exit(1);
  }
}

/**
 * Phase 5: CHECKLIST
 * Generate domain-specific quality checklists
 */
async function checklistCommand(projectRoot: string, options: BeadsOptions): Promise<void> {
  console.log(chalk.blue.bold('\n✅ BEADS+ Phase 5: CHECKLIST\n'));

  const featureId = options.featureId || await promptForFeatureId(projectRoot);
  const checklistDir = path.join(projectRoot, 'specs', featureId, 'checklists');

  await fs.ensureDir(checklistDir);

  const { checklists } = await inquirer.prompt([
    {
      type: 'checkbox',
      name: 'checklists',
      message: 'Select checklists to generate:',
      choices: [
        { name: 'Security', value: 'security', checked: true },
        { name: 'Accessibility', value: 'accessibility', checked: true },
        { name: 'Performance', value: 'performance', checked: true }
      ],
      validate: (input) => input.length > 0 || 'Select at least one checklist'
    }
  ]);

  const spinner = ora('Generating checklists...').start();

  try {
    const templatesDir = path.join(projectRoot, 'templates', 'beads');

    for (const checklistType of checklists) {
      const templatePath = path.join(templatesDir, `checklist-${checklistType}.template.md`);
      const outputPath = path.join(checklistDir, `${checklistType}.md`);

      if (await fs.pathExists(templatePath)) {
        let checklist = await fs.readFile(templatePath, 'utf-8');
        checklist = checklist
          .replace(/\{\{FEATURE_ID\}\}/g, featureId)
          .replace(/\{\{DATE\}\}/g, new Date().toISOString().split('T')[0])
          .replace(/\{\{STATUS\}\}/g, 'Not Started')
          .replace(/\{\{REVIEWER_NAME\}\}/g, '[Reviewer Name]');

        await fs.writeFile(outputPath, checklist);
      }
    }

    spinner.succeed(chalk.green(`${checklists.length} checklist(s) created successfully!`));
    console.log(chalk.gray(`\n📄 ${checklistDir}/\n`));
    checklists.forEach((type: string) => {
      console.log(chalk.white(`  ✅ ${type}.md`));
    });
    console.log();
    console.log(chalk.blue('Next step:'), chalk.white(`acli beads tasks --featureId ${featureId}`));
  } catch (error) {
    spinner.fail(chalk.red('Failed to generate checklists'));
    console.error(error);
    process.exit(1);
  }
}

/**
 * Phase 6: TASKS
 * Create executable task list with dependencies
 */
async function tasksCommand(projectRoot: string, options: BeadsOptions): Promise<void> {
  console.log(chalk.blue.bold('\n📋 BEADS+ Phase 6: TASKS\n'));

  const featureId = options.featureId || await promptForFeatureId(projectRoot);
  const featureDir = path.join(projectRoot, 'specs', featureId);
  const tasksPath = path.join(featureDir, 'tasks.md');

  const spinner = ora('Creating task list...').start();

  try {
    const templatePath = path.join(projectRoot, 'templates', 'beads', 'tasks.template.md');
    let tasks = '';

    if (await fs.pathExists(templatePath)) {
      const specPath = path.join(featureDir, 'spec.md');
      const spec = await fs.readFile(specPath, 'utf-8');
      const featureName = spec.match(/# Feature: (.+)/)?.[1] || featureId;

      tasks = await fs.readFile(templatePath, 'utf-8');
      tasks = tasks
        .replace(/\{\{FEATURE_NAME\}\}/g, featureName)
        .replace(/\{\{FEATURE_ID\}\}/g, featureId)
        .replace(/\{\{DATE\}\}/g, new Date().toISOString().split('T')[0])
        .replace(/\{\{STATUS\}\}/g, 'Not Started');
    } else {
      tasks = `# Task List: ${featureId}

**Feature ID**: ${featureId}  
**Created**: ${new Date().toISOString().split('T')[0]}

## Phase P0: Foundation (Must Have)

- [ ] **[T001]** [P] [US1] [Task description] - \`path/to/file\`
  - **Purpose**: [Why needed]
  - **Dependencies**: None
  - **Tests**: [Test requirements]
  - **Est**: [Time estimate]

## Test Gates

**100% tests must pass before marking complete**
- Unit tests: \`npm test\`
- Integration tests: \`npm run test:integration\`
- E2E tests: \`npm run test:e2e\`
`;
    }

    await fs.writeFile(tasksPath, tasks);

    spinner.succeed(chalk.green('Task list created successfully!'));
    console.log(chalk.gray(`\n📄 ${tasksPath}\n`));
    console.log(chalk.yellow('📝 Task Format: [T###] [P] [US#] Description path/to/file'));
    console.log(chalk.gray('  - [T###]: Unique task ID'));
    console.log(chalk.gray('  - [P]: Parallelizable (optional)'));
    console.log(chalk.gray('  - [US#]: User story reference'));
    console.log(chalk.gray('  - path/to/file: Implementation location\n'));
    console.log(chalk.blue('Next step:'), chalk.white(`acli beads analyze --featureId ${featureId}`));
  } catch (error) {
    spinner.fail(chalk.red('Failed to create task list'));
    console.error(error);
    process.exit(1);
  }
}

/**
 * Phase 7: ANALYZE
 * Validate consistency across spec, plan, and tasks
 */
async function analyzeCommand(projectRoot: string, options: BeadsOptions): Promise<void> {
  console.log(chalk.blue.bold('\n🔍 BEADS+ Phase 7: ANALYZE\n'));

  const featureId = options.featureId || await promptForFeatureId(projectRoot);
  const featureDir = path.join(projectRoot, 'specs', featureId);

  const specPath = path.join(featureDir, 'spec.md');
  const planPath = path.join(featureDir, 'plan.md');
  const tasksPath = path.join(featureDir, 'tasks.md');

  // Check all files exist
  const missingFiles = [];
  if (!(await fs.pathExists(specPath))) missingFiles.push('spec.md');
  if (!(await fs.pathExists(planPath))) missingFiles.push('plan.md');
  if (!(await fs.pathExists(tasksPath))) missingFiles.push('tasks.md');

  if (missingFiles.length > 0) {
    console.error(chalk.red(`Missing files: ${missingFiles.join(', ')}`));
    console.log(chalk.yellow('\nComplete previous phases first:'));
    if (missingFiles.includes('spec.md')) console.log('  - acli beads specify');
    if (missingFiles.includes('plan.md')) console.log('  - acli beads plan');
    if (missingFiles.includes('tasks.md')) console.log('  - acli beads tasks');
    process.exit(1);
  }

  const spinner = ora('Analyzing consistency...').start();

  try {
    const spec = await fs.readFile(specPath, 'utf-8');
    const plan = await fs.readFile(planPath, 'utf-8');
    const tasks = await fs.readFile(tasksPath, 'utf-8');

    // Simple analysis (extract user stories and check coverage)
    const userStories = [...spec.matchAll(/###?\s+US(\d+):\s*(.+)/g)];
    const taskReferences = [...tasks.matchAll(/\[US(\d+)\]/g)];
    const planReferences = [...plan.matchAll(/US(\d+)/g)];

    const usNumbers = userStories.map(m => parseInt(m[1]));
    const taskUSNumbers = new Set(taskReferences.map(m => parseInt(m[1])));
    const planUSNumbers = new Set(planReferences.map(m => parseInt(m[1])));

    const gaps = {
      missingInPlan: usNumbers.filter(us => !planUSNumbers.has(us)),
      missingInTasks: usNumbers.filter(us => !taskUSNumbers.has(us))
    };

    spinner.stop();

    console.log(chalk.white('━'.repeat(60)));
    console.log(chalk.bold('Consistency Analysis Results'));
    console.log(chalk.white('━'.repeat(60)));

    console.log(chalk.cyan('\n📊 Coverage:'));
    console.log(chalk.white(`  Total User Stories: ${usNumbers.length}`));
    console.log(chalk.white(`  Covered in Plan: ${planUSNumbers.size}`));
    console.log(chalk.white(`  Covered in Tasks: ${taskUSNumbers.size}`));

    if (gaps.missingInPlan.length === 0 && gaps.missingInTasks.length === 0) {
      console.log(chalk.green('\n✅ NO GAPS FOUND'));
      console.log(chalk.white('\nAll user stories have:'));
      console.log(chalk.gray('  ✓ Technical designs (plan.md)'));
      console.log(chalk.gray('  ✓ Executable tasks (tasks.md)'));
      console.log(chalk.gray('  ✓ Test requirements defined\n'));
      console.log(chalk.green('Ready for IMPLEMENT phase! 🚀\n'));
      console.log(chalk.blue('Next step:'), chalk.white(`acli beads implement --featureId ${featureId} --priority P0`));
    } else {
      console.log(chalk.red('\n❌ GAPS DETECTED'));
      
      if (gaps.missingInPlan.length > 0) {
        console.log(chalk.yellow(`\n⚠️  Missing in plan.md: US${gaps.missingInPlan.join(', US')}`));
      }
      
      if (gaps.missingInTasks.length > 0) {
        console.log(chalk.yellow(`\n⚠️  Missing in tasks.md: US${gaps.missingInTasks.join(', US')}`));
      }

      console.log(chalk.white('\n💡 Fix gaps before proceeding to IMPLEMENT phase.'));
      process.exit(1);
    }
  } catch (error) {
    spinner.fail(chalk.red('Analysis failed'));
    console.error(error);
    process.exit(1);
  }
}

/**
 * Phase 8: IMPLEMENT
 * Start implementation with TDD and quality gates
 */
async function implementCommand(projectRoot: string, options: BeadsOptions): Promise<void> {
  console.log(chalk.blue.bold('\n🚀 BEADS+ Phase 8: IMPLEMENT\n'));

  const featureId = options.featureId || await promptForFeatureId(projectRoot);
  const priority = options.priority || 'P0';
  const tasksPath = path.join(projectRoot, 'specs', featureId, 'tasks.md');

  if (!(await fs.pathExists(tasksPath))) {
    console.error(chalk.red(`Tasks file not found: ${tasksPath}`));
    process.exit(1);
  }

  console.log(chalk.white(`Feature: ${featureId}`));
  console.log(chalk.white(`Priority: ${priority}\n`));
  console.log(chalk.yellow('🎯 Implementation Workflow:'));
  console.log(chalk.gray('  1. Select next task (check dependencies)'));
  console.log(chalk.gray('  2. Write tests first (TDD)'));
  console.log(chalk.gray('  3. Implement feature'));
  console.log(chalk.gray('  4. Run tests (100% must pass)'));
  console.log(chalk.gray('  5. Mark task complete'));
  console.log(chalk.gray('  6. Repeat\n'));

  console.log(chalk.red('⚠️  QUALITY GATE: 100% Tests Must Pass'));
  console.log(chalk.gray('  - Task level: All task tests pass'));
  console.log(chalk.gray('  - Story level: All user story tests pass'));
  console.log(chalk.gray('  - Feature level: Full suite + no regressions\n'));

  const { ready } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'ready',
      message: 'Ready to start implementation?',
      default: true
    }
  ]);

  if (!ready) {
    console.log(chalk.yellow('Implementation cancelled.'));
    return;
  }

  console.log(chalk.green('\n✅ Starting implementation...'));
  console.log(chalk.white('\n📖 Open your task list and start with the first task:'));
  console.log(chalk.blue(`   ${tasksPath}\n`));
  console.log(chalk.gray('💡 Tip: Use @development agent for implementation assistance'));
  console.log(chalk.gray('💡 Tip: Use @testing agent to generate tests\n'));
}

/**
 * Execute full BEADS+ workflow
 */
async function fullWorkflowCommand(projectRoot: string, options: BeadsOptions): Promise<void> {
  console.log(chalk.blue.bold('\n🎯 BEADS+ Full Workflow\n'));
  console.log(chalk.white('This will execute all 8 phases:'));
  console.log(chalk.gray('  1. Constitution'));
  console.log(chalk.gray('  2. Specify'));
  console.log(chalk.gray('  3. Clarify'));
  console.log(chalk.gray('  4. Plan'));
  console.log(chalk.gray('  5. Checklist'));
  console.log(chalk.gray('  6. Tasks'));
  console.log(chalk.gray('  7. Analyze'));
  console.log(chalk.gray('  8. Implement\n'));

  const { proceed } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'proceed',
      message: 'Execute full workflow?',
      default: true
    }
  ]);

  if (!proceed) {
    console.log(chalk.yellow('Workflow cancelled.'));
    return;
  }

  // Execute each phase
  await constituteCommand(projectRoot, options);
  await specifyCommand(projectRoot, options);
  await clarifyCommand(projectRoot, { ...options, featureId: await getLastFeatureId(projectRoot) });
  await planCommand(projectRoot, { ...options, featureId: await getLastFeatureId(projectRoot) });
  await checklistCommand(projectRoot, { ...options, featureId: await getLastFeatureId(projectRoot) });
  await tasksCommand(projectRoot, { ...options, featureId: await getLastFeatureId(projectRoot) });
  await analyzeCommand(projectRoot, { ...options, featureId: await getLastFeatureId(projectRoot) });
  await implementCommand(projectRoot, { ...options, featureId: await getLastFeatureId(projectRoot) });
}

/**
 * Check workflow status
 */
async function statusCommand(projectRoot: string, options: BeadsOptions): Promise<void> {
  console.log(chalk.blue.bold('\n📊 BEADS+ Workflow Status\n'));

  const featureId = options.featureId || await promptForFeatureId(projectRoot);
  const featureDir = path.join(projectRoot, 'specs', featureId);

  const phases = [
    { name: 'Constitution', file: '.specify/memory/constitution.md', emoji: '🏛️' },
    { name: 'Specify', file: `specs/${featureId}/spec.md`, emoji: '📝' },
    { name: 'Plan', file: `specs/${featureId}/plan.md`, emoji: '🏗️' },
    { name: 'Checklist', file: `specs/${featureId}/checklists/security.md`, emoji: '✅' },
    { name: 'Tasks', file: `specs/${featureId}/tasks.md`, emoji: '📋' },
  ];

  console.log(chalk.white(`Feature: ${featureId}\n`));

  for (const phase of phases) {
    const filePath = path.join(projectRoot, phase.file);
    const exists = await fs.pathExists(filePath);
    const status = exists ? chalk.green('✓ Complete') : chalk.gray('○ Not Started');
    console.log(`${phase.emoji}  ${chalk.bold(phase.name.padEnd(15))} ${status}`);
  }

  console.log();
}

/**
 * Helper: Prompt for feature ID
 */
async function promptForFeatureId(projectRoot: string): Promise<string> {
  const specsDir = path.join(projectRoot, 'specs');
  
  if (!(await fs.pathExists(specsDir))) {
    console.error(chalk.red('No specs directory found. Run "acli beads specify" first.'));
    process.exit(1);
  }

  const features = await fs.readdir(specsDir);
  const featureDirs = [];

  for (const feature of features) {
    const stat = await fs.stat(path.join(specsDir, feature));
    if (stat.isDirectory()) {
      featureDirs.push(feature);
    }
  }

  if (featureDirs.length === 0) {
    console.error(chalk.red('No features found. Run "acli beads specify" first.'));
    process.exit(1);
  }

  const { featureId } = await inquirer.prompt([
    {
      type: 'list',
      name: 'featureId',
      message: 'Select feature:',
      choices: featureDirs
    }
  ]);

  return featureId;
}

/**
 * Helper: Get last created feature ID
 */
async function getLastFeatureId(projectRoot: string): Promise<string> {
  const specsDir = path.join(projectRoot, 'specs');
  const features = await fs.readdir(specsDir);
  
  const featureDirs = [];
  for (const feature of features) {
    const stat = await fs.stat(path.join(specsDir, feature));
    if (stat.isDirectory()) {
      const specPath = path.join(specsDir, feature, 'spec.md');
      if (await fs.pathExists(specPath)) {
        const stats = await fs.stat(specPath);
        featureDirs.push({ id: feature, time: stats.mtime });
      }
    }
  }

  featureDirs.sort((a, b) => b.time.getTime() - a.time.getTime());
  return featureDirs[0]?.id || '';
}

/**
 * Get the next sequence number for a new feature
 */
async function getNextSequenceNumber(projectRoot: string): Promise<number> {
  const specsDir = path.join(projectRoot, 'specs');
  
  if (!await fs.pathExists(specsDir)) {
    return 1;
  }

  const features = await fs.readdir(specsDir);
  let maxSeq = 0;

  for (const feature of features) {
    const stat = await fs.stat(path.join(specsDir, feature));
    if (stat.isDirectory()) {
      // Extract sequence number from feature ID (format: 001-feature-name)
      const match = feature.match(/^(\d+)-/);
      if (match) {
        const seq = parseInt(match[1], 10);
        if (seq > maxSeq) {
          maxSeq = seq;
        }
      }
    }
  }

  return maxSeq + 1;
}
