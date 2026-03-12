# Agent Framework CLI

A powerful CLI tool for building, managing, and deploying AI agents and skills for VS Code + GitHub Copilot with **BEADS+ SpecKit** workflow integration.

## Features

- 🤖 **Pre-built Agents**: Ships with production-ready agents for common workflows
- 📋 **BEADS+ SpecKit**: Specification-driven development workflow with quality gates
- 🛠️ **Custom Agent Builder**: Create your own specialized agents
- 📦 **Skill System**: Modular skill packages for reusable functionality
- 🔌 **VS Code Integration**: Seamless integration with VS Code and GitHub Copilot
- 📝 **Template System**: Quick scaffolding with best-practice templates
- ✅ **Quality Gates**: 100% test pass requirement at every level

## Installation

Install globally via npm:

```bash
npm install -g agent-framework-cli
```

Or with yarn:

```bash
yarn global add agent-framework-cli
```

## Quick Start

### 1. Initialize Framework in Your Project

```bash
acli init
```

This creates the agent directory structure and configuration file.

### 2. Install Pre-built Agents

```bash
# Install individual agents
acli install requirements
acli install development
acli install testing
acli install quality

# Or install all at once
acli install orchestrator
```

### 3. Use Agents in VS Code Copilot Chat

After installing agents, access them via `@agentName` in Copilot Chat:

```markdown
@requirements gather requirements for a user authentication system

@development implement the auth system based on the requirements

@testing generate test cases for the auth system

@quality review the implementation for security issues
```

### 4. Create Custom Agents

```bash
acli create agent --name "MyCustomAgent" --description "My specialized agent"
```

### 5. Start BEADS+ Workflow

```bash
# Initialize project with constitution
acli beads constitution

# Create feature specification
acli beads specify

# Execute full workflow
acli beads workflow
```

## BEADS+ SpecKit Workflow

**BEADS+** = Better Engineering through Adaptive Development with Specifications

The framework now includes complete [BEADS+ SpecKit] integration with 8-phase workflow:

```
CONSTITUTION → SPECIFY → CLARIFY → PLAN → CHECKLIST → TASKS → ANALYZE → IMPLEMENT
     ↓           ↓          ↓         ↓        ↓          ↓         ↓          ↓
  Principles   Spec.md    Q&A      Plan.md  Quality   Tasks.md   Validate  Code+Tests
```

### Key Features:
- ✅ **Technology-Agnostic Specs**: Focus on WHAT/WHY, not HOW
- ✅ **Pivotal Labs Practices**: P0-P3 priorities, user stories, TDD
- ✅ **Quality Gates**: Enforced at every phase
- ✅ **Iterative Development**: Dev → Quality → Test feedback loops
- ✅ **Handover Documents**: Structured context passed between agents
- ✅ **Learning System**: Agents learn from mistakes and save resolutions
- ✅ **100% Test Pass**: Mandatory at task/story/feature levels
- ✅ **Consistency Validation**: Automated spec ↔ plan ↔ tasks analysis

### Quick Start with BEADS+:

```bash
# Initialize project
acli init

# Phase 1: Create constitution
acli beads constitution

# Phase 2: Create specification
acli beads specify

# Phase 3: Clarify ambiguities
acli beads clarify --featureId 001-user-auth

# Phase 4: Technical plan
acli beads plan --featureId 001-user-auth

# Phase 5: Quality checklists
acli beads checklist --featureId 001-user-auth

# Phase 6: Executable tasks
acli beads tasks --featureId 001-user-auth

# Phase 7: Validate consistency
acli beads analyze --featureId 001-user-auth

# Phase 8: Implement with TDD
acli beads implement --featureId 001-user-auth --priority P0

# OR: Execute full workflow
acli beads workflow
```

📖 **Complete Guides**: 
- [BEADS_WORKFLOW.md](./BEADS_WORKFLOW.md) - Full BEADS+ workflow documentation
- [ITERATIVE_DEVELOPMENT.md](./ITERATIVE_DEVELOPMENT.md) - Iterative dev loop with quality gates

## Pre-built Agents

### 1. Requirement Gathering Agent (BEADS+)
Specification-driven development with technology-agnostic requirements:
- Create project constitution
- Generate feature specifications (WHAT/WHY only)
- Ask clarifying questions (max 3 per round)
- Validate technology-agnostic requirement
- Pivotal Labs user stories with P0-P3 priorities

### 2. Architecture Agent
Design scalable and maintainable systems:
- System architecture design and patterns
- Component design and data flow
- Architecture Decision Records (ADRs)
- Design pattern recommendations
- Technology selection guidance

### 3. Security Agent
Comprehensive security analysis:
- Vulnerability detection and scanning
- OWASP Top 10 compliance
- Security best practices enforcement
- Penetration testing guidance
- Dependency security audits

### 4. Development Agent
Accelerates feature implementation:
- Code generation from specifications
- Feature development and refactoring
- Implementation of architecture designs
- Following security requirements

### 5. Testing Agent
Comprehensive testing support:
- Test case generation
- Coverage analysis
- Unit, integration, and e2e test scaffolding
- Test data generation

### 6. Code Quality Agent
Maintains code excellence:
- Code review automation
- Best practice enforcement
- Performance analysis
- Maintainability checks

