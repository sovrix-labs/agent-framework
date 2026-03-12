import * as path from 'path';
import * as fs from 'fs-extra';

export interface Learning {
  id: string;
  date: string;
  category: 'security' | 'performance' | 'quality' | 'testing' | 'architecture' | 'other';
  severity: 'critical' | 'high' | 'medium' | 'low';
  agent: string;
  problem: string;
  rootCause: string;
  resolution: string;
  prevention: string;
  codeBefore?: string;
  codeAfter?: string;
  language?: string;
  tags: string[];
  relatedLearnings: string[];
  applyCount: number;
  successRate: number;
}

export interface Handover {
  taskId: string;
  taskDescription: string;
  fromAgent: string;
  toAgent: string;
  date: string;
  iteration: number;
  phase: string;
  priority: string;
  filesChanged: string[];
  implementationSummary: string;
  keyDecisions: string[];
  qualityIssues: Array<{severity: string; message: string; file?: string; line?: number}>;
  testFailures: Array<{test: string; reason: string; file?: string}>;
  securityConcerns: Array<{severity: string; issue: string; recommendation: string}>;
  actionItems: {
    high: string[];
    medium: string[];
    low: string[];
  };
  context: {
    relatedTasks: string[];
    dependencies: string[];
    constraints: string[];
  };
  learnings: {
    successes: string[];
    failures: string[];
    resolutions: string[];
    pastIssueReferences: string[];
  };
  nextSteps: string[];
  notes: string;
}

export class AgentMemory {
  private projectRoot: string;
  private memoryDir: string;
  private learningsDir: string;
  private handoversDir: string;

  constructor(projectRoot: string) {
    this.projectRoot = projectRoot;
    this.memoryDir = path.join(projectRoot, '.specify', 'memory');
    this.learningsDir = path.join(this.memoryDir, 'learnings');
    this.handoversDir = path.join(this.memoryDir, 'handovers');
  }

  /**
   * Initialize memory directories
   */
  async initialize(): Promise<void> {
    await fs.ensureDir(this.memoryDir);
    await fs.ensureDir(this.learningsDir);
    await fs.ensureDir(this.handoversDir);

    // Create index files if they don't exist
    const learningsIndexPath = path.join(this.learningsDir, 'index.json');
    if (!await fs.pathExists(learningsIndexPath)) {
      await fs.writeJson(learningsIndexPath, { learnings: [], lastUpdated: new Date().toISOString() }, { spaces: 2 });
    }

    const handoversIndexPath = path.join(this.handoversDir, 'index.json');
    if (!await fs.pathExists(handoversIndexPath)) {
      await fs.writeJson(handoversIndexPath, { handovers: [], lastUpdated: new Date().toISOString() }, { spaces: 2 });
    }
  }

