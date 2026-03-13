# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.0.6] - 2026-03-14

### Fixed
- `handoffs` frontmatter attribute now serializes as objects with `label`, `agent`, `prompt`, and optional `send` fields per VS Code agent spec
- Added `HandoffConfig` interface to `Agent.ts`
- Updated YAML serializer to correctly render object arrays as YAML block mappings
- Orchestrator agent now has `handoffs` declared (was missing), enabling VS Code to present handoff buttons
- All sub-agents now include `orchestrator` as a handoff target so control can return after each phase
- Replaced `invokeAgent()` pseudocode in orchestrator instructions with real handoff protocol

## [1.0.5] - 2025-07-15

### Added
- 7 speckit skill files in `templates/skills/` (speckit-constitution, speckit-specify, speckit-plan, speckit-tasks, speckit-analyze, speckit-checklist, speckit-implement) — auto-discovered by VS Code from `.github/skills/`
- `installSpeckitSkills()` function; Speckit skills are now installed automatically alongside BEADS+ prompts
- `/acli.create.agent` slash command prompt — interactively scaffolds a new `.agent.md` file in `.github/agents/`
- `/acli.create.skill` slash command prompt — interactively scaffolds a new `.skill.md` file in `.github/skills/`

### Changed
- Prompt install path changed from `.github/copilot/` to `.github/prompts/` (correct VS Code discovery path)
- `acli create agent` and `acli create skill` CLI commands replaced by `/acli.create.agent` and `/acli.create.skill` Copilot Chat slash commands
- Skills are no longer listed in `tools` arrays — they are auto-discovered by VS Code and referenced by name in agent instructions

### Removed
- `acli create <type>` CLI command and `src/commands/create.ts` module

## [1.0.4] - 2025-07-09

### Added
- BEADS+ slash commands installed to `.github/copilot/` via `acli install` — enables `/beads.*` commands in Copilot Chat
- `installBeadsPrompts()` function in `src/commands/install.ts`
- Six prompt templates: `beads.constitution`, `beads.specify`, `beads.plan`, `beads.tasks`, `beads.analyze`, `beads.implement`
- `acli create agent` command to scaffold new `.agent.md` files
- `acli create skill` command to scaffold new `.skill.md` files

### Changed
- Agent config format changed to flat `.agent.md` files in `.github/agents/`
- `acli init` now sets up full `.github/` directory structure (agents, prompts, skills)

## [1.0.3] - 2025-07-05

### Added
- `acli run` command — runs the full BEADS+ orchestrated workflow for a given project goal
- `acli status` command — summarizes current workflow artifact state

### Changed
- OrchestratorAgent now reads agent configs from `.github/agents/` directory

## [1.0.2] - 2025-06-30

### Added
- `acli init` command — bootstraps `.github/agents/` with default agent configs

### Changed
- Agent memory and handover documents now stored under `.github/memory/`

## [1.0.1] - 2025-06-25

### Fixed
- `acli install` command now correctly resolves template paths relative to the npm package
- RequirementGatheringAgent handoff data passing to ArchitectureAgent

## [1.0.0] - 2026-03-13

### Initial Release - BEADS+ SpecKit Integrated Framework 🎉

