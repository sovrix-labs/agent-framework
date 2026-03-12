# Iterative Development Loop

## Overview

The Agent Framework now implements an **iterative development loop** where the Development, Quality, and Testing agents work together in cycles until each task meets all quality and test requirements.

## The Loop

```
┌─────────────────────────────────────────────────┐
│         ITERATIVE DEVELOPMENT CYCLE             │
│        (Orchestrator Coordinates Loop)          │
└─────────────────────────────────────────────────┘

     ┌───START TASK──┐
     │               │
     ▼               │
┌──────────┐         │
│  @dev    │◄────────┼───┐
│ Implement│         │   │
└────┬─────┘         │   │
     │               │   │
     ▼               │   │
┌──────────┐         │   │
│ @quality │         │   │ FEEDBACK
│  Review  │         │   │  LOOP
└────┬─────┘         │   │
     │               │   │
     ▼               │   │
┌──────────┐         │   │
│ @testing │         │   │
│   Test   │         │   │
└────┬─────┘         │   │
     │               │   │
     ▼               │   │
   ┌───┐             │   │
───│OK?│──No─────────┘   │
   └─┬─┘                 │
     │Yes (Quality + Tests Pass)
     ▼
  ✅ DONE
```

## How It Works

### For Each Task:

1. **Development Agent** implements the task
   - Receives task specification
   - If iteration > 1, receives feedback from quality and testing
   - Implements code changes

2. **Quality Agent** reviews the code
   - Checks for security issues
   - Validates performance
   - Reviews code style and maintainability
   - Checks documentation completeness
   - Reports any issues found

3. **Testing Agent** runs tests
   - Executes all test cases
   - Reports pass/fail status
   - Provides details on failures
   - Checks for edge cases

4. **Orchestrator evaluates**
   - If quality issues found → Loop back to development
   - If test failures found → Loop back to development
   - If both pass → Task complete, move to next

### Iteration Limits

