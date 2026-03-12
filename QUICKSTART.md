# Quick Start Guide

## Installation

Install the Agent Framework CLI globally:

```bash
npm install -g @agent-framework/cli
```

Or use it directly with npx:

```bash
npx @agent-framework/cli init
```

## Initialize Your Project

Navigate to your project directory and initialize the framework:

```bash
cd /path/to/your/project
acli init
```

This will:
- Create `.github/copilot/agents/` directory (GitHub Copilot standard)
- Create `.github/copilot/skills/` directory
- Generate `.agent-framework.json` config
- Set up VS Code extensions recommendations (.vscode/extensions.json)

## Install Pre-built Agents

Install the agents you need:

```bash
# Install all recommended agents
acli init --agents requirements architecture security development testing quality orchestrator

# Or install individually
acli install requirements
acli install architecture
acli install security
acli install development
acli install testing
acli install quality
acli install orchestrator
```

## Using Agents in VS Code

Once installed, you can use agents in GitHub Copilot Chat:

### Requirement Gathering
```
@requirements gather requirements for a user authentication system
```

The requirements agent will:
- Ask clarifying questions
- Create structured specification documents
- Generate user stories and acceptance criteria
- Link to GitHub issues

### Architecture Design
```
@architecture design the system architecture for the authentication system
```

The architecture agent will:
- Design system components and data flow
- Create Architecture Decision Records (ADRs)
- Recommend design patterns
- Plan scalability and technology choices

### Security Analysis
```
@security review security requirements for authentication
```

The security agent will:
- Identify security vulnerabilities
- Recommend security best practices
- Check OWASP compliance
- Perform threat modeling

### Development
```
@development implement the authentication system based on architecture design
```

The development agent will:
- Implement features from specifications
- Follow architecture patterns
- Apply security requirements
- Add proper error handling

### Testing
```
@testing write comprehensive tests for the auth system
```

The testing agent will:
- Generate unit tests
- Create integration tests
- Ensure good coverage
- Test edge cases

### Code Quality
```
@quality review the authentication implementation
```

The quality agent will:
- Perform code review
- Check maintainability
- Identify performance issues
- Suggest refactoring

### Project Orchestration
```
@orchestrator plan and coordinate the authentication feature development
```

The orchestrator agent will:
- Break down complex tasks
- Coordinate other agents
- Track progress
- Manage workflows

## Creating Custom Agents

Create a custom agent for your specific needs:

```bash
acli create agent
```

Follow the prompts to:
1. Enter agent name (e.g., `deployment`)
2. Provide description
3. Set display name

Edit the generated `.agent.md` file to customize behavior.

## Creating Custom Skills

Skills are reusable instruction sets:

```bash
acli create skill
```

Skills can be referenced by agents and provide specialized knowledge.

## Example Workflow

Here's a complete workflow using all agents:

### 1. Gather Requirements
```
@requirements I need a REST API for managing blog posts
```

**Agent creates:** `specs/blog-api.md` with:
- User stories
- API endpoints
- Data models
- Acceptance criteria

### 2. Implement Features
```
@development implement the blog post API from specs/blog-api.md
```

**Agent creates:**
- `src/controllers/PostController.ts`
- `src/services/PostService.ts`
- `src/models/Post.ts`
- `src/routes/posts.ts`

### 3. Write Tests
```
@testing create tests for the blog post API
```

**Agent creates:**
- `src/__tests__/PostService.test.ts`
- `src/__tests__/posts.api.test.ts`

### 4. Quality Check
```
@quality review the blog post implementation
```

**Agent provides:**
- Code review feedback
- Security analysis
- Performance suggestions
- Best practice recommendations

### 5. Iterate
Make improvements based on feedback:
```
@development fix the issues identified by @quality
@testing add tests for the edge cases
@quality verify the fixes
```

## Configuration

Customize the framework in `.agent-framework.json`:

```json
{
  "version": "1.0.0",
  "agentsDir": ".github/copilot/agents",
  "skillsDir": ".github/copilot/skills",
  "defaultAgents": ["requirements", "architecture", "security", "development", "testing", "quality", "orchestrator"],
  "customSettings": {
    "github": {
      "token": "your-token",
      "repo": "owner/repo"
    }
  }
}
```

Or use the interactive config:

```bash
acli config
```

## Commands Reference

| Command | Description |
|---------|-------------|
| `acli init` | Initialize framework |
| `acli list agents` | List all agents |
| `acli list skills` | List all skills |
| `acli install <name>` | Install agent |
| `acli create agent` | Create custom agent |
| `acli create skill` | Create custom skill |
| `acli remove <name>` | Remove agent |
| `acli update [name]` | Update agent(s) |
| `acli config` | Configure settings |

## Tips & Best Practices

### 1. Start with Requirements
Always use `@requirements` first to document what you're building.

### 2. Iterate Incrementally
Build features one at a time, testing as you go.

### 3. Use Quality Checks Early
Run `@quality` reviews frequently, not just at the end.

### 4. Customize Agents
Edit `.agent.md` files to add project-specific knowledge.

### 5. Combine Agents
Agents can reference each other's work:
```
@development implement based on requirements.md
@testing test the implementation from @development
```

### 6. Keep Documentation Updated
Agents read documentation, so keep it current.

### 7. Use Consistent Naming
Follow consistent naming conventions in agent prompts.

## Troubleshooting

### Agent Not Found
```bash
# List available agents
acli list agents

# Reinstall agent
acli install <name> --force
```

### Agent Not Working in Copilot
1. Ensure VS Code has GitHub Copilot installed
2. Verify `.agent.md` file exists
3. Restart VS Code
4. Check Copilot Chat settings

### Permission Issues
```bash
# Use sudo for global install (if needed)
sudo npm install -g @agent-framework/cli

# Or use npx
npx @agent-framework/cli <command>
```

## Getting Help

- **Documentation**: Check `README.md` and agent `.md` files
- **Examples**: See `examples/` directory
- **Issues**: Open an issue on GitHub
- **Community**: Join discussions

## Next Steps

1. ✅ Initialize the framework
2. ✅ Install agents
3. ✅ Try basic commands
4. 📚 Read agent documentation
5. 🎨 Customize for your needs
6. 🚀 Build amazing things!

Happy coding! 🎉
