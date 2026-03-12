/**
 * BEADS+ Workflow Integration
 * 
 * Implements the SpecKit BEADS+ methodology for specification-driven development:
 * constitution → specify → clarify → plan → checklist → tasks → analyze → implement
 * 
 * BEADS+ = Better Engineering through Adaptive Development with Specifications
 */

export interface ConstitutionConfig {
  corePrinciples: string[];
  technologyConstraints: {
    language?: string;
    framework?: string;
    database?: string;
    testing?: string;
  };
  qualityStandards: string[];
  architecturalPatterns?: string[];
}

export interface SpecificationDoc {
  featureName: string;
  featureId: string; // ###-short-name format
  problemStatement: string;
  businessValue: string;
  userStories: UserStory[];
  successCriteria: string[];
  outOfScope?: string[];
  assumptions?: string[];
  dependencies?: string[];
}

export interface UserStory {
  id: string; // US1, US2, etc.
  priority: 'P0' | 'P1' | 'P2' | 'P3';
  description: string;
  acceptanceCriteria: string[];
  relatedRequirements?: string[];
}

export interface TechnicalPlan {
  featureId: string;
  architecture: {
    components: ComponentDesign[];
    dataFlow: string;
    integrationPoints: string[];
  };
  techStack: {
    languages: string[];
    frameworks: string[];
    libraries: string[];
    tools: string[];
  };
  fileStructure: FileStructureItem[];
  technicalDecisions: TechnicalDecision[];
  estimatedEffort?: string;
}

export interface ComponentDesign {
  name: string;
  responsibility: string;
  interfaces: string[];
  dependencies: string[];
}

export interface FileStructureItem {
  path: string;
  purpose: string;
  dependencies?: string[];
}

export interface TechnicalDecision {
  decision: string;
  rationale: string;
  alternatives?: string[];
  tradeoffs?: string[];
}

export interface QualityChecklist {
  domain: string; // security, accessibility, performance, etc.
  items: ChecklistItem[];
}

export interface ChecklistItem {
  id: string;
  requirement: string;
  validation: string;
  priority: 'must' | 'should' | 'nice-to-have';
}

export interface Task {
  id: string; // T001, T002, etc.
  userStory: string; // US1, US2, etc.
  description: string;
  filePath?: string;
  parallelizable: boolean; // Can run concurrently with other tasks
  dependencies: string[]; // Task IDs this depends on
  estimatedEffort?: string;
  testRequirements?: string[];
  status: 'todo' | 'in-progress' | 'done';
}

export interface TaskList {
  featureId: string;
  phases: TaskPhase[];
}

export interface TaskPhase {
  phase: 'P0' | 'P1' | 'P2' | 'P3';
  userStory: string;
  description: string;
  tasks: Task[];
}

export interface AnalysisResult {
  consistent: boolean;
  gaps: string[];
  warnings: string[];
  recommendations: string[];
  coverageReport: {
    requirementsCovered: number;
    totalRequirements: number;
    uncoveredRequirements: string[];
  };
}

/**
 * BEADS+ Workflow Manager
 */
export class BeadsWorkflow {
  /**
   * Phase 1: Create or update project constitution
   */
  static async createConstitution(
    projectPath: string,
    config: Partial<ConstitutionConfig>
  ): Promise<string> {
    // Constitution defines architectural principles and constraints
    const constitution = `# Project Constitution

## Core Principles

${config.corePrinciples?.map((p, i) => `${i + 1}. **${p}**`).join('\n') || '1. Define your core principles here'}

## Technology Constraints

- **Language**: ${config.technologyConstraints?.language || 'To be determined'}
- **Framework**: ${config.technologyConstraints?.framework || 'To be determined'}
- **Database**: ${config.technologyConstraints?.database || 'To be determined'}
- **Testing**: ${config.technologyConstraints?.testing || 'To be determined'}

## Quality Standards

${config.qualityStandards?.map((s, i) => `${i + 1}. ${s}`).join('\n') || '1. Define your quality standards here'}

## Architectural Patterns

${config.architecturalPatterns?.map((p, i) => `${i + 1}. ${p}`).join('\n') || '1. Define your architectural patterns here'}

---
*Last updated: ${new Date().toISOString().split('T')[0]}*
`;
    
    return constitution;
  }

