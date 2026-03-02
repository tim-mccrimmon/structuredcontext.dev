---
title: Documentation
description: SCS plugins, specification reference, and examples for structured context in AI development.
---

## Get started with SCS

The fastest path to structured context is through the plugins. Pick the one that matches
how you work:

- **[scs-vibe](/docs/plugins/scs-vibe/)** — Solo developer or small project. Set up in 15 minutes
  with a single slash command in Claude Code.
- **[scs-team](/docs/plugins/scs-team/)** — Team with existing documentation. Processes your PRDs,
  architecture docs, and compliance requirements into structured context.

Both plugins are available now in the
[plugins directory on GitHub](https://github.com/tim-mccrimmon/structured-context-spec/tree/main/plugins).

## What SCS produces

SCS outputs plain files that live in your repo and that Claude Code reads automatically:

- `CLAUDE.md` — Primary context file, loaded every session
- `.claude/rules/` — Modular rule files organized by concern

No middleware. No new toolchain. Just files in git.

## Reference

If you want to understand the underlying format:

- [Specification Overview](/docs/specification/overview/) — Bundle types, SCD tiers, validation
- [v0.3 Changelog](/docs/specification/v0-3/)
- [Bundle Format](/docs/specification/bundle-format/)
- [SCD Format](/docs/specification/scd-format/)
