/**
 * Learning Templates
 * 
 * Standardized templates for common learning types to ensure consistency
 * across different agents when recording learnings.
 */

export interface LearningTemplate {
  category: 'security' | 'performance' | 'quality' | 'testing' | 'architecture' | 'other';
  severity: 'critical' | 'high' | 'medium' | 'low';
  problemTemplate: string;
  rootCauseTemplate: string;
  resolutionTemplate: string;
  preventionTemplate: string;
  requiredTags: string[];
  optionalTags?: string[];
}

export const LEARNING_TEMPLATES: Record<string, LearningTemplate> = {
  'security-vulnerability': {
    category: 'security',
    severity: 'critical',
    problemTemplate: '[VULNERABILITY_TYPE] vulnerability in [COMPONENT]',
    rootCauseTemplate: 'Missing [PROTECTION_MECHANISM] for [INPUT_SOURCE]',
    resolutionTemplate: 'Implemented [SOLUTION] to sanitize/validate [INPUT_SOURCE]',
    preventionTemplate: 'Always use [BEST_PRACTICE] for [SCENARIO]',
    requiredTags: ['security', 'vulnerability'],
    optionalTags: ['owasp', 'cwe']
  },
  
  'sql-injection': {
    category: 'security',
    severity: 'critical',
    problemTemplate: 'SQL injection vulnerability in [QUERY_LOCATION]',
    rootCauseTemplate: 'User input directly concatenated into SQL query without sanitization',
    resolutionTemplate: 'Replaced raw SQL with parameterized query using [ORM/LIBRARY]',
    preventionTemplate: 'Always use parameterized queries or ORM query builders; never concatenate user input into SQL',
    requiredTags: ['security', 'sql-injection', 'owasp', 'database']
  },
  
  'xss-vulnerability': {
    category: 'security',
    severity: 'critical',
    problemTemplate: 'Cross-Site Scripting (XSS) vulnerability in [COMPONENT]',
    rootCauseTemplate: 'User input rendered without HTML escaping in [TEMPLATE/VIEW]',
    resolutionTemplate: 'Applied HTML escaping using [FRAMEWORK_METHOD] for all user-generated content',
    preventionTemplate: 'Always escape HTML special characters when rendering user input; use framework-provided escaping',
    requiredTags: ['security', 'xss', 'owasp', 'frontend']
  },
  
  'authentication-bypass': {
    category: 'security',
    severity: 'critical',
    problemTemplate: 'Authentication bypass in [ENDPOINT/ROUTE]',
    rootCauseTemplate: 'Missing authentication check/middleware on [PROTECTED_RESOURCE]',
    resolutionTemplate: 'Added [AUTH_MIDDLEWARE] to verify user session/token before access',
    preventionTemplate: 'Always protect sensitive routes with authentication middleware; use framework guards',
    requiredTags: ['security', 'authentication', 'authorization', 'owasp']
  },
  
  'test-failure': {
    category: 'testing',
    severity: 'high',
    problemTemplate: 'Test [TEST_NAME] failed: [SYMPTOM]',
    rootCauseTemplate: '[ROOT_CAUSE_EXPLANATION]',
    resolutionTemplate: 'Fixed by [FIX_DESCRIPTION]',
    preventionTemplate: 'Add [PREVENTIVE_TEST_TYPE] to catch this early',
    requiredTags: ['testing', 'test-failure']
  },
  
  'flaky-test': {
    category: 'testing',
    severity: 'medium',
    problemTemplate: 'Flaky test: [TEST_NAME] intermittently fails',
    rootCauseTemplate: 'Test depends on [RACE_CONDITION/TIMING/EXTERNAL_SERVICE]',
    resolutionTemplate: 'Added [WAIT_MECHANISM/MOCK/RETRY_LOGIC] to ensure deterministic behavior',
    preventionTemplate: 'Avoid timing dependencies in tests; mock external services; use deterministic test data',
    requiredTags: ['testing', 'flaky-test', 'reliability']
  },
  
  'performance-issue': {
    category: 'performance',
    severity: 'high',
    problemTemplate: 'Performance degradation in [COMPONENT]: [METRIC] exceeded threshold',
    rootCauseTemplate: '[INEFFICIENT_ALGORITHM/N+1_QUERY/MEMORY_LEAK] in [LOCATION]',
    resolutionTemplate: 'Optimized by [OPTIMIZATION_TECHNIQUE]',
    preventionTemplate: 'Monitor [METRIC]; use [PROFILING_TOOL] to detect similar issues early',
    requiredTags: ['performance', 'optimization']
  },
  
  'n-plus-one-query': {
    category: 'performance',
    severity: 'high',
    problemTemplate: 'N+1 query problem in [DATABASE_OPERATION]',
    rootCauseTemplate: 'Separate query executed for each item in loop instead of batch query',
    resolutionTemplate: 'Replaced with single batch query using [JOIN/EAGER_LOADING]',
    preventionTemplate: 'Use ORM eager loading or joins for related data; monitor query counts in tests',
    requiredTags: ['performance', 'database', 'n+1', 'optimization']
  },
  
  'memory-leak': {
    category: 'performance',
    severity: 'critical',
    problemTemplate: 'Memory leak detected in [COMPONENT]',
    rootCauseTemplate: 'Memory not released due to [EVENT_LISTENER/CLOSURE/REFERENCE] not being cleaned up',
    resolutionTemplate: 'Added cleanup logic in [DESTRUCTOR/UNMOUNT/DISPOSE] to release [RESOURCE]',
    preventionTemplate: 'Always clean up event listeners, timers, and subscriptions; use weak references where appropriate',
    requiredTags: ['performance', 'memory-leak', 'resource-management']
  },
  
  'code-smell': {
    category: 'quality',
    severity: 'medium',
    problemTemplate: '[CODE_SMELL_TYPE] detected in [MODULE]',
    rootCauseTemplate: '[VIOLATION_DESCRIPTION]',
    resolutionTemplate: 'Refactored to [DESIGN_PATTERN/CLEAN_CODE_PRINCIPLE]',
    preventionTemplate: 'Follow [PRINCIPLE/PATTERN] to maintain code quality',
    requiredTags: ['quality', 'code-smell', 'refactoring']
  },
  
  'tight-coupling': {
    category: 'quality',
    severity: 'medium',
    problemTemplate: 'Tight coupling between [MODULE_A] and [MODULE_B]',
    rootCauseTemplate: 'Direct dependencies without abstraction layer',
    resolutionTemplate: 'Introduced [INTERFACE/DEPENDENCY_INJECTION] to decouple modules',
    preventionTemplate: 'Use dependency injection and interfaces; depend on abstractions not concretions',
    requiredTags: ['quality', 'architecture', 'coupling', 'solid']
  },
  
  'missing-error-handling': {
    category: 'quality',
    severity: 'high',
    problemTemplate: 'Missing error handling in [FUNCTION/ENDPOINT]',
    rootCauseTemplate: 'No try-catch or error boundary for [OPERATION] that can fail',
    resolutionTemplate: 'Added error handling with [STRATEGY] and proper error messages',
    preventionTemplate: 'Always handle errors for async operations, external calls, and user input validation',
    requiredTags: ['quality', 'error-handling', 'reliability']
  },
  
  'architecture-decision': {
    category: 'architecture',
    severity: 'low',
    problemTemplate: 'Needed [ARCHITECTURE_DECISION] for [REQUIREMENT]',
    rootCauseTemplate: 'Multiple approaches available: [OPTIONS]',
    resolutionTemplate: 'Chose [SELECTED_APPROACH] because [RATIONALE]',
    preventionTemplate: 'Use this pattern for similar requirements; document as ADR',
    requiredTags: ['architecture', 'decision', 'adr']
  },
  
  'successful-pattern': {
    category: 'architecture',
    severity: 'low',
    problemTemplate: 'Successfully implemented [PATTERN/FEATURE]',
    rootCauseTemplate: 'Required [CAPABILITY]',
    resolutionTemplate: '[PATTERN/APPROACH] worked perfectly with [BENEFITS]',
    preventionTemplate: 'Use this pattern for future similar requirements',
    requiredTags: ['architecture', 'success', 'pattern']
  }
};

