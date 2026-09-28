---
title: "Migration Guide: 0.3 → 0.5.0"
description: How to migrate SCS 0.3 content to 0.5.0 — the Domain Ontology, provenance approval, and the concerns/topics field trap.
---

## Overview

SCS 0.5.0 replaces the 0.3 **concern** model with the
[Domain Ontology](/docs/specification/domain-ontology/): a domain-defined set of
**concepts**, with an optional shallow taxonomy, a small fixed set of typed relationships,
and a mapping from each concept to the standards it satisfies. This is 0.5.0's anchor
change — everything else in the release sequences behind it.

This is a **breaking change**, expected pre-1.0 per semver.

:::caution[No automated migration]
No automated `scs migrate` helper ships with 0.5.0. This is a deliberate decision, not an
oversight — manual migration is cheap while 0.3 has few consumers. This guide is the full
migration path; read it end to end before editing files, since the steps build on each
other.
:::

## What's new in 0.5.0

### "Concern" is gone; "concept" takes its place

**0.3 and earlier:**
- A domain manifest listed its **concerns** as a flat array of bundle references.
- Bundles of functional areas (Architecture, Security, etc.) had `type: concern`.
- Hierarchy: `Project → Domain → Concern → SCD`.

**0.5.0:**
- A domain manifest defines its **Domain Ontology**: an `ontology.concepts[]` array, each
  concept with an `id`, `name`, `description`, optional `parent` (shallow taxonomy), optional
  `relationships[]` (`depends-on`, `relates-to`, or the `satisfies[]` shorthand), and an
  optional `bundle` pointing at the concept bundle that carries its SCDs.
- Concept bundles carry `type: concept` (was `type: concern`).
- Hierarchy is the same depth, renamed: `Project → Domain → Concept → SCD`.

The change is not just a rename. A 0.3 domain manifest's `concerns:` list was flat — bundle
references with no relationships between them. A 0.5.0 `ontology.concepts[]` block is
structured: concepts can depend on each other, relate to each other, and each maps to the
specific standards it satisfies. Getting real value out of 0.5.0 means adding that
structure, not just renaming the field — see [Domain Ontology](/docs/specification/domain-ontology/)
for the full model.

### `version_approved_by` / `version_approved_at` are now required to version a bundle

A bundle's `provenance` block must carry `version_approved_by` and `version_approved_at`
before it can carry a real semver `version`. A bundle still in progress should stay at
`version: DRAFT`, which is exempt from this requirement — the two fields are required only
once a bundle is actually versioned and released.

### SCDs may declare which concept they belong to

The SCD schemas gained an optional `concept:` field, so an SCD inside a concept bundle can
declare `concept: concept:<id>`, resolving to an entry in the domain manifest's ontology.
Optional in 0.5.0.

An SCD's own `relationships[]` still must target another SCD (`scd:meta:...`,
`scd:standards:...`, `scd:project:...`) — never a `concept:` id. Concept-to-concept
relationships belong only in the domain manifest's `ontology.concepts[]`. Pointing an SCD
relationship at a `concept:` id is a validation error.

:::caution[Watch for: a second, unrelated `concerns:` field]
Some 0.3 SCD content templates carry their own free-text `concerns:` list — topic tags on
the SCD's content, unrelated to the domain-manifest concept model. **This field is renamed
to `topics:`, not `concept:`** — folding it into the concept model would collide with the
formal, singular `concept:` field above. If your content templates have a `concerns:` list
that is a handful of free-text keywords (not bundle references), rename it to `topics:` and
leave it alone otherwise.
:::

## Migration steps

### Step 1: Rename directories

```bash
# Per project, wherever concern bundles live:
git mv bundles/concerns bundles/concepts
```

Templates and tooling follow the same pattern (`templates/bundles/concerns/` →
`templates/bundles/concepts/`) if you maintain your own scaffold templates.

### Step 2: Rename the bundle type

In every bundle file that was `type: concern`:

```diff
- type: concern
+ type: concept
```

Mechanical, safe to script across a tree of bundle files:

```bash
grep -rl '^type: concern$' bundles/ | xargs sed -i '' 's/^type: concern$/type: concept/'
```

This is offered as a convenience for the purely mechanical part, not a supported
`scs migrate` command — check the diff before committing.

### Step 3: Convert the domain manifest's `concerns:` list to `ontology.concepts[]`

