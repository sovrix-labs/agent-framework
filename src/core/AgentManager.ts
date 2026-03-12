import * as path from 'path';
import * as fs from 'fs-extra';
import { Agent, AgentMetadata } from './Agent';

export class AgentManager {
  private agentsDir: string;
  private installedAgents: Map<string, Agent>;

  constructor(projectRoot: string, agentsDir: string = '.github/agents') {
    this.agentsDir = path.join(projectRoot, agentsDir);
    this.installedAgents = new Map();
  }

  /**
   * Initialize the agents directory
   */
  async initialize(): Promise<void> {
    await fs.ensureDir(this.agentsDir);
  }

  /**
   * Install an agent
   */
  async installAgent(agent: Agent, force: boolean = false): Promise<boolean> {
    const metadata = agent.getMetadata();
    const agentDir = path.join(this.agentsDir, metadata.name);

    // Check if agent already exists
    if (await fs.pathExists(agentDir) && !force) {
      throw new Error(`Agent "${metadata.name}" already exists. Use --force to reinstall.`);
    }

    // Create agent directory
    await fs.ensureDir(agentDir);

    // Write agent file
    const agentFilePath = path.join(agentDir, '.agent.md');
    const agentContent = agent.generateAgentFile();
    await fs.writeFile(agentFilePath, agentContent, 'utf-8');

    // Store in memory
    this.installedAgents.set(metadata.name, agent);

    return true;
  }

  /**
   * Remove an agent
   */
  async removeAgent(name: string): Promise<boolean> {
    const agentDir = path.join(this.agentsDir, name);

    if (!(await fs.pathExists(agentDir))) {
      throw new Error(`Agent "${name}" not found.`);
    }

    await fs.remove(agentDir);
    this.installedAgents.delete(name);

    return true;
  }

  /**
   * List installed agents
   */
  async listInstalled(): Promise<AgentMetadata[]> {
    if (!(await fs.pathExists(this.agentsDir))) {
      return [];
    }

    const entries = await fs.readdir(this.agentsDir, { withFileTypes: true });
    const agents: AgentMetadata[] = [];

    for (const entry of entries) {
      if (entry.isDirectory()) {
        const agentFile = path.join(this.agentsDir, entry.name, '.agent.md');
        if (await fs.pathExists(agentFile)) {
          const metadata = await this.parseAgentMetadata(agentFile);
          if (metadata) {
            agents.push(metadata);
          }
        }
      }
    }

    return agents;
  }

  /**
   * Check if an agent is installed
   */
  async isInstalled(name: string): Promise<boolean> {
    const agentDir = path.join(this.agentsDir, name);
    const agentFile = path.join(agentDir, '.agent.md');
    return await fs.pathExists(agentFile);
  }

  /**
   * Parse agent metadata from .agent.md file
   */
  private async parseAgentMetadata(filePath: string): Promise<AgentMetadata | null> {
    try {
      const content = await fs.readFile(filePath, 'utf-8');
      const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
      
      if (!frontmatterMatch) {
        return null;
      }

      const frontmatter = frontmatterMatch[1];
      const metadata: any = {};

      // Simple YAML parsing
      const lines = frontmatter.split('\n');
      let currentKey = '';
      
      for (const line of lines) {
        if (line.includes(':') && !line.startsWith('  ')) {
          const [key, ...valueParts] = line.split(':');
          currentKey = key.trim();
          const value = valueParts.join(':').trim();
          
          if (value) {
            metadata[currentKey] = value;
          } else {
            metadata[currentKey] = [];
          }
        } else if (line.startsWith('  - ') && Array.isArray(metadata[currentKey])) {
          metadata[currentKey].push(line.substring(4).trim());
        }
      }

      return {
        name: metadata.name || '',
        displayName: metadata.displayName || metadata.name || '',
        description: metadata.description || '',
        version: metadata.version || '1.0.0',
        author: metadata.author,
        tags: metadata.tags
      };
    } catch (error) {
      return null;
    }
  }

  /**
   * Get agents directory path
   */
  getAgentsDir(): string {
    return this.agentsDir;
  }
}
