/**
 * Memory System Features - Usage Examples
 * 
 * This file demonstrates how to use the new memory system features:
 * - Memory Summarization for Long Handovers
 * - Automatic Learning Extraction from Git
 * - Memory Pruning & Deduplication
 * - Learning Templates
 */

import { AgentMemory } from '../src/core/AgentMemory';
import { listTemplates, getTemplate } from '../src/core/LearningTemplates';

const projectRoot = process.cwd();
const memory = new AgentMemory(projectRoot);

async function examples() {
  await memory.initialize();

  // ========================================================================
  // 1. Memory Summarization for Long Handovers
  // ========================================================================
  console.log('=== Feature 1: Memory Summarization ===\n');

  // Get handover with automatic summarization for old/large handovers
  const handover = await memory.getHandoverWithSummary('T001-user-auth', {
    maxTokens: 1500,  // Summarize if larger than 1500 tokens
    maxAgeDays: 7      // Summarize if older than 7 days
  });

  if (handover) {
    console.log(`Handover from @${handover.fromAgent} to @${handover.toAgent}`);
    console.log(`Iteration: ${handover.iteration}`);
    console.log(`Summary length: ${JSON.stringify(handover).length} chars`);
  }

  // ========================================================================
  // 2. Automatic Learning Extraction from Git
  // ========================================================================
  console.log('\n=== Feature 2: Git Learning Extraction ===\n');

  // Extract learnings from recent commits
  const gitLearnings = await memory.extractLearningsFromGit({
    commitRange: 'HEAD~20..HEAD',  // Last 20 commits
    autoSave: true                  // Automatically save as learnings
  });

  console.log(`Extracted ${gitLearnings.length} learnings from git history:`);
  gitLearnings.forEach((learning, i) => {
    console.log(`${i + 1}. [${learning.severity}] ${learning.problem}`);
    console.log(`   Category: ${learning.category}`);
    console.log(`   Tags: ${learning.tags?.join(', ')}`);
  });

  // ========================================================================
  // 3. Memory Pruning & Deduplication
  // ========================================================================
  console.log('\n=== Feature 3: Memory Pruning ===\n');

  // Run a dry-run first to see what would be changed
  const dryRunResult = await memory.pruneMemory({
    mergeSimilar: true,       // Merge similar learnings
    removeIneffective: true,  // Remove learnings with <30% success rate
    archiveOld: true,         // Archive learnings >1 year old
    dryRun: true              // Don't actually make changes
  });

  console.log('Dry run results:');
  console.log(`  Would merge: ${dryRunResult.merged} learnings`);
  console.log(`  Would remove: ${dryRunResult.removed} ineffective learnings`);
  console.log(`  Would archive: ${dryRunResult.archived} old learnings`);
  console.log('\nDetails:');
  dryRunResult.details.forEach(detail => console.log(`  - ${detail}`));

  // Actually run the pruning (remove dryRun flag)
  // const actualResult = await memory.pruneMemory({
  //   mergeSimilar: true,
  //   removeIneffective: true,
  //   archiveOld: true,
  //   dryRun: false
  // });

  // ========================================================================
  // 4. Learning Templates
  // ========================================================================
  console.log('\n=== Feature 4: Learning Templates ===\n');

  // List all available templates
  const templates = listTemplates();
  console.log(`Available templates: ${templates.length}`);
  console.log(templates.join(', '));

  // View a specific template
  const sqlInjectionTemplate = getTemplate('sql-injection');
  console.log('\nSQL Injection Template:');
  console.log(`  Category: ${sqlInjectionTemplate?.category}`);
  console.log(`  Severity: ${sqlInjectionTemplate?.severity}`);
  console.log(`  Problem: ${sqlInjectionTemplate?.problemTemplate}`);
  console.log(`  Required tags: ${sqlInjectionTemplate?.requiredTags.join(', ')}`);

  // Create a learning from template
  const sqlLearning = await memory.saveLearningFromTemplate(
    'sql-injection',
    {
      QUERY_LOCATION: 'src/auth/login.ts:45',
      'ORM/LIBRARY': 'TypeORM parameterized queries'
    },
    'quality'
  );

  if (sqlLearning) {
    console.log('\nCreated learning from template:');
    console.log(`  ID: ${sqlLearning.id}`);
    console.log(`  Problem: ${sqlLearning.problem}`);
    console.log(`  Resolution: ${sqlLearning.resolution}`);
    console.log(`  Tags: ${sqlLearning.tags.join(', ')}`);
  }

  // Use other templates
  console.log('\n=== More Template Examples ===\n');

  // XSS vulnerability
  await memory.saveLearningFromTemplate(
    'xss-vulnerability',
    {
      COMPONENT: 'UserProfileDisplay',
      'TEMPLATE/VIEW': 'profile.html',
      FRAMEWORK_METHOD: 'DOMPurify.sanitize()'
    },
    'security'
  );

  // Performance issue
  await memory.saveLearningFromTemplate(
    'n-plus-one-query',
    {
      DATABASE_OPERATION: 'User.findAll() with posts',
      'JOIN/EAGER_LOADING': 'include: [{ model: Post }]'
    },
    'development'
  );

  // Test failure
  await memory.saveLearningFromTemplate(
    'flaky-test',
    {
      TEST_NAME: 'test_user_creation_timestamp',
      'RACE_CONDITION/TIMING/EXTERNAL_SERVICE': 'system time resolution',
      'WAIT_MECHANISM/MOCK/RETRY_LOGIC': 'frozen time using jest.useFakeTimers()'
    },
    'testing'
  );

  // Architecture decision
  await memory.saveLearningFromTemplate(
    'architecture-decision',
    {
      ARCHITECTURE_DECISION: 'state management approach',
      REQUIREMENT: 'complex nested component state',
      OPTIONS: 'Context API, Redux, Zustand',
      SELECTED_APPROACH: 'Zustand',
      RATIONALE: 'simpler API, better TypeScript support, less boilerplate'
    },
    'architecture'
  );

  console.log('Created multiple learnings from templates');

  // ========================================================================
  // Combined Usage Example
  // ========================================================================
  console.log('\n=== Combined Usage Example ===\n');

  // 1. Extract learnings from recent git commits
  console.log('Step 1: Extract learnings from git history...');
  const recentLearnings = await memory.extractLearningsFromGit({
    commitRange: 'HEAD~10..HEAD',
    autoSave: true
  });
  console.log(`  Extracted ${recentLearnings.length} learnings`);

  // 2. Query relevant learnings for current work
  console.log('\nStep 2: Query relevant security learnings...');
  const securityLearnings = await memory.getRelevantLearnings({
    category: 'security',
    tags: ['sql-injection', 'xss']
  });
  console.log(`  Found ${securityLearnings.length} relevant security learnings`);

  // 3. Get summarized handover for continuity
  console.log('\nStep 3: Get summarized handover for task...');
  const taskHandover = await memory.getHandoverWithSummary('T001-user-auth');
  if (taskHandover) {
    console.log(`  Handover iteration ${taskHandover.iteration} loaded`);
    console.log(`  High priority actions: ${taskHandover.actionItems.high.length}`);
  } else {
    console.log('  No handover found (this is normal for new tasks)');
  }

  // 4. Periodically run memory pruning
  console.log('\nStep 4: Run memory pruning (dry run)...');
  const pruneResult = await memory.pruneMemory({
    mergeSimilar: true,
    removeIneffective: true,
    archiveOld: true,
    dryRun: true
  });
  console.log(`  Would optimize: ${pruneResult.merged + pruneResult.removed + pruneResult.archived} entries`);

  console.log('\n=== Examples Complete ===');
}

// Run examples if this file is executed directly
if (require.main === module) {
  examples().catch(console.error);
}

export { examples };
