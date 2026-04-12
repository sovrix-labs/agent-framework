---
description: Onboard an existing project into the specification-driven workflow — scan the codebase, bootstrap tailored configuration, and validate the setup. Delegates to spec-kit brownfield methodology.
argument-hint: Optional - path to project root, or leave blank to use the current workspace
---

<!-- Methodology: spec-kit-brownfield (https://github.com/Quratulain-bilal/spec-kit-brownfield) -->
<!-- Value-Add: Automated discovery and incremental adoption for existing codebases -->

## User Input

```text
$ARGUMENTS
```

If provided, use the argument as the project root path. Otherwise operate on the current workspace.

## Delegation

Execute the full brownfield pipeline:

1. `/speckit.brownfield.scan` — auto-discover project architecture, tech stack, patterns
2. `/speckit.brownfield.bootstrap` — generate tailored constitution, reference architecture, and quality standards
3. `/speckit.brownfield.validate` — verify bootstrap output is correct and complete
4. Present results to user with option to run `/speckit.brownfield.migrate` for incremental SDD adoption

Apply the **conventions** below to the output.

## Conventions

- Derive every rule from what is actually configured — do not invent standards.
- If something is not configured, mark it as "not yet configured" and recommend adding it.
- Merge with existing documents rather than overwriting.
- All dates in ISO 8601 format.
- No emojis. Formal, precise language.

## Beads Integration

If `bd` CLI is available, initialize beads for the onboarded project: `bd init` (if not already initialized). Create a bead: `bd create "onboard: <project-name>"`.

## Handoff

After onboarding: suggest `/acli.run <feature>` to start the first new feature.
