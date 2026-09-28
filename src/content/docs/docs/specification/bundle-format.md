---
title: Bundle Format
description: Technical specification for SCS bundle manifests (SCS v0.5.0).
---

## Bundle Format

The technical specification for bundle manifest files.

## Bundle manifest structure

```yaml
id: bundle:<name>
type: meta|standards|domain|concept|project
version: "DRAFT" | "X.Y.Z"
title: Human-readable title
description: Bundle purpose

scds:
  - scd:tier:name
  - scd:tier:another

imports:
  - bundle:other:1.0.0

provenance:
  created_by: Name (Role)
  created_at: ISO-8601 timestamp
  rationale: Why this bundle exists
  # Required once `version` is a real semantic version (not DRAFT):
  version_approved_by: Name (Role)
  version_approved_at: ISO-8601 timestamp
```

As of v0.5.0, `type: concept` replaces `type: concern` — a concept bundle realizes one
concept from its domain's [Domain Ontology](/docs/specification/domain-ontology/). Structural
rules are unchanged from 0.3's concern bundles: a concept bundle must not import other
bundles and must contain at least one SCD.

`provenance.version_approved_by` and `version_approved_at` are required once a bundle's
`version` is a real semantic version — a `DRAFT` bundle is exempt, since there's nothing yet
to approve.

## Fields

Complete field documentation coming soon. See the
[GitHub repo](https://github.com/tim-mccrimmon/structured-context-spec) for the current schema.

## Next steps

- [SCD Format](/docs/specification/scd-format/)
- [Specification Overview](/docs/specification/overview/)
- [Domain Ontology](/docs/specification/domain-ontology/)
- [v0.5 Changelog](/docs/specification/v0-5/)
