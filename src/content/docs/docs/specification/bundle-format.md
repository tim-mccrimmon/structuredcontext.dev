---
title: Bundle Format
description: Bundle manifests in SCS 0.7.0. Bundle types, import rules, and version manifests.
---

A bundle is a versioned manifest that assembles SCDs, either directly or by importing other
bundles.

## Bundle types

| Type | Holds | Imports |
|---|---|---|
| `domain` | Rules for all of an owner's work | One pinned meta bundle, plus concept bundles. No SCDs of its own. |
| `project` | Rules for one piece of work | Concept bundles, **or** project SCDs listed directly, not both. It MUST NOT import meta, domain, standards, or other project bundles. |
| `concept` | The SCDs for one concept in the Domain Ontology | Nothing. Must list at least one SCD. |
| `meta` | The SCS vocabulary and agent guidance | Published with the specification |
| `standards` | Deprecated since 0.6.0 | Use [citations](/docs/specification/citations/) instead |

## Manifest

```yaml
id: bundle:medtech
type: domain
version: "DRAFT"
title: "MedTech CDMO Governance"
description: "Governance for all of MedTech CDMO's work"

imports:
  - bundle:meta:0.6.0
  - bundle:company:1.0.0
  - bundle:prohibited:1.0.0
  - bundle:qms-records:1.0.0

scds: []

provenance:
  created_by: "Name <email>"
  created_at: "2026-10-01T09:00:00Z"
  rationale: Organization-wide rules
```

A concept bundle, which names the role that owns it:

```yaml
id: bundle:qms-records
type: concept
version: "DRAFT"
title: "QMS Records"
description: "Document control, record retention, and systems of record"
owner: quality
imports: []
scds:
  - scd:project:document-control
provenance:
  created_by: "Name <email>"
  created_at: "2026-10-01T09:00:00Z"
```

A Project bundle that lists its SCDs directly:

```yaml
id: bundle:infusion-pump-fw
type: project
version: "DRAFT"
title: "Infusion Pump Firmware"
description: "Governance for the infusion pump firmware project"
owner: engineering
imports: []
scds:
  - scd:project:software-safety-class
  - scd:project:release-gates
provenance:
  created_by: "Name <email>"
  created_at: "2026-10-05T09:00:00Z"
```

## Section owners

A concept bundle, and a Project bundle that lists SCDs directly, holds a section of content
and names an `owner`: the role accountable for it, who reviews and approves it, in lowercase
letters, digits, and hyphens (`owner: quality`). Other bundle types don't name one.
Scaffolded concepts come with a default role from the ontology, and a personal Domain uses
the single role `owner`. Set it with `scs bundle set-owner ROLE`.

The workspace's intake record maps each role to the person who holds it:

```bash
scs intake set owners '{role: quality, person: Dana Reyes}'
```

The person is a name. The email is optional for an owner (`Dana Reyes <dana.reyes@medtech-cdmo.test>`
also works). The role is part of the bundle and its content digest, so changing it needs a new
version. The person isn't, so a change of person doesn't. Validation reports a missing or
unmapped owner as information while a section is drafted, versioning refuses a section without
one, and a released section whose role no one holds now is a warning.

## References

- `bundle:<name>` is an unpinned import. It resolves to the working bundle file.
- `bundle:<name>:<version>` is a pinned import. It resolves to that version's snapshot.

Before a bundle can be versioned, every import must be pinned to a released version
(`scs bundle pin`).

## Versions

The working bundle stays at `version: "DRAFT"`. `scs bundle version` writes the released
version beside it:

- `<bundle-name>-v<version>.yaml`, the snapshot
- `<bundle-name>-v<version>-MANIFEST.yaml`, the version manifest
- the git tag `<workspace>/<bundle-name>-v<version>`

`scs bundle release` releases a root bundle and the concept bundles it needs in one command,
with one approver: each concept bundle that is new or changed gets a version
(`--concept NAME=VERSION`), is pinned in the root, and then the root is versioned. Its
`--dry-run` rehearses the whole release, and a failed release undoes every step.

The manifest records who released the version and a `content_digest` over the bundle's full
resolved content, which covers the bundle, its SCDs, and its imports:

```yaml
version: 1.0.0
content_digest: sha256:afa2f834676cb98c591f9df0e8a4b0d856ae5f8f2b61d17d35384fccdb3fdb8c
content_inputs:
  bundles:
    bundle:jlee:1.0.0: sha256:fc33...
    bundle:prohibited:1.0.0: sha256:681a...
  scds:
    scd:project:prohibited: sha256:3f4a...
approval:
  approved_by: Jordan Lee <jordan@jlee-data.test>
  approved_at: '2026-10-01T09:00:00Z'
```

The person who releases a version is always named, as `Name <email>`, and never taken from git
configuration. Releasing authorizes the version into the repository. It isn't the
organization's formal approval, which stays in the organization's own review or quality
system. That approval record should cite the version and its `content_digest`, which the
compiled artifact carries as `source_digest`. The field is still called `approved_by` in 0.7.

A released version is never overwritten. When `SOURCE_DATE_EPOCH` is set, every timestamp the
engine writes, in provenance, intake answers, and version manifests, uses it, so a scripted
build can be reproduced byte for byte.

SCDs aren't snapshotted. A bundle's versions and its working copy read the same SCD files,
so once an SCD changes for the next version, the earlier version no longer verifies in the
working tree. Validate or compile it from its tag instead (`scs compile --version`).
Comment and formatting edits don't change the digest.

Full text: [`spec/0.7/bundle-format.md`](https://github.com/tim-mccrimmon/structured-context-spec/blob/main/spec/0.7/bundle-format.md)
