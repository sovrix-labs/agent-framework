# Memory System - Quick Reference

## New Features Added

### 1. Memory Summarization
**Purpose**: Reduce context window usage for large/old handovers

```typescript
const handover = await memory.getHandoverWithSummary('T001-task-id', {
  maxTokens: 1500,  // Trigger summarization if > 1500 tokens
  maxAgeDays: 7     // Trigger summarization if > 7 days old
});
```

**What gets summarized**:
- Implementation summaries truncated to 200 chars
- Only top 3 key decisions kept
- Only critical/high severity issues preserved
- Low-priority action items dropped
- Notes truncated to 100 chars

---

### 2. Git Learning Extraction
**Purpose**: Automatically capture learnings from commit history

```typescript
// Extract from last 20 commits and auto-save
const learnings = await memory.extractLearningsFromGit({
  commitRange: 'HEAD~20..HEAD',
  autoSave: true
});
```

**What commits are processed**:
- Keywords: `fix:`, `bug:`, `security:`, `hotfix`, `patch`, `vulnerability`, `performance`, `optimiz`, `refactor:`

**Scheduling**:
```bash
# Run weekly via cron
0 0 * * 0 npx ts-node scripts/extract-learnings.ts

# Or add to git hooks
# .git/hooks/post-merge
#!/bin/bash
npx ts-node scripts/extract-learnings.ts
```

---

### 3. Memory Pruning
**Purpose**: Clean up duplicate, ineffective, and old learnings

```typescript
// Dry run first (recommended)
const preview = await memory.pruneMemory({
  mergeSimilar: true,       // Merge learnings with ≥50% tag overlap
  removeIneffective: true,  // Remove if <30% success rate (≥5 uses)
  archiveOld: true,         // Archive if >1 year old
  dryRun: true              // Preview only
});

console.log(`Would merge: ${preview.merged}`);
console.log(`Would remove: ${preview.removed}`);
console.log(`Would archive: ${preview.archived}`);

// Then run for real
const result = await memory.pruneMemory({
  mergeSimilar: true,
  removeIneffective: true,
  archiveOld: true,
  dryRun: false  // Actually apply
});
```

**Recommended schedule**:
- Weekly: `mergeSimilar + removeIneffective`
- Monthly: Full prune including `archiveOld`

---

### 4. Learning Templates
**Purpose**: Standardized learning creation for common issues

```typescript
// List all templates
import { listTemplates, getTemplate } from './core/LearningTemplates';
const templates = listTemplates();
// => ['sql-injection', 'xss-vulnerability', 'n-plus-one-query', ...]

// Create from template
const learning = await memory.saveLearningFromTemplate(
  'sql-injection',
  {
    QUERY_LOCATION: 'src/auth/login.ts:45',
    'ORM/LIBRARY': 'TypeORM parameterized queries'
  },
  'quality'  // agent name
);
```

**Available templates**:

**Security** (severity: critical):
- `sql-injection` - SQL injection vulnerabilities
- `xss-vulnerability` - Cross-site scripting
- `authentication-bypass` - Auth/authz failures
- `security-vulnerability` - General security issues

**Performance** (severity: high):
- `n-plus-one-query` - Database query problems
- `memory-leak` - Memory management issues
- `performance-issue` - General performance

**Testing** (severity: high/medium):
- `test-failure` - General test failures
- `flaky-test` - Intermittent failures

**Quality** (severity: medium):
- `code-smell` - Code quality issues
- `tight-coupling` - Architectural coupling
- `missing-error-handling` - Error handling gaps

**Architecture** (severity: low):
- `architecture-decision` - ADR documentation
- `successful-pattern` - Working implementations

---

## Integration Patterns

### Pattern 1: Weekly Maintenance
```typescript
// scripts/weekly-memory-maintenance.ts
async function weeklyMaintenance() {
  const memory = new AgentMemory(process.cwd());
  
  // 1. Extract learnings from last week's commits
  console.log('Extracting learnings from git...');
  const extracted = await memory.extractLearningsFromGit({
    commitRange: 'HEAD~50..HEAD',
    autoSave: true
  });
  console.log(`Extracted ${extracted.length} learnings`);
  
  // 2. Prune ineffective and merge duplicates
  console.log('Pruning memory...');
  const pruned = await memory.pruneMemory({
    mergeSimilar: true,
    removeIneffective: true,
    archiveOld: false,  // Monthly only
    dryRun: false
  });
  console.log(`Merged: ${pruned.merged}, Removed: ${pruned.removed}`);
}
```

