---
title: SCD Format
description: Technical specification for Structured Context Documents.
---

## SCD Format

The technical specification for SCD files.

## SCD Structure

```yaml
id: scd:<tier>:<name>
tier: meta|standards|project
title: Human-readable title
description: SCD purpose

content:
  # Structured context here
  # Format varies by use case
```

## Tiers

- **meta**: SCS specification language
- **standards**: External compliance requirements
- **project**: Company/project-specific context

## Next Steps

- [Bundle Format](/specification/bundle-format/)
- [Create Bundles](/guides/workflow/)