### 7. Orchestrator Agent
Coordinates multi-agent workflows:
- Project planning and task breakdown
- Agent coordination and workflow management
- Progress tracking and reporting
- Complex task orchestration
- **Handover Documents**: Passes structured context between agents
- **Learning System**: Saves and reapplies lessons from past work

## Agent Memory & Handover System

The framework includes a sophisticated **file-based memory system** that enables agents to:
- 📝 **Pass Context**: Handover documents maintain continuity between agents
- 🧠 **Learn from Mistakes**: Automatically save quality issues and test failures
- 🔄 **Reapply Knowledge**: Relevant learnings loaded before each task
- 📊 **Track Success**: Monitor which patterns work and which don't

### Handover Documents

During iterative development, agents pass structured handover documents at each step:

```
Development Agent
    ↓ (Handover: files changed, decisions, implementation summary)
Quality Agent
    ↓ (Handover: quality issues, security concerns, action items)
Testing Agent
    ↓ (Handover: test results, feedback, prioritized fixes)
Development Agent (next iteration)
```

**Handover Content**:
- Files changed and implementation summary
- Key decisions and rationale
- Quality issues discovered
- Test failures and specific reasons
- Action items (high/medium/low priority)
- Context from previous iterations
- Learnings applied and lessons discovered

**Storage**: `.specify/memory/handovers/` (JSON + Markdown)

### Learning System

Agents automatically capture and reuse knowledge:

**Learning Sources**:
1. ✅ **Successful Patterns**: Saved when tasks complete successfully
2. ⚠️ **Quality Issues**: Saved when critical/high severity issues found
3. ❌ **Test Failures**: Saved with root cause and resolution

**Learning Categories**:
- Security issues and fixes
- Performance optimizations
- Quality improvements
- Testing strategies
- Architecture decisions
- General best practices

**Learning Reapplication**:
```typescript
// Before starting each task
const relevantLearnings = await memory.getRelevantLearnings({
  categories: ['security', 'testing'],
  tags: ['authentication', 'validation'],
  files: ['src/auth/*']
});

// Learnings automatically provided to agents
// Agents reference past mistakes to avoid repetition
// Success rate tracked for each learning
```

**Storage**: `.specify/memory/learnings/` (JSON + Markdown)

**Tracking**:
- Times applied
- Success rate
- Related learnings
- Code examples (before/after)

### Example Learning Flow

```
1. Development implements feature
2. Quality discovers security issue
   → Learning saved: "SQL Injection in user input"
   → Category: security, Severity: critical
   → Resolution: Use parameterized queries
   → Code example included

3. Next similar task starts
   → Learning loaded: "SQL Injection prevention"
   → Development agent references this learning
   → Implements with parameterized queries from start
   → Quality passes on first iteration
   
4. Success! Learning success rate increased
```

📖 **Templates**:
- [handover.template.md](./templates/beads/handover.template.md) - Handover document structure
- [learning.template.md](./templates/beads/learning.template.md) - Learning entry format

📚 **Complete Guide**: [MEMORY_SYSTEM.md](./MEMORY_SYSTEM.md) - Comprehensive memory & handover documentation

## Project Structure

```
your-project/
├── .github/
│   └── copilot/
│       ├── agents/
│       │   ├── requirements/
│       │   │   └── .agent.md
│       │   ├── architecture/
│       │   │   └── .agent.md
│       │   ├── security/
│       │   │   └── .agent.md
│       │   ├── development/
│       │   │   └── .agent.md
│       │   ├── testing/
│       │   │   └── .agent.md
│       │   ├── quality/
│       │   │   └── .agent.md
│       │   └── orchestrator/
│       │       └── .agent.md
│       └── skills/
│           └── (custom skills)
├── .specify/
│   ├── memory/
│   │   ├── handovers/      # Agent handover documents
│   │   │   ├── index.json  # Handover index
│   │   │   ├── H-*.json    # Handover data
│   │   │   └── H-*.md      # Human-readable handovers
│   │   └── learnings/      # Agent learning system
│   │       ├── index.json  # Learning index
│   │       ├── L-*.json    # Learning data
│   │       └── L-*.md      # Human-readable learnings
│   ├── constitution.md
│   ├── features/
│   └── workflows/
├── .vscode/
│   └── extensions.json
└── .agent-framework.json
```

## CLI Commands

| Command | Description |
|---------|-------------|
| `acli init` | Initialize agent framework in current project |
| `acli list agents` | List all available agents |
| `acli list skills` | List all available skills |
| `acli install <agent>` | Install a pre-built agent |
| `acli create agent` | Create a custom agent |
| `acli create skill` | Create a custom skill |
| `acli update <agent>` | Update an agent to latest version |
| `acli remove <agent>` | Remove an agent from project |
| `acli config` | Configure framework settings |

## Configuration

Create `.agent-framework.json` in your project root:

```json
{
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

## Development

```bash
# Clone the repository
git clone https://github.com/ipranjal/agent-framework.git
cd agent-framework

# Install dependencies
npm install

# Build
npm run build

# Run in development mode
npm run dev
```

## Contributing

Contributions are welcome! Please read our contributing guidelines before submitting PRs.

## License

MIT License - see LICENSE file for details
