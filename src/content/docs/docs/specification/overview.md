---
title: Specification Overview
description: Technical overview of the Structured Context Specification (SCS v0.3).
---

## Structured Context Specification

SCS defines how to create, validate, version, and deploy structured context for AI systems.
It's the format that SCS plugins generate — you don't need to write it by hand, but
understanding the structure helps when working with complex projects.

**Current Version**: v0.3 (actively evolving)

## Core concepts

### Structured Context Documents (SCDs)

SCDs are YAML files containing structured context organized by tier:

- **Meta Tier** (`scd:meta:*`): SCS specification language itself
- **Standards Tier** (`scd:standards:*`): External compliance requirements
- **Project Tier** (`scd:project:*`): Company/project-specific context

### Bundles

Bundles are versioned packages of SCDs with:
- Unique ID (`bundle:<name>:<version>`)
- Type (meta, standards, domain, concern, project)
- List of SCDs
- Imports (dependency bundles)
- Provenance (who, when, why)

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
- **What**: Company knowledge aggregator
- **Who**: CTO/CIO
- **Cardinality**: 1 per company
- **Imports**: One or more concern bundles
- **Example**: `bundle:acme-health-corp:1.0.0`

#### Concern Bundle
- **What**: Functional area standards (leaf nodes)
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
Concern Bundles (Architecture, Security, Clinical)
  ↓ may import
Standards Bundles (HIPAA, SOC2, CHAI)
  ↓ imports
Meta Bundle (SCS foundation)
```

## Validation

**DRAFT phase**: Loose validation. Validates YAML structure and bundle fields, but does not
enforce required SCD content. Supports the full spectrum from minimal to fully-specified.

**Version phase**: Strict validation. All checks enforced before versioning. Immutable once
published.

## Import resolution

When a bundle is deployed, imports are resolved recursively:

```
Input: bundle:prior-auth:1.0.0

Output (resolved):
[
  "bundle:prior-auth:1.0.0",           # Project
  "bundle:acme-health-corp:1.0.0",     # Domain
  "bundle:acme-architecture:1.0.0",    # Concern
  "bundle:acme-security:1.0.0",        # Concern
  "bundle:hipaa:1.0.0",                # Standards
  "bundle:meta:1.0.0"                  # Meta
]
```

All SCDs from all bundles are combined and provided to AI systems.

## Next steps

- [v0.3 Specification](/docs/specification/v0-3/)
- [Bundle Format](/docs/specification/bundle-format/)
- [SCD Format](/docs/specification/scd-format/)
- [View full spec on GitHub](https://github.com/tim-mccrimmon/structured-context-spec)
