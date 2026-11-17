---
title: Runtime Artifact
description: The compiled form of an SCS Domain or Project bundle. One small, deterministic file of rules and facts with stable IDs.
---

Source bundles are written for people and tools: manifests, imports, SCDs, and provenance.
An AI service needs something else: one self-contained file per governance bundle, small
enough to send with every request and stable enough to identify by hash. `scs compile`
produces that file, the **runtime artifact**.

SCS defines the artifact's format. How a runtime stores, selects, or injects artifacts is
outside the specification.

## What gets compiled

| Kind | Written in | Compiled to | Purpose |
|---|---|---|---|
| Prohibition | `content.prohibitions` | `rules`, listed first | A tool or practice that is forbidden, without conditions |
| Directive | `content.directives` | `rules` | A statement an agent is expected to follow |
| Fact | `content.facts` | `facts` | A statement an agent should know |

Everything else in an SCD, such as summaries, rationale, and decisions, is there for the
people who write and review the context. It isn't compiled. Neither are `derived_from`, the
intake record, or review findings.

## Prohibitions are binary

The author states only what is prohibited, and the compiler writes the rule, so the wording
can't soften it:

```yaml
prohibitions:
  - id: NO-001
    kind: tool
    subject: consumer generative AI services and personal AI accounts
    instead: the company's private AI service
    reason: Client data may not leave company-controlled systems.
```

compiles to:

```
Prohibited: consumer generative AI services and personal AI accounts. Use instead: the company's private AI service.
```

The `reason` is for reviewers and isn't compiled.

Validation rejects a subject that contains a condition or qualifier, such as *unless*,
*except*, *if*, *when*, *where possible*, *avoid*, *prefer*, or *should*. If something is
allowed in some cases, narrow the subject until what remains is always forbidden. A Project
can add prohibitions, but it can't lift a Domain prohibition.

## An example

A personal Domain artifact, from the
[personal example](https://github.com/tim-mccrimmon/structured-context-spec/tree/main/examples/personal),
compiled by `scs compile domain/bundles/domain-bundle.yaml --version 1.0.0`:

```yaml
scs_runtime: '0.7'
id: bundle:jlee
type: domain
version: 1.0.0
source_digest: sha256:afa2f834676cb98c591f9df0e8a4b0d856ae5f8f2b61d17d35384fccdb3fdb8c
title: Jordan Lee Governance
sources: ['bundle:meta:0.6.0', 'bundle:prohibited:1.0.0', 'bundle:clients:1.0.0', 'bundle:writing:1.0.0']
rules:
- id: jlee/identity
  rule: 'When asked which governance bundles are active, state: "Domain bundle bundle:jlee version 1.0.0".'
- id: jlee/prohibited/NO-002
  rule: 'Prohibited: copying one client''s code, data, or documents into another client''s work.'
- id: jlee/governance-context/M-002
  rule: When a rule leads you to decline, limit, or change what you do, name the rule id.
- id: jlee/writing/WR-001
  rule: Write in plain, direct sentences. Leave out hype, filler, and emojis.
facts:
- id: jlee/clients/CL-002
  fact: Every client engagement is under a non-disclosure agreement.
```

Some rules and facts are left out of this excerpt. The full file is 2,128 bytes.

## Identifiers

Every rule and fact has a stable ID, `<bundle>/<scd-name>/<id>`, that is unique across the
Domain and Project artifacts. An agent can name the rule it applied, and an audit log can
record it.

The first rule is always a **self-identification rule**. When you ask an agent which
governance is active, the answer names each bundle and its version.

## Deterministic output

The artifact contains no timestamps, authors, or paths. The same approved source always
produces the same bytes and the same SHA-256.

- `--version V` compiles the released version from its tag and includes its `source_digest`,
  the content digest recorded when the version was released. An approval record in the
  organization's own system can cite the version and this digest, so whoever deploys or audits
  the artifact can confirm it is the content that was approved.
- `--allow-draft` compiles the working copy. The version becomes `DRAFT+<digest>`, so two
  different drafts never report the same version. A draft artifact has no `source_digest`.

Every pinned import is verified before compiling, and no flag skips that check.

## Stacks

AI services often load several artifacts at once, for example a personal Domain, an
organization's Domain, and a Project. `scs stack` previews that combination: it lists every
rule and fact in stack order, along with the layer each one came from. It reports a bundle
that appears in two layers, a directive that refers to something another layer prohibits,
duplicated text, and `DRAFT` layers. It never merges, reorders, or drops a rule.

Full text: [`spec/0.7/runtime-artifact.md`](https://github.com/tim-mccrimmon/structured-context-spec/blob/main/spec/0.7/runtime-artifact.md)
