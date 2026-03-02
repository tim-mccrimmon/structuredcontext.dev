---
title: scs-vibe
description: SCS plugin for solo developers and small projects. Generate structured context for Claude Code in 15 minutes.
---

## scs-vibe

scs-vibe is a Claude Code plugin that scans your project, asks a few targeted questions,
and generates structured context Claude uses every session.

**Install**: Available in the
[plugins directory on GitHub](https://github.com/tim-mccrimmon/structured-context-spec/tree/main/plugins/scs-vibe).

## Quick start

Run this slash command from within Claude Code:

```
/scs-vibe:init
```

Follow the prompts. scs-vibe will:

1. Scan your project directory or a provided PRD
2. Ask a few questions about your stack, conventions, and constraints
3. Generate `CLAUDE.md` and `.claude/rules/` in your project root

Total setup time: roughly 15 minutes.

## What it generates

### `CLAUDE.md`

The primary context file. Claude Code reads this at the start of every session. It contains:

- Project description and stack
- Key architectural decisions
- Coding conventions and patterns
- Things Claude should and shouldn't do

### `.claude/rules/`

Modular rule files that extend `CLAUDE.md`. Organized by concern — architecture, security,
testing, and any domain-specific rules you define.

Both outputs are plain Markdown files. Commit them to your repo and version them like code.

## Updating context

When your project evolves, run:

```
/scs-vibe:update
```

scs-vibe will diff the current state against your existing context and suggest updates.

## Next steps

- [Examples: Solo developer setup](/docs/examples/solo-developer/)
- [Plugin reference](/docs/plugins/reference/)
- [scs-team (for teams)](/docs/plugins/scs-team/)
