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
  invoke?: string[];
  tools?: string[];
  skills?: string[];
  applyTo?: string[];
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
   */
  protected generateFrontmatter(): string {
    const yaml: any = {
      name: this.metadata.name,
      description: this.metadata.description,
      version: this.metadata.version
    };

    if (this.metadata.author) {
      yaml.author = this.metadata.author;
    }

    if (this.metadata.tags && this.metadata.tags.length > 0) {
      yaml.tags = this.metadata.tags;
    }

    if (this.config.invoke && this.config.invoke.length > 0) {
      yaml.invoke = this.config.invoke;
    }

    if (this.config.tools && this.config.tools.length > 0) {
      yaml.tools = this.config.tools;
    }

    if (this.config.skills && this.config.skills.length > 0) {
      yaml.skills = this.config.skills;
    }

    if (this.config.applyTo && this.config.applyTo.length > 0) {
      yaml.applyTo = this.config.applyTo;
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
