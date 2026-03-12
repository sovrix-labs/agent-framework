# Project Constitution

**Project**: {{PROJECT_NAME}}  
**Created**: {{DATE}}  
**Last Updated**: {{DATE}}

---

## Purpose

This constitution defines the architectural principles, technical constraints, and quality standards that guide all feature development in this project. It serves as the foundational document that informs specifications, plans, and implementation decisions.

---

## Core Principles

### 1. [Principle Name]

**Description**: [What this principle means]

**Rationale**: [Why this is important for your project]

**Application**: [How this principle is applied in practice]

---

### 2. [Principle Name]

**Description**: [What this principle means]

**Rationale**: [Why this is important for your project]

**Application**: [How this principle is applied in practice]

---

### 3. [Principle Name]

**Description**: [What this principle means]

**Rationale**: [Why this is important for your project]

**Application**: [How this principle is applied in practice]

---

## Technology Constraints

### Languages

**Primary Language**: [Language + Version]  
**Rationale**: [Why chosen]  
**Constraints**: [Version requirements, features to use/avoid]

**Secondary Languages**: [If any]  
**Use Cases**: [When to use each]

### Frameworks & Libraries

| Category | Technology | Version | Purpose | Constraints |
|----------|-----------|---------|---------|-------------|
| Web Framework | [Name] | [Version] | [Purpose] | [Must/must not use features] |
| Database | [Name] | [Version] | [Purpose] | [Schema patterns, migrations] |
| Testing | [Name] | [Version] | [Purpose] | [Coverage requirements] |
| Build Tool | [Name] | [Version] | [Purpose] | [Configuration standards] |

### Infrastructure

- **Hosting**: [Platform, cloud provider]
- **Database**: [Type, version, instance specs]
- **Caching**: [Technology, configuration]
- **Message Queue**: [If applicable]
- **CDN**: [If applicable]
- **Monitoring**: [Tools, agents]

### Development Tools

- **IDE/Editor**: [Recommendations]
- **Version Control**: [Git, branching strategy]
- **CI/CD**: [Pipeline, tools]
- **Package Manager**: [npm, pip, etc.]
- **Linters**: [ESLint, Prettier, etc.]
- **Formatters**: [Configuration]

---

## Architectural Patterns

### System Architecture

**Pattern**: [Monolith, Microservices, Serverless, etc.]

**Structure**:
```
[Diagram or description of system architecture]
```

**Rationale**: [Why this architecture]

### Code Organization

**Pattern**: [Layered, Clean Architecture, Feature-based, etc.]

**Directory Structure**:
```
src/
├── [directory-1]/     # [Purpose]
├── [directory-2]/     # [Purpose]
└── [directory-3]/     # [Purpose]
```

**Module Boundaries**: [How modules are separated]

### Design Patterns

**Encouraged**:
- **Pattern 1**: [When and why to use]
- **Pattern 2**: [When and why to use]
- **Pattern 3**: [When and why to use]

**Discouraged**:
- **Anti-Pattern 1**: [Why to avoid]
- **Anti-Pattern 2**: [Why to avoid]

### Data Patterns

- **Data Access**: [Repository, DAO, Active Record, etc.]
- **State Management**: [Approach for UI state]
- **Caching Strategy**: [What, where, when to cache]
- **Data Validation**: [Where and how]

---

## Quality Standards

### Code Quality

**Standards**:
- **Complexity**: Cyclomatic complexity < 10 per function
- **Line Length**: Maximum 100 characters
- **Function Length**: Maximum 50 lines (guideline, not strict)
- **File Length**: Maximum 300 lines (guideline, not strict)
- **Naming**: [camelCase, snake_case, PascalCase - specify for each type]

**Code Reviews**:
- All code must be reviewed before merge
- Minimum 1 reviewer approval required
- Review checklist: [Link or inline checklist]

### Testing Standards

**Coverage Requirements**:
- **Unit Tests**: 90%+ coverage
- **Integration Tests**: Critical paths covered
- **E2E Tests**: User flows covered
- **No Regressions**: 100% existing tests must pass

**Test Structure**:
- **Naming**: [Convention for test files and functions]
- **Organization**: [How tests are organized]
- **Data**: [Test fixtures, factories, mocks]

**Test Gates**:
- Pre-commit: Unit tests must pass
- Pre-push: All tests must pass
- CI: Full suite + additional checks

### Documentation Standards

**Code Documentation**:
- **Public APIs**: JSDoc/docstrings required
- **Complex Logic**: Inline comments required
- **Architecture**: High-level diagrams required
- **ADRs**: Major decisions documented

**Project Documentation**:
- **README**: Setup, usage, architecture overview
- **CONTRIBUTING**: How to contribute
- **CHANGELOG**: Version history
- **API Docs**: Generated from code annotations

