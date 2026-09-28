---
title: Specification Overview
description: Technical overview of the Structured Context Specification (SCS v0.5.0).
---

## Structured Context Specification

SCS defines how to create, validate, version, and deploy structured context for AI systems.
It's the format that SCS plugins generate — you don't need to write it by hand, but
understanding the structure helps when working with complex projects.

**Current Version**: [v0.5.0](/docs/specification/v0-5/) — a breaking change from v0.3, see
the [migration guide](https://github.com/tim-mccrimmon/structured-context-spec/blob/main/docs/MIGRATION-0.5.0.md)

## Core concepts

### Structured Context Documents (SCDs)

SCDs are YAML files containing structured context organized by tier:

- **Meta Tier** (`scd:meta:*`): SCS specification language itself
- **Standards Tier** (`scd:standards:*`): External compliance requirements
- **Project Tier** (`scd:project:*`): Company/project-specific context

Some material describes coverage as "Corporate" and "Project" context, with "Personal"
deferred — that's shorthand for the tiers above, not a fourth tier: "Corporate" is Meta Tier
+ Standards Tier together, "Project" is Project Tier, and "Personal" has no schema tier and
remains out of scope.

### Bundles

Bundles are versioned packages of SCDs with:
- Unique ID (`bundle:<name>:<version>`)
- Type (meta, standards, domain, concept, project)
- List of SCDs
- Imports (dependency bundles)
- Provenance (who, when, why — plus who approved it, once versioned; see Validation, below)

### Bundle types

#### Meta Bundle
- **What**: Universal SCS vocabulary
- **Who**: SCS (platform owner)
- **Cardinality**: 1 per ecosystem
- **Example**: `bundle:meta:1.0.0`

#### Standards Bundle
- **What**: External regulatory requirements
- **Who**: Standards bodies (CHAI, NIST, AICPA)
- **Cardinality**: Many (one per standard)
- **Examples**: `bundle:hipaa:1.0.0`, `bundle:soc2:1.0.0`

#### Domain Bundle
- **What**: Company knowledge aggregator, importing one or more concept bundles per its
  [Domain Ontology](/docs/specification/domain-ontology/)
- **Who**: CTO/CIO
- **Cardinality**: 1 per company
- **Imports**: One or more concept bundles
- **Example**: `bundle:acme-health-corp:1.0.0`

#### Concept Bundle
- **What**: Functional area standards (leaf nodes), realizing one concept from the domain's
  [Domain Ontology](/docs/specification/domain-ontology/) (was "concern" prior to v0.5.0)
- **Who**: VPs/Directors (Architect, CISO, CMO, CDO)
- **Cardinality**: Variable
- **Examples**: `bundle:acme-architecture:1.0.0`, `bundle:acme-security:1.0.0`

#### Project Bundle
- **What**: Individual initiative
- **Who**: Product/Project Managers
- **Cardinality**: Many (one per project)
- **Imports**: Typically imports domain bundle
- **Example**: `bundle:prior-auth-app:1.0.0`

## Bundle hierarchy

```
Project Bundle (AI uses this)
  ↓ imports
Domain Bundle (Company aggregator)
  ↓ imports
Concept Bundles (Architecture, Security, Clinical)
  ↓ may import
Standards Bundles (HIPAA, SOC2, CHAI)
  ↓ imports
Meta Bundle (SCS foundation)
```

## Validation

**DRAFT phase**: Loose validation. Validates YAML structure and bundle fields, but does not
enforce required SCD content. Supports the full spectrum from minimal to fully-specified.
`provenance.version_approved_by` / `version_approved_at` are not required at this phase.

**Version phase**: Strict validation. All checks enforced before versioning. Immutable once
published. A bundle's `provenance` must carry `version_approved_by` and
`version_approved_at` before it can carry a real semantic version — who approved it, and
when, not just who authored it.

## Import resolution

When a bundle is deployed, imports are resolved recursively:

```
Input: bundle:prior-auth:1.0.0

Output (resolved):
[
  "bundle:prior-auth:1.0.0",           # Project
  "bundle:acme-health-corp:1.0.0",     # Domain
  "bundle:acme-architecture:1.0.0",    # Concept
  "bundle:acme-security:1.0.0",        # Concept
  "bundle:hipaa:1.0.0",                # Standards
  "bundle:meta:1.0.0"                  # Meta
]
```

All SCDs from all bundles are combined and provided to AI systems.

## Next steps

- [v0.5 (Current) Specification](/docs/specification/v0-5/)
- [Domain Ontology](/docs/specification/domain-ontology/)
- [Bundle Format](/docs/specification/bundle-format/)
- [SCD Format](/docs/specification/scd-format/)
- [View full spec on GitHub](https://github.com/tim-mccrimmon/structured-context-spec)
