---
title: SCD Format
description: Technical specification for Structured Context Documents (SCS v0.5.0).
---

## SCD Format

The technical specification for SCD files.

## SCD structure

```yaml
id: scd:<tier>:<name>
tier: meta|standards|project
title: Human-readable title
description: SCD purpose
concept: concept:<id> # optional — which Domain Ontology concept this SCD realizes

content:
  # Structured context here
  # Format varies by use case
```

The optional `concept:` field, new in v0.5.0, lets an SCD inside a concept bundle declare
which entry in the domain manifest's [Domain Ontology](/docs/specification/domain-ontology/)
it realizes.

## Tiers

- **meta**: SCS specification language
- **standards**: External compliance requirements
- **project**: Company/project-specific context

Some material describes these as "Corporate" (Meta + Standards) and "Project" context, with
a "Personal" tier deferred — that's audience-facing shorthand, not a fourth tier. The three
tiers above remain the normative schema vocabulary.

## Next steps

- [Bundle Format](/docs/specification/bundle-format/)
- [Specification Overview](/docs/specification/overview/)
- [Domain Ontology](/docs/specification/domain-ontology/)
