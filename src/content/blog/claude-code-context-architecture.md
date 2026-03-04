---
title: "Claude Code Has a Context Architecture. You're Probably Only Using Part of It."
description: "Claude Code ships with a layered context hierarchy — enterprise, global, project, and rules. Most developers only use part of it. SCS is the principled way to fill in the rest."
date: 2026-03-03
tags: ["Claude Code", "context engineering", "structured context", "developer tools"]
draft: false
image: "/blog/claude-code-context-architecture.png"
imageAlt: "Layered isometric diagram showing Claude Code's context hierarchy — Enterprise Managed Policy at the base, Global in the middle, Project with CLAUDE.md and .claude/rules/ at the top"
---

Every developer using Claude Code has written a CLAUDE.md file. Most wrote it by hand, from scratch, at the start of a new project — a few paragraphs about the stack, some preferences, maybe a note about patterns to avoid.

It works, for a while. Then it drifts. A new developer joins and writes their own version. A refactor happens and nobody updates the file. Rules start conflicting. Claude gets inconsistent instructions and produces inconsistent results. More text gets added to fix it, and the file grows into something nobody reads carefully anymore.

This isn't a discipline problem. It's a structure problem. The content of CLAUDE.md matters, and there's no standard for what good content looks like.

---

## The Architecture You're Already Using

Claude Code ships with a context hierarchy that most developers interact with only partially.

At the **project level**, there's `CLAUDE.md` and `.claude/CLAUDE.md` — the file most developers know. Checked into source control, shared with the team. Project-specific architecture, conventions, and constraints live here.

Within the project, `.claude/rules/` provides modular, topic-specific context. Architecture decisions in one file. Security requirements in another. Domain terminology in a third. Rules can be scoped to specific file paths — PHI handling rules that load only when you're working in patient data models, not when you're editing a README. Context that's relevant when you need it, out of the way when you don't.

At the **global level**, `~/.claude/CLAUDE.md` and `~/.claude/rules/` hold context that applies across all your projects — personal conventions, tooling preferences, patterns you use everywhere. Write it once, get it in every session.

At the **enterprise level**, Claude Code supports a managed policy layer: org-wide context that engineering leadership or IT can deploy to all developers. Architecture standards, security requirements, compliance constraints — defined once, consistent across every machine in the organization.

Three scopes, each designed for a different kind of context. Most developers set up the project layer and leave the rest alone.

---

## The Content Problem

The architecture handles scoping. It doesn't handle what goes inside the files.

A well-structured `.claude/rules/` directory for a production project probably covers: the tech stack and key dependencies, the architectural decisions already made, patterns used and ones explicitly avoided, domain terminology the AI needs to know, and any compliance or security constraints that apply. That's five concern areas at minimum. Add PHI handling rules for a healthcare project, scoped to the files that actually touch patient data. Add PCI constraints for payments.

Writing all of that from scratch, in prose, with no validation, on every new project, is why CLAUDE.md files drift. The format isn't wrong. The practice around it is informal.

---

## The Structure the Architecture Is Missing

The Structured Context Specification (SCS) is a format for expressing exactly this kind of context — versioned, validated, composable, organized by concern area.

When I mapped SCS against Claude Code's context hierarchy, the alignment was more direct than I expected:

| Claude Code | SCS |
|---|---|
| Enterprise managed policy | Standards and Meta bundles |
| Global (`~/.claude/`) | Cross-project domain bundles |
| Project (`CLAUDE.md`, `.claude/rules/`) | Project bundle and SCDs |
| Local (`.CLAUDE.local.md`, gitignored) | Out of scope by design |

That last row is worth noting. `.CLAUDE.local.md` is gitignored and ephemeral — personal notes for the current session, not team context. SCS doesn't try to formalize it. The things that should stay informal, should stay informal.

SCS didn't design itself to fit Claude Code. The two arrived at the same structure independently, because the problem has a natural shape: context needs scoping, context needs to be organized by concern, context needs to persist and travel with the project. SCS is tool-agnostic — Claude Code is the clearest demonstration of the alignment, not the dependency.

Within that structure, SCS uses Structured Context Documents (SCDs) — discrete, validated definitions of a specific concern area. An SCD for authentication patterns. An SCD for logging constraints. An SCD for the domain terminology your AI should know. These compile directly to `.claude/rules/` files. The output is native Claude Code format — there's no new format to learn.

---

## The Plugins

**scs-vibe** is the entry point for solo developers and small teams.

Running `/scs-vibe:init` scans the project, asks targeted questions — what does this do, who uses it, what's the stack, what compliance requirements apply — and generates the file structure Claude Code already expects: `CLAUDE.md` and a set of `.claude/rules/` files organized by concern. Tech stack, architecture, patterns, domain context. For a healthcare project, path-scoped PHI handling rules that apply only to the files that touch sensitive data.

The plugin thinks in SCS — it asks about the concern areas SCS identifies as the right framework for any AI project. It outputs native Claude Code format. No YAML to write. No new format to learn.

If you already have a CLAUDE.md, `/scs-vibe:validate` checks it for gaps: missing critical sections, stale file references, generic placeholder content that Claude will quietly ignore.

**scs-team** is the team-scale version. It adds a source layer — `.scs/` YAML SCDs alongside the compiled Claude Code output — with full validation, versioning, and pre-built standards bundles for HIPAA, SOC 2, PCI DSS, GDPR, and CHAI. Teams that need governance context to be auditable, not just present, get that from scs-team.

At the enterprise level, SCS is designed to produce content for Claude Code's managed policy layer: architecture standards, security policy, compliance requirements that leadership can define once and distribute consistently. The capability is there in Claude Code. SCS gives it principled content.

---

## A Different Way to Start

The CLAUDE.md you've been writing by hand is already trying to be structured context. It's asking the right questions — what does this system do, what rules apply, what should the AI know — without a standard for how to answer them.

SCS is the standard. It works within Claude Code's memory architecture, not around it. The plugins produce the output you'd write by hand, organized by concern, validated, and built to update as the project evolves.

Start with your next project. Install scs-vibe, run `/scs-vibe:init`, and let it ask the questions. The spec, the plugins, and a full set of reference bundles are in the repository.

[github.com/tim-mccrimmon/structured-context-spec](https://github.com/tim-mccrimmon/structured-context-spec)

---

*Timothy McCrimmon is a software architect and founder working on AI governance and agentic system design. He is the creator of the Structured Context Specification (SCS), an open-source approach for defining versioned and governable context for AI systems.*

- [structuredcontext.dev](https://structuredcontext.dev)
- [github.com/tim-mccrimmon/structured-context-spec](https://github.com/tim-mccrimmon/structured-context-spec)