- **Maximum iterations**: 5 per task (safety limit)
- **Expected average**: 2-3 iterations per task
- **First-pass success**: Rare (and that's okay!)

## Benefits

### 🛡️ Quality Assurance
- Security vulnerabilities caught early
- Performance issues identified before merge
- Code quality maintained consistently
- Documentation enforced

### 🐛 Bug Prevention
- Test failures caught immediately
- Edge cases identified
- Regressions prevented
- 100% test coverage enforced

### 📈 Continuous Improvement
- Feedback is specific and actionable
- Developers learn from quality/test feedback
- Common issues tracked and prevented
- Metrics collected for process improvement

## Example Iteration Cycle

```
📋 Task: Implement user registration endpoint

🔄 Iteration 1
  👨‍💻 @development: Implements basic registration
  🔍 @quality: Finds issues:
    • No rate limiting
    • Missing input sanitization
    • Generic error messages leak info
  🧪 @testing: 2 tests fail
  ❌ Loop back with feedback

🔄 Iteration 2
  👨‍💻 @development: Fixes all issues from feedback
  🔍 @quality: Finds one minor issue:
    • Missing JSDoc comments
  🧪 @testing: All tests pass ✅
  ❌ Loop back with feedback

🔄 Iteration 3
  👨‍💻 @development: Adds documentation
  🔍 @quality: All checks pass ✅
  🧪 @testing: All tests pass ✅
  ✅ Task complete!

Total iterations: 3
Issues caught: 4 security, 2 test failures, 1 documentation
Time invested: Worth it! (No bugs shipped)
```

## Usage with BEADS+ Workflow

The iterative loop is automatically activated in **Phase 8: IMPLEMENT**:

```bash
# Full BEADS+ workflow with iterative development
@orchestrator beads implement specs/001-feature/tasks.md

# The orchestrator will:
# 1. Load all tasks from tasks.md
# 2. Group by priority (P0, P1, P2, P3)
# 3. For each task:
#    - Run iterative loop (dev → quality → test)
#    - Repeat until quality + tests pass
#    - Move to next task
# 4. Test user story when all tasks complete
# 5. Test feature when all priorities complete
```

## Metrics Tracked

For each task, the orchestrator tracks:

- **Iterations needed**: How many cycles to complete
- **Quality issues found**: By category (security, performance, style)
- **Test failures**: Number and types
- **Time per iteration**: For planning purposes
- **First-pass success rate**: Improvement metric

Example output:
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Iteration Summary 📊
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Tasks completed: 8/8
Average iterations per task: 2.1
Total iterations: 17
First-pass success rate: 0/8 (0%) ← Normal!
Quality issues caught: 24
  - Security: 12
  - Performance: 4
  - Style: 6
  - Documentation: 2
Test failures caught: 8
All issues resolved: ✅

💡 Key Learning: Iterative loop caught issues early!
  - 12 security issues prevented
  - 8 test failures fixed before merge
  - 4 performance issues optimized
```

## Configuration

### Adjusting Max Iterations

In the Orchestrator Agent, the max iterations can be adjusted:

```typescript
const maxIterations = 5; // Default is 5
```

**Recommendations**:
- **5 iterations**: Good balance (default)
- **3 iterations**: Aggressive (for mature teams)
- **10 iterations**: Lenient (for complex tasks)
- **Never set to 1**: Defeats the purpose

## Best Practices

### ✅ DO:
- **Accept multiple iterations as normal** (2-3 is healthy)
- **Provide specific feedback** (not just "fix it")
- **Track iteration metrics** (for improvement)
- **Learn from common issues** (prevent in future)
- **Celebrate quality** (better than shipping bugs)

### ❌ DON'T:
- **Don't skip the loop** (even if you're confident)
- **Don't merge on first pass** (unless truly perfect)
- **Don't ignore quality feedback** (security matters)
- **Don't bypass test failures** (100% must pass)
- **Don't set max iterations too low** (be realistic)

## Integration with CI/CD

The iterative loop complements your CI/CD pipeline:

```
LOCAL DEVELOPMENT (Iterative Loop)
  ↓
  Dev → Quality → Test (repeat until pass)
  ↓
✅ Task complete
  ↓
COMMIT & PUSH
  ↓
CI/CD PIPELINE
  ↓
  Build → Test → Deploy
```

**Benefits**:
- Fewer CI failures (issues caught locally)
- Faster CI runs (code arrives cleaner)
- Lower cloud costs (fewer failed builds)
- Happier teams (less back-and-forth)

## Comparison: With vs Without Iterative Loop

### Without Iterative Loop (Traditional)
```
Dev implements → Push → CI fails → Fix → Push → CI fails → Fix...
- Multiple CI runs (costly)
- Long feedback cycles (hours/days)
- Issues found late (after merge)
- Back-and-forth between devs
```

### With Iterative Loop (Our Approach)
```
Dev → Quality → Test (local loop) → All pass → Push → CI passes
- Single CI run (efficient)
- Immediate feedback (seconds)
- Issues caught early (before commit)
- Self-contained improvement loop
```

## Monitoring & Observability

Track loop health with these metrics:

- **Average iterations per task**: Should stabilize around 2-3
- **First-pass success rate**: Improvement over time
- **Common issue categories**: Focus prevention efforts
- **Max iterations hit**: Investigate if frequent
- **Time per iteration**: Optimize slow steps

## Future Enhancements

Planned improvements:

- **ML-based feedback**: Learn from past iterations
- **Parallel quality checks**: Speed up iterations
- **Smart max iterations**: Adjust per task complexity
- **Feedback caching**: Avoid repeating same checks
- **Developer profiles**: Personalized feedback

## Questions?

For more information:
- See [BEADS_WORKFLOW.md](BEADS_WORKFLOW.md) for full workflow
- Check `src/agents/orchestrator/OrchestratorAgent.ts` for implementation
- Use `@orchestrator beads --help` for CLI commands
