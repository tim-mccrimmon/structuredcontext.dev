---
title: Bundle Format
description: Technical specification for SCS bundle manifests.
---

## Bundle Format

The technical specification for bundle manifest files.

## Bundle manifest structure

```yaml
id: bundle:<name>
type: meta|standards|domain|concern|project
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
```

## Fields

Complete field documentation coming soon. See the
[GitHub repo](https://github.com/tim-mccrimmon/structured-context-spec) for the current schema.

## Next steps

- [SCD Format](/docs/specification/scd-format/)
- [Specification Overview](/docs/specification/overview/)
- [v0.3 Changelog](/docs/specification/v0-3/)
