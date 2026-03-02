---
title: Solo Developer Setup
description: Walk through scs-vibe on a solo project. From zero to structured context in 15 minutes.
---

## Solo developer setup with scs-vibe

This example walks through a real scs-vibe setup on a solo project — a TypeScript API
with a Postgres database. The same flow applies to any stack.

## Prerequisites

- Claude Code installed and authenticated
- scs-vibe installed (see [scs-vibe docs](/docs/plugins/scs-vibe/))
- A project directory (existing code or a PRD works)

## Running the init

From within Claude Code, run:

```
/scs-vibe:init
```

scs-vibe will scan the directory and ask about things it can't infer from the code:
your deployment target, any external constraints, team conventions it should follow,
and things you've already decided that it shouldn't second-guess.

## What gets generated

After the init, your project root will have:

```
CLAUDE.md
.claude/
  rules/
    architecture.md
    patterns.md
    constraints.md
```

`CLAUDE.md` contains the high-level project context. The rule files in `.claude/rules/`
contain more specific guidance organized by concern.

## Committing context

Commit both files:

```bash
git add CLAUDE.md .claude/
git commit -m "Add SCS context files"
```

From this point forward, every Claude Code session on this project starts with your
structured context loaded.

## Updating context

When your project changes significantly — new architectural decisions, new dependencies,
new constraints — run:

```
/scs-vibe:update
```

Review the diff and commit the changes. Treat context changes as code changes.

## Next steps

- [Team setup example](/docs/examples/team-setup/)
- [scs-vibe reference](/docs/plugins/scs-vibe/)
