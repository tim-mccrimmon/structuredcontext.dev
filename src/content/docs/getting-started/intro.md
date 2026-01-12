---
title: What is SCS?
description: Learn about the Structured Context Specification and why it matters for AI development.
---

## What is Structured Context?

If you're building with AI, you know the struggle: agent context ends up scattered across prompts, docs, code, and tribal knowledge. **It drifts. It conflicts. It's impossible to validate or version properly.**

**Structured Context Specification (SCS)** is a community-driven spec (and tooling) for creating, validating, and versioning structured context as git-native artifacts.

## The Problem

AI systems lack governed operating environments. Without explicit, validated context:
- AI improvises based on training data (not organizational rules)
- Behavior varies between sessions and agents
- Compliance is impossible to prove
- Context drifts over time

## The Solution

SCS provides:
- **Structured Context Documents (SCDs)**: YAML/JSON files containing precise, validated context
- **Bundles**: Versioned, composable packages of SCDs
- **Import Resolution**: Automatic dependency management for complex context hierarchies
- **Git-Native**: Version, review, and audit context just like code

## Key Concepts

### Structured Context Documents (SCDs)
Individual YAML files containing structured context for AI systems. Think of them as "config files for AI behavior."

### Bundles
Collections of SCDs packaged together with metadata, imports, and provenance tracking. Bundles are:
- **Versioned**: Immutable once published
- **Composable**: Import other bundles to build complex hierarchies
- **Auditable**: Full provenance and change history

### Bundle Types
1. **Meta Bundle**: SCS specification language itself
2. **Standards Bundles**: External compliance (HIPAA, SOC2, CHAI)
3. **Domain Bundle**: Company knowledge aggregator (1 per company)
4. **Concern Bundles**: Functional areas (Architecture, Security, Clinical)
5. **Project Bundles**: Individual initiatives (Prior Auth App, Patient Portal)

## Why Git-Native?

SCS treats context as first-class artifacts that live alongside your code:
- Version control for context changes
- Pull requests for context reviews
- Git blame for context provenance
- Branching strategies for context experiments

## Next Steps

- [Quick Start](/getting-started/quick-start/) - Get started with SCS
- [View Specification](/specification/overview/) - Dive into technical details
