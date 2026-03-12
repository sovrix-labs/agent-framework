# Contributing to Agent Framework

Thank you for your interest in contributing! We welcome contributions from the community.

## Getting Started

1. Fork the repository
2. Clone your fork
3. Create a feature branch
4. Make your changes
5. Run tests and linters
6. Submit a pull request

## Development Setup

```bash
# Install dependencies
npm install

# Build the project
npm run build

# Run in development mode
npm run dev

# Run tests
npm test

# Run linter
npm run lint
```

## Project Structure

```
agent-framework/
├── src/
│   ├── cli.ts              # CLI entry point
│   ├── commands/           # CLI commands
│   ├── core/               # Core framework classes
│   └── agents/             # Pre-built agents
├── templates/              # Agent and skill templates
└── tests/                  # Test files
```

## Adding a New Pre-built Agent

1. Create a new directory under `src/agents/`
2. Create your agent class extending `Agent`
3. Implement required methods
4. Export in `src/agents/index.ts`
5. Add tests
6. Update documentation

Example:
```typescript
import { Agent, AgentMetadata, AgentConfig } from '../../core/Agent';

export class MyAgent extends Agent {
  constructor() {
    const metadata: AgentMetadata = {
      name: 'my-agent',
      displayName: 'My Agent',
      description: 'Description of what this agent does',
      version: '1.0.0',
      tags: ['tag1', 'tag2']
    };

    const config: AgentConfig = {
      invoke: ['when user mentions @my-agent'],
      tools: ['read_file', 'write_file']
    };

    super(metadata, config);
  }

  generateAgentFile(): string {
    return `${this.generateFrontmatter()}${this.getInstructions()}`;
  }

  getInstructions(): string {
    return `# My Agent Instructions...`;
  }

  getSystemPrompt(): string {
    return 'System prompt for the agent...';
  }
}
```

## Code Style

- Use TypeScript
- Follow ESLint rules
- Format with Prettier
- Write descriptive commit messages
- Add JSDoc comments for public APIs

## Testing

- Write unit tests for new features
- Ensure all tests pass
- Maintain or improve code coverage
- Test CLI commands manually

## Documentation

- Update README.md for new features
- Add inline code comments
- Document breaking changes
- Update CHANGELOG.md

## Pull Request Process

1. Update documentation
2. Add tests for new features
3. Ensure CI passes
4. Request review from maintainers
5. Address review feedback
6. Squash commits if requested

## Code of Conduct

- Be respectful and inclusive
- Welcome newcomers
- Focus on constructive feedback
- Assume good intentions

## Questions?

Open an issue or discussion for:
- Feature requests
- Bug reports
- Design discussions
- General questions

Thank you for contributing!
