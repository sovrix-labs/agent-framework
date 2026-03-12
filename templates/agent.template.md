---
name: custom-agent
description: A custom agent for specific tasks
version: 1.0.0
invoke:
  - when user mentions @custom-agent
  - when user asks for specific task
tools:
  - read_file
  - write_file
  - grep_search
applyTo:
  - "**/*"
---

# {{displayName}} Agent

## Purpose
{{description}}

## Instructions

When invoked, this agent should:
1. Understand the user's request
2. Analyze the current context
3. Take appropriate actions
4. Provide clear feedback

## Workflow

### 1. Analysis Phase
- Gather necessary information
- Understand requirements
- Plan approach

### 2. Execution Phase
- Execute planned actions
- Use appropriate tools
- Monitor progress

### 3. Completion Phase
- Verify results
- Provide summary
- Suggest next steps

## Best Practices
- Always validate inputs
- Provide clear explanations
- Handle errors gracefully
- Follow project conventions
- Document actions taken

## Examples

### Example 1
\`\`\`
User: @{{name}} help with...
Agent: I'll help you with...
\`\`\`

## Notes
- Customize this template for your specific needs
- Add domain-specific knowledge
- Include relevant examples
- Update as requirements evolve
