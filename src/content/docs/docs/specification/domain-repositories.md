---
title: Domain Repositories
description: SCS 0.7.0 keeps each owner's context in its own git repository, with one Domain workspace and a workspace per Project.
---

As of 0.7.0, every Domain has its own git repository, the **Domain repository**. It holds
exactly one Domain workspace and any number of Project workspaces. A Project belongs to the
Domain whose repository it's in. No field records that relationship, because the layout does.

Application repositories that use the context are kept separate, and they aren't used to
author it. Domain repositories are named `<domain-name>-context`, for example
`medtech-cdmo-context` or `jlee-context`.

A Domain can belong to an organization or to one person. A person can have several Domains,
for example one for personal work and one for work done for an employer. Each Domain gets
its own repository.

## Layout

```
medtech-cdmo-context/
├── AGENTS.md                      # purpose and boundaries of this repository, for agents
├── CLAUDE.md                      # pointer to AGENTS.md
├── .gitignore                     # ignores sources/ contents by default
├── .gitattributes                 # line endings (* text eol=lf)
├── .github/workflows/scs-validate.yml
├── domain/                        # the Domain workspace
│   ├── .scs/config                # workspace marker
│   ├── intake.yaml                # intake record
│   ├── ontology/domain-manifest.yaml
│   ├── bundles/
│   │   ├── domain-bundle.yaml
│   │   └── concepts/
│   ├── context/project/           # SCDs
│   ├── sources/                   # source documents
│   └── dist/                      # compiled artifacts and review packages
└── projects/
    └── infusion-pump-fw/          # a Project workspace, same shape
```

The meta bundle isn't copied into the repository. The tools supply the published version.

`scs new domain NAME` creates this repository and makes the first commit. `scs new project
NAME` adds a Project workspace inside it.

## Workspaces

A **workspace** is a directory with a `.scs/config` file. The Domain workspace is named
`domain`, and a Project workspace takes its directory name under `projects/`.

A workspace's starting set of concept bundles and SCD templates depends on its ontology and
its kind (Domain or Project). Each ontology provides one set for each kind. Remove what doesn't
apply. The `personal` ontology provides one fixed concept, boundaries (the `prohibited`
concept bundle). You define the rest yourself.

## Intake record

`intake.yaml` records what the context was based on:

- the answers given during intake
- the source documents drafted from
- the section owners: each owner role and the person who holds it
- the approvers
- each advisory review finding and the decision on it

That way an intake can be resumed, revisited, and audited. It isn't an SCD, and it's never
compiled. Only the `scs intake` commands write it.

People are identified as `Name <email>`. A repository that will be shared publicly may
record roles instead (`role:quality-manager`) in the intake record. Two exceptions: a section
owner is always a person, named by name with the email optional, and the person who releases a
version is always `Name <email>`. One person may hold several owner roles. Because the person
is recorded here rather than in the bundle, a change of person needs no new version.

## Source documents

Policies, procedures, and handbooks that rules are drafted from go in a workspace's
`sources/` directory. By default the generated `.gitignore` keeps their contents out of git,
because source documents are often confidential or licensed. The intake record lists each
document by ID, and drafted items point back to it with `derived_from`.

## Versions in the repository

Each bundle is versioned on its own, and each version is an annotated git tag:

```
domain/security-v1.0.0
domain/medtech-cdmo-v1.2.0
infusion-pump-fw/infusion-pump-fw-v1.0.0
```

The version commit holds the whole workspace except `dist/`. The commit's author is the
approver. Its committer and tagger are `scs-tools`, so your own git identity, signing
settings, and hooks don't affect it.

`scs-validate --strict` at the repository root checks every workspace and verifies every tag
against its manifest's `content_digest`. CI needs the full history and tags
(`fetch-depth: 0`).

When `SOURCE_DATE_EPOCH` is set, the engine uses it for every timestamp it writes, so a
scripted build of a repository can be reproduced byte for byte. The
[examples](https://github.com/tim-mccrimmon/structured-context-spec/tree/main/examples) are
built this way.

## Compiled artifacts

`scs compile` writes each artifact to the workspace's `dist/` directory as
`<bundle-name>-<version>.yaml`. From there, you [place it](/docs/getting-started/placement/)
wherever your AI services read instructions. `scs view` writes a bundle's review package to the
same directory, as `<bundle-name>-<version>-review.html`. Whether `dist/` is committed is your
choice, since every artifact can be rebuilt from its tag.

Full text: [`spec/0.7/bundle-format.md` §8](https://github.com/tim-mccrimmon/structured-context-spec/blob/main/spec/0.7/bundle-format.md)
