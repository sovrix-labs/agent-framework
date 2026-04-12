export interface HandoffConfig {
  label: string;
  agent: string;
  prompt: string;
  send?: boolean;
}

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
  // Platform target: 'vscode' (default) or 'github-copilot'
  // Determines which attributes are valid in the frontmatter:
  //   github-copilot: description, github, infer, mcp-servers, name, target, tools
  //   vscode: agents, argument-hint, description, disable-model-invocation,
  //           github, handoffs, model, name, target, tools, user-invocable
  platform?: 'vscode' | 'github-copilot';

  // Shared attributes (both platforms)
  tools?: string[];
  github?: any;

  // VS Code only attributes
  agents?: string[];               // Other agents this agent can invoke
  argumentHint?: string;           // Hint about how to invoke this agent
  userInvocable?: boolean;         // Whether user can invoke directly (default: true)
  model?: string;                  // Specific model to use
  handoffs?: HandoffConfig[];       // Agents to handoff to
  disableModelInvocation?: boolean;

  // github-copilot only attributes
  infer?: boolean;                 // Whether copilot should infer context
  mcpServers?: string[];           // MCP server configurations
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
   * Get the agent's system prompt (defaults to instructions)
   */
  getSystemPrompt(): string {
    return this.getInstructions();
  }

  /**
   * Generate YAML frontmatter for agent file.
   * The 'target' field is the platform selector:
   *   target: vscode        — enables agents, argument-hint, handoffs, model, user-invocable, disable-model-invocation
   *   target: github-copilot — enables infer, mcp-servers
   * Both platforms support: description, github, name, target, tools
   */
  protected generateFrontmatter(): string {
    const platform = this.config.platform ?? 'vscode';
    const isGitHubCopilot = platform === 'github-copilot';

    const yaml: any = {
      name: this.metadata.name,
      description: this.metadata.description,
      target: platform
    };

    // tools — supported by both platforms
    if (this.config.tools && this.config.tools.length > 0) {
      yaml.tools = this.config.tools;
    }

    // github — supported by both platforms
    if (this.config.github) {
      yaml.github = this.config.github;
    }

    if (isGitHubCopilot) {
      // github-copilot only attributes
      if (this.config.infer !== undefined) {
        yaml.infer = this.config.infer;
      }
      if (this.config.mcpServers && this.config.mcpServers.length > 0) {
        yaml['mcp-servers'] = this.config.mcpServers;
      }
    } else {
      // vscode only attributes
      if (this.config.argumentHint) {
        yaml['argument-hint'] = this.config.argumentHint;
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
    }

    return this.yamlStringify(yaml);
  }

  /**
   * Simple YAML stringifier — handles flat values, string arrays, and object arrays
   */
  private yamlStringify(obj: any): string {
    let yaml = '---\n';
    for (const [key, value] of Object.entries(obj)) {
      if (Array.isArray(value)) {
        yaml += `${key}:\n`;
        for (const item of value) {
          if (typeof item === 'object' && item !== null) {
            const entries = Object.entries(item as Record<string, unknown>);
            entries.forEach(([k, v], i) => {
              const prefix = i === 0 ? '  - ' : '    ';
              yaml += `${prefix}${k}: ${this.yamlValue(v)}\n`;
            });
          } else {
            yaml += `  - ${item}\n`;
          }
        }
      } else {
        yaml += `${key}: ${value}\n`;
      }
    }
    yaml += '---\n\n';
    return yaml;
  }

  private yamlValue(v: unknown): string {
    if (typeof v === 'boolean') return String(v);
    const s = String(v);
    // Quote strings containing YAML-special characters
    if (/[:#\[\]{}|>&*?!,'"`%@-]/.test(s) || s.includes('\n') || s !== s.trim()) {
      return `"${s.replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"`;
    }
    return s;
  }
}
