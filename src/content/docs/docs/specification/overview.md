---
title: Specification Overview
description: The SCS 0.7.0 model in one page. Domain and Project bundles, SCDs, versions, and the runtime artifact.
---

SCS defines how to write, validate, version, and compile structured context for AI
systems. You don't need to write it by hand, since the [Agent Skills](/docs/skills/overview/)
do that through the tools. Still, understanding the structure helps when you review what
they produce.

**Current version:** [v0.7.0](/docs/specification/v0-7/). The full normative text is in the
spec repository under [`spec/0.7/`](https://github.com/tim-mccrimmon/structured-context-spec/tree/main/spec/0.7).

## Two governance bundles

| | Domain bundle | Project bundle |
|---|---|---|
| **Holds** | Rules for all of an owner's work | Rules for one piece of work |
| **Owner** | An organization, or one person | The project's lead |
| **Imports** | The published meta bundle and concept bundles | Concept bundles, or lists its SCDs directly |
| **Workspace** | `domain/` | `projects/<name>/` |

Neither bundle imports the other. Each one is validated, versioned, and compiled on its
own, and a runtime applies the two artifacts side by side, Domain first. A Project can add
rules but can't lift a Domain prohibition. Changing a prohibition takes a new version of
the Domain bundle.

Deployments often call the Domain bundle the **Global** or organization bundle. It's the
same bundle type, described for a different audience.

## Building blocks

### SCDs

A Structured Context Document (SCD) is a YAML file that covers one topic, such as design
change control, confidential data, or writing style. The content that reaches an AI is in
three lists:

- **Prohibitions**: tools or practices that are forbidden, with no conditions
- **Directives**: rules an agent is expected to follow
- **Facts**: statements an agent should know

An SCD can also carry a summary and rationale for the people who review it, citations of the
standards it addresses, and provenance. See [SCD Format](/docs/specification/scd-format/).

### Concept bundles

A concept bundle groups the SCDs for one concept in your
[Domain Ontology](/docs/specification/domain-ontology/), such as risk management or
security. An ontology for your industry (`sdlc`, `cdmo`, `mca`, or `personal`) is the
template you start from.

Each concept bundle is a **section** with an owner: the role accountable for it, such as
`quality` or `regulatory`, named in the bundle. The workspace's intake record names the person
who holds each role, by name, with the email optional. A section can't be released until its
role is held. A Project bundle that lists its SCDs directly is a section too.

### Meta bundle

`bundle:meta` is published with the specification and ships with the tools. It tells an
agent how Domain and Project rules combine, how to treat facts, to name the rule behind any
refusal or change, and that a citation doesn't contain the cited standard's text.

## Tiers

SCD IDs carry a tier: `scd:meta:*` for the meta bundle and `scd:project:*` for everything an
adopter writes, including organization-wide rules in a Domain bundle. The tier identifies who
authors an SCD, not where it applies. Scope comes from the bundle that includes it. The
standards tier is deprecated as of 0.6.0, and standards are now [citations](/docs/specification/citations/).

## Domain repositories

All of an owner's context lives in one git repository, `<name>-context/`: the Domain
workspace under `domain/` and each Project under `projects/<name>/`. Application
repositories that use the context are separate. See
[Domain Repositories](/docs/specification/domain-repositories/).

## Versions

A bundle in progress has the version `DRAFT`. Releasing a version:

1. commits the whole workspace,
2. writes a snapshot and a version manifest that records the person who released it
   (`Name <email>`) and a `content_digest` over the bundle's resolved content, and
3. tags the commit `<workspace>/<bundle-name>-v<version>`.

Every import must be pinned to a released version first. `scs bundle release` does this in
one command: it versions each changed concept bundle, pins it, and then versions the root.
Validation checks each tag against its digest, so a version edited after release is detected.
Released versions are never overwritten.

Before a release, `scs view` writes a **review package**: one HTML file with every rule as the
AI receives it, grouped by section with its owner, for people who review the content without
using git.

Releasing a version authorizes it into the repository. It isn't the organization's formal
approval. Where context is approved in a quality or other management system, that happens
there, and the approval record should cite the version and its content digest.

## The runtime artifact

`scs compile` turns a released version into one self-contained file: the prohibitions
first, then the directives as `rules`, and the facts as `facts`, each with a stable ID such as
`medtech/document-control/DOC-001`. The artifact contains no timestamps, authors, or
paths, so the same approved source always produces the same bytes and the same SHA-256. A
released version's artifact carries its content digest as `source_digest`. See
[Runtime Artifact](/docs/specification/runtime-artifact/).

## What SCS leaves out

SCS ends at the approved version and the file an AI service receives. Storing, selecting,
and delivering artifacts at runtime, enforcing rules, and recording what an agent did in a
session are outside the specification. Those are natural places for products and
integrations built on an open format.

## Next steps

- [What's new in v0.7.0](/docs/specification/v0-7/)
- [Bundle Format](/docs/specification/bundle-format/)
- [SCD Format](/docs/specification/scd-format/)
- [Examples](/docs/examples/personal-domain/)
