# BEADS+ SpecKit Workflow Guide

**BEADS+** = Better Engineering through Adaptive Development with Specifications

This guide explains the complete BEADS+ workflow integrated into the agent framework, based on [SpecKit methodology](https://github.com/jmanhype/speckit) and Pivotal Labs practices.

---

## Table of Contents

1. [Overview](#overview)
2. [Workflow Phases](#workflow-phases)
3. [Quality Gates](#quality-gates)
4. [CLI Commands](#cli-commands)
5. [Agent Integration](#agent-integration)
6. [Complete Example](#complete-example)
7. [Best Practices](#best-practices)
8. [Templates](#templates)

---

## Overview

BEADS+ is a specification-driven development methodology that ensures quality through:

- **Technology-Agnostic Specifications**: Focus on WHAT/WHY, not HOW
- **Incremental Delivery**: P0 (MVP) → P1 → P2 → P3 prioritization
- **Quality Gates**: 100% test pass requirement at every level
- **Consistency Validation**: Automated checks for spec ↔ plan ↔ tasks alignment
- **Pivotal Labs Practices**: User stories, TDD, IPM planning

### 8-Phase Workflow

```
┌───────────────────────────────────────────────────────────────────────────┐
│                        BEADS+ Workflow                                    │
└───────────────────────────────────────────────────────────────────────────┘

[1]          [2]        [3]       [4]      [5]         [6]       [7]        [8]
CONSTITUTION → SPECIFY → CLARIFY → PLAN → CHECKLIST → TASKS → ANALYZE → IMPLEMENT
     ↓           ↓          ↓        ↓         ↓          ↓        ↓          ↓
  Principles   Spec.md   Clarify  Plan.md  Checklists Tasks.md Analysis   Code+Tests
  (WHAT/WHY)   (WHAT)    (Q&A)    (HOW)    (Quality)  (Execute) (Validate) (Build)

Quality Gates:
✅ Aligns with goals
✅ 100% tech-agnostic
✅ Questions resolved
✅ Aligns with spec
✅ All domains covered
✅ Dependency-ordered
✅ No gaps found
✅ 100% tests pass
```

---

## Workflow Phases

### Phase 1: CONSTITUTION 🏛️

**Purpose**: Define foundational project principles that guide all feature development.

**Deliverable**: `.specify/memory/constitution.md`

**What to Include**:
- **Core Principles**: Architectural patterns (e.g., "API-first", "Mobile-first")
- **Technology Constraints**: Languages, frameworks, infrastructure requirements
- **Quality Standards**: Test coverage, performance targets, security requirements
- **Development Workflow**: Branching strategy, review process, deployment
- **Specification Workflow**: BEADS+ phases and quality gates

**Quality Gate**: 
- ✅ Constitution aligns with project goals
- ✅ Principles are clear and actionable
- ✅ Constraints are realistic

**CLI Command**:
```bash
acli beads constitution
```

**Agent**: `@requirements`

**Example**:
```markdown
# Project Constitution

**Project**: E-commerce Platform

## Core Principles
- API-first: All functionality accessible via API
- Mobile-first: Design for mobile, scale to desktop
- Security by design: Security at every layer

## Technology Constraints
- Language: TypeScript (Node 18+)
- Test Coverage: 90%+ required
- API Response Time: < 200ms (p95)

## Quality Standards
- All features follow BEADS+ workflow
- 100% tests pass before merge
- Technology-agnostic specifications
```

---

### Phase 2: SPECIFY 📝

**Purpose**: Create technology-agnostic feature specifications focused on WHAT/WHY.

**Deliverable**: `specs/###-feature-name/spec.md`

**What to Include**:
- **Problem Statement**: What problem does this solve? (WHAT/WHY only)
- **Business Value**: User value + business impact
- **User Stories**: Pivotal Labs format with P0-P3 priorities
  - Format: "As a [user], I want [capability], so that [benefit]"
  - P0: Must Have (MVP), P1: Should Have, P2: Nice to Have, P3: Won't Have
- **Acceptance Criteria**: Testable, measurable outcomes (checkboxes)
- **Success Criteria**: Quantifiable metrics
- **User Scenarios**: Context → Action → Outcome
- **Out of Scope**: Explicit boundaries
- **Assumptions & Dependencies**: External dependencies

**Quality Gate**:
- ✅ 100% technology-agnostic (no frameworks/libraries/tools)
- ✅ All user stories have P0-P3 priorities
- ✅ Acceptance criteria are testable
- ✅ Stakeholder-readable (non-technical can understand)

**CLI Command**:
```bash
acli beads specify
```

**Agent**: `@requirements`

**Technology-Agnostic Requirement**:

❌ **Forbidden Terms** (Implementation Details):
- React, Vue, Angular, Svelte
- PostgreSQL, MongoDB, Redis
- Express, FastAPI, Django
- REST API, GraphQL, WebSocket
- Docker, Kubernetes, AWS
- JWT, OAuth2

✅ **Allowed Terms** (Concepts):
- API, database, cache, message queue
- Web interface, mobile app
- Authentication, authorization
- Real-time updates, async processing

**Example User Story**:
```markdown
## US1: User Registration (P0 - Must Have)

**As a** new visitor to the platform  
**I want** to create an account with my email and password  
**So that** I can access personalized features

### Acceptance Criteria
- [ ] User can enter email and password
- [ ] System validates email format
- [ ] System enforces password requirements (8+ chars)
- [ ] User receives confirmation email
- [ ] User can verify account via email link

### Success Criteria
- 90% users complete registration within 2 minutes
- Email verification rate > 85%
```

---

### Phase 3: CLARIFY ❓

**Purpose**: Resolve ambiguities through targeted questions (max 3 per round).

**Deliverable**: Updated `spec.md` with resolved questions

**What to Ask**:
- **Scope Questions**: "What's included/excluded?"
- **Priority Questions**: "Which is more important?"
- **Constraint Questions**: "Are there limitations?"
- **Edge Case Questions**: "What happens when...?"

**Quality Gate**:
- ✅ All open questions resolved
- ✅ Stakeholder approval received
- ✅ Technology-agnostic validation still passes

**CLI Command**:
```bash
acli beads clarify --featureId 001-user-authentication
```

**Agent**: `@requirements`

**Example**:
```markdown
## Clarifying Questions

### Q1: Social Login Priority
Should third-party authentication (Google, Facebook) be included in MVP?

**Answer**: Start with email/password for P0 MVP. Social login is P1.

### Q2: Email Verification Requirement
Can users access features before email verification?

**Answer**: Users can log in immediately but see banner. Some features 
(posting content) require verified account.

### Q3: Password Reset Scope
Should password reset be part of this feature or separate?

**Answer**: Include in same feature. It's core to authentication.
```

---

### Phase 4: PLAN 🏗️

**Purpose**: Create technical implementation plan (HOW).

**Deliverable**: `specs/###-feature-name/plan.md`

**What to Include**:
- **Architecture**: Components, data flow, integration points
- **Tech Stack**: Specific technologies with rationale
- **File Structure**: Detailed file-by-file breakdown
- **Data Models**: Schemas, storage, indexes
- **API Contracts**: Endpoints, request/response, errors
- **Technical Decisions**: ADR-style (alternatives, tradeoffs)
- **Security**: Auth, authorization, encryption
- **Performance**: Targets, optimization strategies
- **Testing Strategy**: Unit, integration, E2E

**Quality Gate**:
- ✅ Aligns with specification requirements
- ✅ Aligns with constitutional principles
- ✅ Architecture decisions documented (ADRs)
- ✅ Technical risks identified

**CLI Command**:
```bash
acli beads plan --featureId 001-user-authentication
```

**Agent**: `@architecture`

**Example Section**:
```markdown
## Tech Stack

### Backend
- **Language**: TypeScript (Node 18+)
- **Framework**: Express.js
- **Rationale**: Team expertise, ecosystem maturity

### Database
- **Primary**: PostgreSQL 15
- **Rationale**: ACID compliance, JSON support, mature

### Authentication
- **Password Hashing**: bcrypt (cost factor 12)
- **Sessions**: Redis for session storage
- **Rationale**: Industry standard, proven security

## Technical Decision: JWT vs Sessions

**Decision**: Use server-side sessions with Redis storage

**Alternatives**:
1. JWT tokens: Self-contained but can't revoke easily
2. Sessions: Require state but can revoke instantly

**Tradeoffs**:
- ✅ Can revoke sessions (security requirement)
- ✅ Simpler logout across devices
- ❌ Requires Redis infrastructure

**Consequences**: Need Redis deployment and monitoring
```

---

### Phase 5: CHECKLIST ✅

**Purpose**: Generate domain-specific quality checklists.

**Deliverables**: 
- `specs/###-feature-name/checklists/security.md`
- `specs/###-feature-name/checklists/accessibility.md`
- `specs/###-feature-name/checklists/performance.md`

**Available Checklists**:
- **Security**: OWASP Top 10, authentication, authorization, encryption
- **Accessibility**: WCAG 2.1 Level AA compliance
- **Performance**: Core Web Vitals, API response times, load targets

**Quality Gate**:
- ✅ All applicable checklists generated
- ✅ Domain requirements identified
- ✅ Validation criteria defined

**CLI Command**:
```bash
acli beads checklist --featureId 001-user-authentication
```

**Agents**: `@security`, `@quality`

---

### Phase 6: TASKS 📋

**Purpose**: Create executable, dependency-ordered task list.

**Deliverable**: `specs/###-feature-name/tasks.md`

**Task Format**:
```
[T###] [P] [US#] Description path/to/file
```

- `[T###]`: Unique task ID (T001, T002, ...)
- `[P]`: Parallelizable flag (optional)
- `[US#]`: User story reference (US1, US2, ...)
- `path/to/file`: Implementation location

**What to Include**:
- **Organized by Priority**: P0 → P1 → P2 → P3 sections
- **Dependencies**: Each task lists dependent task IDs
- **Test Requirements**: What tests are needed
- **Estimates**: Time/effort estimates
- **Quality Gates**: Test requirements at each level

**Quality Gate**:
- ✅ All user stories have tasks
- ✅ Tasks are dependency-ordered
- ✅ Test requirements defined
- ✅ Format is correct

**CLI Command**:
```bash
acli beads tasks --featureId 001-user-authentication
```

**Agent**: `@development`

**Example**:
```markdown
## Phase P0: Foundation (Must Have)

**User Story**: US1 - User Registration

- [ ] **[T001]** [P] [US1] Setup user model and database schema - `src/models/user.model.ts`
  - **Purpose**: Define user data structure
  - **Dependencies**: None
  - **Tests**: Model validation tests
  - **Est**: 2h

- [ ] **[T002]** [US1] Implement password hashing service - `src/services/password.service.ts`
  - **Purpose**: Secure password storage
  - **Dependencies**: T001
  - **Tests**: Hash/verify unit tests
  - **Est**: 2h

- [ ] **[T003]** [P] [US1] Create registration endpoint - `src/controllers/auth.controller.ts`
  - **Purpose**: HTTP API for registration
  - **Dependencies**: T001, T002
  - **Tests**: Registration integration tests
  - **Est**: 3h
```

---

### Phase 7: ANALYZE 🔍

**Purpose**: Validate consistency across spec, plan, and tasks.

**Deliverable**: Analysis report (console output + `analysis.md`)

**What to Validate**:
- **Spec ↔ Plan**: All user stories have technical designs
- **Plan ↔ Tasks**: All designs have executable tasks
- **Task Dependencies**: No circular dependencies
- **Test Coverage**: All tasks have test requirements
- **Priority Consistency**: P0-P3 alignment across artifacts

**Quality Gate**:
- ✅ No gaps found (all user stories covered)
- ✅ No conflicts detected
- ✅ Dependencies are valid
- ✅ Ready for implementation

**CLI Command**:
```bash
acli beads analyze --featureId 001-user-authentication
```

**Agent**: `@orchestrator`

**Example Output**:
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Consistency Analysis Results
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📊 Coverage:
  Total User Stories: 4
  Covered in Plan: 4
  Covered in Tasks: 4

✅ NO GAPS FOUND

All user stories have:
  ✓ Technical designs (plan.md)
  ✓ Executable tasks (tasks.md)
  ✓ Test requirements defined

Ready for IMPLEMENT phase! 🚀
```

---

### Phase 8: IMPLEMENT 🚀

**Purpose**: Incremental implementation with TDD and quality gates.

**Deliverables**: Source code + tests + passing CI

**Implementation Workflow**:
1. **Select Next Task**: Check dependencies first
2. **Write Tests First**: TDD approach
3. **Implement Feature**: Follow plan.md
4. **Run Tests**: 100% must pass ✅
5. **Mark Complete**: Update tasks.md
6. **Repeat**: Next task

**Quality Gates (Mandatory)**:
- ✅ **Task Level**: All task tests pass (100%)
- ✅ **User Story Level**: All story tests pass (100%)
- ✅ **Feature Level**: Full suite pass + no regressions (100%)

**Priority-Based Delivery**:
```
P0 (MVP) → Deploy or continue
P1 (Important) → Deploy or continue
P2 (Nice to Have) → Deploy or continue
P3 (Future) → Backlog
```

**CLI Command**:
```bash
acli beads implement --featureId 001-user-authentication --priority P0
```

**Agents**: `@development`, `@testing`, `@quality`

**Test Gate Enforcement**:
```bash
# Task level
npm test -- task-001

# User story level  
npm test -- user-story-1

# Feature level
npm test -- feature-001-user-authentication

# No regressions
npm test
```

---

## Quality Gates

BEADS+ enforces quality gates at **every phase**. All criteria must pass before proceeding.

| Phase | Quality Gate Criteria | Test Required |
|-------|----------------------|---------------|
| **Constitution** | Principles defined, constraints documented | No |
| **Specify** | 100% technology-agnostic, P0-P3 priorities, testable criteria | No |
| **Clarify** | All questions resolved, stakeholder-approved | No |
| **Plan** | Aligns with spec + constitution, ADRs documented | No |
| **Checklist** | All applicable checklists completed | No | 
| **Tasks** | All stories have tasks, dependencies valid | No |
| **Analyze** | No gaps, no conflicts, coverage complete | No |
| **Implement** | **100% tests pass** at task/story/feature levels | **YES** ✅ |

### Test Gate Enforcement (Phase 8)

**NO EXCEPTIONS**: 100% tests must pass at **every level**.

```
Task T001 Complete?
├─ Run task tests → ❌ FAIL → FIX TESTS → Retry
├─ Run task tests → ✅ PASS → Mark complete
└─ Move to next task

User Story US1 Complete (all tasks done)?
├─ Run story integration tests → ❌ FAIL → FIX → Retry
├─ Run story integration tests → ✅ PASS → Mark complete
└─ Move to next story

Feature Complete (all stories done)?
├─ Run full test suite → ❌ FAIL → FIX → Retry
├─ Run regression tests → ❌ FAIL → FIX → Retry
├─ All tests pass + no regressions → ✅ PASS → Ready to deploy
└─ Deploy or continue with next priority
```

---

## CLI Commands

### Command Reference

```bash
# Phase 1: Constitution
acli beads constitution

# Phase 2: Specify
acli beads specify

# Phase 3: Clarify
acli beads clarify --featureId <id>

# Phase 4: Plan
acli beads plan --featureId <id>

# Phase 5: Checklist
acli beads checklist --featureId <id>

# Phase 6: Tasks
acli beads tasks --featureId <id>

# Phase 7: Analyze
acli beads analyze --featureId <id>

# Phase 8: Implement
acli beads implement --featureId <id> --priority P0

# Full Workflow (all phases)
acli beads workflow

# Check Status
acli beads status --featureId <id>
```

### Command Options

- `--featureId <id>`: Specify feature ID (e.g., `001-user-auth`)
- `--priority <P0|P1|P2|P3>`: Filter by priority level
- `--force`: Overwrite existing files
- `--output <path>`: Custom output directory

---

## Agent Integration

BEADS+ workflow is integrated with specialized agents:

### @requirements Agent
- **Phases**: Constitution, Specify, Clarify
- **Responsibilities**:
  - Create constitution
  - Generate technology-agnostic specifications
  - Ask clarifying questions
  - Validate technology-agnostic requirement

### @architecture Agent
- **Phases**: Plan
- **Responsibilities**:
  - Create technical implementation plan
  - Document architecture decisions (ADRs)
  - Define file structure and data models

### @security Agent
- **Phases**: Checklist
- **Responsibilities**:
  - Generate security checklist
  - Review security requirements
  - Validate security controls

### @quality Agent
- **Phases**: Checklist
- **Responsibilities**:
  - Generate accessibility checklist
  - Generate performance checklist
  - Code review and refactoring

### @development Agent
- **Phases**: Tasks, Implement
- **Responsibilities**:
  - Create executable task list
  - Implement features following TDD
  - Follow plan.md and tasks.md

### @testing Agent
- **Phases**: Implement
- **Responsibilities**:
  - Generate test cases
  - Execute test suites
  - Validate test coverage

### @orchestrator Agent
- **Phases**: All (coordinates)
- **Responsibilities**:
  - Orchestrate complete workflow
  - Enforce quality gates
  - Run consistency analysis
  - Coordinate between agents

**Usage**:
```bash
# Use agents directly
@requirements specify "User authentication"
@architecture plan specs/001-user-auth/spec.md
@orchestrator beads workflow
```

---

## Complete Example

### Project: E-commerce Platform
### Feature: User Authentication

#### Step 1: Constitution
```bash
$ acli beads constitution

Project name: E-commerce Platform
Core principles: API-first, Mobile-first, Security by design
Primary language: TypeScript
Test coverage: 90%

✅ Constitution created: .specify/memory/constitution.md
```

#### Step 2: Specify
```bash
$ acli beads specify

Feature name: User Authentication
Problem: Users need secure way to create accounts
User value: Access personalized features, secure data

✅ Specification created: specs/001-user-authentication/spec.md

⚠️  IMPORTANT: Technology-Agnostic Requirement
  ❌ Do NOT mention: frameworks, libraries, databases
  ✅ Focus on: WHAT system should do, WHY needed
```

**Output** (`specs/001-user-authentication/spec.md`):
```markdown
# Feature: User Authentication

**Feature ID**: 001-user-authentication

## Problem Statement
Users need a secure way to create accounts and access personalized features.

## User Stories

### US1: User Registration (P0 - Must Have)
**As a** new visitor
**I want** to create an account with email/password
**So that** I can access personalized features

#### Acceptance Criteria
- [ ] User can enter email and password
- [ ] System validates email format
- [ ] System enforces password requirements
- [ ] User receives confirmation email
```

#### Step 3: Clarify
```bash
$ acli beads clarify --featureId 001-user-authentication

Question 1: Should social login be in MVP?
Answer 1: No, social login is P1 (post-MVP)

Question 2: Email verification required before access?
Answer 2: Users can login immediately, banner prompts verification

✅ Specification updated with 2 clarification(s)
```

#### Step 4: Plan
```bash
$ acli beads plan --featureId 001-user-authentication

✅ Technical plan created: specs/001-user-authentication/plan.md

✏️  Edit plan to add:
  - Architecture and components
  - Technical decisions
  - File structure
  - Testing strategy
```

#### Step 5: Checklists
```bash
$ acli beads checklist --featureId 001-user-authentication

Select checklists:
  ✅ Security
  ✅ Accessibility
  ✅ Performance

✅ 3 checklist(s) created
```

#### Step 6: Tasks
```bash
$ acli beads tasks --featureId 001-user-authentication

✅ Task list created: specs/001-user-authentication/tasks.md

📝 Task Format: [T###] [P] [US#] Description path/to/file
```

**Output** (`specs/001-user-authentication/tasks.md`):
```markdown
## Phase P0: Foundation (Must Have)

- [ ] **[T001]** [P] [US1] Setup user model - `src/models/user.model.ts`
  - Dependencies: None
  - Tests: Model validation tests
  
- [ ] **[T002]** [US1] Password hashing - `src/services/password.service.ts`
  - Dependencies: T001
  - Tests: Hash/verify tests
```

#### Step 7: Analyze
```bash
$ acli beads analyze --featureId 001-user-authentication

Analyzing consistency...

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Consistency Analysis Results
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📊 Coverage:
  Total User Stories: 3
  Covered in Plan: 3
  Covered in Tasks: 3

✅ NO GAPS FOUND

Ready for IMPLEMENT phase! 🚀
```

#### Step 8: Implement
```bash
$ acli beads implement --featureId 001-user-authentication --priority P0

Feature: 001-user-authentication
Priority: P0

🎯 Implementation Workflow:
  1. Select next task (check dependencies)
  2. Write tests first (TDD)
  3. Implement feature
  4. Run tests (100% must pass)
  5. Mark task complete
  6. Repeat

⚠️  QUALITY GATE: 100% Tests Must Pass

Ready to start implementation? Yes

✅ Starting implementation...
```

**Implementation Process**:
```bash
# Task T001: Setup user model
npm test -- T001  # Write tests first
# Implement src/models/user.model.ts
npm test -- T001  # ✅ 8/8 passing (100%)

# Task T002: Password hashing
npm test -- T002  # Write tests first
# Implement src/services/password.service.ts
npm test -- T002  # ✅ 12/12 passing (100%)

# ... continue through all P0 tasks

# User Story US1 complete
npm test -- US1   # ✅ 42/42 passing (100%)

# Feature P0 complete
npm test          # ✅ All tests passing, no regressions

🎉 P0 Implementation Complete!
Ready to deploy or continue with P1.
```

---

## Best Practices

### DO's ✅

1. **Always Start with Constitution**
   - Foundation for all future specifications
   - Align team on principles and constraints

2. **Keep Specs Technology-Agnostic**
   - Focus on WHAT/WHY, not HOW
   - Use validation tool: `BeadsWorkflow.validateSpecification()`

3. **Use P0-P3 Prioritization**
   - P0 = MVP (must have)
   - P1 = Important (should have)
   - P2 = Nice to have
   - P3 = Future (won't have now)

4. **Write Testable Acceptance Criteria**
   - Must be verifiable
   - Use checkboxes: `- [ ] Criterion`

5. **Run ANALYZE Before IMPLEMENT**
   - Catches gaps and conflicts early
   - Prevents wasted implementation effort

6. **Enforce Test Gates**
   - 100% tests pass at task level
   - 100% tests pass at story level
   - 100% tests pass at feature level + no regressions

7. **Document Decisions**
   - Use ADR format in plan.md
   - Capture alternatives and tradeoffs

8. **Iterate and Refine**
   - Specs are living documents
   - Update as understanding evolves

### DON'Ts ❌

1. **Never Skip Quality Gates**
   - Each phase must pass validation
   - Shortcuts create technical debt

2. **Don't Mention Technologies in Specs**
   - ❌ "React components", "PostgreSQL database"
   - ✅ "Web interface", "Database"

3. **Don't Skip ANALYZE Phase**
   - Catches inconsistencies before coding
   - Prevents rework

4. **Don't Deploy Without 100% Tests Passing**
   - NO EXCEPTIONS
   - Includes regression tests

5. **Don't Mix Priorities**
   - Complete P0 before starting P1
   - Incremental delivery reduces risk

6. **Don't Ignore Dependencies**
   - Respect task dependency order
   - Parallel tasks must be truly independent

7. **Don't Skip Constitution**
   - Sets foundation for quality
   - Prevents architecture drift

8. **Don't Write Vague Criteria**
   - ❌ "System should be fast"
   - ✅ "API responds < 200ms (p95)"

---

## Templates

All BEADS+ templates are available in `templates/beads/`:

1. **constitution.template.md** - Project constitution
2. **spec.template.md** - Feature specification
3. **plan.template.md** - Technical implementation plan
4. **tasks.template.md** - Executable task list
5. **checklist-security.template.md** - Security validation
6. **checklist-accessibility.template.md** - WCAG 2.1 Level AA
7. **checklist-performance.template.md** - Performance targets

### Creating Custom Templates

Templates use variable substitution:

- `{{FEATURE_NAME}}` - Feature name
- `{{FEATURE_ID}}` - Generated feature ID
- `{{DATE}}` - Current date
- `{{PROJECT_NAME}}` - Project name
- `{{STATUS}}` - Current status

---

## Resources

- **SpecKit Repository**: https://github.com/jmanhype/speckit
- **Pivotal Labs Methodology**: User stories, TDD, IPM planning
- **WCAG 2.1 Guidelines**: https://www.w3.org/TR/WCAG21/
- **OWASP Top 10**: https://owasp.org/www-project-top-ten/

---

## Getting Help

```bash
# Show available phases
acli beads --help

# Check workflow status
acli beads status --featureId <id>

# Use agents for guidance
@orchestrator help with beads workflow
@requirements create specification
```

---

**Version**: 2.0.0  
**Last Updated**: March 2026  
**Methodology**: BEADS+ SpecKit with Pivotal Labs practices