  /**
   * Save a new learning
   */
  async saveLearning(learning: Omit<Learning, 'id' | 'date' | 'applyCount' | 'successRate'>): Promise<Learning> {
    await this.initialize();

    const learningId = `L${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const completeLearning: Learning = {
      ...learning,
      id: learningId,
      date: new Date().toISOString(),
      applyCount: 0,
      successRate: 0
    };

    // Save individual learning file
    const learningPath = path.join(this.learningsDir, `${learningId}.json`);
    await fs.writeJson(learningPath, completeLearning, { spaces: 2 });

    // Update index
    const indexPath = path.join(this.learningsDir, 'index.json');
    const index = await fs.readJson(indexPath);
    index.learnings.push({
      id: learningId,
      category: learning.category,
      severity: learning.severity,
      agent: learning.agent,
      date: completeLearning.date,
      tags: learning.tags
    });
    index.lastUpdated = new Date().toISOString();
    await fs.writeJson(indexPath, index, { spaces: 2 });

    // Create markdown version for easy reading
    await this.createLearningMarkdown(completeLearning);

    return completeLearning;
  }

  /**
   * Get relevant learnings for a task
   */
  async getRelevantLearnings(context: {
    category?: string;
    tags?: string[];
    agent?: string;
    files?: string[];
  }): Promise<Learning[]> {
    await this.initialize();

    const indexPath = path.join(this.learningsDir, 'index.json');
    if (!await fs.pathExists(indexPath)) {
      return [];
    }

    const index = await fs.readJson(indexPath);
    const relevantLearnings: Learning[] = [];

    for (const indexEntry of index.learnings) {
      // Load full learning
      const learningPath = path.join(this.learningsDir, `${indexEntry.id}.json`);
      if (await fs.pathExists(learningPath)) {
        const learning: Learning = await fs.readJson(learningPath);

        // Check relevance
        let isRelevant = false;

        if (context.category && learning.category === context.category) {
          isRelevant = true;
        }

        if (context.agent && learning.agent === context.agent) {
          isRelevant = true;
        }

        if (context.tags && context.tags.some(tag => learning.tags.includes(tag))) {
          isRelevant = true;
        }

        if (isRelevant) {
          relevantLearnings.push(learning);
        }
      }
    }

    // Sort by severity (critical first) and date (recent first)
    return relevantLearnings.sort((a, b) => {
      const severityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
      const severityDiff = severityOrder[a.severity] - severityOrder[b.severity];
      if (severityDiff !== 0) return severityDiff;
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
  }

  /**
   * Save a handover document
   */
  async saveHandover(handover: Handover): Promise<void> {
    await this.initialize();

    const handoverId = `${handover.taskId}-${handover.fromAgent}-to-${handover.toAgent}-${Date.now()}`;
    const handoverPath = path.join(this.handoversDir, `${handoverId}.json`);
    
    await fs.writeJson(handoverPath, handover, { spaces: 2 });

    // Update index
    const indexPath = path.join(this.handoversDir, 'index.json');
    const index = await fs.readJson(indexPath);
    index.handovers.push({
      id: handoverId,
      taskId: handover.taskId,
      fromAgent: handover.fromAgent,
      toAgent: handover.toAgent,
      date: handover.date,
      iteration: handover.iteration
    });
    index.lastUpdated = new Date().toISOString();
    await fs.writeJson(indexPath, index, { spaces: 2 });

    // Create markdown version for easy reading
    await this.createHandoverMarkdown(handover, handoverId);
  }

  /**
   * Get latest handover for a task
   */
  async getLatestHandover(taskId: string, toAgent?: string): Promise<Handover | null> {
    await this.initialize();

    const indexPath = path.join(this.handoversDir, 'index.json');
    if (!await fs.pathExists(indexPath)) {
      return null;
    }

    const index = await fs.readJson(indexPath);
    const taskHandovers = index.handovers
      .filter((h: any) => h.taskId === taskId && (!toAgent || h.toAgent === toAgent))
      .sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime());

    if (taskHandovers.length === 0) {
      return null;
    }

    const latestHandoverId = taskHandovers[0].id;
    const handoverPath = path.join(this.handoversDir, `${latestHandoverId}.json`);
    
    if (await fs.pathExists(handoverPath)) {
      return await fs.readJson(handoverPath);
    }

    return null;
  }

  /**
   * Increment apply count for a learning
   */
  async recordLearningApplication(learningId: string, success: boolean): Promise<void> {
    const learningPath = path.join(this.learningsDir, `${learningId}.json`);
    if (!await fs.pathExists(learningPath)) {
      return;
    }

    const learning: Learning = await fs.readJson(learningPath);
    learning.applyCount++;
    
    // Update success rate
    const successCount = Math.round(learning.successRate * (learning.applyCount - 1) / 100);
    const newSuccessCount = successCount + (success ? 1 : 0);
    learning.successRate = Math.round((newSuccessCount / learning.applyCount) * 100);

    await fs.writeJson(learningPath, learning, { spaces: 2 });
    await this.createLearningMarkdown(learning);
  }

  /**
   * Create markdown version of learning
   */
  private async createLearningMarkdown(learning: Learning): Promise<void> {
    const mdPath = path.join(this.learningsDir, `${learning.id}.md`);
    
    const content = `# Learning Entry

**ID**: ${learning.id}  
**Date**: ${new Date(learning.date).toLocaleString()}  
**Category**: ${learning.category}  
**Severity**: ${learning.severity}  
**Agent**: @${learning.agent}

## Problem Description

${learning.problem}

## Root Cause

${learning.rootCause}

## Resolution

${learning.resolution}

## Prevention Strategy

${learning.prevention}

${learning.codeBefore ? `
## Code Examples

### Before (Problem)
\`\`\`${learning.language || 'typescript'}
${learning.codeBefore}
\`\`\`

### After (Fixed)
\`\`\`${learning.language || 'typescript'}
${learning.codeAfter || ''}
\`\`\`
` : ''}

## Related Learnings

${learning.relatedLearnings.map(l => `- ${l}`).join('\n') || 'None'}

## Tags

${learning.tags.join(', ')}

---

**Times Applied**: ${learning.applyCount}  
**Success Rate**: ${learning.successRate}%
`;

    await fs.writeFile(mdPath, content, 'utf-8');
  }

  /**
   * Create markdown version of handover
   */
  private async createHandoverMarkdown(handover: Handover, handoverId: string): Promise<void> {
    const mdPath = path.join(this.handoversDir, `${handoverId}.md`);
    
    const content = `# Handover Document

**Task**: ${handover.taskId} - ${handover.taskDescription}  
**From**: @${handover.fromAgent}  
**To**: @${handover.toAgent}  
**Date**: ${new Date(handover.date).toLocaleString()}  
**Iteration**: ${handover.iteration}

## Overview

### Task Status
- **Phase**: ${handover.phase}
- **Priority**: ${handover.priority}

## Work Completed

### Files Changed
${handover.filesChanged.map(f => `- ${f}`).join('\n')}

### Implementation Summary
${handover.implementationSummary}

### Key Decisions
${handover.keyDecisions.map(d => `- ${d}`).join('\n')}

## Issues Identified

${handover.qualityIssues.length > 0 ? `
### Quality Issues
${handover.qualityIssues.map(i => `- **[${i.severity}]** ${i.message}${i.file ? ` (${i.file}${i.line ? `:${i.line}` : ''})` : ''}`).join('\n')}
` : ''}

${handover.testFailures.length > 0 ? `
### Test Failures
${handover.testFailures.map(t => `- **${t.test}**: ${t.reason}${t.file ? ` (${t.file})` : ''}`).join('\n')}
` : ''}

${handover.securityConcerns.length > 0 ? `
### Security Concerns
${handover.securityConcerns.map(s => `- **[${s.severity}]** ${s.issue}\n  - Recommendation: ${s.recommendation}`).join('\n')}
` : ''}

## Action Items for @${handover.toAgent}

${handover.actionItems.high.length > 0 ? `
### High Priority
${handover.actionItems.high.map((a, i) => `${i + 1}. ${a}`).join('\n')}
` : ''}

${handover.actionItems.medium.length > 0 ? `
### Medium Priority
${handover.actionItems.medium.map((a, i) => `${i + 1}. ${a}`).join('\n')}
` : ''}

${handover.actionItems.low.length > 0 ? `
### Nice to Have
${handover.actionItems.low.map((a, i) => `${i + 1}. ${a}`).join('\n')}
` : ''}

## Context & Background

${handover.context.relatedTasks.length > 0 ? `
### Related Tasks
${handover.context.relatedTasks.map(t => `- ${t}`).join('\n')}
` : ''}

${handover.context.dependencies.length > 0 ? `
### Dependencies
${handover.context.dependencies.map(d => `- ${d}`).join('\n')}
` : ''}

${handover.context.constraints.length > 0 ? `
### Technical Constraints
${handover.context.constraints.map(c => `- ${c}`).join('\n')}
` : ''}

## Learnings & Resolutions

${handover.learnings.successes.length > 0 ? `
### What Worked Well
${handover.learnings.successes.map(s => `- ${s}`).join('\n')}
` : ''}

${handover.learnings.failures.length > 0 ? `
### What Didn't Work
${handover.learnings.failures.map(f => `- ${f}`).join('\n')}
` : ''}

${handover.learnings.resolutions.length > 0 ? `
### Resolutions Applied
${handover.learnings.resolutions.map(r => `- ${r}`).join('\n')}
` : ''}

${handover.learnings.pastIssueReferences.length > 0 ? `
### References to Past Issues
${handover.learnings.pastIssueReferences.map(p => `- ${p}`).join('\n')}
` : ''}

## Next Steps

${handover.nextSteps.map((s, i) => `${i + 1}. ${s}`).join('\n')}

${handover.notes ? `
## Notes

${handover.notes}
` : ''}

---

**Handover Verification**:
- [x] All context provided
- [x] Issues clearly documented
- [x] Action items prioritized
- [x] Resolutions referenced
- [x] Knowledge captured
`;

    await fs.writeFile(mdPath, content, 'utf-8');
  }

  /**
   * Search learnings by tags or category
   */
  async searchLearnings(query: {
    categories?: string[];
    tags?: string[];
    agents?: string[];
    minSeverity?: 'low' | 'medium' | 'high' | 'critical';
  }): Promise<Learning[]> {
    await this.initialize();

    const indexPath = path.join(this.learningsDir, 'index.json');
    if (!await fs.pathExists(indexPath)) {
      return [];
    }

    const index = await fs.readJson(indexPath);
    const results: Learning[] = [];

    const severityOrder = { low: 0, medium: 1, high: 2, critical: 3 };
    const minSeverityLevel = query.minSeverity ? severityOrder[query.minSeverity] : -1;

    for (const indexEntry of index.learnings) {
      // Filter by criteria
      if (query.categories && !query.categories.includes(indexEntry.category)) {
        continue;
      }

      if (query.agents && !query.agents.includes(indexEntry.agent)) {
        continue;
      }

      if (query.minSeverity && indexEntry.severity in severityOrder && 
          severityOrder[indexEntry.severity as keyof typeof severityOrder] < minSeverityLevel) {
        continue;
      }

      // Load full learning
      const learningPath = path.join(this.learningsDir, `${indexEntry.id}.json`);
      if (await fs.pathExists(learningPath)) {
        const learning: Learning = await fs.readJson(learningPath);

        if (query.tags && !query.tags.some(tag => learning.tags.includes(tag))) {
          continue;
        }

        results.push(learning);
      }
    }

    return results;
  }
}
