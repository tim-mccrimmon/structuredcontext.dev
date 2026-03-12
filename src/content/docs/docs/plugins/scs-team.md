---
title: scs-team
description: SCS plugin for teams with existing documentation. Process PRDs, architecture docs, and compliance requirements into structured context for Claude Code.
---

## scs-team

scs-team processes your existing team documentation — PRDs, architecture decision records,
security policies, compliance checklists — into structured context that every team member's
Claude instance loads automatically.

**Install**: Available on
[GitHub](https://github.com/tim-mccrimmon/scs-team).

## Quick start

Run this slash command from within Claude Code:

```
/scs-team:init
```

You'll be prompted to point scs-team at your documentation sources. It works with Markdown
files, plain text, and common doc exports. Follow the prompts to specify what to include
and what to exclude.

## What it processes

scs-team can ingest:

- Product requirement documents (PRDs)
- Architecture decision records (ADRs)
- Security policies and guidelines
- Compliance checklists (HIPAA, SOC2, internal standards)
- Onboarding docs and team wikis

It generates structured context files from these sources — not summaries, but organized
context that Claude Code can reason about precisely.

## What it generates

The same outputs as scs-vibe, structured for team use:

- `CLAUDE.md` — Shared project context, committed to the team repo
- `.claude/rules/` — Modular rules organized by concern

When a team member runs Claude Code on the project, they get the same context as everyone
else. No more divergent outputs from different prompting styles.

## Keeping context in sync

When documentation changes, run:

```
/scs-team:sync
```

scs-team will re-process the source docs and update the structured context files. Review
the diff in a pull request before merging — context changes are code changes.

## Next steps

- [Examples: Team setup](/docs/examples/team-setup/)
- [Plugin reference](/docs/plugins/reference/)
- [scs-vibe (for solo developers)](/docs/plugins/scs-vibe/)
