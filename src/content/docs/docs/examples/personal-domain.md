---
title: Personal Domain
description: One person's own guidance for their AI work, as an SCS Domain on the personal ontology. Scaffold, write, release, and compile.
---

This example is the personal Domain in the spec repository at
[`examples/personal/`](https://github.com/tim-mccrimmon/structured-context-spec/tree/main/examples/personal).
It belongs to Jordan Lee, a fictional independent data engineering consultant. The
repository, `jlee-context/`, is built by the engine from
[`recipe.yaml`](https://github.com/tim-mccrimmon/structured-context-spec/blob/main/examples/personal/recipe.yaml).

With the [skills](/docs/skills/overview/) installed, `scs-domain` does every step below
through conversation. The commands are shown so you can see what happens underneath. They
are the commands
[`examples/build.py`](https://github.com/tim-mccrimmon/structured-context-spec/blob/main/examples/build.py)
runs, and every file quoted here is in the repository.

## 1. Create the repository

```bash
scs new domain jlee --ontology personal --title "Jordan Lee" \
  --author "Jordan Lee" --email jordan@jlee-data.test
cd jlee-context/domain
```

This creates `jlee-context/` with a Domain workspace in `domain/` and makes the first
commit. The `personal` ontology supplies only one concept, boundaries, as the `prohibited`
concept bundle.

## 2. Add concepts

Jordan's other concepts are defined with the owner rather than taken from templates:

```bash
scs add bundle clients --new --title "Client Work" \
  --description "How Jordan works with clients: engagements, confidentiality, estimates" \
  --owner owner --author "Jordan Lee" --email jordan@jlee-data.test
scs add bundle writing --new --title "Writing" \
  --description "How Jordan wants writing done" --owner owner \
  --author "Jordan Lee" --email jordan@jlee-data.test
```

Each one adds a concept bundle, a first SCD, the ontology entry, and the import in the
Domain bundle.

## 3. Write the rules

`domain/context/project/prohibited.yaml`:

```yaml
content:
  summary: "Binary prohibitions that apply to all work"
  prohibitions:
    - id: NO-001
      kind: practice
      subject: "pasting a client's credentials, keys, or connection strings into a chat or a prompt"
      instead: "refer to the secret by name and let the client's secret store supply it"
    - id: NO-002
      kind: practice
      subject: "copying one client's code, data, or documents into another client's work"
```

`domain/context/project/clients.yaml`:

```yaml
content:
  summary: "Jordan is an independent data engineering consultant; client work is confidential."
  facts:
    - id: CL-001
      fact: "Jordan Lee is an independent data engineering consultant working through Lee Data LLC."
    - id: CL-002
      fact: "Every client engagement is under a non-disclosure agreement."
  directives:
    - id: CL-003
      directive: "Do not name a client, or describe a client's systems, in anything meant for publication, such as a blog post, talk, or social media post. Describe the work in general terms instead."
    - id: CL-004
      directive: "Mark every estimate of effort, cost, or schedule as an estimate, and state the assumptions behind it."
```

`domain/context/project/writing.yaml`:

```yaml
content:
  summary: "Plain, direct writing."
  directives:
    - id: WR-001
      directive: "Write in plain, direct sentences. Leave out hype, filler, and emojis."
    - id: WR-002
      directive: "Write dates as YYYY-MM-DD."
```

Each file is written with `scs scd write`, which validates before writing:

```bash
scs scd write context/project/writing.yaml --from-file writing.yaml
```

## 4. Record the owner and approver

Jordan holds the one owner role and approves every version:

```bash
scs intake set audience individual
scs intake set owners '{role: owner, person: Jordan Lee <jordan@jlee-data.test>}'
scs intake set approvers '{person: Jordan Lee <jordan@jlee-data.test>}'
scs bundle validate                   # this workspace
(cd .. && scs-validate --strict)      # every workspace, as CI runs it
scs commit -m "Draft the domain workspace" --author "Jordan Lee <jordan@jlee-data.test>"
```

## 5. Release it

`scs bundle release` versions each concept bundle, pins it in the Domain bundle, and
versions the Domain bundle, in one step:

```bash
scs bundle release --version 1.0.0 \
  --concept clients=1.0.0 --concept prohibited=1.0.0 --concept writing=1.0.0 \
  --approved-by "Jordan Lee <jordan@jlee-data.test>" --notes "First version"
```

Add `--dry-run` first to see what it will do. The release leaves four git tags:
`domain/clients-v1.0.0`, `domain/prohibited-v1.0.0`, `domain/writing-v1.0.0`, and
`domain/jlee-v1.0.0`. The Domain's manifest,
`domain/bundles/jlee-v1.0.0-MANIFEST.yaml`, records Jordan as approver and the content
digest `sha256:afa2f834...`.

## 6. Compile it

```bash
scs compile bundles/domain-bundle.yaml --version 1.0.0
```

This writes `domain/dist/jlee-1.0.0.yaml`, about 2,100 bytes:

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
- id: jlee/prohibited/NO-001
  rule: 'Prohibited: pasting a client''s credentials, keys, or connection strings into a chat or a prompt. Use instead: refer to the secret by name and let the client''s secret store supply it.'
- id: jlee/prohibited/NO-002
  rule: 'Prohibited: copying one client''s code, data, or documents into another client''s work.'
- id: jlee/governance-context/M-001
  rule: Rules from a Domain bundle apply to all work. Rules from a Project bundle apply to work on that project. Follow both. Facts describe the organization and its environment; treat them as true unless the user corrects them.
- id: jlee/governance-context/M-002
  rule: When a rule leads you to decline, limit, or change what you do, name the rule id.
- id: jlee/governance-context/M-003
  rule: A citation such as std:iso-13485:2016#7.3.9 names a standard and clause; it does not contain the standard's text. Do not present wording from memory as the text of a cited standard.
- id: jlee/clients/CL-003
  rule: Do not name a client, or describe a client's systems, in anything meant for publication, such as a blog post, talk, or social media post. Describe the work in general terms instead.
- id: jlee/clients/CL-004
  rule: Mark every estimate of effort, cost, or schedule as an estimate, and state the assumptions behind it.
- id: jlee/writing/WR-001
  rule: Write in plain, direct sentences. Leave out hype, filler, and emojis.
- id: jlee/writing/WR-002
  rule: Write dates as YYYY-MM-DD.
facts:
- id: jlee/clients/CL-001
  fact: Jordan Lee is an independent data engineering consultant working through Lee Data LLC.
- id: jlee/clients/CL-002
  fact: Every client engagement is under a non-disclosure agreement.
```

Jordan's prohibitions come first, then the meta bundle's three rules, then Jordan's
directives. The facts follow in their own list.

## 7. Place it

For one person with one Domain, the user-level setting of each service fits: for example
`~/.claude/rules/jlee.md` in Claude Code, or **Instructions for Claude** in claude.ai. See
[Placing an Artifact](/docs/getting-started/placement/).

## Later: what changed

When Jordan edits a rule, `scs bundle diff` shows the change against the released version
before the next release, and `scs status` lists what has changed since it.

## Next steps

- [Organization and Projects](/docs/examples/organization/)
- [Domain Repositories](/docs/specification/domain-repositories/)