### Security Standards

**Requirements**:
- All inputs must be validated
- Secrets in environment variables (never in code)
- HTTPS enforced in production
- Authentication on all protected routes
- Authorization checks on all sensitive operations
- Regular dependency updates
- Security headers configured

**Security Reviews**:
- Security checklist required for new features
- Penetration testing for high-risk features
- Regular security audits

### Performance Standards

**Targets**:
- API Response Time: < 200ms (p95)
- Time to Interactive: < 3s (web)
- Database Queries: < 50ms (average)
- Page Load: < 2s (web)

**Monitoring**:
- All critical endpoints monitored
- Performance regression tests in CI
- Alerts on threshold violations

### Accessibility Standards

**Compliance**: WCAG 2.1 Level AA

**Requirements**:
- Semantic HTML
- ARIA labels where needed
- Keyboard navigation support
- Screen reader compatibility
- Color contrast ratios met

---

## Development Workflow

### Branching Strategy

**Model**: [Git Flow, GitHub Flow, trunk-based, etc.]

**Branch Naming**:
- Features: `###-feature-name` (e.g., `001-user-auth`)
- Bugfixes: `fix/###-bug-description`
- Hotfixes: `hotfix/###-critical-issue`

### Commit Conventions

**Format**: `type(scope): subject`

**Types**:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Formatting
- `refactor`: Code restructuring
- `test`: Tests
- `chore`: Maintenance

**Examples**:
- `feat(auth): add OAuth2 support`
- `fix(api): resolve timeout in user endpoint`

### Pull Request Process

1. Create feature branch from `main`
2. Implement with tests
3. Run full test suite locally
4. Create PR with description
5. Pass CI checks
6. Get review approval(s)
7. Merge via [strategy: squash, merge commit, rebase]

### Release Process

**Versioning**: [Semantic Versioning]

**Steps**:
1. [Step 1]
2. [Step 2]
3. [Step 3]

---

## Specification Workflow (BEADS+)

**Process**: constitution → specify → clarify → plan → checklist → tasks → analyze → implement

### Phase Gate Requirements

| Phase | Deliverable | Quality Gate |
|-------|-------------|--------------|
| Specify | spec.md | Technology-agnostic, testable criteria |
| Clarify | Updated spec.md | All ambiguities resolved |
| Plan | plan.md | Aligned with constitution |
| Checklist | checklists/*.md | Domain-specific validation |
| Tasks | tasks.md | Dependency-ordered, tests defined |
| Analyze | Analysis report | No gaps, consistent |
| Implement | Working code | 100% tests pass, no regressions |

### Document Locations

- **Constitution**: `.specify/memory/constitution.md`
- **Specs**: `specs/###-feature-name/spec.md`
- **Plans**: `specs/###-feature-name/plan.md`
- **Tasks**: `specs/###-feature-name/tasks.md`
- **Checklists**: `specs/###-feature-name/checklists/*.md`

---

## Decision Log

*Record major architectural or technical decisions made during development.*

### {{DATE}} - [Decision Title]

**Context**: [Why this decision was needed]

**Decision**: [What was decided]

**Alternatives Considered**:
1. [Option A]: [Why not chosen]
2. [Option B]: [Why not chosen]

**Consequences**:
- Positive: [Benefit 1], [Benefit 2]
- Negative: [Trade-off 1], [Trade-off 2]

**Status**: [Accepted | Deprecated | Superseded]

---

### {{DATE}} - [Decision Title]

[Similar structure]

---

## Exceptions & Waivers

*Document cases where principles must be waived and why.*

### Exception: [Title]

**Principle Waived**: [Which principle]  
**Reason**: [Why exception is needed]  
**Scope**: [Where exception applies]  
**Mitigation**: [How risks are addressed]  
**Expiration**: [When to revisit]  
**Approved By**: [Who approved]  
**Date**: [When approved]

---

## Evolution & Maintenance

### Review Cadence

- **Regular Review**: [Quarterly, semi-annually]
- **Ad-hoc Review**: When major architectural changes occur

### Amendment Process

1. Propose change with rationale
2. Discuss with team/stakeholders
3. Update constitution
4. Communicate changes
5. Update existing features if needed

### Version History

| Version | Date | Changes | Author |
|---------|------|---------|--------|
| 1.0 | {{DATE}} | Initial constitution | [Name] |

---

## References

- [Relevant architectural standards](link)
- [Company engineering guidelines](link)
- [Technology documentation](link)
- [Related ADRs](link)

---

**Notes:**
- This constitution is a living document
- All feature specifications must align with these principles
- Exceptions require explicit justification and approval
- Technical decisions should reference relevant constitutional principles
- Update this document as the project evolves and new patterns emerge

*Last updated: {{DATE}}*
