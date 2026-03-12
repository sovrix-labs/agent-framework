export interface AgentMetadata {
  name: string;
  displayName: string;
  description: string;
  version: string;
  author?: string;
  tags?: string[];
  dependencies?: string[];
}

export interface AgentConfig {
  // Legacy fields (kept for backward compatibility but not used in frontmatter)
  invoke?: string[];
  tools?: string[];
  skills?: string[];
  applyTo?: string[];
  
  // VS Code supported attributes
  agents?: string[];           // Other agents this agent can invoke
  argumentHint?: string;        // Hint about how to invoke this agent
  target?: string[];            // File patterns this agent targets
  userInvocable?: boolean;      // Whether user can invoke directly (default: true)
  model?: string;               // Specific model to use
  github?: any;                 // GitHub integration configuration
  handoffs?: string[];          // Agents to handoff to
  disableModelInvocation?: boolean; // Disable model invocations
}

export abstract class Agent {
  protected metadata: AgentMetadata;
  protected config: AgentConfig;

  constructor(metadata: AgentMetadata, config: AgentConfig = {}) {
    this.metadata = metadata;
    this.config = config;
  }

  /**
   * Get agent metadata
   */
  getMetadata(): AgentMetadata {
    return this.metadata;
  }

  /**
   * Get agent configuration
   */
  getConfig(): AgentConfig {
    return this.config;
  }

  /**
   * Generate the agent definition file content (.agent.md)
   */
  abstract generateAgentFile(): string;

  /**
   * Get the agent's instructions
   */
  abstract getInstructions(): string;

  /**
   * Get the agent's system prompt
   */
  abstract getSystemPrompt(): string;

  /**
   * Validate agent configuration
   */
  validate(): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!this.metadata.name) {
      errors.push('Agent name is required');
    }

    if (!this.metadata.description) {
      errors.push('Agent description is required');
    }

    if (!this.metadata.version) {
      errors.push('Agent version is required');
    }

    return {
      valid: errors.length === 0,
      errors
    };
  }

  /**
   * Generate YAML frontmatter for agent file
   * Only includes attributes supported by VS Code:
   * agents, argument-hint, description, disable-model-invocation, github, 
   * handoffs, model, name, target, tools, user-invocable
   */
  protected generateFrontmatter(): string {
    const yaml: any = {
      name: this.metadata.name,
      description: this.metadata.description
    };

    // Add VS Code supported attributes if present
    if (this.config.argumentHint) {
      yaml['argument-hint'] = this.config.argumentHint;
    }

    if (this.config.target && this.config.target.length > 0) {
      yaml.target = this.config.target;
    }

    if (this.config.agents && this.config.agents.length > 0) {
      yaml.agents = this.config.agents;
    }

    if (this.config.handoffs && this.config.handoffs.length > 0) {
      yaml.handoffs = this.config.handoffs;
    }

    if (this.config.model) {
      yaml.model = this.config.model;
    }

    if (this.config.userInvocable !== undefined) {
      yaml['user-invocable'] = this.config.userInvocable;
    }

    if (this.config.disableModelInvocation !== undefined) {
      yaml['disable-model-invocation'] = this.config.disableModelInvocation;
    }

    if (this.config.github) {
      yaml.github = this.config.github;
    }

    return this.yamlStringify(yaml);
  }

  /**
   * Simple YAML stringifier
   */
  private yamlStringify(obj: any): string {
    let yaml = '---\n';
    for (const [key, value] of Object.entries(obj)) {
      if (Array.isArray(value)) {
        yaml += `${key}:\n`;
        for (const item of value) {
          yaml += `  - ${item}\n`;
        }
      } else {
        yaml += `${key}: ${value}\n`;
      }
    }
    yaml += '---\n\n';
    return yaml;
  }
}