/**
 * Apply a template with variable substitution
 */
export function applyTemplate(
  templateKey: string,
  variables: Record<string, string>
): Partial<Omit<import('./AgentMemory').Learning, 'id' | 'date' | 'applyCount' | 'successRate' | 'agent'>> | null {
  const template = LEARNING_TEMPLATES[templateKey];
  if (!template) {
    return null;
  }

  const substitute = (text: string): string => {
    return text.replace(/\[([A-Z_]+)\]/g, (match, key) => {
      return variables[key] || match;
    });
  };

  return {
    category: template.category,
    severity: template.severity,
    problem: substitute(template.problemTemplate),
    rootCause: substitute(template.rootCauseTemplate),
    resolution: substitute(template.resolutionTemplate),
    prevention: substitute(template.preventionTemplate),
    tags: [
      ...template.requiredTags,
      ...(template.optionalTags || []),
      ...Object.values(variables).filter(v => v && v.length < 30)
    ].filter((v, i, a) => a.indexOf(v) === i), // unique
    relatedLearnings: []
  };
}

/**
 * List all available template keys
 */
export function listTemplates(): string[] {
  return Object.keys(LEARNING_TEMPLATES);
}

/**
 * Get template details
 */
export function getTemplate(key: string): LearningTemplate | null {
  return LEARNING_TEMPLATES[key] || null;
}
