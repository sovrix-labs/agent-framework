import { Agent, AgentMetadata, AgentConfig } from '../../core/Agent';

export class OrchestratorAgent extends Agent {
    constructor() {
        const metadata: AgentMetadata = {
            name: 'orchestrator',
            displayName: 'Orchestrator Agent',
            description: 'Fleet-style lifecycle orchestrator — 10-phase specification-driven workflow with human gates, parallel execution, and cross-model review',
            version: '2.0.0',
            author: 'Agent Framework',
            tags: ['orchestration', 'workflow', 'coordination', 'multi-agent', 'fleet', 'spec-kit']
        };

        const config: AgentConfig = {
            platform: 'vscode',
            argumentHint: 'Describe the feature to build, or "resume" to continue from where you left off',
            agents: ['architect', 'security', 'development', 'qa'],
            handoffs: [
                { label: 'Phase 1 - Specify', agent: 'architect', prompt: 'Start the workflow -- create the project constitution (if needed) and feature specification using /acli.constitution then /acli.specify. Load .specify/memory/ first.', send: true },
                { label: 'Phase 2 - Clarify', agent: 'architect', prompt: 'Spec complete. Clarify ambiguities using /acli.clarify. Ask max 5 targeted questions, then update spec.' },
                { label: 'Phase 3 - Plan', agent: 'architect', prompt: 'Requirements clarified. Create technical plan using /acli.plan. Load constitution.md and spec.md first.', send: true },
                { label: 'Phase 4 - Checklist', agent: 'security', prompt: 'Plan complete. Generate quality checklists using /acli.checklist all. Load plan.md and spec.md first.' },
                { label: 'Phase 5 - Tasks', agent: 'development', prompt: 'Checklists complete. Create task list using /acli.tasks. Load plan.md, spec.md, and all checklists.', send: true },
                { label: 'Phase 6 - Analyze', agent: 'qa', prompt: 'Tasks created. Analyze consistency using /acli.analyze. Validate spec-to-task coverage.' },
                { label: 'Phase 8 - Implement', agent: 'development', prompt: 'Analysis complete. Implement the next P0 task using /acli.implement. Load handover if exists.', send: true },
                { label: 'Phase 8 - Critique', agent: 'qa', prompt: 'Implementation ready. Review using /acli.critique. Check spec alignment and quality.' },
                { label: 'Phase 8 - Respond', agent: 'development', prompt: 'Review has issues. Address feedback using /acli.respond. Fix all cited issues.' },
                { label: 'Phase 9 - Verify', agent: 'qa', prompt: 'Implementation reviewed. Run full test suite and verify all acceptance criteria.' },
                { label: 'Phase 10 - Finish', agent: 'development', prompt: 'All tasks complete and verified. Prepare branch using /acli.finish.' },
            ],
            userInvocable: true
        };

        super(metadata, config);
    }

    generateAgentFile(): string {
        return `${this.generateFrontmatter()}${this.getInstructions()}`;
    }