Complete agent framework with integrated [BEADS+ SpecKit](https://github.com/jmanhype/speckit) workflow and Pivotal Labs practices.

#### Core Workflow Components
- **BeadsWorkflow Class**: TypeScript implementation of 8-phase BEADS+ workflow
  - Constitution management
  - Technology-agnostic specification generation
  - Technical planning
  - Task list generation with dependencies
  - Consistency analysis across artifacts
  - Priority-based delivery (P0-P3)

#### Agent Memory & Handover System 🧠
- **AgentMemory Class**: File-based memory system for persistent learning
  - Handover document creation and retrieval
  - Learning storage and smart querying
  - Dual format storage (JSON for machines, Markdown for humans)
  - Index files for efficient lookup
  - Success rate tracking for learnings
  
- **Handover Documents**: Structured context passing between agents
  - Development → Quality → Testing → Development feedback loop
  - Includes: files changed, decisions, issues, action items, context, learnings
  - Maintains full iteration history
  - Prevents context loss between agent transitions
  
- **Learning System**: Institutional knowledge accumulation
  - Automatically saves quality issues (critical/high severity)
  - Automatically saves test failures with resolutions
  - Automatically saves successful patterns
  - Loads relevant learnings before each task
  - Categories: security, performance, quality, testing, architecture, other
  - Severity levels: critical, high, medium, low
  - Tags for smart retrieval
  - Code examples (before/after)
  - Apply count and success rate tracking

- **Templates**:
  - `handover.template.md` - Structured handover document format
  - `learning.template.md` - Learning entry format with metrics

- **Storage**: `.specify/memory/` directory
  - `handovers/` - Agent handover documents
  - `learnings/` - Knowledge base of patterns and resolutions

#### Iterative Development Loop 🔄
- **Development → Quality → Testing** feedback cycle
  - Max 5 iterations per task
  - Quality review after every development cycle
  - Comprehensive testing with 100% pass requirement
  - Feedback handovers guide next iteration
  - Learnings captured from each cycle
  - Context maintained across all iterations

#### BEADS+ CLI Commands
- `acli beads constitution` - Create project constitution
- `acli beads specify` - Generate technology-agnostic feature specs
- `acli beads clarify` - Ask clarifying questions (max 3)
- `acli beads plan` - Create technical implementation plan
- `acli beads checklist` - Generate quality checklists
- `acli beads tasks` - Create executable task list
- `acli beads analyze` - Validate spec ↔ plan ↔ tasks consistency
- `acli beads implement` - Start implementation with TDD
- `acli beads workflow` - Execute full 8-phase workflow
- `acli beads status` - Check workflow status

#### Templates (9 new templates)
- `constitution.template.md` - Project principles and constraints
- `spec.template.md` - Technology-agnostic feature specification
- `plan.template.md` - Technical implementation plan with ADRs
- `tasks.template.md` - Executable task list with dependencies
- `checklist-security.template.md` - OWASP Top 10, authentication, encryption
- `checklist-accessibility.template.md` - WCAG 2.1 Level AA compliance
- `checklist-performance.template.md` - Core Web Vitals, API targets
- `handover.template.md` - Handover document structure for agent coordination
- `learning.template.md` - Learning entry format with tracking metrics

#### Updated Agents
- **Requirements Agent (v1.0.0)**: Complete BEADS+ integration
  - Constitution, Specify, Clarify phases
  - Technology-agnostic validation (enforced)
  - P0-P3 prioritization (Pivotal Labs)
  - Max 3 clarifying questions per round
  
- **Orchestrator Agent (v1.0.0)**: Full workflow orchestration with memory integration
  - 8-phase BEADS+ workflow coordination
  - Quality gate enforcement at every phase
  - 100% test pass requirement (mandatory)
  - Consistency validation before implementation
  - Phase-by-phase or full workflow execution
  - **Iterative development loop** (Dev → Quality → Test with max 5 iterations)
  - **Handover document creation** at each agent transition
  - **Learning system integration** (auto-save issues, auto-load relevant learnings)
  - **Context maintenance** across all iterations
  - **Success tracking** for applied learnings

#### Documentation
- `BEADS_WORKFLOW.md` - Complete BEADS+ workflow guide
  - All 8 phases explained in detail
  - Quality gates and test requirements
  - CLI commands and examples
  - Best practices (DO's and DON'Ts)
  - Agent integration guide
  - Complete end-to-end example

- `ITERATIVE_DEVELOPMENT.md` - Iterative development loop guide
  - Dev → Quality → Test feedback cycle
  - How iterations work
  - Benefits and metrics
  - Best practices
  - Comparison with traditional approaches
  - Complete examples

- `MEMORY_SYSTEM.md` - Agent memory and handover documentation
  - Handover document system
  - Learning system architecture
  - Storage format and structure
  - API reference (AgentMemory class)
  - Complete usage examples
  - Best practices for memory and handovers
  - Metrics and tracking

### Changed
- **Directory Structure**: Updated to GitHub standard
  - Agents now in `.github/agents/` (was `.vscode/agents/`)
  - Skills now in `.github/skills/` (was `.copilot/skills/`)
  - Follows GitHub directory conventions
  - All documentation and examples updated

- **Requirements Agent**: Now uses BEADS+ methodology
  - Technology-agnostic requirement enforced
  - Pivotal Labs user story format
  - P0 (Must Have) → P1 (Should Have) → P2 (Nice to Have) → P3 (Won't Have)
  
- **Orchestrator Agent**: Enhanced with BEADS+ orchestration
  - Manages complete workflow from constitution to deployment
  - Enforces quality gates
  - Validates consistency before implementation
  - Coordinates all 7 agents

### Quality Gates
- ✅ Constitution aligns with project goals
- ✅ Specifications are 100% technology-agnostic (no frameworks/libraries)
- ✅ All clarifying questions resolved
- ✅ Plan aligns with spec + constitution
- ✅ All checklists completed
- ✅ Tasks are dependency-ordered with tests defined
- ✅ Analyze validates consistency (no gaps, no conflicts)
- ✅ **100% tests pass** at task/story/feature levels (NO EXCEPTIONS)

### Methodology
- **Specification-Driven Development**: WHAT/WHY before HOW
- **Technology-Agnostic Specs**: No framework/library/tool names in specs
- **Incremental Delivery**: P0 (MVP) → P1 → P2 → P3
- **Test-Driven Development**: Tests required at task level
- **Quality at Every Phase**: 8 quality gates enforced
- **Pivotal Labs Practices**: User stories, IPM planning, TDD

### Pre-built Agents (7 Total)
1. **Requirements Agent**: BEADS+ specification-driven requirements
2. **Architecture Agent**: System design, patterns, and ADRs
3. **Security Agent**: Vulnerability detection and OWASP compliance
4. **Development Agent**: Code implementation and features
5. **Testing Agent**: Test generation and coverage
6. **Quality Agent**: Code quality and maintainability
7. **Orchestrator Agent**: Multi-agent workflow coordination

### CLI Commands
- `init` - Initialize agent framework in project
- `create` - Create custom agents and skills
- `list` - List available agents and skills
- `install` - Install pre-built agents
- `remove` - Remove agents from project
- `update` - Update agents to latest version
- `config` - Configure framework settings
- `beads <phase>` - Execute BEADS+ SpecKit workflow phases

### Framework Features
- TypeScript-based extensible architecture
- Agent and Skill base classes
- AgentManager for lifecycle management
- Template system for agents, skills, and BEADS+ documents
- VS Code + GitHub Copilot integration
- 8-phase BEADS+ workflow with quality gates
- Configuration management system
- Comprehensive documentation
- MIT License

## [Unreleased]

### Planned
- Agent marketplace
- Remote agent installation
- Agent versioning system
- More pre-built agents
- Agent testing framework
- VS Code extension
- Web-based agent editor
- Agent analytics and monitoring
- Multi-language support
- Agent composition and chaining