:::note[The one step that isn't mechanical]
This is where you add the structure a flat list never had.
:::

Before (0.3):

```yaml
domain:
  id: "domain:medical-device-cdmo"
  concerns:
    - "bundle:compliance-governance:0.1.0"
    - "bundle:risk-management:0.1.0"
    - "bundle:verification-validation:0.1.0"
```

After (0.5.0):

```yaml
domain:
  id: "domain:medical-device-cdmo"
  ontology:
    concepts:
      - id: concept:compliance-governance
        name: Compliance & Governance
        description: >
          Which regulations bind the work, AI deployment-tier and autonomy
          rules, and the overall QMS governance framework.
        satisfies:
          - scd:standards:iso-13485
        bundle: bundle:compliance-governance:0.1.0

      - id: concept:risk-management
        name: Risk Management
        description: The risk register and risk-acceptability criteria.
        relationships:
          - type: depends-on
            target: concept:compliance-governance
        bundle: bundle:risk-management:0.1.0

      - id: concept:verification-validation
        name: Verification & Validation
        description: Test protocols and traceability to requirements.
        relationships:
          - type: depends-on
            target: concept:risk-management
        bundle: bundle:verification-validation:0.1.0
```

Each old `concerns:` entry becomes a `concepts[]` entry with:

- `id` — `concept:<slug>` (was the bundle's own name; the pattern is
  `^concept:[a-z][a-z0-9-]*$`)
- `name`, `description` — human-readable, new in 0.5.0
- `bundle` — the same bundle reference the old list carried, now a named field instead of
  the array element itself
- `relationships[]` (optional) — `depends-on` or `relates-to` edges to other concepts in
  this domain, or the `satisfies[]` shorthand for edges to standards-tier SCDs
- `parent` (optional) — a shallow taxonomy, if one concept is a specialization of another

A full worked example, with 12 real concepts and real relationships, is
`schema/domain/examples/medical-device-cdmo-domain.yaml` in the spec repo — reading it end
to end is the fastest way to see the shape.

:::note[This step decides how much value you get from 0.5.0]
The minimum passing migration gives every concept an `id`, `name`, and `bundle`, with no
`relationships[]` or `satisfies[]` at all — that validates, but it's no more expressive than
the old flat list. The value in the Domain Ontology is in the relationships and the
standards mapping; add them where you actually know them, not as a mechanical pass.
:::

### Step 4: Add approval fields, or stay `DRAFT`

For any bundle you're versioning as part of this migration:

```diff
  provenance:
    created_by: "..."
    created_at: "..."
+   version_approved_by: "..."
+   version_approved_at: "2026-09-27T00:00:00Z"
```

If a bundle isn't ready to be approved yet, leave `version: DRAFT` and skip this — the
schema does not require these fields on a `DRAFT` bundle.

### Step 5: Rename the unrelated `topics:` field, if present

If any SCD content template has a free-text `concerns:` list (see "Watch for" above):

```diff
- concerns:
+ topics:
    - authentication
    - session-management
```

### Step 6: Validate

```bash
scs validate --domain path/to/domain-manifest.yaml
scs-validate --bundle path/to/each-migrated-bundle.yaml
```

The validator enforces all of this directly — stale `concern` terminology (a bundle still
`type: concern`, or a domain manifest still carrying a `concerns:` field) is a hard error
pointing back at this guide, not a silent pass.

## FAQ

**Do I have to add relationships and `satisfies` to every concept?**
No. Both are optional per concept. A migrated concept with just `id`/`name`/`bundle` is
valid. You get more value from the ontology the more of this you fill in, but nothing
blocks on it.

**What happens to bundle versions during migration?**
Nothing changes about how bundles are versioned — 0.5.0 didn't change the version field
itself, only what `provenance` requires before a non-`DRAFT` version is accepted (Step 4).

**Is there a tool that does Steps 1–2 for me?**
The two `sed`/`git mv` commands above cover the purely mechanical rename. There is no
supported `scs migrate` command in 0.5.0 — Step 3, the actual ontology structure, can't be
mechanically derived from a flat list regardless.

**My domain has concepts the software-development reference set doesn't.**
Expected — the medical-device-cdmo and merchant-cash-advance ontologies both add
domain-specific concepts (e.g. `qms-records`, `supplier-qualification` for CDMO) beyond the
11-concept software-development baseline. The reference set is a starting point per domain,
not a fixed list.

## Next steps

- [v0.5 (Current)](/docs/specification/v0-5/)
- [Domain Ontology](/docs/specification/domain-ontology/)
- [v0.3 (Previous)](/docs/specification/v0-3/)
