---
title: Documentation
description: How SCS works, how to start with the Agent Skills, and the specification reference for SCS 0.7.0.
---

## What SCS is

SCS (Structured Context Specification) is an open specification for **versioned context for
generative AI**: the guidance, guardrails, and supporting facts an organization stands behind.
That context changes rarely and deliberately, so SCS treats it like a release. Each version
is released by a named person, carries a content digest, and compiles to one small file an
AI service can load with every request.

SCS covers the context that should be the same from one question to the next. Data that
changes often, such as records, orders, and documents, is better looked up when it's
needed, for example with retrieval. SCS doesn't replace retrieval.

## How it works

1. **Two levels.** A **Domain** holds the rules that apply to all of an owner's work. The
   owner can be an organization or one person. A **Project** holds the rules for one piece
   of work. Both live in one git repository, the
   [Domain repository](/docs/specification/domain-repositories/).
2. **Rules as small documents.** Each topic is a Structured Context Document (SCD) in YAML,
   holding **prohibitions**, **directives**, and **facts**. SCDs are grouped into bundles,
   organized by your industry's [Domain Ontology](/docs/specification/domain-ontology/).
3. **Released versions.** A version is a git tag. Its manifest names the person who
   released it and a digest of its content, so an edit made after release is detected. Each
   section names the role accountable for it. Where your organization formally approves its
   context, in a quality system for example, the approval record cites the version and its
   digest.
4. **One file for the AI.** `scs compile` turns a version into a
   [runtime artifact](/docs/specification/runtime-artifact/): a small, deterministic YAML
   file of rules and facts, each with a stable ID.

## Start with the skills

As of 0.7.0, you don't need to learn the specification to use it. Four
[Agent Skills](/docs/skills/overview/) let an AI assistant run the intake conversation,
draft rules from your documents, review them, and version and compile them. You confirm
each change, and a person you name releases every version. Along the way, a review package
gives the section owners one readable file of every rule to review.

- [Quick Start](/docs/getting-started/quick-start/): install the tools and skills, then
  start your Domain
- [Placing an Artifact](/docs/getting-started/placement/): where a compiled artifact goes
  in Claude, Claude Code, ChatGPT Enterprise, GitHub Copilot, and Cursor
- [CLI Reference](/docs/skills/cli/): the `scs` and `scs-validate` commands the skills use

## Reference

- [Specification Overview](/docs/specification/overview/): the model in one page
- [What's new in v0.7.0](/docs/specification/v0-7/)
- [Bundle Format](/docs/specification/bundle-format/) and [SCD Format](/docs/specification/scd-format/)
- [Citations](/docs/specification/citations/): how a rule references a standard without
  reproducing it
- [Migration guides](/docs/specification/migration-0-7/), for content written for earlier
  versions