### Pattern 2: Agent Integration
```typescript
// In your agent code
class QualityAgent {
  async reviewCode(task: Task) {
    const memory = new AgentMemory(this.projectRoot);
    
    // Get summarized handover
    const handover = await memory.getHandoverWithSummary(task.id);
    
    // Get relevant learnings
    const learnings = await memory.getRelevantLearnings({
      category: 'quality',
      tags: this.extractTags(task.description)
    });
    
    // Perform review...
    const issues = await this.analyze(task, learnings);
    
    // Save critical issues as learnings using templates
    for (const issue of issues.filter(i => i.severity === 'critical')) {
      if (issue.type === 'sql-injection') {
        await memory.saveLearningFromTemplate(
          'sql-injection',
          { QUERY_LOCATION: issue.location },
          'quality'
        );
      }
    }
  }
}
```

### Pattern 3: CI/CD Integration
```yaml
# .github/workflows/memory-maintenance.yml
name: Memory System Maintenance

on:
  schedule:
    - cron: '0 0 * * 0'  # Weekly on Sunday
  workflow_dispatch:      # Manual trigger

jobs:
  maintain:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
        with:
          fetch-depth: 0  # Full history for git extraction
      
      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Extract learnings from commits
        run: npx ts-node scripts/extract-learnings.ts
      
      - name: Prune memory
        run: npx ts-node scripts/prune-memory.ts
      
      - name: Commit updated memory
        run: |
          git config user.name "Memory Bot"
          git config user.email "bot@example.com"
          git add .specify/memory/
          git commit -m "chore: update memory system [skip ci]" || true
          git push
```

---

## Performance Tips

1. **Handover Summarization**:
   - Set `maxTokens` based on your model's context window
   - Adjust `maxAgeDays` based on iteration frequency
   - Summaries are cached automatically

2. **Git Extraction**:
   - Limit `commitRange` to recent commits (20-50)
   - Run in background/CI, not synchronously
   - Consider rate limiting if processing many commits

3. **Memory Pruning**:
   - Always run with `dryRun: true` first
   - Review `details` array before applying
   - Schedule during low-activity periods
   - Keep merged learnings for audit trail

4. **Template Usage**:
   - Cache template instances if reusing frequently
   - Add project-specific templates for recurring patterns
   - Validate variable substitution output

---

## Troubleshooting

**Issue**: Git extraction fails with "not a git repository"
```typescript
// Solution: Ensure running in project root with .git directory
const memory = new AgentMemory(findGitRoot(process.cwd()));
```

**Issue**: Memory pruning deletes too many learnings
```typescript
// Solution: Adjust thresholds or use more specific criteria
await memory.pruneMemory({
  mergeSimilar: true,
  removeIneffective: false,  // Disable if too aggressive
  archiveOld: false,
  dryRun: false
});
```

**Issue**: Template variables not substituted
```typescript
// Solution: Check exact placeholder names (case-sensitive)
const template = getTemplate('sql-injection');
console.log(template.problemTemplate);
// Shows: "SQL injection vulnerability in [QUERY_LOCATION]"
// Use: { QUERY_LOCATION: '...' }  NOT { query_location: '...' }
```

**Issue**: Summaries lose critical information
```typescript
// Solution: Lower maxTokens threshold or adjust logic
const handover = await memory.getHandoverWithSummary(taskId, {
  maxTokens: 3000,  // Allow more detail
  maxAgeDays: 14    // Only summarize older handovers
});
```

---

## API Reference

### AgentMemory Methods (New)

```typescript
// Memory Summarization
getHandoverWithSummary(
  taskId: string,
  options?: { maxTokens?: number; maxAgeDays?: number }
): Promise<Handover | null>

// Git Extraction
extractLearningsFromGit(
  options?: { commitRange?: string; autoSave?: boolean }
): Promise<Array<Partial<Learning>>>

// Memory Pruning
pruneMemory(
  options?: {
    mergeSimilar?: boolean;
    removeIneffective?: boolean;
    archiveOld?: boolean;
    dryRun?: boolean;
  }
): Promise<{
  merged: number;
  removed: number;
  archived: number;
  details: string[];
}>

// Template Usage
saveLearningFromTemplate(
  templateKey: string,
  variables: Record<string, string>,
  agent: string
): Promise<Learning | null>
```

### LearningTemplates Module

```typescript
// List all template keys
listTemplates(): string[]

// Get template details
getTemplate(key: string): LearningTemplate | null

// Apply template with variables
applyTemplate(
  templateKey: string,
  variables: Record<string, string>
): Partial<Learning> | null
```

---

For complete examples, see `examples/memory-features-usage.ts`
For implementation details, see `MEMORY_SYSTEM.md`
