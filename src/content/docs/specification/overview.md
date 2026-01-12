---
title: Specification Overview
description: Technical overview of the Structured Context Specification (SCS v0.3).
---

## Specification Overview

The Structured Context Specification (SCS) defines how to create, validate, version, and deploy structured context for AI systems.

**Current Version**: v0.3 (actively evolving)

## Core Concepts

### 1. Structured Context Documents (SCDs)

SCDs are YAML files containing structured context organized by tier:

- **Meta Tier** (`scd:meta:*`): SCS specification language itself
- **Standards Tier** (`scd:standards:*`): External compliance requirements
- **Project Tier** (`scd:project:*`): Company/project-specific context

### 2. Bundles

Bundles are versioned packages of SCDs with:
- Unique ID (`bundle:<name>:<version>`)
- Type (meta, standards, domain, concern, project)
- List of SCDs
- Imports (dependency bundles)
- Provenance (who, when, why)

### 3. Bundle Types

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
- **What**: Company knowledge aggregator ⭐
- **Who**: CTO/CIO (C-suite owned)
- **Cardinality**: **1 per company**
- **Imports**: ≥1 concern bundle
- **Example**: `bundle:acme-health-corp:1.0.0`

#### Concern Bundle
- **What**: Functional area standards (leaf nodes)
- **Who**: VPs/Directors (Architect, CISO, CMO, CDO)
- **Cardinality**: Variable (based on needs)
- **Examples**: `bundle:acme-architecture:1.0.0`, `bundle:acme-security:1.0.0`

#### Project Bundle
- **What**: Individual initiative (AI entry point)
- **Who**: Product/Project Managers
- **Cardinality**: Many (one per project)
- **Imports**: Typically imports domain bundle
- **Example**: `bundle:prior-auth-app:1.0.0`

## Bundle Hierarchy

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

## Validation Philosophy

**Phase 1 (DRAFT)**: Loose validation
- Validates YAML structure, bundle fields
- Does NOT enforce required SCD content
- Supports spectrum from minimal to full disclosure

**Phase 2 (Version)**: Strict validation
- All checks enforced before versioning
- Immutable once published

## Import Resolution

When a bundle is deployed, imports are recursively resolved:

```python
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

## Next Steps

- [View full specification on GitHub](https://github.com/structuredcontext)
- [Join discussions](https://github.com/structuredcontext/discussions)
- [Contribute to the spec](https://github.com/structuredcontext)
