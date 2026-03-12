export interface SkillMetadata {
  name: string;
  displayName: string;
  description: string;
  version: string;
  author?: string;
  tags?: string[];
}

export abstract class Skill {
  protected metadata: SkillMetadata;

  constructor(metadata: SkillMetadata) {
    this.metadata = metadata;
  }

  /**
   * Get skill metadata
   */
  getMetadata(): SkillMetadata {
    return this.metadata;
  }

  /**
   * Generate the skill definition file content (SKILL.md)
   */
  abstract generateSkillFile(): string;

  /**
   * Get skill instructions
   */
  abstract getInstructions(): string;

  /**
   * Validate skill configuration
   */
  validate(): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!this.metadata.name) {
      errors.push('Skill name is required');
    }

    if (!this.metadata.description) {
      errors.push('Skill description is required');
    }

    return {
      valid: errors.length === 0,
      errors
    };
  }

  /**
   * Generate YAML frontmatter for skill file
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
