---
title: Bundle Format
description: Technical specification for SCS bundle manifests.
---

## Bundle Format

The technical specification for bundle manifest files.

:::note[Coming Soon]
Complete format specification is being documented.
:::

## Bundle Manifest Structure

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

Complete field documentation coming soon.

## Next Steps

- [SCD Format](/specification/scd-format/)
- [View v0.3 Spec](/specification/v0.3/)
