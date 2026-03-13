import * as path from 'path';
import * as fs from 'fs-extra';
import { execSync } from 'child_process';
import { applyTemplate } from './LearningTemplates';

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

  // ========================================================================
  // NEW FEATURES: Memory Summarization, Git Extraction, Pruning, Templates
  // ========================================================================

  /**
   * Get handover with summarization for older/larger handovers
   * Feature #2: Memory Summarization for Long Handovers
   */
  async getHandoverWithSummary(
    taskId: string,
    options: { maxTokens?: number; maxAgeDays?: number } = {}
  ): Promise<Handover | null> {
    const handover = await this.getLatestHandover(taskId);
    if (!handover) return null;

    const maxTokens = options.maxTokens || 2000;
    const maxAgeDays = options.maxAgeDays || 7;

    // Check if handover is old
    const age = Date.now() - new Date(handover.date).getTime();
    const isOld = age > maxAgeDays * 24 * 60 * 60 * 1000;

    // Estimate tokens (rough: 1 token ~= 4 characters)
    const estimatedTokens = JSON.stringify(handover).length / 4;

    if (isOld && estimatedTokens > maxTokens) {
      return await this.getSummarizedHandover(handover);
    }

    return handover;
  }

  /**
   * Get or create summarized version of handover
   */
  private async getSummarizedHandover(handover: Handover): Promise<Handover> {
    const handoverId = `${handover.taskId}-${handover.fromAgent}-to-${handover.toAgent}-${new Date(handover.date).getTime()}`;
    const summaryCache = path.join(this.handoversDir, `${handoverId}.summary.json`);

    // Check cache first
    if (await fs.pathExists(summaryCache)) {
      return await fs.readJson(summaryCache);
    }

    // Create summarized version
    const summarized: Handover = {
      ...handover,
      implementationSummary: this.truncateText(handover.implementationSummary, 200),
      keyDecisions: handover.keyDecisions.slice(0, 3), // Top 3 decisions only
      qualityIssues: handover.qualityIssues.filter(i => 
        i.severity === 'critical' || i.severity === 'high'
      ).slice(0, 5), // Only critical/high issues
      testFailures: handover.testFailures.slice(0, 5), // Top 5 failures
      actionItems: {
        high: handover.actionItems.high.slice(0, 5),
        medium: handover.actionItems.medium.slice(0, 3),
        low: [] // Drop low priority in summary
      },
      notes: this.truncateText(handover.notes, 100)
    };

    // Cache the summary
    await fs.writeJson(summaryCache, summarized, { spaces: 2 });

    return summarized;
  }

  /**
   * Truncate text to max length with ellipsis
   */
  private truncateText(text: string, maxLength: number): string {
    if (!text || text.length <= maxLength) return text;
    return text.substring(0, maxLength - 3) + '...';
  }

  /**
   * Extract learnings from git commit history
   * Feature #5: Automatic Learning Extraction from Git
   */
  async extractLearningsFromGit(options: {
    commitRange?: string;
    autoSave?: boolean;
  } = {}): Promise<Array<Partial<Learning>>> {
    const commitRange = options.commitRange || 'HEAD~20..HEAD';
    const autoSave = options.autoSave !== undefined ? options.autoSave : true;

    try {
      // Get git log with commit messages and diffs
      const logCommand = `git log ${commitRange} --pretty=format:'%H|%s|%b' --name-only`;
      const logOutput = execSync(logCommand, { 
        cwd: this.projectRoot,
        encoding: 'utf-8',
        maxBuffer: 10 * 1024 * 1024 // 10MB buffer
      });

      const learnings: Array<Partial<Learning>> = [];
      const commits = this.parseGitLog(logOutput);

      for (const commit of commits) {
        // Look for fix/bug/security commits
        if (this.isLearningCommit(commit.message)) {
          const learning = this.extractLearningFromCommit(commit);
          
          if (learning && autoSave) {
            await this.saveLearning({
              ...learning,
              agent: 'git-extractor',
              tags: [...(learning.tags || []), 'auto-extracted', 'git'],
              relatedLearnings: []
            } as any);
          }
          
          if (learning) {
            learnings.push(learning);
          }
        }
      }

      return learnings;
    } catch (error) {
      console.error('Error extracting learnings from git:', error);
      return [];
    }
  }

  /**
   * Parse git log output into commit objects
   */
  private parseGitLog(logOutput: string): Array<{
    hash: string;
    message: string;
    body: string;
    files: string[];
  }> {
    const commits: Array<{ hash: string; message: string; body: string; files: string[] }> = [];
    const lines = logOutput.split('\n');
    
    let currentCommit: any = null;
    
    for (const line of lines) {
      if (line.includes('|')) {
        // New commit header
        if (currentCommit) {
          commits.push(currentCommit);
        }
        const [hash, message, body] = line.split('|');
        currentCommit = { hash, message, body: body || '', files: [] };
      } else if (line.trim() && currentCommit) {
        // File name
        currentCommit.files.push(line.trim());
      }
    }
    
    if (currentCommit) {
      commits.push(currentCommit);
    }
    
    return commits;
  }

  /**
   * Check if commit message indicates a learning opportunity
   */
  private isLearningCommit(message: string): boolean {
    const learningKeywords = [
      /\bfix:/i,
      /\bbug:/i,
      /\bsecurity:/i,
      /\bhot\s*fix/i,
      /\bpatche?d?/i,
      /\bvulnerability/i,
      /\bperformance/i,
      /\boptimiz/i,
      /\brefactor:/i
    ];
    
    return learningKeywords.some(regex => regex.test(message));
  }

  /**
   * Extract learning from commit message and metadata
   */
  private extractLearningFromCommit(commit: {
    hash: string;
    message: string;
    body: string;
    files: string[];
  }): Partial<Learning> | null {
    const msg = commit.message.toLowerCase();
    
    // Determine category and severity
    let category: Learning['category'] = 'other';
    let severity: Learning['severity'] = 'medium';
    
    if (msg.includes('security') || msg.includes('vulnerability')) {
      category = 'security';
      severity = 'critical';
    } else if (msg.includes('performance') || msg.includes('optimiz')) {
      category = 'performance';
      severity = 'high';
    } else if (msg.includes('test')) {
      category = 'testing';
      severity = 'medium';
    } else if (msg.includes('refactor')) {
      category = 'quality';
      severity = 'low';
    }
    
    // Extract problem and resolution from commit message
    const problem = commit.message;
    const resolution = commit.body || 'See commit for details';
    
    // Generate tags from files and message
    const tags = this.generateTagsFromCommit(commit);
    
    return {
      category,
      severity,
      problem: `[Git] ${problem}`,
      rootCause: 'See commit diff for details',
      resolution,
      prevention: 'Review similar code patterns to prevent recurrence',
      tags,
      language: this.detectLanguageFromFiles(commit.files)
    };
  }

  /**
   * Generate tags from commit files and message
   */
  private generateTagsFromCommit(commit: { message: string; files: string[] }): string[] {
    const tags = new Set<string>();
    
    // Add tags from file extensions
    commit.files.forEach(file => {
      const ext = path.extname(file).toLowerCase();
      if (ext) {
        tags.add(ext.substring(1)); // Remove leading dot
      }
      
      // Add component tags
      const parts = file.split('/');
      if (parts.length > 1) {
        tags.add(parts[0]); // First directory
      }
    });
    
    // Add tags from commit message keywords
    const keywords = ['security', 'performance', 'bug', 'fix', 'test', 'refactor', 'optimization'];
    keywords.forEach(keyword => {
      if (commit.message.toLowerCase().includes(keyword)) {
        tags.add(keyword);
      }
    });
    
    return Array.from(tags).slice(0, 10); // Max 10 tags
  }

  /**
   * Detect primary language from file list
   */
  private detectLanguageFromFiles(files: string[]): string {
    const extensions = files.map(f => path.extname(f).toLowerCase());
    const extCounts: Record<string, number> = {};
    
    extensions.forEach(ext => {
      if (ext) {
        extCounts[ext] = (extCounts[ext] || 0) + 1;
      }
    });
    
    // Find most common extension
    const sorted = Object.entries(extCounts).sort((a, b) => b[1] - a[1]);
    if (sorted.length > 0) {
      const ext = sorted[0][0].substring(1); // Remove leading dot
      const langMap: Record<string, string> = {
        'ts': 'typescript',
        'js': 'javascript',
        'py': 'python',
        'java': 'java',
        'go': 'go',
        'rs': 'rust',
        'cpp': 'cpp',
        'c': 'c'
      };
      return langMap[ext] || ext;
    }
    
    return 'typescript';
  }

  /**
   * Prune and optimize memory storage
   * Feature #6: Memory Pruning & Deduplication
   */
  async pruneMemory(options: {
    mergeSimilar?: boolean;
    removeIneffective?: boolean;
    archiveOld?: boolean;
    dryRun?: boolean;
  } = {}): Promise<{
    merged: number;
    removed: number;
    archived: number;
    details: string[];
  }> {
    const dryRun = options.dryRun !== undefined ? options.dryRun : false;
    let merged = 0, removed = 0, archived = 0;
    const details: string[] = [];

    const indexPath = path.join(this.learningsDir, 'index.json');
    if (!await fs.pathExists(indexPath)) {
      return { merged, removed, archived, details };
    }

    const index = await fs.readJson(indexPath);
    const allLearnings: Learning[] = [];

    // Load all learnings
    for (const entry of index.learnings) {
      const learningPath = path.join(this.learningsDir, `${entry.id}.json`);
      if (await fs.pathExists(learningPath)) {
        allLearnings.push(await fs.readJson(learningPath));
      }
    }

    // 1. Merge similar learnings
    if (options.mergeSimilar) {
      const duplicates = this.findDuplicateLearnings(allLearnings);
      
      for (const group of duplicates) {
        if (group.length > 1) {
          const merged_learning = this.mergeLearningGroup(group);
          details.push(`Merge: ${group.map(l => l.id).join(', ')} -> ${merged_learning.id}`);
          
          if (!dryRun) {
            // Save merged learning
            const learningPath = path.join(this.learningsDir, `${merged_learning.id}.json`);
            await fs.writeJson(learningPath, merged_learning, { spaces: 2 });
            await this.createLearningMarkdown(merged_learning);
            
            // Remove old learnings
            for (let i = 1; i < group.length; i++) {
              await this.removeLearning(group[i].id);
            }
          }
          
          merged += group.length - 1;
        }
      }
    }

    // 2. Remove ineffective learnings (low success rate)
    if (options.removeIneffective) {
      const ineffective = allLearnings.filter(l => 
        l.applyCount >= 5 && l.successRate < 30
      );
      
      for (const learning of ineffective) {
        details.push(`Remove ineffective: ${learning.id} (${learning.successRate}% success)`);
        
        if (!dryRun) {
          await this.removeLearning(learning.id);
        }
        
        removed++;
      }
    }

    // 3. Archive old learnings (>1 year)
    if (options.archiveOld) {
      const oneYearAgo = Date.now() - 365 * 24 * 60 * 60 * 1000;
      const old = allLearnings.filter(l => 
        new Date(l.date).getTime() < oneYearAgo
      );
      
      for (const learning of old) {
        details.push(`Archive old: ${learning.id} (${learning.date})`);
        
        if (!dryRun) {
          await this.archiveLearning(learning.id);
        }
        
        archived++;
      }
    }

    return { merged, removed, archived, details };
  }

  /**
   * Find duplicate or very similar learnings
   */
  private findDuplicateLearnings(learnings: Learning[]): Learning[][] {
    const groups: Learning[][] = [];
    const processed = new Set<string>();

    for (const learning of learnings) {
      if (processed.has(learning.id)) continue;

      const similar = learnings.filter(other => 
        !processed.has(other.id) &&
        this.areLearningsSimilar(learning, other)
      );

      if (similar.length > 1) {
        groups.push(similar);
        similar.forEach(l => processed.add(l.id));
      }
    }

    return groups;
  }

  /**
   * Check if two learnings are similar enough to merge
   */
  private areLearningsSimilar(a: Learning, b: Learning): boolean {
    // Same category and severity
    if (a.category !== b.category) return false;
    
    // Similar tags (at least 50% overlap)
    const commonTags = a.tags.filter(tag => b.tags.includes(tag));
    const tagSimilarity = commonTags.length / Math.max(a.tags.length, b.tags.length);
    if (tagSimilarity < 0.5) return false;
    
    // Similar problem text (simple word overlap check)
    const aWords = new Set(a.problem.toLowerCase().split(/\s+/));
    const bWords = new Set(b.problem.toLowerCase().split(/\s+/));
    const commonWords = Array.from(aWords).filter(w => bWords.has(w) && w.length > 3);
    const wordSimilarity = commonWords.length / Math.max(aWords.size, bWords.size);
    
    return wordSimilarity > 0.4;
  }

  /**
   * Merge a group of similar learnings into one
   */
  private mergeLearningGroup(group: Learning[]): Learning {
    // Sort by success rate and apply count
    const sorted = group.sort((a, b) => {
      const scoreA = a.successRate * a.applyCount;
      const scoreB = b.successRate * b.applyCount;
      return scoreB - scoreA;
    });

    const best = sorted[0];
    
    // Combine information
    const merged: Learning = {
      ...best,
      id: `L${Date.now()}-merged-${Math.random().toString(36).substr(2, 6)}`,
      date: new Date().toISOString(),
      applyCount: group.reduce((sum, l) => sum + l.applyCount, 0),
      successRate: Math.round(
        group.reduce((sum, l) => sum + l.successRate * l.applyCount, 0) /
        group.reduce((sum, l) => sum + l.applyCount, 0)
      ),
      tags: Array.from(new Set(group.flatMap(l => l.tags))),
      relatedLearnings: group.map(l => l.id)
    };

    return merged;
  }

  /**
   * Remove a learning from the system
   */
  private async removeLearning(learningId: string): Promise<void> {
    const learningPath = path.join(this.learningsDir, `${learningId}.json`);
    const mdPath = path.join(this.learningsDir, `${learningId}.md`);
    
    if (await fs.pathExists(learningPath)) {
      await fs.remove(learningPath);
    }
    
    if (await fs.pathExists(mdPath)) {
      await fs.remove(mdPath);
    }
    
    // Update index
    const indexPath = path.join(this.learningsDir, 'index.json');
    const index = await fs.readJson(indexPath);
    index.learnings = index.learnings.filter((l: any) => l.id !== learningId);
    index.lastUpdated = new Date().toISOString();
    await fs.writeJson(indexPath, index, { spaces: 2 });
  }

  /**
   * Archive a learning (move to archive directory)
   */
  private async archiveLearning(learningId: string): Promise<void> {
    const archiveDir = path.join(this.learningsDir, 'archive');
    await fs.ensureDir(archiveDir);
    
    const learningPath = path.join(this.learningsDir, `${learningId}.json`);
    const mdPath = path.join(this.learningsDir, `${learningId}.md`);
    const archivePath = path.join(archiveDir, `${learningId}.json`);
    const archiveMdPath = path.join(archiveDir, `${learningId}.md`);
    
    if (await fs.pathExists(learningPath)) {
      await fs.move(learningPath, archivePath);
    }
    
    if (await fs.pathExists(mdPath)) {
      await fs.move(mdPath, archiveMdPath);
    }
    
    // Update index (remove from active)
    const indexPath = path.join(this.learningsDir, 'index.json');
    const index = await fs.readJson(indexPath);
    index.learnings = index.learnings.filter((l: any) => l.id !== learningId);
    index.lastUpdated = new Date().toISOString();
    await fs.writeJson(indexPath, index, { spaces: 2 });
  }

  /**
   * Create learning from template
   * Feature #8: Learning Templates
   */
  async saveLearningFromTemplate(
    templateKey: string,
    variables: Record<string, string>,
    agent: string
  ): Promise<Learning | null> {
    const templateData = applyTemplate(templateKey, variables);
    
    if (!templateData) {
      console.error(`Template '${templateKey}' not found`);
      return null;
    }

    return await this.saveLearning({
      ...templateData,
      agent,
      relatedLearnings: []
    } as any);
  }

  /**
   * Get all learnings (for internal operations)
   */
  private async getAllLearnings(): Promise<Learning[]> {
    await this.initialize();

    const indexPath = path.join(this.learningsDir, 'index.json');
    if (!await fs.pathExists(indexPath)) {
      return [];
    }

    const index = await fs.readJson(indexPath);
    const learnings: Learning[] = [];

    for (const entry of index.learnings) {
      const learningPath = path.join(this.learningsDir, `${entry.id}.json`);
      if (await fs.pathExists(learningPath)) {
        learnings.push(await fs.readJson(learningPath));
      }
    }

    return learnings;
  }
}