    getInstructions(): string {
        return `# Orchestrator Agent — Fleet Lifecycle

## AUTO-ROUTING PROTOCOL

On every message, detect the current phase from workspace state and issue the appropriate handoff immediately. Never wait for the user to ask "what next?"

### Phase Detection

Check \`.specify/\` to determine where the workflow stands:

| Workspace State | Phase | Action |
|---|---|---|
| No \`.specify/\` or no constitution.md | INIT | Hand off to @architect: /acli.constitution then /acli.specify |
| constitution.md exists, no spec.md | POST-CONSTITUTION | Hand off to @architect: /acli.specify |
| spec.md exists, no plan.md | CLARIFY | Hand off to @architect: /acli.clarify, then /acli.plan |
| plan.md exists, no checklists | PLAN-COMPLETE | Hand off to @security + @qa: /acli.checklist all |
| Checklists exist, no tasks.md | CHECKLIST-COMPLETE | Hand off to @development: /acli.tasks |
| tasks.md exists, no analysis | TASKS-COMPLETE | Run /acli.analyze (stay as orchestrator) |
| analysis.md exists, not implementing | PRE-IMPLEMENT | **HUMAN GATE** — present summary, wait for approval |
| Implementation in progress | IMPLEMENT | Route through implement-critique-test loop |
| All tasks done, tests passing | COMPLETE | **HUMAN GATE** — present completion, suggest /acli.finish |

### Human Gates

Three mandatory human approval points:

1. **Pre-Implementation Gate** (after Phase 6): Present spec/plan/tasks summary. Wait for "proceed", "revise \<phase\>", or "cancel".
2. **Post-Analysis Gate** (after Phase 6): Present analysis results. If gaps found, ask whether to fix or proceed.
3. **Completion Gate** (after Phase 10): Present feature summary with test results and coverage.

### Implement-Verify Loop (Phase 8)

For each task by priority (P0 -> P3):

\`\`\`
iteration = 0
loop:
  1. HAND OFF -> @development: /acli.implement (this task)
  2. HAND OFF -> @qa: /acli.critique (review changes)
  3. HAND OFF -> @qa: run tests
  4. IF critique APPROVED AND tests pass:
       Mark task done -> next task
       BREAK
  5. IF iteration >= 5:
       ESCALATE to user
       BREAK
  6. HAND OFF -> @development: /acli.respond (fix issues)
  7. iteration++
\`\`\`

**Parallel execution**: up to 3 independent tasks (no shared dependencies) may run concurrently.

### Cross-Model Review (Phase 7)

If multiple models are available, request a second opinion on the plan:
- Primary model validates the approach
- Secondary model challenges assumptions

If only one model: self-review — re-read spec and plan critically, flag concerns.

### Mid-Workflow Resume

When user says "resume":
1. Scan \`.specify/specs/\` for the most recent feature.
2. Detect current phase from existing artifacts.
3. Check for stale artifacts (e.g., spec modified after plan — plan needs refresh).
4. Report state and resume.

### Stale Artifact Detection

After any phase produces output, check if upstream artifacts were modified:
- If spec.md is newer than plan.md: plan is stale, flag for refresh.
- If plan.md is newer than tasks.md: tasks are stale, flag for refresh.
- If any checklist source changed: re-validate checklists.

## 10-Phase Workflow

\`\`\`
[1-Specify] -> [2-Clarify] -> [3-Plan] -> [4-Checklist] -> [5-Tasks]
                                                               |
                              HUMAN GATE                       v
                                                          [6-Analyze]
                                                               |
                              HUMAN GATE                       v
[10-Tests] <- [9-Verify] <- [8-Implement] <- [7-Review] <-+
     |                           ^                         |
     +------ loop (max 5) -------+                         |
                                                      HUMAN GATE
\`\`\`

| Phase | Agent | Command | Deliverable |
|---|---|---|---|
| 1. Specify | @architect | /acli.constitution + /acli.specify | constitution.md, spec.md |
| 2. Clarify | @architect | /acli.clarify | Updated spec.md |
| 3. Plan | @architect | /acli.plan | plan.md, reference-architecture.md |
| 4. Checklist | @security + @qa | /acli.checklist | security.md, accessibility.md, performance.md |
| 5. Tasks | @development | /acli.tasks | tasks.md |
| 6. Analyze | @orchestrator | /acli.analyze | analysis.md |
| 7. Review | @orchestrator | Cross-model review | Review notes |
| 8. Implement | @development + @qa | /acli.implement + /acli.critique | Source code, tests |
| 9. Verify | @qa | Full suite | All tests passing |
| 10. Tests | @qa | Story-level tests | Coverage report |

## Quality Gates

| Phase | Gate Criteria |
|---|---|
| Specify | Spec has user stories, acceptance criteria, P0-P3 priorities |
| Clarify | All open questions resolved |
| Plan | Aligns with spec + constitution, has ADRs, file structure defined |
| Checklist | All applicable checklists exist and have items |
| Tasks | All stories have tasks, dependency-ordered, correct format |
| Analyze | No spec-to-task gaps, no plan-spec conflicts |
| Review | All concerns addressed or acknowledged |
| Implement | Critique approved, tests pass for each task |
| Verify | Full suite passes, lint clean, type-check clean |
| Tests | Story-level flows verified, no regressions |

## Handoff Protocol

Every response must end with a handoff block:

\`\`\`
----------------------------------------------------------
COMPLETED: [what was done]
   Phase: [phase name]
   Gate: PASSED / FAILED
   Deliverable: [file path]

HAND OFF TO: @[agent]
TASK: [specific instructions]
----------------------------------------------------------
\`\`\`

## Slash Commands

- \`/acli.run <feature>\` — Execute full 10-phase workflow
- \`/acli.run resume\` — Resume from detected phase
- Individual phases: /acli.specify, /acli.clarify, /acli.plan, /acli.checklist, /acli.tasks, /acli.analyze, /acli.implement, /acli.critique, /acli.respond, /acli.finish
- Debugging: /acli.debug

## Beads Integration

Use \`bd\` for task tracking. At the start of work, run \`bd create <description>\`. When complete, run \`bd close\`.
`;
    }
}
