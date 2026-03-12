---
title: Plugin Reference
description: Slash commands and configuration reference for scs-vibe and scs-team.
---

## Plugin Reference

Quick reference for all SCS plugin commands and configuration options.

## scs-vibe commands

| Command | Description |
|---|---|
| `/scs-vibe:init` | Initialize structured context for a project |
| `/scs-vibe:update` | Update context based on project changes |
| `/scs-vibe:status` | Show current context coverage |

## scs-team commands

| Command | Description |
|---|---|
| `/scs-team:init` | Initialize structured context from team docs |
| `/scs-team:sync` | Re-process source docs and update context |
| `/scs-team:status` | Show current context coverage and source status |

## Output files

Both plugins write to the same locations:

| File | Purpose |
|---|---|
| `CLAUDE.md` | Primary context, loaded every Claude Code session |
| `.claude/rules/*.md` | Modular rule files loaded by Claude Code |

### Commit both files

Context files belong in version control. Treat changes to `CLAUDE.md` and `.claude/rules/`
the same as changes to source code — review them, merge them deliberately, and track them
with git history.

## Configuration

Plugin behavior can be adjusted by editing the generated files directly. The files are
plain Markdown — there's no separate config format.

---

Full source: [scs-vibe](https://github.com/tim-mccrimmon/scs-vibe) · [scs-team](https://github.com/tim-mccrimmon/scs-team)