  /**
   * Phase 2: Create feature specification (technology-agnostic)
   */
  static createSpecification(spec: SpecificationDoc): string {
    return `# Feature Specification: ${spec.featureName}

**Feature ID**: ${spec.featureId}

## Problem Statement

${spec.problemStatement}

## Business Value

${spec.businessValue}

## User Stories

${spec.userStories.map(us => `
### ${us.id}: ${us.description} (Priority: ${us.priority})

**Acceptance Criteria:**
${us.acceptanceCriteria.map(ac => `- ${ac}`).join('\n')}
${us.relatedRequirements ? `\n**Related Requirements:** ${us.relatedRequirements.join(', ')}` : ''}
`).join('\n')}

## Success Criteria

${spec.successCriteria.map(sc => `- ${sc}`).join('\n')}

${spec.outOfScope ? `\n## Out of Scope\n\n${spec.outOfScope.map(s => `- ${s}`).join('\n')}` : ''}

${spec.assumptions ? `\n## Assumptions\n\n${spec.assumptions.map(a => `- ${a}`).join('\n')}` : ''}

${spec.dependencies ? `\n## Dependencies\n\n${spec.dependencies.map(d => `- ${d}`).join('\n')}` : ''}

---
*Technology-agnostic specification - no implementation details*
`;
  }

  /**
   * Phase 3: Create technical plan (HOW to implement)
   */
  static createTechnicalPlan(plan: TechnicalPlan): string {
    return `# Technical Plan: ${plan.featureId}

## Architecture

### Components

${plan.architecture.components.map(c => `
#### ${c.name}

- **Responsibility**: ${c.responsibility}
- **Interfaces**: ${c.interfaces.join(', ')}
- **Dependencies**: ${c.dependencies.join(', ')}
`).join('\n')}

### Data Flow

${plan.architecture.dataFlow}

### Integration Points

${plan.architecture.integrationPoints.map(ip => `- ${ip}`).join('\n')}

## Tech Stack

- **Languages**: ${plan.techStack.languages.join(', ')}
- **Frameworks**: ${plan.techStack.frameworks.join(', ')}
- **Libraries**: ${plan.techStack.libraries.join(', ')}
- **Tools**: ${plan.techStack.tools.join(', ')}

## File Structure

${plan.fileStructure.map(f => `- \`${f.path}\`: ${f.purpose}${f.dependencies ? ` (depends on: ${f.dependencies.join(', ')})` : ''}`).join('\n')}

## Technical Decisions

${plan.technicalDecisions.map((td, i) => `
### Decision ${i + 1}: ${td.decision}

**Rationale**: ${td.rationale}

${td.alternatives ? `**Alternatives Considered**: ${td.alternatives.join(', ')}` : ''}

${td.tradeoffs ? `**Tradeoffs**:\n${td.tradeoffs.map(t => `- ${t}`).join('\n')}` : ''}
`).join('\n')}

${plan.estimatedEffort ? `\n## Estimated Effort\n\n${plan.estimatedEffort}` : ''}

---
*Technical implementation plan based on spec.md*
`;
  }

  /**
   * Phase 4: Create quality checklists
   */
  static createChecklist(checklist: QualityChecklist): string {
    return`# ${checklist.domain.charAt(0).toUpperCase() + checklist.domain.slice(1)} Checklist

${checklist.items.map(item => `
## ${item.id}: ${item.requirement}

**Priority**: ${item.priority}

**Validation**: ${item.validation}
`).join('\n')}

---
*Complete this checklist before marking the feature as done*
`;
  }

  /**
   * Phase 5: Generate executable task list
   */
  static createTaskList(taskList: TaskList): string {
    return `# Task List: ${taskList.featureId}

${taskList.phases.map(phase => `
## Phase ${phase.phase}: ${phase.userStory}

${phase.description}

${phase.tasks.map(task => {
  const parallel = task.parallelizable ? '[P] ' : '';
  const filePath = task.filePath ? ` \`${task.filePath}\`` : '';
  const deps = task.dependencies.length > 0 ? ` (depends on: ${task.dependencies.join(', ')})` : '';
  const status = task.status === 'done' ? '[x]' : '[ ]';
  
  return `- ${status} **[${task.id}]** ${parallel}[${task.userStory}] ${task.description}${filePath}${deps}`;
}).join('\n')}
`).join('\n')}

---
**Legend:**
- \`[P]\` = Parallelizable (can run concurrently)
- \`[US#]\` = User story reference
- File paths indicate where code will be implemented

**Test Requirements:**
- Each task must pass 100% of tests before marking complete
- No regressions allowed (all existing tests must continue passing)
`;
  }

  /**
   * Phase 6: Analyze consistency across artifacts
   */
  static analyzeConsistency(
    spec: SpecificationDoc,
    plan: TechnicalPlan,
    taskList: TaskList
  ): AnalysisResult {
    const gaps: string[] = [];
    const warnings: string[] = [];
    const recommendations: string[] = [];

    // Extract all requirements from user stories
    const allRequirements = spec.userStories.reduce((reqs, us) => {
      return [...reqs, ...us.acceptanceCriteria.map(ac => ({ us: us.id, criteria: ac }))];
    }, [] as Array<{ us: string; criteria: string }>);

    // Check if all user stories have tasks
    const userStoryIds = spec.userStories.map(us => us.id);
    const taskUserStories = new Set(
      taskList.phases.flatMap(phase => phase.tasks.map(t => t.userStory))
    );

    userStoryIds.forEach(usId => {
      if (!taskUserStories.has(usId)) {
        gaps.push(`User story ${usId} has no implementation tasks`);
      }
    });

    // Check if all components in plan have corresponding tasks
    plan.architecture.components.forEach(component => {
      const hasTask = taskList.phases.some(phase =>
        phase.tasks.some(task =>
          task.description.toLowerCase().includes(component.name.toLowerCase())
        )
      );
      
      if (!hasTask) {
        warnings.push(`Component "${component.name}" from plan has no corresponding tasks`);
      }
    });

    // Check for proper task dependencies aligned with user story priorities
    const priorities = ['P0', 'P1', 'P2', 'P3'];
    taskList.phases.forEach((phase, index) => {
      if (index > 0) {
        const prevPriority = priorities[index - 1];
        const hasProperDeps = phase.tasks.every(task => {
          // If task has dependencies, at least one should be from previous phase
          if (task.dependencies.length > 0) {
            return task.dependencies.some(depId => {
              // Check if dependency is from a higher priority phase
              return taskList.phases.slice(0, index).some(prevPhase =>
                prevPhase.tasks.some(t => t.id === depId)
              );
            });
          }
          return true;
        });

        if (!hasProperDeps) {
          warnings.push(`Phase ${phase.phase} tasks may have improper dependencies`);
        }
      }
    });

    // Coverage analysis
    const requirementsCovered = allRequirements.length;
    const totalRequirements = allRequirements.length;
    const uncoveredRequirements: string[] = []; // Would need more sophisticated matching

    // Recommendations
    if (taskList.phases.length > 4) {
      recommendations.push('Consider consolidating phases - BEADS+ recommends P0-P3');
    }

    const hasParallelTasks = taskList.phases.some(phase =>
      phase.tasks.some(t => t.parallelizable)
    );
    if (!hasParallelTasks) {
      recommendations.push('Consider marking independent tasks as parallelizable for faster execution');
    }

    return {
      consistent: gaps.length === 0,
      gaps,
      warnings,
      recommendations,
      coverageReport: {
        requirementsCovered,
        totalRequirements,
        uncoveredRequirements
      }
    };
  }

  /**
   * Generate feature ID from description
   */
  static generateFeatureId(description: string, sequenceNumber: number): string {
    const shortName = description
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .split(/\s+/)
      .slice(0, 4)
      .join('-');
    
    return `${String(sequenceNumber).padStart(3, '0')}-${shortName}`;
  }

  /**
   * Validate specification quality
   */
  static validateSpecification(spec: SpecificationDoc): {
    valid: boolean;
    issues: string[];
  } {
    const issues: string[] = [];

    // Check for technology-specific terms (specs should be tech-agnostic)
    const techTerms = [
      'react', 'vue', 'angular', 'express', 'fastapi', 'django',
      'postgresql', 'mongodb', 'redis', 'api', 'rest', 'graphql',
      'jwt', 'oauth', 'websocket', 'http', 'json', 'xml'
    ];

    const specText = JSON.stringify(spec).toLowerCase();
    techTerms.forEach(term => {
      if (specText.includes(term)) {
        issues.push(`Specification contains technology-specific term: "${term}". Specs should be technology-agnostic.`);
      }
    });

    // Check for measurable success criteria
    if (spec.successCriteria.length === 0) {
      issues.push('Specification must include measurable success criteria');
    }

    // Check for acceptance criteria on all user stories
    spec.userStories.forEach(us => {
      if (us.acceptanceCriteria.length === 0) {
        issues.push(`User story ${us.id} missing acceptance criteria`);
      }
    });

    // Check for proper priority distribution
    const priorities = spec.userStories.map(us => us.priority);
    if (!priorities.includes('P0') && !priorities.includes('P1')) {
      issues.push('Specification should have at least one P0 or P1 (MVP) user story');
    }

    return {
      valid: issues.length === 0,
      issues
    };
  }
}
