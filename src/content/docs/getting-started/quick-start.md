---
title: Quick Start
description: Get up and running with SCS in minutes.
---

## Quick Start

Get started with Structured Context Specification in just a few steps.

:::note[Coming Soon]
SCS is launching January 5, 2026. Check back soon for installation instructions and tutorials.
:::

## Installation

```bash
# Install SCS CLI (coming soon)
npm install -g @structuredcontext/cli

# Or use pip
pip install scs-cli
```

## Create Your First Bundle

```bash
# Initialize a new SCS project
scs init my-project

# Create a bundle
scs bundle create --type concern

# Add SCDs to your bundle
# Edit the generated files in bundles/ and scds/

# Validate your bundle
scs validate ./bundles/my-bundle.yaml
```

## Basic Workflow

1. **Create SCDs**: Write structured context as YAML files
2. **Build Bundles**: Package SCDs into versioned bundles
3. **Validate**: Run validation to check structure and imports
4. **Version**: Lock bundles with semantic versions
5. **Deploy**: Publish to registry or use locally

## Example SCD

```yaml
id: scd:project:company-overview
tier: project
title: Acme Health - Company Overview
description: Company context for AI agents

content:
  company:
    name: Acme Health Corporation
    mission: Transform healthcare through AI-powered automation

  values:
    - Patient safety first
    - Clinical excellence
    - Regulatory compliance

  key_stakeholders:
    - Chief Medical Officer
    - VP of Engineering
    - Compliance Director
```

## Example Bundle

```yaml
id: bundle:acme-company-context
type: concern
version: "1.0.0"
title: Acme Health - Company Context

scds:
  - scd:project:company-overview
  - scd:project:company-values

imports: []

provenance:
  created_by: "Dr. Sarah Chen (CEO)"
  created_at: "2025-12-26T10:00:00Z"
  rationale: "Foundational company context for all AI agents"
```

## Next Steps

- [Learn more about SCD structure](/specification/overview/)
- [Explore bundle types](/specification/overview/)
- [Join the community](https://github.com/structuredcontext/discussions)
