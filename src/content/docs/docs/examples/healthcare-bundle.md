---
title: Healthcare Bundle
description: Example SCS bundle structure for a healthcare application with HIPAA compliance requirements.
---

## Healthcare bundle example

This example shows how SCS bundle structure maps to a healthcare application that needs
to incorporate HIPAA compliance requirements alongside internal architectural standards.

This is an advanced example — most teams start with the [solo developer](/docs/examples/solo-developer/)
or [team setup](/docs/examples/team-setup/) guides.

## Bundle hierarchy

```
bundle:prior-auth-app:DRAFT          # Project bundle (AI entry point)
  ↓ imports
bundle:acme-health-corp:1.0.0        # Domain bundle (company aggregator)
  ↓ imports
bundle:acme-architecture:1.0.0       # Concept bundle (architecture standards)
bundle:acme-security:1.0.0           # Concept bundle (security standards)
bundle:acme-clinical:1.0.0           # Concept bundle (clinical workflows)
  ↓ imports
bundle:hipaa:1.0.0                   # Standards bundle (HIPAA requirements)
  ↓ imports
bundle:meta:1.0.0                    # Meta bundle (SCS foundation)
```

When Claude Code loads the project bundle, it recursively resolves all imports and loads
the combined SCD content from every bundle in the hierarchy.

## Project bundle manifest

```yaml
id: bundle:prior-auth-app
type: project
version: "DRAFT"
title: Prior Authorization Application
description: AI context for the prior auth workflow application

scds:
  - scd:project:prior-auth-domain
  - scd:project:prior-auth-api-patterns

imports:
  - bundle:acme-health-corp:1.0.0

provenance:
  created_by: Engineering Lead
  created_at: 2025-01-15T10:00:00Z
  rationale: Project-specific context for prior auth development
```

## What this means for Claude Code

When a developer opens Claude Code on this project, Claude loads:
- HIPAA compliance requirements
- Acme's internal security standards
- Clinical workflow constraints
- Project-specific API patterns and conventions

All from structured, versioned files that the team reviews and maintains together.

## Medical-device manufacturers: a different ontology

This example models a healthcare software company under HIPAA. A **medical-device CDMO** —
a contract design & manufacturing organization building under ISO 13485, IEC 62304, and
FDA 21 CFR 820 — has a different set of concepts: risk management, system architecture,
verification & validation, supplier qualification, and more. SCS 0.5.0 ships a reference
[Domain Ontology](/docs/specification/domain-ontology/) for that market, with its regulatory
concepts mapped to the standards they satisfy.

## Next steps

- [scs-team for processing existing compliance docs](/docs/plugins/scs-team/)
- [Specification overview](/docs/specification/overview/)
- [Bundle format reference](/docs/specification/bundle-format/)
